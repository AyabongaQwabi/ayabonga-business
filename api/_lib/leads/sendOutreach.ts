import { Resend } from 'resend';
import { apiLog } from '../apiLog';
import { getResendFromAddress } from '../emailFrom';
import { getLead, getTemplate, listTemplates, saveLead, saveTemplate } from './blobStore';
import { applyTemplate, hasUnresolvedPlaceholders, prepareOutreachContent } from './mergeTemplate';
import { buildBrandedOutreachEmail, outreachPlainFooter } from './outreachEmail';
import { archiveSentEmail } from './sentEmailArchive';
import { outreachRecipientsForLead } from './outreachRecipients';
import { defaultEmailTemplates } from './defaultTemplates';
import { defaultColdTemplates } from './defaultColdTemplates';
import { OUTREACH_CC_EMAIL } from './campaigns';
import { coldCopyForLead } from './coldBuildIdeas';
import type { EmailTemplate, LeadRecord } from './types';

export function pickTemplateSlugForLead(lead: LeadRecord): string {
  const lastSent = lead.outreachDraft?.lastSentAt;

  if (lead.status === 'contacted' && lastSent) {
    const daysSince =
      (Date.now() - new Date(lastSent).getTime()) / 86_400_000;
    if (daysSince >= 6) {
      return lead.campaign === 'cold' ? 'cold-follow-up-7d' : 'follow-up-7d';
    }
  }

  if (lead.campaign === 'cold') {
    const verticals = lead.verticals ?? [];
    const blob = `${lead.whyNow ?? ''} ${verticals.join(' ')}`.toLowerCase();
    if (verticals.includes('mobile') || blob.includes('mobile app')) return 'cold-mobile-app';
    if (verticals.includes('web') || blob.includes('web app') || blob.includes('website')) {
      return 'cold-web-app';
    }
    if (verticals.includes('ai') || blob.includes('automation') || blob.includes(' ai ')) {
      return 'cold-ai-integration';
    }
    return coldCopyForLead(verticals).templateSlug;
  }

  const verticals = lead.verticals ?? [];
  const why = (lead.whyNow ?? '').toLowerCase();

  if (lead.connectorType || lead.suggestedChannel?.toLowerCase().includes('intro')) {
    return 'warm-intro-ask';
  }

  if (
    verticals.includes('whatsapp') ||
    verticals.includes('ai') ||
    why.includes('whatsapp') ||
    why.includes(' ai ')
  ) {
    return 'whatsapp-ai-partnership';
  }

  if (
    why.includes('seed') ||
    why.includes('series') ||
    why.includes('funding') ||
    why.includes('raised') ||
    lead.budgetSignal?.toLowerCase().includes('fund')
  ) {
    return 'direct-founder-post-funding';
  }

  if (lead.tier === 3 || (lead.score && lead.score < 72)) {
    return 'sa-sme-custom-build';
  }

  return 'phase-1-sprint-offer';
}

async function resolveTemplate(slug: string): Promise<EmailTemplate | null> {
  const codeDefault =
    defaultEmailTemplates.find((t) => t.slug === slug) ??
    defaultColdTemplates.find((t) => t.slug === slug) ??
    null;
  const blob = await getTemplate(slug);
  if (!blob) return codeDefault;
  if (blob.html && hasUnresolvedPlaceholders(blob.html)) {
    return { ...blob, html: undefined };
  }
  return blob;
}

function mergeTemplateForLead(
  template: EmailTemplate,
  lead: LeadRecord,
  slug: string,
): { subject: string; text: string; html?: string } {
  let merged = applyTemplate(template, lead);
  if (
    hasUnresolvedPlaceholders(merged.subject) ||
    hasUnresolvedPlaceholders(merged.text)
  ) {
    const fallback =
      defaultEmailTemplates.find((t) => t.slug === slug) ??
      defaultColdTemplates.find((t) => t.slug === slug);
    if (fallback) merged = applyTemplate(fallback, lead);
  }
  return merged;
}

export async function ensureDefaultTemplates(): Promise<void> {
  const existing = await listTemplates();
  const bySlug = new Map(existing.map((t) => [t.slug, t]));

  for (const t of [...defaultEmailTemplates, ...defaultColdTemplates]) {
    const blob = bySlug.get(t.slug);
    const needsSeed =
      !blob ||
      (t.seedVersion != null &&
        (blob.seedVersion == null || blob.seedVersion < t.seedVersion));
    if (needsSeed) await saveTemplate(t);
  }
}

export type SendOutreachResult =
  | { ok: true; lead: LeadRecord; templateSlug: string; archiveId: string }
  | { ok: false; status: number; error: string };

