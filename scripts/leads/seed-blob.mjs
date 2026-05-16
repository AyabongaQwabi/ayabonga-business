#!/usr/bin/env node
/**
 * Upload lead-intelligence seed + default email templates to Vercel Blob.
 * Usage: npm run leads:seed (loads .env.local via dotenv pattern in script)
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { get, put } from '@vercel/blob';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '../..');

function loadEnvLocal() {
  const envPath = resolve(root, '.env.local');
  if (!existsSync(envPath)) return;
  const raw = readFileSync(envPath, 'utf8');
  for (const line of raw.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i === -1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

async function writeJson(pathname, data, blobToken, access) {
  await put(pathname, JSON.stringify(data, null, 2), {
    access,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    token: blobToken,
  });
}

async function readJson(pathname, access) {
  const result = await get(pathname, {
    access,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  if (!result || result.statusCode !== 200 || !result.stream) return null;
  const text = await new Response(result.stream).text();
  return JSON.parse(text);
}

loadEnvLocal();

function getBlobAccess() {
  const raw = process.env.BLOB_ACCESS?.trim().toLowerCase();
  if (raw === 'public' || raw === 'private') return raw;
  return 'private';
}

const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
if (!token) {
  console.error('BLOB_READ_WRITE_TOKEN missing. Add to .env.local');
  process.exit(1);
}

const blobAccess = getBlobAccess();

const targetVersion =
  process.env.LEADS_SEED_VERSION?.trim() || '2026-05-16';

const existing = await readJson('meta/seed-version.json', blobAccess);
if (existing?.version === targetVersion) {
  console.log(`Seed already at version ${targetVersion}. Bump LEADS_SEED_VERSION to re-run.`);
  process.exit(0);
}

const leadsRaw = readFileSync(
  resolve(root, 'src/data/lead-intelligence-seed.json'),
  'utf8',
);
const leads = JSON.parse(leadsRaw);

const now = new Date().toISOString();

const templates = JSON.parse(
  readFileSync(resolve(root, 'src/data/default-email-templates.json'), 'utf8'),
).map((t) => ({ ...t, updatedAt: now }));
const indexEntries = [];

for (const row of leads) {
  const lead = {
    id: row.id,
    kind: 'outbound',
    status: 'new',
    createdAt: now,
    updatedAt: now,
    name: row.name,
    email: row.email || undefined,
    company: row.company,
    role: row.role,
    linkedInUrl: row.linkedInUrl || undefined,
    score: row.score,
    tier: row.tier,
    verticals: row.verticals,
    whyNow: row.whyNow,
    budgetSignal: row.budgetSignal,
    warmPath: row.warmPath,
    suggestedChannel: row.suggestedChannel,
    notes: row.notes,
    connectorType: row.connectorType ?? false,
  };
  await writeJson(`leads/outbound/${lead.id}.json`, lead, token, blobAccess);
  indexEntries.push({
    id: lead.id,
    kind: 'outbound',
    status: 'new',
    name: lead.name,
    email: lead.email || undefined,
    company: lead.company,
    score: lead.score,
    tier: lead.tier,
    updatedAt: now,
  });
  console.log(`Seeded outbound lead: ${lead.id}`);
}

for (const template of templates) {
  await writeJson(`templates/${template.slug}.json`, template, token, blobAccess);
  console.log(`Seeded template: ${template.slug}`);
}

const existingIndex = (await readJson('meta/leads-index.json', blobAccess)) ?? {
  updatedAt: now,
  entries: [],
};
const byId = new Map(existingIndex.entries.map((e) => [e.id, e]));
for (const entry of indexEntries) {
  byId.set(entry.id, entry);
}
await writeJson(
  'meta/leads-index.json',
  {
    updatedAt: now,
    entries: [...byId.values()].sort((a, b) =>
      b.updatedAt.localeCompare(a.updatedAt),
    ),
  },
  token,
  blobAccess,
);

await writeJson(
  'meta/seed-version.json',
  {
    version: targetVersion,
    updatedAt: now,
  },
  token,
  blobAccess,
);

console.log(`Done. Seed version ${targetVersion} (${leads.length} leads, ${templates.length} templates).`);
