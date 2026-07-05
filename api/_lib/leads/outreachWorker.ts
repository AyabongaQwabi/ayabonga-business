import {
  getLead,
  listLeads,
  saveLead,
} from './blobStore';
import { getDailySendLog, saveDailySendLog, todayKey } from './dailySendLog';
import { discoverEmailForWebsiteDetailed } from './emailEnrichment';
import { discoverLeadsFromSearch } from './leadDiscovery';
import {
  isOutreachEnabled,
  hasDiscoveryProvider,
  OUTREACH_DAILY_MAX,
  OUTREACH_DAILY_MIN,
} from './outreachConfig';
import { ensureDefaultTemplates, sendOutreachToLead } from './sendOutreach';
import type { LeadRecord } from './types';
import { apiLog, apiLogError } from '../apiLog';

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
  /** Outbound leads in index with a sendable email address. */
  sendableCount?: number;
  /** Outbound leads missing email (cannot send until enriched). */
  missingEmailCount?: number;
};

function wasSentToday(lead: LeadRecord, dateKey: string): boolean {
  const last = lead.outreachDraft?.lastSentAt;
  return Boolean(last && last.startsWith(dateKey));
}

async function enrichLeadsMissingEmail(limit = 40): Promise<number> {
  const entries = (await listLeads({ kind: 'outbound' })).filter((e) => !e.email);
  apiLog('outreach/enrich', 'batch start', { candidates: entries.length, limit });
  let enriched = 0;
  let failed = 0;

  for (const entry of entries.slice(0, limit)) {
    if (entry.email) continue;
    const lead = await getLead(entry.id);
    if (!lead?.sourcePage) {
      apiLog('outreach/enrich', 'skip: no sourcePage', {
        leadId: entry.id,
        company: entry.company,
      });
      continue;
    }
    const detailed = await discoverEmailForWebsiteDetailed(lead.sourcePage);
    if (!detailed.email) {
      failed += 1;
      apiLog('outreach/enrich', 'no email', {
        leadId: lead.id,
        company: lead.company,
        site: lead.sourcePage,
        pagesFetched: detailed.pagesFetched,
        rawCount: detailed.rawCount,
        reason: detailed.rejectedReason,
        allFound: detailed.allEmails,
      });
      continue;
    }
    lead.email = detailed.email;
    lead.alternativeEmails = detailed.allEmails.filter((e) => e !== detailed.email);
    apiLog('outreach/enrich', 'found email', {
      leadId: lead.id,
      company: lead.company,
      site: lead.sourcePage,
      email: detailed.email,
      allFound: detailed.allEmails,
    });
    lead.status = 'qualified';
    lead.updatedAt = new Date().toISOString();
    await saveLead(lead);
    enriched += 1;
  }

  apiLog('outreach/enrich', 'batch done', { enriched, failed, scanned: Math.min(entries.length, limit) });
  return enriched;
}