export async function sendOutreachToLead(
  leadId: string,
  options?: {
    templateSlug?: string;
    force?: boolean;
    draftSubject?: string;
    draftText?: string;
  },
): Promise<SendOutreachResult> {
  const lead = await getLead(leadId);
  if (!lead) return { ok: false, status: 404, error: 'Lead not found' };
  if (!lead.email) return { ok: false, status: 400, error: 'Lead has no email address' };
  const recipients = outreachRecipientsForLead(lead);
  if (!recipients.length) {
    return { ok: false, status: 400, error: 'Lead has no sendable email address' };
  }
  if (lead.status === 'lost') return { ok: false, status: 400, error: 'Lead is marked lost' };
  if (lead.unsubscribedAt && !options?.force) {
    return { ok: false, status: 400, error: 'Lead unsubscribed' };
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (!resendKey) return { ok: false, status: 503, error: 'RESEND_API_KEY is not configured' };

  const hasDraft =
    options?.draftSubject !== undefined || options?.draftText !== undefined;
  const templateSlug =
    options?.templateSlug ??
    (hasDraft ? undefined : pickTemplateSlugForLead(lead)) ??
    'custom';

  let template: EmailTemplate | null = null;
  if (templateSlug !== 'custom') {
    template = await resolveTemplate(templateSlug);
    if (!template) {
      return { ok: false, status: 404, error: `Template not found: ${templateSlug}` };
    }
  }

  if (!template && !hasDraft) {
    return { ok: false, status: 400, error: 'No template or draft content to send' };
  }

  let merged = prepareOutreachContent(lead, {
    template,
    draftSubject: options?.draftSubject,
    draftText: options?.draftText,
  });

  if (
    template &&
    templateSlug !== 'custom' &&
    (hasUnresolvedPlaceholders(merged.subject) ||
      hasUnresolvedPlaceholders(merged.text))
  ) {
    const fallback = mergeTemplateForLead(template, lead, templateSlug);
    merged = {
      firstName:
        lead.name?.split(' ')[0] || lead.company?.split(' ')[0] || 'there',
      subject: fallback.subject,
      text: fallback.text,
    };
  }
  if (hasUnresolvedPlaceholders(merged.subject) || hasUnresolvedPlaceholders(merged.text)) {
    lead.lastSendError = 'Email still contains unresolved template placeholders after merge';
    lead.lastSendAttemptAt = new Date().toISOString();
    await saveLead(lead);
    return {
      ok: false,
      status: 400,
      error: lead.lastSendError,
    };
  }

  const firstName = merged.firstName;
  const html = buildBrandedOutreachEmail({
    firstName,
    bodyText: merged.text,
    preheader: merged.subject,
  });
  const text = `${merged.text}${outreachPlainFooter()}`;
  const from = getResendFromAddress();

  apiLog('outreach/resend', 'sending', {
    leadId: lead.id,
    to: recipients,
    cc: OUTREACH_CC_EMAIL,
    from,
    templateSlug,
    subject: merged.subject,
  });

  const resend = new Resend(resendKey);
  const { data, error } = await resend.emails.send({
    from,
    to: recipients,
    cc: [OUTREACH_CC_EMAIL],
    subject: merged.subject,
    text,
    html,
    headers: {
      'List-Unsubscribe': `<${process.env.SITE_URL?.replace(/\/$/, '') || 'https://business.qwabi.co.za'}/contact>`,
    },
  });

  if (error) {
    apiLog('outreach/resend', 'error', { leadId: lead.id, message: error.message });
    lead.lastSendError = error.message || 'Send failed';
    lead.lastSendAttemptAt = new Date().toISOString();
    await saveLead(lead);
    return { ok: false, status: 400, error: error.message || 'Send failed' };
  }

  apiLog('outreach/resend', 'ok', { leadId: lead.id, resendMessageId: data?.id });

  const sentAt = new Date().toISOString();
  const toLine = recipients.join(', ');
  const archived = await archiveSentEmail({
    leadId: lead.id,
    to: toLine,
    from,
    subject: merged.subject,
    text,
    html,
    templateSlug,
    channel: 'email',
    resendMessageId: data?.id,
    sentAt,
  });

  lead.outreachDraft = {
    subject: merged.subject,
    text,
    html,
    templateSlug: templateSlug === 'custom' ? undefined : templateSlug,
    lastSentAt: sentAt,
  };
  lead.sendHistory = [
    ...(lead.sendHistory ?? []),
    {
      sentAt,
      templateSlug: templateSlug === 'custom' ? 'custom' : templateSlug,
      email: toLine,
      channel: 'email',
      subject: merged.subject,
      from,
      archiveId: archived.id,
      resendMessageId: data?.id,
    },
  ];
  if (lead.status === 'new') lead.status = 'contacted';
  lead.lastSendError = undefined;
  lead.lastSendAttemptAt = sentAt;
  await saveLead(lead);

  return { ok: true, lead, templateSlug, archiveId: archived.id };
}
