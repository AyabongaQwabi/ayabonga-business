/** Daily outreach volume and feature flags (env-backed). */

import outreachSettings from './outreach-settings.json';

export type OutreachSettings = {
  /** Master switch for cron + worker. Set false to pause outreach. */
  enabled: boolean;
  discoveryTimeBudgetSeconds: number;
  maxJobDurationSeconds: number;
  discoveryMaxRounds: number;
};

const DEFAULT_SETTINGS: OutreachSettings = {
  enabled: true,
  discoveryTimeBudgetSeconds: 200,
  maxJobDurationSeconds: 290,
  discoveryMaxRounds: 15,
};

function clampSeconds(value: unknown, fallback: number, min = 30, max = 600): number {
  const n = typeof value === 'number' ? value : Number.parseInt(String(value ?? ''), 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

/** Loaded from outreach-settings.json — edit that file to tune cron timing. */
export function getOutreachSettings(): OutreachSettings {
  const raw = outreachSettings as Partial<OutreachSettings>;
  return {
    enabled: raw.enabled !== false,
    discoveryTimeBudgetSeconds: clampSeconds(
      raw.discoveryTimeBudgetSeconds,
      DEFAULT_SETTINGS.discoveryTimeBudgetSeconds,
      30,
      280,
    ),
    maxJobDurationSeconds: clampSeconds(
      raw.maxJobDurationSeconds,
      DEFAULT_SETTINGS.maxJobDurationSeconds,
      60,
      300,
    ),
    discoveryMaxRounds: clampSeconds(
      raw.discoveryMaxRounds,
      DEFAULT_SETTINGS.discoveryMaxRounds,
      1,
      50,
    ),
  };
}

export function discoveryTimeBudgetMs(): number {
  return getOutreachSettings().discoveryTimeBudgetSeconds * 1000;
}

export function maxJobDurationMs(): number {
  return getOutreachSettings().maxJobDurationSeconds * 1000;
}

export const OUTREACH_DAILY_MIN = Math.max(
  1,
  Number.parseInt(process.env.OUTREACH_DAILY_MIN || '12', 10) || 12,
);

export const OUTREACH_DAILY_MAX = Math.max(
  OUTREACH_DAILY_MIN,
  Number.parseInt(process.env.OUTREACH_DAILY_MAX || '25', 10) || 25,
);

export function isOutreachEnabled(): boolean {
  if (!getOutreachSettings().enabled) return false;
  const flag = process.env.OUTREACH_ENABLED?.trim().toLowerCase();
  if (flag === 'false' || flag === '0') return false;
  return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

export function braveSearchApiKey(): string | undefined {
  return (
    process.env.BRAVE_SEARCH_API_KEY?.trim() ||
    process.env.BRAVE_API_KEY?.trim()
  );
}

export function hasDiscoveryProvider(): boolean {
  return Boolean(
    braveSearchApiKey() ||
      process.env.SERPAPI_API_KEY?.trim() ||
      (process.env.GOOGLE_CSE_API_KEY?.trim() && process.env.GOOGLE_CSE_ID?.trim()),
  );
}