async function summarizeOutboundPool(sentTodayIds: Set<string>) {
  const candidates = await listLeads({ kind: 'outbound' });
  const withEmail = candidates.filter((e) => Boolean(e.email));
  const withoutEmail = candidates.filter((e) => !e.email);
  const sendable = withEmail.filter(
    (e) =>
      (e.status === 'new' || e.status === 'qualified') && !sentTodayIds.has(e.id),
  );
  const byStatus: Record<string, number> = {};
  for (const e of candidates) {
    byStatus[e.status] = (byStatus[e.status] ?? 0) + 1;
  }
  return {
    total: candidates.length,
    withEmail: withEmail.length,
    withoutEmail: withoutEmail.length,
    sendable: sendable.length,
    byStatus,
    missingEmailSample: withoutEmail.slice(0, 5).map((e) => ({
      id: e.id,
      company: e.company,
      status: e.status,
    })),
    sendableSample: sendable.slice(0, 3).map((e) => ({
      id: e.id,
      company: e.company,
      email: e.email,
      status: e.status,
    })),
  };
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

  apiLog('outreach/worker', 'start', {
    date: dateKey,
    enabled: report.enabled,
    hasDiscovery: hasDiscoveryProvider(),
    targetMin: OUTREACH_DAILY_MIN,
    targetMax: OUTREACH_DAILY_MAX,
    blobAccess: process.env.BLOB_ACCESS ?? '(default public)',
    hasResendKey: Boolean(process.env.RESEND_API_KEY?.trim()),
    hasBlobToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim()),
  });

  if (!report.enabled) {
    report.errors.push('Outreach disabled (set OUTREACH_ENABLED or configure Resend + Blob)');
    apiLog('outreach/worker', 'disabled', { errors: report.errors });
    return report;
  }

  await ensureDefaultTemplates();
  apiLog('outreach/worker', 'templates ready');

  const log = await getDailySendLog(dateKey);
  apiLog('outreach/worker', 'daily log loaded', { alreadySentToday: log.sent.length });

  const sentTodayIds = new Set(log.sent.map((s) => s.leadId));
  const poolBefore = await summarizeOutboundPool(sentTodayIds);
  apiLog('outreach/worker', 'lead pool (before)', poolBefore);

  if (hasDiscoveryProvider()) {
    try {
      apiLog('outreach/worker', 'discovery pass 1');
      const discovery = await discoverLeadsFromSearch(12);
      report.discovered = discovery.created.length;
      report.discoveryQuery = discovery.query;
      log.discovered += discovery.created.length;
      log.enriched += discovery.enriched;
      apiLog('outreach/worker', 'discovery pass 1 done', {
        query: discovery.query,
        created: discovery.created.length,
        enrichedWithEmail: discovery.enriched,
        withoutEmail: discovery.created.length - discovery.enriched,
      });
    } catch (err) {
      const msg = `Discovery failed: ${err instanceof Error ? err.message : String(err)}`;
      report.errors.push(msg);
      apiLogError('outreach/worker', 'discovery pass 1 failed', err);
    }
  } else {
    apiLog('outreach/worker', 'no discovery provider configured');
  }

  report.enrichedExisting = await enrichLeadsMissingEmail(25);
  log.enriched += report.enrichedExisting;
  apiLog('outreach/worker', 'email enrichment', { enriched: report.enrichedExisting });

  async function loadSendableEntries() {
    return (await listLeads({ kind: 'outbound' }))
      .filter((e) => Boolean(e.email))
      .filter((e) => e.status === 'new' || e.status === 'qualified')
      .filter((e) => !sentTodayIds.has(e.id))
      .sort((a, b) => rankLead(b) - rankLead(a));
  }

  let sendableEntries = await loadSendableEntries();
  let poolStats = await summarizeOutboundPool(sentTodayIds);
  report.sendableCount = poolStats.sendable;
  report.missingEmailCount = poolStats.withoutEmail;
  apiLog('outreach/worker', 'lead pool (after enrich)', poolStats);
  apiLog('outreach/worker', 'sendable leads', {
    count: sendableEntries.length,
    sample: poolStats.sendableSample,
  });

  if (sendableEntries.length < OUTREACH_DAILY_MIN && hasDiscoveryProvider()) {
    try {
      apiLog('outreach/worker', 'discovery pass 2 (below min sendable)', {
        sendable: sendableEntries.length,
        min: OUTREACH_DAILY_MIN,
      });
      const extra = await discoverLeadsFromSearch(15);
      report.discovered += extra.created.length;
      log.discovered += extra.created.length;
      log.enriched += extra.enriched;
      const extraEnriched = await enrichLeadsMissingEmail(15);
      report.enrichedExisting += extraEnriched;
      log.enriched += extraEnriched;
      sendableEntries = await loadSendableEntries();
      poolStats = await summarizeOutboundPool(sentTodayIds);
      report.sendableCount = poolStats.sendable;
      report.missingEmailCount = poolStats.withoutEmail;
      apiLog('outreach/worker', 'discovery pass 2 done', {
        sendable: sendableEntries.length,
        discovered: extra.created.length,
        enrichedInPass: extra.enriched,
        pool: poolStats,
      });
    } catch (err) {
      const msg = `Second discovery pass failed: ${err instanceof Error ? err.message : String(err)}`;
      report.errors.push(msg);
      apiLogError('outreach/worker', 'discovery pass 2 failed', err);
    }
  }

  for (const entry of sendableEntries) {
    if (log.sent.length >= OUTREACH_DAILY_MAX) {
      apiLog('outreach/worker', 'daily max reached', { max: OUTREACH_DAILY_MAX });
      break;
    }

    const lead = await getLead(entry.id);
    if (!lead?.email || wasSentToday(lead, dateKey)) {
      report.skipped += 1;
      continue;
    }

    report.attempted += 1;
    apiLog('outreach/send', 'attempt', {
      leadId: lead.id,
      email: lead.email,
      company: lead.company,
    });
    const result = await sendOutreachToLead(lead.id);
    if (!result.ok) {
      report.errors.push(`${lead.id}: ${result.error}`);
      log.errors.push(`${lead.id}: ${result.error}`);
      apiLog('outreach/send', 'failed', { leadId: lead.id, error: result.error });
      continue;
    }

    report.sent += 1;
    apiLog('outreach/send', 'sent', {
      leadId: lead.id,
      email: lead.email,
      templateSlug: result.templateSlug,
      archiveId: result.archiveId,
    });
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
    const pool = await summarizeOutboundPool(sentTodayIds);
    report.sendableCount = pool.sendable;
    report.missingEmailCount = pool.withoutEmail;
    report.errors.push(
      `Only ${log.sent.length} sends today (min ${OUTREACH_DAILY_MIN}). ` +
        `${pool.withoutEmail} outbound leads have no email; ${pool.sendable} are sendable. ` +
        'Discovery ran — scrape sites or seed leads with emails.',
    );
    apiLog('outreach/worker', 'below daily minimum', {
      sent: log.sent.length,
      min: OUTREACH_DAILY_MIN,
      pool,
    });
  }

  await saveDailySendLog(log);
  apiLog('outreach/worker', 'complete', {
    sent: report.sent,
    attempted: report.attempted,
    skipped: report.skipped,
    sendableCount: report.sendableCount,
    missingEmailCount: report.missingEmailCount,
    errors: report.errors.length,
  });
  return report;
}
