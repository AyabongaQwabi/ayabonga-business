import type { VercelRequest } from '@vercel/node';
import {
  createAdminToken,
  verifyAdminPassword,
  verifyAdminToken,
  bearerFromHeaders,
} from './auth';
import {
  getLead,
  listLeads,
  listTemplates,
  saveLead,
  saveTemplate,
} from './blobStore';
import { sendOutreachToLead } from './sendOutreach';
import { getSentEmail, listSentEmails, archiveSentEmail } from './sentEmailArchive';
import { getResendFromAddress } from '../emailFrom';
import { OUTREACH_CC_EMAIL } from './campaigns';
import type { EmailTemplate, LeadRecord, LeadStatus } from './types';
import { defaultEmailTemplates } from './defaultTemplates';

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
  console.log('[adminLogin] Initiating login attempt...');
  const password = String(body?.password ?? '');
  
  const expectedPassword = process.env.ADMIN_PASSWORD?.trim();
  console.log('[adminLogin] Password checks:', {
    hasPasswordSupplied: !!password,
    passwordSuppliedLength: password.length,
    isAdminPasswordEnvConfigured: !!expectedPassword,
    adminPasswordEnvLength: expectedPassword ? expectedPassword.length : 0,
  });

  if (!verifyAdminPassword(password)) {
    console.warn('[adminLogin] Password verification failed. The provided password did not match or ADMIN_PASSWORD is empty.');
    return { status: 401, body: { error: 'Invalid password' } };
  }

  const tokenSecret = process.env.ADMIN_TOKEN_SECRET?.trim();
  console.log('[adminLogin] Token secret checks:', {
    isAdminTokenSecretEnvConfigured: !!tokenSecret,
    adminTokenSecretEnvLength: tokenSecret ? tokenSecret.length : 0,
  });

  if (!tokenSecret) {
    console.error('[adminLogin] ADMIN_TOKEN_SECRET is not configured or empty.');
    return {
      status: 503,
      body: { error: 'ADMIN_TOKEN_SECRET is not configured' },
    };
  }

  console.log('[adminLogin] Creating admin session token...');
  const token = createAdminToken();
  if (!token) {
    console.error('[adminLogin] Could not create session. Token generator returned null.');
    return { status: 503, body: { error: 'Could not create session' } };
  }

  console.log('[adminLogin] Admin login successful. Session token generated successfully. Expires at:', token.expiresAt);
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

  if (a === 'sent-emails' && !b && req.method === 'GET') {
    const entries = await listSentEmails(200);
    return { status: 200, body: { entries } };
  }

  if (a === 'sent-emails' && b && req.method === 'GET') {
    const record = await getSentEmail(b);
    if (!record) return { status: 404, body: { error: 'Sent email not found' } };
    return { status: 200, body: { record } };
  }

  return { status: 404, body: { error: 'Not found' } };
}

async function handlePatchLead(
  id: string,
  body: Record<string, unknown> | null,
): Promise<{ status: number; body: Record<string, unknown> }> {
  console.log('[adminHandlers] handlePatchLead called', { id, bodyKeys: body ? Object.keys(body) : [] });
  const lead = await getLead(id);
  if (!lead) {
    console.warn('[adminHandlers] handlePatchLead: Lead not found with ID', id);
    return { status: 404, body: { error: 'Lead not found' } };
  }

  console.log('[adminHandlers] handlePatchLead: Current lead state', { id: lead.id, status: lead.status, email: lead.email });

  if (body?.status && STATUSES.has(body.status as LeadStatus)) {
    console.log('[adminHandlers] handlePatchLead: Updating status', { from: lead.status, to: body.status });
    lead.status = body.status as LeadStatus;
  }
  if (typeof body?.notes === 'string') {
    console.log('[adminHandlers] handlePatchLead: Updating notes');
    lead.notes = body.notes;
  }
  if (typeof body?.email === 'string') {
    console.log('[adminHandlers] handlePatchLead: Updating email', { from: lead.email, to: body.email.trim().toLowerCase() });
    lead.email = body.email.trim().toLowerCase();
  }
  if (typeof body?.name === 'string') {
    console.log('[adminHandlers] handlePatchLead: Updating name', { from: lead.name, to: body.name.trim() });
    lead.name = body.name.trim();
  }
  if (body?.outreachDraft && typeof body.outreachDraft === 'object') {
    console.log('[adminHandlers] handlePatchLead: Updating outreach draft');
    lead.outreachDraft = body.outreachDraft as LeadRecord['outreachDraft'];
  }

  await saveLead(lead);
  console.log('[adminHandlers] handlePatchLead: Lead successfully saved', { id: lead.id, status: lead.status });
  return { status: 200, body: { lead } };
}

