import { randomUUID } from 'node:crypto';
import { readJson, writeJson } from './blobStore';

export type SentEmailRecord = {
  id: string;
  leadId: string;
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
  templateSlug: string;
  channel: 'email';
  resendMessageId?: string;
  sentAt: string;
};

type SentEmailIndex = {
  updatedAt: string;
  entries: Array<{
    id: string;
    leadId: string;
    to: string;
    subject: string;
    templateSlug: string;
    sentAt: string;
  }>;
};

const INDEX_PATH = 'meta/sent-emails-index.json';
const MAX_INDEX_ENTRIES = 2000;

function recordPath(id: string): string {
  return `sent-emails/${id}.json`;
}

async function getIndex(): Promise<SentEmailIndex> {
  const existing = await readJson<SentEmailIndex>(INDEX_PATH);
  if (existing?.entries) return existing;
  return { updatedAt: new Date().toISOString(), entries: [] };
}

export async function archiveSentEmail(
  partial: Omit<SentEmailRecord, 'id'> & { id?: string },
): Promise<SentEmailRecord> {
  const record: SentEmailRecord = {
    id: partial.id ?? randomUUID(),
    leadId: partial.leadId,
    to: partial.to,
    from: partial.from,
    subject: partial.subject,
    text: partial.text,
    html: partial.html,
    templateSlug: partial.templateSlug,
    channel: 'email',
    resendMessageId: partial.resendMessageId,
    sentAt: partial.sentAt,
  };

  await writeJson(recordPath(record.id), record);

  const index = await getIndex();
  index.entries.unshift({
    id: record.id,
    leadId: record.leadId,
    to: record.to,
    subject: record.subject,
    templateSlug: record.templateSlug,
    sentAt: record.sentAt,
  });
  if (index.entries.length > MAX_INDEX_ENTRIES) {
    index.entries = index.entries.slice(0, MAX_INDEX_ENTRIES);
  }
  index.updatedAt = new Date().toISOString();
  await writeJson(INDEX_PATH, index);

  return record;
}

export async function getSentEmail(id: string): Promise<SentEmailRecord | null> {
  return readJson<SentEmailRecord>(recordPath(id));
}

export async function listSentEmails(limit = 100): Promise<SentEmailIndex['entries']> {
  const index = await getIndex();
  return index.entries.slice(0, limit);
}
