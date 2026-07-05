import { SITE_ORIGIN } from './site-config';
import type { LeadRecord } from './admin-api';
import type { EmailTemplate } from './admin-api';

const YOUR_NAME = 'Ayabonga Qwabi';

type TemplateContext = {
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

function normalizeTemplateString(value: string): string {
  return value
    .replace(/\uFF5B/g, '{')
    .replace(/\uFF5D/g, '}')
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u200B-\u200D\uFEFF]/g, '');
}

function buildTemplateContext(lead: LeadRecord): TemplateContext {
  const firstName =
    lead.name?.split(' ')[0] ||
    lead.company?.split(' ')[0] ||
    'there';
  return {
    firstName,
    company: lead.company || 'your company',
    whyNow: lead.whyNow || '',
    yourName: YOUR_NAME,
    siteUrl: SITE_ORIGIN,
    name: lead.name || '',
    role: lead.role || '',
    warmPath: lead.warmPath || '',
    message: lead.message || '',
  };
}

function mergePlaceholders(template: string, ctx: TemplateContext): string {
  let out = normalizeTemplateString(template)
    .replace(/\{\{\s*firstName\s*\}\}/g, ctx.firstName)
    .replace(/\{\{\s*company\s*\}\}/g, ctx.company)
    .replace(/\{\{\s*whyNow\s*\}\}/g, ctx.whyNow)
    .replace(/\{\{\s*yourName\s*\}\}/g, ctx.yourName)
    .replace(/\{\{\s*siteUrl\s*\}\}/g, ctx.siteUrl)
    .replace(/\{\{\s*name\s*\}\}/g, ctx.name)
    .replace(/\{\{\s*role\s*\}\}/g, ctx.role)
    .replace(/\{\{\s*warmPath\s*\}\}/g, ctx.warmPath)
    .replace(/\{\{\s*message\s*\}\}/g, ctx.message);
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

/** Preview merged outreach copy in admin before send. */
export function previewOutreachContent(
  lead: LeadRecord,
  input: {
    template?: EmailTemplate | null;
    draftSubject?: string;
    draftText?: string;
  },
): { subject: string; text: string; firstName: string; hasUnresolved: boolean } {
  const hasDraft =
    input.draftSubject !== undefined || input.draftText !== undefined;
  const rawSubject = hasDraft
    ? (input.draftSubject ?? input.template?.subject ?? '')
    : (input.template?.subject ?? input.draftSubject ?? '');
  const rawText = hasDraft
    ? (input.draftText ?? input.template?.text ?? '')
    : (input.template?.text ?? input.draftText ?? '');

  const ctx = buildTemplateContext(lead);
  const subject = mergePlaceholders(rawSubject, ctx);
  const text = mergePlaceholders(rawText, ctx);
  return {
    firstName: ctx.firstName,
    subject,
    text,
    hasUnresolved:
      hasUnresolvedPlaceholders(subject) || hasUnresolvedPlaceholders(text),
  };
}
