import { get, list, put } from '@vercel/blob';
import { randomUUID } from 'node:crypto';
import { getBlobAccess } from './blobAccess';
import type {
  EmailTemplate,
  LeadIndexEntry,
  LeadRecord,
  LeadsIndex,
  LeadSortField,
  LeadsListResult,
} from './types';

const INDEX_PATH = 'meta/leads-index.json';
const SEED_VERSION_PATH = 'meta/seed-version.json';

function isDevLogEnv(): boolean {
  return (
    process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview'
  );
}

function leadBlobPath(kind: LeadRecord['kind'], id: string): string {
  return `leads/${kind}/${id}.json`;
}

function templatePath(slug: string): string {
  return `templates/${slug}.json`;
}

export function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

function blobToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (!token) throw new Error('BLOB_READ_WRITE_TOKEN is not configured');
  return token;
}

export async function readJson<T>(pathname: string): Promise<T | null> {
  if (!hasBlobToken()) return null;
  try {
    const result = await get(pathname, {
      access: getBlobAccess(),
      token: blobToken(),
    });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as T;
  } catch (err) {
    if (isDevLogEnv()) {
      console.log('[blobStore] readJson failed', { pathname, err });
    }
    return null;
  }
}

export async function writeJson<T>(pathname: string, data: T): Promise<void> {
  if (!hasBlobToken()) {
    throw new Error('BLOB_READ_WRITE_TOKEN is not configured');
  }
  await put(pathname, JSON.stringify(data, null, 2), {
    access: getBlobAccess(),
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    token: blobToken(),
  });
}

export async function getLeadsIndex(): Promise<LeadsIndex> {
  const existing = await readJson<LeadsIndex>(INDEX_PATH);
  if (existing?.entries) return existing;
  return { updatedAt: new Date().toISOString(), entries: [] };
}

export async function saveLeadsIndex(index: LeadsIndex): Promise<void> {
  index.updatedAt = new Date().toISOString();
  await writeJson(INDEX_PATH, index);
}

export function toIndexEntry(lead: LeadRecord): LeadIndexEntry {
  const lastHistory = lead.sendHistory?.at(-1);
  return {
    id: lead.id,
    kind: lead.kind,
    campaign: lead.campaign,
    status: lead.status,
    name: lead.name,
    email: lead.email,
    company: lead.company,
    score: lead.score,
    tier: lead.tier,
    sourcePage: lead.sourcePage,
    formType: lead.formType,
    createdAt: lead.createdAt,
    updatedAt: lead.updatedAt,
    lastSentAt: lead.outreachDraft?.lastSentAt ?? lastHistory?.sentAt,
    sendCount: lead.sendHistory?.length ?? 0,
    lastSendError: lead.lastSendError,
    lastSendAttemptAt: lead.lastSendAttemptAt,
  };
}

export async function upsertIndexEntry(lead: LeadRecord): Promise<void> {
  const index = await getLeadsIndex();
  const entry = toIndexEntry(lead);
  const i = index.entries.findIndex((e) => e.id === lead.id);
  if (i >= 0) index.entries[i] = entry;
  else index.entries.unshift(entry);
  await saveLeadsIndex(index);
}

/** Refresh index send metadata without changing lead.updatedAt. */
export async function syncLeadIndexSendFields(lead: LeadRecord): Promise<void> {
  const index = await getLeadsIndex();
  const i = index.entries.findIndex((e) => e.id === lead.id);
  if (i < 0) return;
  const entry = toIndexEntry(lead);
  index.entries[i] = { ...index.entries[i], ...entry, updatedAt: index.entries[i].updatedAt };
  await saveLeadsIndex(index);
}

export async function getLead(id: string): Promise<LeadRecord | null> {
  const inbound = await readJson<LeadRecord>(leadBlobPath('inbound', id));
  if (inbound) return inbound;
  return readJson<LeadRecord>(leadBlobPath('outbound', id));
}

export async function saveLead(lead: LeadRecord): Promise<LeadRecord> {
  lead.updatedAt = new Date().toISOString();
  await writeJson(leadBlobPath(lead.kind, lead.id), lead);
  await upsertIndexEntry(lead);
  if (isDevLogEnv()) {
    console.log('[blobStore] saveLead', { id: lead.id, kind: lead.kind, status: lead.status });
  }
  return lead;
}

