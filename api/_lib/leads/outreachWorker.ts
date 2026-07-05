import { getLead, listLeads, saveLead } from './blobStore';
import type { OutreachCampaign } from './campaigns';
import { campaignLabel } from './campaigns';
import { getDailySendLog, saveDailySendLog, todayKey } from './dailySendLog';
import { discoverLeadsFromSearch } from './leadDiscovery';
import {
  isOutreachEnabled,
  hasDiscoveryProvider,
  OUTREACH_DAILY_MAX,
  OUTREACH_DAILY_MIN,
  discoveryTimeBudgetMs,
  getOutreachSettings,
  maxJobDurationMs,
} from './outreachConfig';
import { ensureDefaultTemplates, sendOutreachToLead } from './sendOutreach';
import type { LeadRecord } from './types';
import { apiLog, apiLogError } from '../apiLog';

export type OutreachDailyReport = {
  campaign: OutreachCampaign;
  date: string;
  enabled: boolean;
  discoveryQueries: string[];
  discovered: number;
  skippedNoEmail: number;
  skippedCompetitor: number;
  discoveryRounds: number;
  attempted: number;
  sent: number;
  skipped: number;
  errors: string[];
  targetMin: number;
  targetMax: number;
  sendableCount?: number;
  elapsedMs?: number;
  stoppedEarly?: 'discovery_time_budget' | 'job_time_budget' | 'discovery_max_rounds';
};

function elapsedMs(startedAt: number): number {
  return Date.now() - startedAt;
}

function discoveryBudgetExceeded(startedAt: number): boolean {
  return elapsedMs(startedAt) >= discoveryTimeBudgetMs();
}

function jobBudgetExceeded(startedAt: number): boolean {
  return elapsedMs(startedAt) >= maxJobDurationMs();
}

function wasSentToday(lead: LeadRecord, dateKey: string): boolean {
  const last = lead.outreachDraft?.lastSentAt;
  return Boolean(last && last.startsWith(dateKey));
}

function rankLead(entry: { score?: number; tier?: number; updatedAt: string }): number {
  const tierBoost = entry.tier === 1 ? 30 : entry.tier === 2 ? 15 : 0;
  return (entry.score ?? 50) + tierBoost;
}

async function loadSendableEntries(
  campaign: OutreachCampaign,
  sentTodayIds: Set<string>,
) {
  return (await listLeads({ kind: 'outbound', campaign }))
    .filter((e) => Boolean(e.email))
    .filter((e) => e.status === 'new' || e.status === 'qualified')
    .filter((e) => !sentTodayIds.has(e.id))
    .sort((a, b) => rankLead(b) - rankLead(a));
}

async function discoverUntilMinSendable(
  campaign: OutreachCampaign,
  sentTodayIds: Set<string>,
  log: Awaited<ReturnType<typeof getDailySendLog>>,
  report: OutreachDailyReport,
  startedAt: number,
): Promise<void> {
  if (!hasDiscoveryProvider()) {
    report.errors.push('No search API key configured (Brave, SerpAPI, or Google CSE)');
    return;
  }

  const settings = getOutreachSettings();

  while (report.sendableCount! < OUTREACH_DAILY_MIN) {
    if (log.discoveryRounds >= settings.discoveryMaxRounds) {
      report.stoppedEarly = 'discovery_max_rounds';
      report.errors.push(
        `Discovery stopped after ${settings.discoveryMaxRounds} search rounds (${report.sendableCount} sendable, need ${OUTREACH_DAILY_MIN})`,
      );
      break;
    }
    if (discoveryBudgetExceeded(startedAt)) {
      report.stoppedEarly = 'discovery_time_budget';
      report.errors.push(
        `Discovery time budget reached (${settings.discoveryTimeBudgetSeconds}s, ${report.sendableCount} sendable). Sending available leads.`,
      );
      break;
    }

    log.discoveryRounds += 1;
    apiLog('outreach/worker', 'discovery round', {
      campaign,
      round: log.discoveryRounds,
      sendable: report.sendableCount,
      min: OUTREACH_DAILY_MIN,
    });

    try {
      const discovery = await discoverLeadsFromSearch({
        campaign,
        maxNew: 10,
        shouldAbort: () => discoveryBudgetExceeded(startedAt),
      });
      report.discovered += discovery.created.length;
      report.skippedNoEmail += discovery.skippedNoEmail;
      report.skippedCompetitor += discovery.skippedCompetitor;
      log.discovered += discovery.created.length;
      log.skippedNoEmail += discovery.skippedNoEmail;
      log.queriesUsed.push(discovery.query);
      report.discoveryQueries.push(discovery.query);

      apiLog('outreach/worker', 'discovery round done', {
        campaign,
        query: discovery.query,
        saved: discovery.created.length,
        skippedNoEmail: discovery.skippedNoEmail,
        skippedCompetitor: discovery.skippedCompetitor,
      });
    } catch (err) {
      const msg = `Discovery failed: ${err instanceof Error ? err.message : String(err)}`;
      report.errors.push(msg);
      apiLogError('outreach/worker', 'discovery round failed', err, { campaign });
      break;
    }

    const sendable = await loadSendableEntries(campaign, sentTodayIds);
    report.sendableCount = sendable.length;
    if (sendable.length >= OUTREACH_DAILY_MIN) {
      apiLog('outreach/worker', 'min sendable reached', {
        campaign,
        sendable: sendable.length,
        rounds: log.discoveryRounds,
      });
      break;
    }
  }
}

