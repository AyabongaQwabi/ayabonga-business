/** Daily outreach volume and feature flags (env-backed). */

export const OUTREACH_DAILY_MIN = Math.max(
  1,
  Number.parseInt(process.env.OUTREACH_DAILY_MIN || '12', 10) || 12,
);

export const OUTREACH_DAILY_MAX = Math.max(
  OUTREACH_DAILY_MIN,
  Number.parseInt(process.env.OUTREACH_DAILY_MAX || '25', 10) || 25,
);

export function isOutreachEnabled(): boolean {
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

export const DISCOVERY_QUERIES = [
  'South Africa startup custom software development founder contact email',
  'Cape Town fintech mobile app development CEO contact',
  'Johannesburg SME business software platform founder',
  'Durban ecommerce startup technical founder email',
  'South Africa AI startup WhatsApp automation founder',
  'Pretoria logistics marketplace software company contact',
  'Eastern Cape business app development company',
  'South Africa proptech startup engineering hiring',
  'SA edtech platform custom software founder contact',
  'South Africa healthtech app development startup CEO',
] as const;
