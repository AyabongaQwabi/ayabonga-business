const EMAIL_RE =
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;

const BLOCKED_LOCALS = new Set([
  'noreply',
  'no-reply',
  'donotreply',
  'support',
  'hello',
  'info',
  'contact',
  'sales',
  'admin',
  'privacy',
  'legal',
  'careers',
  'jobs',
  'newsletter',
  'marketing',
]);

const BLOCKED_DOMAINS = new Set([
  'example.com',
  'sentry.io',
  'wixpress.com',
  'wordpress.com',
  'squarespace.com',
]);

export function extractEmailsFromHtml(html: string): string[] {
  const found = new Set<string>();
  for (const match of html.matchAll(/mailto:([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/gi)) {
    found.add(match[1].toLowerCase());
  }
  for (const match of html.matchAll(EMAIL_RE)) {
    found.add(match[0].toLowerCase());
  }
  return [...found].filter(isLikelyBusinessEmail);
}

function isLikelyBusinessEmail(email: string): boolean {
  const [local, domain] = email.split('@');
  if (!local || !domain) return false;
  if (BLOCKED_DOMAINS.has(domain)) return false;
  if (local.includes('png') || local.includes('jpg')) return false;
  if (BLOCKED_LOCALS.has(local)) return false;
  if (local.length > 48) return false;
  return true;
}

export function pickBestEmail(candidates: string[], siteHost?: string): string | null {
  const scored = candidates
    .filter(isLikelyBusinessEmail)
    .map((email) => {
      let score = 0;
      const [local, domain] = email.split('@');
      if (siteHost && domain && siteHost.replace(/^www\./, '') === domain.replace(/^www\./, '')) {
        score += 10;
      }
      if (local && !BLOCKED_LOCALS.has(local)) score += 3;
      if (['founder', 'ceo', 'cto', 'hello', 'team'].some((p) => local.includes(p))) score += 2;
      return { email, score };
    })
    .sort((a, b) => b.score - a.score);
  return scored[0]?.email ?? null;
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
  let host: string | undefined;
  try {
    host = new URL(siteUrl).hostname;
  } catch {
    return null;
  }

  const paths = ['', '/contact', '/about', '/team'];
  const emails: string[] = [];

  for (const path of paths) {
    const pageUrl = new URL(path, siteUrl).toString();
    const html = await fetchPageText(pageUrl);
    if (!html) continue;
    emails.push(...extractEmailsFromHtml(html));
    if (emails.length >= 3) break;
  }

  return pickBestEmail(emails, host);
}
