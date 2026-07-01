import { readJson, writeJson } from './blobStore';

export type DailySendLogEntry = {
  leadId: string;
  email: string;
  templateSlug: string;
  sentAt: string;
};

export type DailySendLog = {
  date: string;
  sent: DailySendLogEntry[];
  discovered: number;
  enriched: number;
  skipped: number;
  errors: string[];
  updatedAt: string;
};

function logPath(dateKey: string): string {
  return `meta/outreach-daily/${dateKey}.json`;
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function getDailySendLog(dateKey = todayKey()): Promise<DailySendLog> {
  const existing = await readJson<DailySendLog>(logPath(dateKey));
  if (existing?.sent) return existing;
  return {
    date: dateKey,
    sent: [],
    discovered: 0,
    enriched: 0,
    skipped: 0,
    errors: [],
    updatedAt: new Date().toISOString(),
  };
}

export async function saveDailySendLog(log: DailySendLog): Promise<void> {
  log.updatedAt = new Date().toISOString();
  await writeJson(logPath(log.date), log);
}

export async function appendDailySend(
  entry: DailySendLogEntry,
  dateKey = todayKey(),
): Promise<DailySendLog> {
  const log = await getDailySendLog(dateKey);
  log.sent.push(entry);
  await saveDailySendLog(log);
  return log;
}
