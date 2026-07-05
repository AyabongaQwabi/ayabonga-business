import {
  getLead,
  listLeads,
  saveLead,
} from './blobStore';
import { getDailySendLog, saveDailySendLog, todayKey } from './dailySendLog';
import { discoverEmailForWebsite } from './emailEnrichment';
import { discoverLeadsFromSearch } from './leadDiscovery';
import {
  isOutreachEnabled,
  hasDiscoveryProvider,
  OUTREACH_DAILY_MAX,
  OUTREACH_DAILY_MIN,
} from './outreachConfig';
import { ensureDefaultTemplates, sendOutreachToLead } from './sendOutreach';
import type { LeadRecord } from './types';

export type OutreachDailyReport = {
  date: string;
  enabled: boolean;
  discoveryQuery?: string;
  discovered: number;
  enrichedExisting: number;
  attempted: number;
  sent: number;
  skipped: number;
  errors: string[];
  targetMin: number;
  targetMax: number;
};

function wasSentToday(lead: LeadRecord, dateKey: string): boolean {
  const last = lead.outreachDraft?.lastSentAt;
  return Boolean(last && last.startsWith(dateKey));
}

async function enrichLeadsMissingEmail(limit = 20): Promise<number> {
  const entries = await listLeads({ kind: 'outbound', status: 'new' });
  let enriched = 0;

  for (const entry of entries.slice(0, limit)) {
    if (entry.email) continue;
    const lead = await getLead(entry.id);
    if (!lead?.sourcePage) continue;
    const email = await discoverEmailForWebsite(lead.sourcePage);
    if (!email) continue;
    lead.email = email;
    lead.status = 'qualified';
    lead.updatedAt = new Date().toISOString();
    await saveLead(lead);
    enriched += 1;
  }

  return enriched;
}

function rankLead(entry: { score?: number; tier?: number; updatedAt: string }): number {
  const tierBoost = entry.tier === 1 ? 30 : entry.tier === 2 ? 15 : 0;
  return (entry.score ?? 50) + tierBoost;
}

export async function runDailyOutreachWorker(): Promise<OutreachDailyReport> {
  const dateKey = todayKey();
  const report: OutreachDailyReport = {
    date: dateKey,
    enabled: isOutreachEnabled(),
    discovered: 0,
    enrichedExisting: 0,
    attempted: 0,
    sent: 0,
    skipped: 0,
    errors: [],
    targetMin: OUTREACH_DAILY_MIN,
    targetMax: OUTREACH_DAILY_MAX,
  };

  if (!report.enabled) {
    report.errors.push('Outreach disabled (set OUTREACH_ENABLED or configure Resend + Blob)');
    return report;
  }

  await ensureDefaultTemplates();
  const log = await getDailySendLog(dateKey);

  if (hasDiscoveryProvider()) {
    try {
      const discovery = await discoverLeadsFromSearch(12);
      report.discovered = discovery.created.length;
      report.discoveryQuery = discovery.query;
      log.discovered += discovery.created.length;
      log.enriched += discovery.enriched;
    } catch (err) {
      report.errors.push(
        `Discovery failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  report.enrichedExisting = await enrichLeadsMissingEmail(25);
  log.enriched += report.enrichedExisting;

  async function loadSendable() {
    const sentTodayIds = new Set(log.sent.map((s) => s.leadId));
    const candidates = await listLeads({ kind: 'outbound' });
    return candidates
      .filter((e) => Boolean(e.email))
      .filter((e) => e.status === 'new' || e.status === 'qualified')
      .filter((e) => !sentTodayIds.has(e.id))
      .sort((a, b) => rankLead(b) - rankLead(a));
  }

  let sendable = await loadSendable();

  if (sendable.length < OUTREACH_DAILY_MIN && hasDiscoveryProvider()) {
    try {
      const extra = await discoverLeadsFromSearch(15);
      report.discovered += extra.created.length;
      log.discovered += extra.created.length;
      log.enriched += extra.enriched;
      const extraEnriched = await enrichLeadsMissingEmail(15);
      report.enrichedExisting += extraEnriched;
      log.enriched += extraEnriched;
      sendable = await loadSendable();
    } catch (err) {
      report.errors.push(
        `Second discovery pass failed: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  for (const entry of sendable) {
    if (log.sent.length >= OUTREACH_DAILY_MAX) break;

    const lead = await getLead(entry.id);
    if (!lead?.email || wasSentToday(lead, dateKey)) {
      report.skipped += 1;
      continue;
    }

    report.attempted += 1;
    const result = await sendOutreachToLead(lead.id);
    if (!result.ok) {
      report.errors.push(`${lead.id}: ${result.error}`);
      log.errors.push(`${lead.id}: ${result.error}`);
      continue;
    }

    report.sent += 1;
    log.sent.push({
      leadId: lead.id,
      email: lead.email!,
      templateSlug: result.templateSlug,
      subject: result.lead.outreachDraft?.subject ?? '',
      from: result.lead.sendHistory?.at(-1)?.from ?? '',
      archiveId: result.archiveId,
      sentAt: new Date().toISOString(),
    });
  }

  if (log.sent.length < OUTREACH_DAILY_MIN) {
    report.errors.push(
      `Only ${log.sent.length} sends today (min ${OUTREACH_DAILY_MIN}). Add discovery API keys or enrich lead emails.`,
    );
  }

  await saveDailySendLog(log);
  return report;
}
