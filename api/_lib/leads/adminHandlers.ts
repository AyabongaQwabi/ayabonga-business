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
  syncLeadIndexSendFields,
} from './blobStore';
import { sendOutreachToLead } from './sendOutreach';
import { getSentEmail, listSentEmails } from './sentEmailArchive';
import type { EmailTemplate, LeadRecord, LeadStatus, LeadSortField } from './types';
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
    const page = req.query.page ? Number.parseInt(String(req.query.page), 10) : 1;
    const pageSize = req.query.pageSize
      ? Number.parseInt(String(req.query.pageSize), 10)
      : 25;
    const sort = (typeof req.query.sort === 'string'
      ? req.query.sort
      : 'updated') as LeadSortField;
    const order = req.query.order === 'asc' ? 'asc' : 'desc';

    let result = await listLeads({
      kind,
      status,
      q,
      page,
      pageSize,
      sort,
      order,
    });

    const stale = result.entries
      .filter((e) => e.sendCount === undefined && e.kind === 'outbound')
      .slice(0, 40);
    if (stale.length) {
      await Promise.all(
        stale.map(async (e) => {
          const lead = await getLead(e.id);
          if (lead) await syncLeadIndexSendFields(lead);
        }),
      );
      result = await listLeads({
        kind,
        status,
        q,
        page,
        pageSize,
        sort,
        order,
      });
    }
    return { status: 200, body: result as unknown as Record<string, unknown> };
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
  const draftSubject = body?.subject !== undefined ? String(body.subject) : undefined;
  const draftText = body?.text !== undefined ? String(body.text) : undefined;

  if (!templateSlug && draftSubject === undefined && draftText === undefined) {
    return { status: 400, body: { error: 'Provide a template or draft subject/body' } };
  }

  const result = await sendOutreachToLead(id, {
    templateSlug,
    draftSubject,
    draftText,
  });

  if (!result.ok) {
    return { status: result.status, body: { error: result.error } };
  }

  return {
    status: 200,
    body: {
      ok: true,
      lead: result.lead,
      templateSlug: result.templateSlug,
      archiveId: result.archiveId,
    },
  };
}
