import { readJson, writeJson } from './blobStore';
import type { OutreachCampaign } from './campaigns';

export type DailySendLogEntry = {
  leadId: string;
  email: string;
  templateSlug: string;
  subject: string;
  from: string;
  archiveId?: string;
  sentAt: string;
};

export type DailySendLog = {
  date: string;
  campaign: OutreachCampaign;
  sent: DailySendLogEntry[];
  discovered: number;
  skippedNoEmail: number;
  discoveryRounds: number;
  queriesUsed: string[];
  skipped: number;
  errors: string[];
  updatedAt: string;
};

function logPath(campaign: OutreachCampaign, dateKey: string): string {
  return `meta/outreach-daily/${campaign}/${dateKey}.json`;
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function getDailySendLog(
  campaign: OutreachCampaign,
  dateKey = todayKey(),
): Promise<DailySendLog> {
  const existing = await readJson<DailySendLog>(logPath(campaign, dateKey));
  if (existing?.sent) return existing;
  return {
    date: dateKey,
    campaign,
    sent: [],
    discovered: 0,
    skippedNoEmail: 0,
    discoveryRounds: 0,
    queriesUsed: [],
    skipped: 0,
    errors: [],
    updatedAt: new Date().toISOString(),
  };
}

export async function saveDailySendLog(log: DailySendLog): Promise<void> {
  log.updatedAt = new Date().toISOString();
  await writeJson(logPath(log.campaign, log.date), log);
}
