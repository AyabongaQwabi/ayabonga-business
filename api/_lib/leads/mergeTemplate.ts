import type { EmailTemplate, LeadRecord } from './types';

const SITE_URL =
  process.env.SITE_URL?.replace(/\/$/, '') || 'https://business.qwabi.co.za';
const YOUR_NAME = 'Ayabonga Qwabi';

/** Normalize pasted template text (smart quotes, fullwidth braces, zero-width chars). */
export function normalizeTemplateString(value: string): string {
  return value
    .replace(/\uFF5B/g, '{')
    .replace(/\uFF5D/g, '}')
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u200B-\u200D\uFEFF]/g, '');
}

export type TemplateContext = {
  firstName: string;
  company: string;
  whyNow: string;
  yourName: string;
  siteUrl: string;
  name: string;
  role: string;
  warmPath: string;
  message: string;
};

export function buildTemplateContext(lead: LeadRecord): TemplateContext {
  const firstName =
    lead.name?.split(' ')[0] ||
    lead.company?.split(' ')[0] ||
    'there';
  return {
    firstName,
    company: lead.company || 'your company',
    whyNow: lead.whyNow || '',
    yourName: YOUR_NAME,
    siteUrl: SITE_URL,
    name: lead.name || '',
    role: lead.role || '',
    warmPath: lead.warmPath || '',
    message: lead.message || '',
  };
}

export function mergePlaceholders(
  template: string,
  ctx: TemplateContext,
): string {
  let out = normalizeTemplateString(template)
    .replace(/&#123;&#123;/g, '{{')
    .replace(/&#125;&#125;/g, '}}')
    .replace(/\{\{\s*firstName\s*\}\}/g, ctx.firstName)
    .replace(/\{\{\s*company\s*\}\}/g, ctx.company)
    .replace(/\{\{\s*whyNow\s*\}\}/g, ctx.whyNow)
    .replace(/\{\{\s*yourName\s*\}\}/g, ctx.yourName)
    .replace(/\{\{\s*siteUrl\s*\}\}/g, ctx.siteUrl)
    .replace(/\{\{\s*name\s*\}\}/g, ctx.name)
    .replace(/\{\{\s*role\s*\}\}/g, ctx.role)
    .replace(/\{\{\s*warmPath\s*\}\}/g, ctx.warmPath)
    .replace(/\{\{\s*message\s*\}\}/g, ctx.message);
  // Legacy single-brace placeholders
  out = out
    .replace(/\{firstName\}/g, ctx.firstName)
    .replace(/\{company\}/g, ctx.company)
    .replace(/\{whyNow\}/g, ctx.whyNow)
    .replace(/\{yourName\}/g, ctx.yourName)
    .replace(/\{siteUrl\}/g, ctx.siteUrl);
  return out;
}

const PLACEHOLDER_RE = /\{\{\s*[a-zA-Z]+\s*\}\}/;

export function hasUnresolvedPlaceholders(value: string): boolean {
  return PLACEHOLDER_RE.test(value);
}

export function applyTemplate(
  template: EmailTemplate,
  lead: LeadRecord,
): { subject: string; text: string; html?: string } {
  const ctx = buildTemplateContext(lead);
  const merged = {
    subject: mergePlaceholders(template.subject, ctx),
    text: mergePlaceholders(template.text, ctx),
    html: template.html
      ? mergePlaceholders(template.html, ctx)
      : undefined,
  };
  if (
    merged.html &&
    (hasUnresolvedPlaceholders(merged.html) ||
      hasUnresolvedPlaceholders(merged.subject) ||
      hasUnresolvedPlaceholders(merged.text))
  ) {
    // Stale blob html must not override a clean plain-text merge.
    merged.html = undefined;
  }
  return merged;
}

/** Merge admin draft fields or raw strings with lead context. */
export function mergeDraftFields(
  lead: LeadRecord,
  fields: { subject?: string; text?: string },
): { subject: string; text: string; firstName: string } {
  const ctx = buildTemplateContext(lead);
  return {
    firstName: ctx.firstName,
    subject: mergePlaceholders(fields.subject ?? '', ctx),
    text: mergePlaceholders(fields.text ?? '', ctx),
  };
}

/**
 * Single entry point for outreach copy: template fields and/or draft overrides,
 * always merged with lead data before send.
 */
export function prepareOutreachContent(
  lead: LeadRecord,
  input: {
    template?: EmailTemplate | null;
    draftSubject?: string;
    draftText?: string;
  },
): { subject: string; text: string; firstName: string } {
  const hasDraft =
    input.draftSubject !== undefined || input.draftText !== undefined;

  const rawSubject = hasDraft
    ? (input.draftSubject ?? input.template?.subject ?? '')
    : (input.template?.subject ?? input.draftSubject ?? '');
  const rawText = hasDraft
    ? (input.draftText ?? input.template?.text ?? '')
    : (input.template?.text ?? input.draftText ?? '');

  return mergeDraftFields(lead, { subject: rawSubject, text: rawText });
}