async function handlePutTemplate(
  slug: string,
  body: Record<string, unknown> | null,
): Promise<{ status: number; body: Record<string, unknown> }> {
  console.log('[adminHandlers] handlePutTemplate called', { slug, bodyKeys: body ? Object.keys(body) : [] });
  if (!body?.subject || !body?.text || !body?.name) {
    console.warn('[adminHandlers] handlePutTemplate validation failed: missing name, subject, or text', {
      hasName: !!body?.name,
      hasSubject: !!body?.subject,
      hasText: !!body?.text,
    });
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

  console.log('[adminHandlers] handlePutTemplate: Saving template', { slug, name: template.name });
  await saveTemplate(template);
  console.log('[adminHandlers] handlePutTemplate: Template successfully saved', { slug });
  return { status: 200, body: { template } };
}

async function handleSendLeadEmail(
  id: string,
  body: Record<string, unknown> | null,
): Promise<{ status: number; body: Record<string, unknown> }> {
  const templateSlug = body?.templateSlug ? String(body.templateSlug) : undefined;

  if (body?.subject && body?.text) {
    const lead = await getLead(id);
    if (!lead) return { status: 404, body: { error: 'Lead not found' } };
    if (!lead.email) return { status: 400, body: { error: 'Lead has no email address' } };

    const { buildBrandedOutreachEmail, outreachPlainFooter } = await import('./outreachEmail');
    const firstName =
      lead.name?.split(' ')[0] || lead.company?.split(' ')[0] || 'there';
    const subject = String(body.subject);
    const text = String(body.text);
    const html =
      body.html ? String(body.html) : buildBrandedOutreachEmail({ firstName, bodyText: text, preheader: subject });

    const resendKey = process.env.RESEND_API_KEY?.trim();
    if (!resendKey) return { status: 503, body: { error: 'RESEND_API_KEY is not configured' } };

    const from = getResendFromAddress();
    const plainText = `${text}${outreachPlainFooter()}`;
    const { Resend } = await import('resend');
    const resend = new Resend(resendKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [lead.email],
      cc: [OUTREACH_CC_EMAIL],
      subject,
      text: plainText,
      html,
    });
    if (error) return { status: 400, body: { error: error.message || 'Send failed' } };

    const sentAt = new Date().toISOString();
    const archived = await archiveSentEmail({
      leadId: lead.id,
      to: lead.email,
      from,
      subject,
      text: plainText,
      html,
      templateSlug: templateSlug ?? 'custom',
      channel: 'email',
      resendMessageId: data?.id,
      sentAt,
    });

    lead.outreachDraft = {
      subject,
      text: plainText,
      html,
      templateSlug,
      lastSentAt: sentAt,
    };
    lead.sendHistory = [
      ...(lead.sendHistory ?? []),
      {
        sentAt,
        templateSlug: templateSlug ?? 'custom',
        email: lead.email,
        channel: 'email',
        subject,
        from,
        archiveId: archived.id,
        resendMessageId: data?.id,
      },
    ];
    if (lead.status === 'new') lead.status = 'contacted';
    await saveLead(lead);
    return { status: 200, body: { ok: true, lead, archiveId: archived.id } };
  }

  const result = await sendOutreachToLead(id, { templateSlug });
  if (!result.ok) return { status: result.status, body: { error: result.error } };
  return { status: 200, body: { ok: true, lead: result.lead, templateSlug: result.templateSlug } };
}