export async function createLead(
  partial: Omit<LeadRecord, 'id' | 'createdAt' | 'updatedAt'> & { id?: string },
): Promise<LeadRecord> {
  const now = new Date().toISOString();
  const lead: LeadRecord = {
    id: partial.id ?? randomUUID(),
    createdAt: now,
    updatedAt: now,
    ...partial,
    status: partial.status ?? 'new',
  };
  return saveLead(lead);
}

export async function listLeads(filters?: {
  kind?: LeadRecord['kind'];
  campaign?: LeadRecord['campaign'];
  status?: LeadRecord['status'];
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: LeadSortField;
  order?: 'asc' | 'desc';
}): Promise<LeadsListResult> {
  const paginate = filters?.page !== undefined || filters?.pageSize !== undefined;
  const pageSize = paginate
    ? Math.min(Math.max(filters?.pageSize ?? 25, 1), 100)
    : Number.MAX_SAFE_INTEGER;
  const page = paginate ? Math.max(filters?.page ?? 1, 1) : 1;
  const sort = filters?.sort ?? 'updated';
  const order = filters?.order ?? 'desc';

  const index = await getLeadsIndex();
  let entries = [...index.entries];
  if (filters?.kind) entries = entries.filter((e) => e.kind === filters.kind);
  if (filters?.campaign) entries = entries.filter((e) => e.campaign === filters.campaign);
  if (filters?.status) entries = entries.filter((e) => e.status === filters.status);
  if (filters?.q) {
    const q = filters.q.toLowerCase();
    entries = entries.filter(
      (e) =>
        e.name?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.company?.toLowerCase().includes(q),
    );
  }

  const dateKey = (iso?: string) => (iso ? new Date(iso).getTime() : 0);

  entries.sort((a, b) => {
    let cmp = 0;
    switch (sort) {
      case 'created':
        cmp = dateKey(a.createdAt ?? a.updatedAt) - dateKey(b.createdAt ?? b.updatedAt);
        break;
      case 'lastSent':
        cmp = dateKey(a.lastSentAt) - dateKey(b.lastSentAt);
        break;
      case 'score':
        cmp = (a.score ?? 0) - (b.score ?? 0);
        break;
      case 'updated':
      default:
        cmp = dateKey(a.updatedAt) - dateKey(b.updatedAt);
        break;
    }
    return order === 'asc' ? cmp : -cmp;
  });

  const total = entries.length;
  const start = (page - 1) * pageSize;
  const paged = entries.slice(start, start + pageSize);

  return { entries: paged, total, page, pageSize, sort, order };
}

export async function getSeedVersion(): Promise<string | null> {
  const data = await readJson<{ version: string }>(SEED_VERSION_PATH);
  return data?.version ?? null;
}

export async function setSeedVersion(version: string): Promise<void> {
  await writeJson(SEED_VERSION_PATH, { version, updatedAt: new Date().toISOString() });
}

export async function getTemplate(slug: string): Promise<EmailTemplate | null> {
  return readJson<EmailTemplate>(templatePath(slug));
}

export async function saveTemplate(template: EmailTemplate): Promise<EmailTemplate> {
  template.updatedAt = new Date().toISOString();
  await writeJson(templatePath(template.slug), template);
  return template;
}

export async function listTemplates(): Promise<EmailTemplate[]> {
  if (!hasBlobToken()) return [];
  const { blobs } = await list({
    prefix: 'templates/',
    limit: 100,
    token: blobToken(),
  });
  const templates: EmailTemplate[] = [];
  for (const blob of blobs) {
    if (!blob.pathname.endsWith('.json')) continue;
    const template = await readJson<EmailTemplate>(blob.pathname);
    if (template) templates.push(template);
  }
  templates.sort((a, b) => a.name.localeCompare(b.name));
  return templates;
}

export async function checkRateLimit(
  dayKey: string,
  fingerprint: string,
  maxPerDay: number,
): Promise<boolean> {
  const path = `meta/rate-limit/${dayKey}.json`;
  const data = (await readJson<Record<string, number>>(path)) ?? {};
  const count = data[fingerprint] ?? 0;
  if (count >= maxPerDay) return false;
  data[fingerprint] = count + 1;
  await writeJson(path, data);
  return true;
}
