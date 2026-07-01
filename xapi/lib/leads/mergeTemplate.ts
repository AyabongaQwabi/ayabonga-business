import type { EmailTemplate, LeadRecord } from './types';

const SITE_URL =
  process.env.SITE_URL?.replace(/\/$/, '') || 'https://business.qwabi.co.za';
const YOUR_NAME = 'Ayabonga Qwabi';

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
  return template
    .replace(/\{\{firstName\}\}/g, ctx.firstName)
    .replace(/\{\{company\}\}/g, ctx.company)
    .replace(/\{\{whyNow\}\}/g, ctx.whyNow)
    .replace(/\{\{yourName\}\}/g, ctx.yourName)
    .replace(/\{\{siteUrl\}\}/g, ctx.siteUrl)
    .replace(/\{\{name\}\}/g, ctx.name)
    .replace(/\{\{role\}\}/g, ctx.role)
    .replace(/\{\{warmPath\}\}/g, ctx.warmPath)
    .replace(/\{\{message\}\}/g, ctx.message);
}

export function applyTemplate(
  template: EmailTemplate,
  lead: LeadRecord,
): { subject: string; text: string; html?: string } {
  const ctx = buildTemplateContext(lead);
  return {
    subject: mergePlaceholders(template.subject, ctx),
    text: mergePlaceholders(template.text, ctx),
    html: template.html
      ? mergePlaceholders(template.html, ctx)
      : undefined,
  };
}
