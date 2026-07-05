import { apiLog } from '../apiLog';

const EMAIL_RE =
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;

/** Only block addresses that cannot receive real outreach. */
const HARD_BLOCKED_LOCALS = new Set([
  'noreply',
  'no-reply',
  'donotreply',
  'donot-reply',
  'privacy',
  'legal',
  'unsubscribe',
  'mailer-daemon',
  'postmaster',
  'abuse',
]);

const BLOCKED_DOMAINS = new Set([
  'example.com',
  'sentry.io',
  'wixpress.com',
  'wordpress.com',
  'squarespace.com',
  'google.com',
  'facebook.com',
  'linkedin.com',
  'twitter.com',
  'instagram.com',
  'youtube.com',
]);

export type EmailDiscoveryResult = {
  email: string | null;
  /** All sendable addresses found (info@, contact@, personal, etc.). */
  allEmails: string[];
  pagesFetched: number;
  rawCount: number;
  rejectedReason?: string;
};

/** True for info@, contact@, hello@, sales@, and any other real inbox. */
export function isOutreachSendableEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  const [local, domain] = normalized.split('@');
  if (!local || !domain) return false;
  if (BLOCKED_DOMAINS.has(domain)) return false;
  if (HARD_BLOCKED_LOCALS.has(local)) return false;
  if (local.includes('png') || local.includes('jpg') || local.includes('webp')) return false;
  if (local.length > 64) return false;
  return true;
}

export function extractEmailsFromHtml(html: string): string[] {
  const found = new Set<string>();
  for (const match of html.matchAll(/mailto:([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi)) {
    found.add(match[1].toLowerCase());
  }
  for (const match of html.matchAll(EMAIL_RE)) {
    found.add(match[0].toLowerCase());
  }
  return [...found].filter(isOutreachSendableEmail);
}

/** Pick one primary inbox; all candidates including info@/contact@ are valid. */
export function pickBestEmail(candidates: string[], siteHost?: string): string | null {
  const unique = [...new Set(candidates.map((e) => e.toLowerCase()))].filter(isOutreachSendableEmail);
  if (!unique.length) return null;

  const host = siteHost?.replace(/^www\./, '').toLowerCase();

  const scored = unique
    .map((email) => {
      let score = 0;
      const [local, domain] = email.split('@');
      const domainNorm = domain.replace(/^www\./, '');
      if (host && domainNorm === host) score += 20;
      // Generic inboxes are first-class outreach targets for SMEs.
      if (['info', 'contact', 'hello', 'sales', 'enquiries', 'inquiries', 'office', 'mail', 'email', 'team', 'support', 'admin', 'help', 'general', 'customerservice'].includes(local)) {
        score += 10;
      }
      if (['founder', 'ceo', 'cto', 'director', 'owner'].some((p) => local.includes(p))) {
        score += 6;
      }
      if (local.includes('.') && local.length > 3) score += 3;
      return { email, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored[0]?.email ?? null;
}

export function pickAllSendableEmails(candidates: string[], siteHost?: string): string[] {
  const primary = pickBestEmail(candidates, siteHost);
  const unique = [...new Set(candidates.map((e) => e.toLowerCase()))].filter(isOutreachSendableEmail);
  if (!primary) return unique;
  return [primary, ...unique.filter((e) => e !== primary)];
}

export async function fetchPageText(url: string, timeoutMs = 8000): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'QwabiEngineeringLeadBot/1.0 (+https://business.qwabi.co.za)',
        Accept: 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
    });
    if (!res.ok) return null;
    const text = await res.text();
    return text.slice(0, 250_000);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function discoverEmailForWebsite(siteUrl: string): Promise<string | null> {
  const result = await discoverEmailForWebsiteDetailed(siteUrl);
  return result.email;
}

export async function discoverEmailForWebsiteDetailed(
  siteUrl: string,
): Promise<EmailDiscoveryResult> {
  let host: string | undefined;
  try {
    host = new URL(siteUrl).hostname;
  } catch {
    return { email: null, allEmails: [], pagesFetched: 0, rawCount: 0, rejectedReason: 'invalid_url' };
  }

  const paths = [
    '',
    '/contact',
    '/contact-us',
    '/contactus',
    '/about',
    '/about-us',
    '/team',
    '/get-in-touch',
  ];
  const rawEmails: string[] = [];
  let pagesFetched = 0;

  for (const path of paths) {
    const pageUrl = new URL(path, siteUrl).toString();
    const html = await fetchPageText(pageUrl);
    if (!html) continue;
    pagesFetched += 1;
    rawEmails.push(...extractEmailsFromHtml(html));
    if (rawEmails.length >= 8) break;
  }

  const allEmails = pickAllSendableEmails(rawEmails, host);
  const email = allEmails[0] ?? null;

  return {
    email,
    allEmails,
    pagesFetched,
    rawCount: rawEmails.length,
    rejectedReason:
      !email && rawEmails.length > 0
        ? 'no_suitable_pick'
        : !email && pagesFetched === 0
          ? 'pages_unreachable'
          : !email
            ? 'no_emails_on_site'
            : undefined,
  };
}

export async function discoverEmailForWebsiteLogged(
  siteUrl: string,
  context: { leadId?: string; company?: string },
): Promise<string | null> {
  const result = await discoverEmailForWebsiteDetailed(siteUrl);
  if (result.email) {
    apiLog('outreach/enrich', 'found email', {
      ...context,
      site: siteUrl,
      email: result.email,
      allFound: result.allEmails,
      rawCount: result.rawCount,
      pagesFetched: result.pagesFetched,
    });
  } else {
    apiLog('outreach/enrich', 'no email', {
      ...context,
      site: siteUrl,
      pagesFetched: result.pagesFetched,
      rawCount: result.rawCount,
      reason: result.rejectedReason,
    });
  }
  return result.email;
}
