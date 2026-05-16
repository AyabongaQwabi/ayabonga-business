const TOKEN_KEY = 'admin_token';

export type LeadStatus =
  | 'new'
  | 'qualified'
  | 'contacted'
  | 'replied'
  | 'won'
  | 'lost';

export type LeadKind = 'inbound' | 'outbound';

export type LeadIndexEntry = {
  id: string;
  kind: LeadKind;
  status: LeadStatus;
  name?: string;
  email?: string;
  company?: string;
  score?: number;
  tier?: 1 | 2 | 3;
  sourcePage?: string;
  formType?: string;
  updatedAt: string;
};

export type LeadRecord = LeadIndexEntry & {
  createdAt: string;
  role?: string;
  linkedInUrl?: string;
  message?: string;
  budgetBand?: string;
  whyNow?: string;
  verticals?: string[];
  budgetSignal?: string;
  warmPath?: string;
  suggestedChannel?: string;
  notes?: string;
  outreachDraft?: {
    subject: string;
    text: string;
    html?: string;
    templateSlug?: string;
    lastSentAt?: string;
  };
  connectorType?: boolean;
};

export type EmailTemplate = {
  slug: string;
  name: string;
  subject: string;
  text: string;
  html?: string;
  category: string;
  placeholders: string[];
  updatedAt: string;
};

export function getAdminToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  sessionStorage.removeItem(TOKEN_KEY);
}

async function adminFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = getAdminToken();
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`/api/admin/${path}`, { ...init, headers });
  const data = (await res.json()) as T & { error?: string };

  if (res.status === 401) {
    clearAdminToken();
    throw new Error('Session expired. Sign in again.');
  }
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export async function adminLogin(password: string): Promise<void> {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  const data = (await res.json()) as {
    token?: string;
    expiresAt?: string;
    error?: string;
  };
  if (!res.ok || !data.token) {
    throw new Error(data.error || 'Invalid password');
  }
  setAdminToken(data.token);
}

export async function fetchLeads(params?: {
  kind?: LeadKind;
  status?: LeadStatus;
  q?: string;
}): Promise<LeadIndexEntry[]> {
  const qs = new URLSearchParams();
  if (params?.kind) qs.set('kind', params.kind);
  if (params?.status) qs.set('status', params.status);
  if (params?.q) qs.set('q', params.q);
  const query = qs.toString();
  const data = await adminFetch<{ entries: LeadIndexEntry[] }>(
    `leads${query ? `?${query}` : ''}`,
  );
  return data.entries;
}

export async function fetchLead(id: string): Promise<LeadRecord> {
  const data = await adminFetch<{ lead: LeadRecord }>(`leads/${id}`);
  return data.lead;
}

export async function patchLead(
  id: string,
  patch: Partial<Pick<LeadRecord, 'status' | 'notes' | 'email' | 'name' | 'outreachDraft'>>,
): Promise<LeadRecord> {
  const data = await adminFetch<{ lead: LeadRecord }>(`leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
  });
  return data.lead;
}

export async function fetchTemplates(): Promise<EmailTemplate[]> {
  const data = await adminFetch<{ templates: EmailTemplate[] }>('templates');
  return data.templates;
}

export async function saveTemplate(template: EmailTemplate): Promise<EmailTemplate> {
  const data = await adminFetch<{ template: EmailTemplate }>(
    `templates/${template.slug}`,
    {
      method: 'PUT',
      body: JSON.stringify(template),
    },
  );
  return data.template;
}

export async function sendLeadEmail(
  id: string,
  payload: { templateSlug?: string; subject?: string; text?: string; html?: string },
): Promise<LeadRecord> {
  const data = await adminFetch<{ lead: LeadRecord }>(`leads/${id}/send`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data.lead;
}