export async function runOutreachWorker(
  campaign: OutreachCampaign,
): Promise<OutreachDailyReport> {
  const startedAt = Date.now();
  const dateKey = todayKey();
  const report: OutreachDailyReport = {
    campaign,
    date: dateKey,
    enabled: isOutreachEnabled(),
    discoveryQueries: [],
    discovered: 0,
    skippedNoEmail: 0,
    skippedCompetitor: 0,
    discoveryRounds: 0,
    attempted: 0,
    sent: 0,
    skipped: 0,
    errors: [],
    targetMin: OUTREACH_DAILY_MIN,
    targetMax: OUTREACH_DAILY_MAX,
    sendableCount: 0,
  };

  apiLog('outreach/worker', 'start', {
    campaign,
    label: campaignLabel(campaign),
    date: dateKey,
    enabled: report.enabled,
    hasDiscovery: hasDiscoveryProvider(),
    targetMin: OUTREACH_DAILY_MIN,
    targetMax: OUTREACH_DAILY_MAX,
    settings: getOutreachSettings(),
  });

  if (!report.enabled) {
    report.errors.push('Outreach disabled (set OUTREACH_ENABLED or configure Resend + Blob)');
    return report;
  }

  await ensureDefaultTemplates();
  const log = await getDailySendLog(campaign, dateKey);
  const sentTodayIds = new Set(log.sent.map((s) => s.leadId));

  let sendableEntries = await loadSendableEntries(campaign, sentTodayIds);
  report.sendableCount = sendableEntries.length;
  apiLog('outreach/worker', 'initial sendable pool', {
    campaign,
    count: sendableEntries.length,
  });

  if (sendableEntries.length < OUTREACH_DAILY_MIN) {
    await discoverUntilMinSendable(campaign, sentTodayIds, log, report, startedAt);
    report.discoveryRounds = log.discoveryRounds;
    sendableEntries = await loadSendableEntries(campaign, sentTodayIds);
    report.sendableCount = sendableEntries.length;
  }

  for (const entry of sendableEntries) {
    if (log.sent.length >= OUTREACH_DAILY_MAX) {
      apiLog('outreach/worker', 'daily max reached', { campaign, max: OUTREACH_DAILY_MAX });
      break;
    }
    if (jobBudgetExceeded(startedAt)) {
      report.stoppedEarly = 'job_time_budget';
      report.errors.push(
        `Job time budget reached (${getOutreachSettings().maxJobDurationSeconds}s). Stopped after ${log.sent.length} sends.`,
      );
      apiLog('outreach/worker', 'job time budget reached', {
        campaign,
        sent: log.sent.length,
        elapsedMs: elapsedMs(startedAt),
      });
      break;
    }

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
      const failed = await getLead(lead.id);
      if (failed) {
        failed.lastSendError = result.error;
        failed.lastSendAttemptAt = new Date().toISOString();
        await saveLead(failed);
      }
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

  if (log.sent.length < OUTREACH_DAILY_MIN && !report.stoppedEarly) {
    report.errors.push(
      `Only ${log.sent.length} sends (min ${OUTREACH_DAILY_MIN}). ` +
        `${report.sendableCount} sendable after ${log.discoveryRounds} search rounds; ` +
        `${report.skippedNoEmail} results skipped (no email on site).`,
    );
  }

  await saveDailySendLog(log);
  report.elapsedMs = elapsedMs(startedAt);
  apiLog('outreach/worker', 'complete', report);
  return report;
}

/** @deprecated use runOutreachWorker('cofounder') */
export async function runDailyOutreachWorker(): Promise<OutreachDailyReport> {
  return runOutreachWorker('cofounder');
}
