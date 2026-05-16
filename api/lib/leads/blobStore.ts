import { get, list, put } from '@vercel/blob';
import { getBlobAccess } from './blobAccess';
import type {
  EmailTemplate,
  LeadRecord,
  LeadsIndex,
  LeadIndexEntry,
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
  return {
    id: lead.id,
    kind: lead.kind,
    status: lead.status,
    name: lead.name,
    email: lead.email,
    company: lead.company,
    score: lead.score,
    tier: lead.tier,
    sourcePage: lead.sourcePage,
    formType: lead.formType,
    updatedAt: lead.updatedAt,
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
    id: partial.id ?? crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    status: partial.status ?? 'new',
    ...partial,
  };
  return saveLead(lead);
}

export async function listLeads(filters?: {
  kind?: LeadRecord['kind'];
  status?: LeadRecord['status'];
  q?: string;
}): Promise<LeadIndexEntry[]> {
  const index = await getLeadsIndex();
  let entries = [...index.entries];
  if (filters?.kind) entries = entries.filter((e) => e.kind === filters.kind);
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
  entries.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return entries;
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
