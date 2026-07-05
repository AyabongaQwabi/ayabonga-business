import { SITE_ORIGIN } from './site-config';
import type { LeadRecord } from './admin-api';
import type { EmailTemplate } from './admin-api';

const YOUR_NAME = 'Ayabonga Qwabi';

const PHONE_RE = /(?:\+27|0)\d{2}[\s-]?\d{3}[\s-]?\d{4}/g;

function looksLikeDirectoryListing(text: string): boolean {
  const bulletCount = (text.match(/·/g) ?? []).length;
  const phoneHits = (text.match(PHONE_RE) ?? []).length;
  return bulletCount >= 3 || phoneHits >= 2 || (text.length > 100 && /\d{4}/.test(text));
}

function sanitizeCompany(raw: string | undefined): string {
  if (!raw?.trim() || looksLikeDirectoryListing(raw)) return 'your team';
  const name = raw.replace(/\s*[-|–].*$/, '').replace(/\s*·.*$/, '').trim();
  return name.length > 60 ? name.slice(0, 60) : name || 'your team';
}

function sanitizeFirstName(name: string | undefined, company: string | undefined): string {
  for (const c of [name?.split(/\s+/)[0], company?.split(/\s+/)[0]].filter(Boolean)) {
    const clean = String(c).replace(/[^a-zA-Z'-]/g, '');
    if (clean.length >= 2 && !/^\d+$/.test(clean)) {
      return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
    }
  }
  return 'there';
}

const VERTICAL_COPY: Record<string, { valueHook: string; buildIdeas: string }> = {
  legal: {
    valueHook:
      'I build intake, scheduling, and matter workflow tools for SA legal practices. One senior engineer, fixed Phase 1 scope.',
    buildIdeas:
      '- Client intake forms that feed straight into your matter workflow\n- Consultation booking with SMS or email reminders\n- Secure document upload for clients (POPIA-aware access)',
  },
  healthcare: {
    valueHook:
      'I build patient booking, records, and clinic ops systems for SA healthcare providers. Shipped ClinicPlus for occupational health compliance.',
    buildIdeas:
      '- Online appointment booking with practitioner calendars\n- Patient intake and referral tracking\n- Staff scheduling and visit notes in one admin dashboard',
  },
  pharmacy: {
    valueHook:
      'I build pharmacy ops tools: repeat scripts, stock alerts, and customer comms for SA chemists.',
    buildIdeas:
      '- Repeat prescription reminders via SMS or WhatsApp\n- Stock level alerts and supplier reorder lists\n- Customer loyalty and delivery request portal',
  },
  sme: {
    valueHook:
      'I replace spreadsheets and manual workflows with custom software for SA SMEs. One senior engineer, no agency overhead.',
    buildIdeas:
      '- Customer portal or internal admin dashboard\n- Booking, invoicing, or inventory in one system\n- WhatsApp or SMS automations tied to your existing process',
  },
};

function coldCopy(verticals: string[] | undefined, templateSlug?: string) {
  const primary = verticals?.find((v) => VERTICAL_COPY[v]) ?? 'sme';
  if (templateSlug === 'cold-mobile-app') {
    return {
      valueHook:
        'I build iOS and Android apps for SA teams without agency overhead. React Native, offline-first where it matters.',
      buildIdeas:
        '- Customer-facing app with bookings or orders\n- Field worker app with photo uploads and GPS check-in\n- Internal tool for stock counts or job sign-off',
    };
  }
  return VERTICAL_COPY[primary] ?? VERTICAL_COPY.sme;
}

type TemplateContext = {
  firstName: string;
  company: string;
  whyNow: string;
  valueHook: string;
  buildIdeas: string;
  yourName: string;
  siteUrl: string;
};

function buildTemplateContext(lead: LeadRecord, templateSlug?: string): TemplateContext {
  const company = sanitizeCompany(lead.company);
  return {
    firstName: sanitizeFirstName(lead.name, company),
    company,
    whyNow: '',
    ...coldCopy(lead.verticals, templateSlug),
    yourName: YOUR_NAME,
    siteUrl: SITE_ORIGIN,
  };
}

function mergePlaceholders(template: string, ctx: TemplateContext): string {
  return template
    .replace(/\{\{\s*firstName\s*\}\}/g, ctx.firstName)
    .replace(/\{\{\s*company\s*\}\}/g, ctx.company)
    .replace(/\{\{\s*whyNow\s*\}\}/g, ctx.whyNow)
    .replace(/\{\{\s*valueHook\s*\}\}/g, ctx.valueHook)
    .replace(/\{\{\s*buildIdeas\s*\}\}/g, ctx.buildIdeas)
    .replace(/\{\{\s*yourName\s*\}\}/g, ctx.yourName)
    .replace(/\{\{\s*siteUrl\s*\}\}/g, ctx.siteUrl);
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

  const ctx = buildTemplateContext(lead, input.template?.slug);
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
