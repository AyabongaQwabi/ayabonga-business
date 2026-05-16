import { Resend } from 'resend';
import type { SendQuoteRequestBody } from '../types';
import type { BudgetBand, LeadCaptureRequestBody, LeadRecord } from './types';
import { checkRateLimit, createLead, hasBlobToken } from './blobStore';
import { buildCaptureNotifyEmail } from './notifyEmail';

const NOTIFY_TO = process.env.NOTIFY_EMAIL || 'ayabonga@qwabi.co.za';
const FROM =
  process.env.RESEND_FROM_EMAIL || 'Ayabonga Qwabi <onboarding@qwabi.co.za>';

const BUDGET_BANDS = new Set<BudgetBand>([
  'under_50k',
  '50k_150k',
  '150k_plus',
  'funded_startup',
  'not_sure',
]);

function isDevLogEnv(): boolean {
  return (
    process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview'
  );
}

export function parseCaptureBody(
  raw: Record<string, unknown> | null | undefined,
): LeadCaptureRequestBody | null {
  if (!raw) return null;
  const name = String(raw.name ?? '').trim();
  const email = String(raw.email ?? '').trim().toLowerCase();
  const message = String(raw.message ?? '').trim();
  const sourcePage = String(raw.sourcePage ?? '').trim();
  const formType = String(raw.formType ?? '').trim();
  const budgetBand = raw.budgetBand as BudgetBand;
  const consent = raw.consent === true;

  if (!name || !email || !message || message.length < 20) return null;
  if (!sourcePage || !formType) return null;
  if (!BUDGET_BANDS.has(budgetBand)) return null;
  if (!consent) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;

  return {
    name,
    email,
    company: String(raw.company ?? '').trim() || undefined,
    budgetBand,
    message,
    sourcePage,
    formType,
    consent,
  };
}

export async function persistQuoteLead(
  body: SendQuoteRequestBody,
): Promise<LeadRecord | null> {
  if (!hasBlobToken()) {
    if (isDevLogEnv()) {
      console.log('[leads] Blob not configured, skipping quote persist');
    }
    return null;
  }

  return createLead({
    kind: 'inbound',
    status: 'new',
    name: body.name,
    email: body.email,
    founderStage: body.founderStage,
    message: body.projectDetails,
    sourcePage: '/get-a-quote',
    formType: 'quote_export',
    budgetBand: quoteBudgetBand(body),
    consentAt: new Date().toISOString(),
    quoteSnapshot: body,
  });
}

function quoteBudgetBand(body: SendQuoteRequestBody): BudgetBand {
  const zar = body.quote.totals.adjustedPriceZar;
  if (zar >= 150_000) return '150k_plus';
  if (zar >= 50_000) return '50k_150k';
  return 'under_50k';
}

export async function handleLeadCapture(
  body: LeadCaptureRequestBody | null,
  meta?: { ip?: string },
): Promise<{ status: number; body: Record<string, unknown> }> {
  if (!hasBlobToken()) {
    return {
      status: 503,
      body: {
        error: isDevLogEnv()
          ? 'BLOB_READ_WRITE_TOKEN is missing. Add it to .env.local or Vercel env.'
          : 'Lead storage is not configured',
      },
    };
  }

  if (!body) {
    return {
      status: 400,
      body: {
        error:
          'Name, email, message (20+ chars), budget, consent, and source are required.',
      },
    };
  }

  const dayKey = new Date().toISOString().slice(0, 10);
  const fingerprint = `${meta?.ip ?? 'unknown'}:${body.email}`;
  const allowed = await checkRateLimit(dayKey, fingerprint, 8);
  if (!allowed) {
    return { status: 429, body: { error: 'Too many submissions. Try again tomorrow.' } };
  }

  if (isDevLogEnv()) {
    console.log('[leads/capture] New inbound lead', {
      email: body.email,
      formType: body.formType,
      sourcePage: body.sourcePage,
    });
  }

  const lead = await createLead({
    kind: 'inbound',
    status: 'new',
    name: body.name,
    email: body.email,
    company: body.company,
    message: body.message,
    sourcePage: body.sourcePage,
    formType: body.formType,
    budgetBand: body.budgetBand,
    consentAt: new Date().toISOString(),
  });

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      const notify = buildCaptureNotifyEmail(lead);
      const fromAddress = FROM.match(/<([^>]+)>/)?.[1] || 'onboarding@qwabi.co.za';
      await resend.emails.send({
        from: `Leads <${fromAddress}>`,
        to: [NOTIFY_TO],
        subject: notify.subject,
        text: notify.text,
        replyTo: body.email,
      });
    } catch (err) {
      if (isDevLogEnv()) {
        console.log('[leads/capture] Notify email failed', err);
      }
    }
  }

  return { status: 200, body: { ok: true, id: lead.id } };
}
