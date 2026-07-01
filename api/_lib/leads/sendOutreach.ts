import { Resend } from 'resend';
import { getLead, getTemplate, listTemplates, saveLead, saveTemplate } from './blobStore';
import { applyTemplate } from './mergeTemplate';
import { buildBrandedOutreachEmail, outreachPlainFooter } from './outreachEmail';
import { defaultEmailTemplates } from './defaultTemplates';
import type { EmailTemplate, LeadRecord } from './types';

const FROM =
  process.env.RESEND_FROM_EMAIL || 'Qwabi Engineering <onboarding@qwabi.co.za>';

export function pickTemplateSlugForLead(lead: LeadRecord): string {
  const verticals = lead.verticals ?? [];
  const why = (lead.whyNow ?? '').toLowerCase();
  const lastSent = lead.outreachDraft?.lastSentAt;

  if (lead.status === 'contacted' && lastSent) {
    const daysSince =
      (Date.now() - new Date(lastSent).getTime()) / 86_400_000;
    if (daysSince >= 6) return 'follow-up-7d';
  }

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

  if (lead.tier === 3 || lead.score && lead.score < 72) {
    return 'sa-sme-custom-build';
  }

  return 'phase-1-sprint-offer';
}

async function resolveTemplate(slug: string): Promise<EmailTemplate | null> {
  let template = await getTemplate(slug);
  if (template) return template;
  const fallback = defaultEmailTemplates.find((t) => t.slug === slug);
  return fallback ?? null;
}

export async function ensureDefaultTemplates(): Promise<void> {
  const existing = await listTemplates();
  if (existing.length > 0) return;
  for (const t of defaultEmailTemplates) {
    await saveTemplate(t);
  }
}

export type SendOutreachResult =
  | { ok: true; lead: LeadRecord; templateSlug: string }
  | { ok: false; status: number; error: string };

export async function sendOutreachToLead(
  leadId: string,
  options?: { templateSlug?: string; force?: boolean },
): Promise<SendOutreachResult> {
  const lead = await getLead(leadId);
  if (!lead) return { ok: false, status: 404, error: 'Lead not found' };
  if (!lead.email) return { ok: false, status: 400, error: 'Lead has no email address' };
  if (lead.status === 'lost') return { ok: false, status: 400, error: 'Lead is marked lost' };
  if (lead.unsubscribedAt && !options?.force) {
    return { ok: false, status: 400, error: 'Lead unsubscribed' };
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (!resendKey) return { ok: false, status: 503, error: 'RESEND_API_KEY is not configured' };

  const templateSlug = options?.templateSlug ?? pickTemplateSlugForLead(lead);
  const template = await resolveTemplate(templateSlug);
  if (!template) {
    return { ok: false, status: 404, error: `Template not found: ${templateSlug}` };
  }

  const merged = applyTemplate(template, lead);
  const firstName =
    lead.name?.split(' ')[0] || lead.company?.split(' ')[0] || 'there';
  const html =
    merged.html ??
    buildBrandedOutreachEmail({
      firstName,
      bodyText: merged.text,
      preheader: merged.subject,
    });
  const text = `${merged.text}${outreachPlainFooter()}`;

  const resend = new Resend(resendKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: [lead.email],
    subject: merged.subject,
    text,
    html,
    headers: {
      'List-Unsubscribe': `<${process.env.SITE_URL?.replace(/\/$/, '') || 'https://business.qwabi.co.za'}/contact>`,
    },
  });

  if (error) {
    return { ok: false, status: 400, error: error.message || 'Send failed' };
  }

  const sentAt = new Date().toISOString();
  lead.outreachDraft = {
    subject: merged.subject,
    text,
    html,
    templateSlug,
    lastSentAt: sentAt,
  };
  lead.sendHistory = [
    ...(lead.sendHistory ?? []),
    { sentAt, templateSlug, email: lead.email, channel: 'email' },
  ];
  if (lead.status === 'new') lead.status = 'contacted';
  await saveLead(lead);

  return { ok: true, lead, templateSlug };
}
