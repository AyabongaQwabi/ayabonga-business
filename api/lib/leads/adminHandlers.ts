import { Resend } from 'resend';
import type { VercelRequest } from '@vercel/node';
import {
  createAdminToken,
  verifyAdminPassword,
  verifyAdminToken,
  bearerFromHeaders,
} from './auth';
import {
  getLead,
  getTemplate,
  listLeads,
  listTemplates,
  saveLead,
  saveTemplate,
} from './blobStore';
import { applyTemplate } from './mergeTemplate';
import type { EmailTemplate, LeadRecord, LeadStatus } from './types';
import { defaultEmailTemplates } from './defaultTemplates';

const FROM =
  process.env.RESEND_FROM_EMAIL || 'Ayabonga Qwabi <onboarding@qwabi.co.za>';

const STATUSES = new Set<LeadStatus>([
  'new',
  'qualified',
  'contacted',
  'replied',
  'won',
  'lost',
]);

function isDevLogEnv(): boolean {
  return (
    process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview'
  );
}

function unauthorized(): { status: number; body: Record<string, unknown> } {
  return { status: 401, body: { error: 'Unauthorized' } };
}

function requireAdmin(
  req: VercelRequest,
): { status: number; body: Record<string, unknown> } | null {
  const session = verifyAdminToken(bearerFromHeaders(req.headers));
  if (!session) return unauthorized();
  return null;
}

export async function handleAdminLogin(
  body: Record<string, unknown> | null,
): Promise<{ status: number; body: Record<string, unknown> }> {
  const password = String(body?.password ?? '');
  if (!verifyAdminPassword(password)) {
    return { status: 401, body: { error: 'Invalid password' } };
  }
  if (!process.env.ADMIN_TOKEN_SECRET?.trim()) {
    return {
      status: 503,
      body: { error: 'ADMIN_TOKEN_SECRET is not configured' },
    };
  }
  const token = createAdminToken();
  if (!token) {
    return { status: 503, body: { error: 'Could not create session' } };
  }
  return { status: 200, body: token };
}

export async function handleAdminRoute(
  req: VercelRequest,
  segments: string[],
  body: Record<string, unknown> | null,
): Promise<{ status: number; body: Record<string, unknown> }> {
  const [a, b, c] = segments;

  if (a === 'login' && req.method === 'POST') {
    return handleAdminLogin(body);
  }

  const authErr = requireAdmin(req);
  if (authErr) return authErr;

  if (a === 'leads' && !b && req.method === 'GET') {
    const kind = req.query.kind as LeadRecord['kind'] | undefined;
    const status = req.query.status as LeadStatus | undefined;
    const q = typeof req.query.q === 'string' ? req.query.q : undefined;
    const entries = await listLeads({ kind, status, q });
    return { status: 200, body: { entries } };
  }

  if (a === 'leads' && b && c === 'send' && req.method === 'POST') {
    return handleSendLeadEmail(b, body);
  }

  if (a === 'leads' && b && !c && req.method === 'GET') {
    const lead = await getLead(b);
    if (!lead) return { status: 404, body: { error: 'Lead not found' } };
    return { status: 200, body: { lead } };
  }

  if (a === 'leads' && b && !c && req.method === 'PATCH') {
    return handlePatchLead(b, body);
  }

  if (a === 'templates' && !b && req.method === 'GET') {
    let templates = await listTemplates();
    if (templates.length === 0) {
      for (const t of defaultEmailTemplates) {
        await saveTemplate(t);
      }
      templates = await listTemplates();
    }
    return { status: 200, body: { templates } };
  }

  if (a === 'templates' && b && req.method === 'PUT') {
    return handlePutTemplate(b, body);
  }

  return { status: 404, body: { error: 'Not found' } };
}

async function handlePatchLead(
  id: string,
  body: Record<string, unknown> | null,
): Promise<{ status: number; body: Record<string, unknown> }> {
  const lead = await getLead(id);
  if (!lead) return { status: 404, body: { error: 'Lead not found' } };

  if (body?.status && STATUSES.has(body.status as LeadStatus)) {
    lead.status = body.status as LeadStatus;
  }
  if (typeof body?.notes === 'string') lead.notes = body.notes;
  if (typeof body?.email === 'string') lead.email = body.email.trim().toLowerCase();
  if (typeof body?.name === 'string') lead.name = body.name.trim();
  if (body?.outreachDraft && typeof body.outreachDraft === 'object') {
    lead.outreachDraft = body.outreachDraft as LeadRecord['outreachDraft'];
  }

  await saveLead(lead);
  return { status: 200, body: { lead } };
}

async function handlePutTemplate(
  slug: string,
  body: Record<string, unknown> | null,
): Promise<{ status: number; body: Record<string, unknown> }> {
  if (!body?.subject || !body?.text || !body?.name) {
    return { status: 400, body: { error: 'name, subject, and text are required' } };
  }

  const template: EmailTemplate = {
    slug,
    name: String(body.name),
    subject: String(body.subject),
    text: String(body.text),
    html: body.html ? String(body.html) : undefined,
    category: (body.category as EmailTemplate['category']) || 'direct',
    placeholders: Array.isArray(body.placeholders)
      ? (body.placeholders as string[])
      : ['firstName', 'company', 'whyNow', 'yourName', 'siteUrl'],
    updatedAt: new Date().toISOString(),
  };

  await saveTemplate(template);
  return { status: 200, body: { template } };
}

async function handleSendLeadEmail(
  id: string,
  body: Record<string, unknown> | null,
): Promise<{ status: number; body: Record<string, unknown> }> {
  const lead = await getLead(id);
  if (!lead) return { status: 404, body: { error: 'Lead not found' } };

  if (!lead.email) {
    return { status: 400, body: { error: 'Lead has no email address' } };
  }
  if (lead.status === 'lost') {
    return { status: 400, body: { error: 'Lead is marked lost' } };
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (!resendKey) {
    return { status: 503, body: { error: 'RESEND_API_KEY is not configured' } };
  }

  let subject: string;
  let text: string;
  let html: string | undefined;

  if (body?.subject && body?.text) {
    subject = String(body.subject);
    text = String(body.text);
    html = body.html ? String(body.html) : undefined;
  } else if (body?.templateSlug) {
    const template = await getTemplate(String(body.templateSlug));
    if (!template) {
      return { status: 404, body: { error: 'Template not found' } };
    }
    const merged = applyTemplate(template, lead);
    subject = merged.subject;
    text = merged.text;
    html = merged.html;
  } else if (lead.outreachDraft?.subject && lead.outreachDraft?.text) {
    subject = lead.outreachDraft.subject;
    text = lead.outreachDraft.text;
    html = lead.outreachDraft.html;
  } else {
    return {
      status: 400,
      body: { error: 'Provide templateSlug or subject+text' },
    };
  }

  const resend = new Resend(resendKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to: [lead.email],
    subject,
    text,
    html,
  });

  if (error) {
    if (isDevLogEnv()) {
      console.log('[admin/send] Resend error', error);
    }
    return { status: 400, body: { error: error.message || 'Send failed' } };
  }

  lead.outreachDraft = {
    subject,
    text,
    html,
    templateSlug: body?.templateSlug ? String(body.templateSlug) : undefined,
    lastSentAt: new Date().toISOString(),
  };
  if (lead.status === 'new') lead.status = 'contacted';
  await saveLead(lead);

  return { status: 200, body: { ok: true, lead } };
}
