/** Clean scraped discovery fields before they reach email templates. */

const PHONE_RE = /(?:\+27|0)\d{2}[\s-]?\d{3}[\s-]?\d{4}/g;
const POSTCODE_RE = /\b\d{4}\b/g;
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const URL_RE = /https?:\/\/|www\./i;

/** Scraped titles/snippets often carry encoded entities (&#x27; &amp; etc.). */
export function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&#x27;|&#39;|&apos;/gi, "'")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&amp;|&#38;/gi, '&')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

/** Words that show up as scraped "names" but are never a person. */
const NAME_STOPWORDS = new Set([
  'contact', 'contacts', 'info', 'information', 'sales', 'admin', 'office',
  'team', 'home', 'about', 'support', 'enquiries', 'inquiries', 'accounts',
  'hello', 'reception', 'marketing', 'services', 'service', 'group', 'the',
  'and', 'welcome', 'email', 'mail', 'website', 'online', 'best', 'top',
  'south', 'african', 'africa', 'cape', 'company', 'staff', 'management',
  'director', 'directors', 'guest', 'guests', 'hotel', 'hotels', 'star',
]);

function digitRatio(text: string): number {
  const digits = (text.match(/\d/g) ?? []).length;
  return digits / Math.max(text.length, 1);
}

function looksLikeDirectoryListing(text: string): boolean {
  const blob = text.toLowerCase();
  const bulletCount = (text.match(/·/g) ?? []).length;
  const phoneHits = (text.match(PHONE_RE) ?? []).length;
  const msHits = (blob.match(/\bms\b/g) ?? []).length;
  return (
    bulletCount >= 3 ||
    phoneHits >= 2 ||
    msHits >= 2 ||
    (text.length > 100 && digitRatio(text) > 0.15)
  );
}

/** Page titles that are navigation labels or listicles, not company names. */
const PAGE_TITLE_RE =
  /^(contact( us)?|about( us)?|home|welcome|our (team|services|story)|top \d+|best |cheap )/i;
const LISTICLE_RE = /\b(hotels|restaurants|guest houses|lodges|companies|firms|clinics|attorneys) in [A-Z]/;

export function sanitizeCompanyName(raw: string | undefined, sourceUrl?: string): string {
  if (!raw?.trim()) return companyFromHost(sourceUrl) ?? 'your team';
  let name = decodeHtmlEntities(raw)
    .replace(/\s*[-|–].*$/, '')
    .replace(/\s*\|.*$/, '')
    .replace(/\s*·.*$/, '')
    .trim();

  const isJunk =
    !name ||
    looksLikeDirectoryListing(name) ||
    /^\d/.test(name) ||
    PAGE_TITLE_RE.test(name) ||
    LISTICLE_RE.test(name);

  if (isJunk) {
    const fromHost = companyFromHost(sourceUrl);
    if (fromHost) return fromHost;
    return 'your team';
  }

  if (name.length > 60) name = name.slice(0, 60).trim();
  return name;
}

function companyFromHost(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    const base = host.split('.')[0];
    if (!base || base.length < 3) return undefined;
    if (/^(mail|web|info|contact)$/.test(base)) return undefined;
    return base.charAt(0).toUpperCase() + base.slice(1);
  } catch {
    return undefined;
  }
}

/**
 * Only greet by name when it plausibly IS a name.
 * Company-derived first words ("Sa", "Contact", "4") caused "Hi Sa," and
 * "Hi 4," sends. Company words are no longer used as a name source; when
 * nothing survives, return 'there'.
 */
export function sanitizeFirstName(
  name: string | undefined,
  _company?: string | undefined,
): string {
  const first = name ? decodeHtmlEntities(name).trim().split(/\s+/)[0] : '';
  const clean = first.replace(/[^a-zA-Z'-]/g, '');

  const looksLikeName =
    clean.length >= 3 &&
    /[aeiouy]/i.test(clean) &&
    !NAME_STOPWORDS.has(clean.toLowerCase()) &&
    !/^(ms|mr|mrs|dr|prof|adv)$/i.test(clean);

  if (!looksLikeName) return 'there';
  return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
}

/** Search snippets are often address books. Only keep short, readable hooks. */
export function sanitizeWhyNow(raw: string | undefined): string {
  if (!raw?.trim()) return '';
  const text = decodeHtmlEntities(raw).replace(/\s+/g, ' ').trim();
  if (looksLikeDirectoryListing(text)) return '';
  if (text.length > 140) return '';
  if (PHONE_RE.test(text)) return '';
  if (EMAIL_RE.test(text)) return '';
  if (URL_RE.test(text)) return '';
  if ((text.match(POSTCODE_RE) ?? []).length >= 2) return '';
  if (digitRatio(text) > 0.12) return '';
  // Scraper tells and directory-site boilerplate must never reach a prospect.
  if (/found via|outreach discovery|view the|has \d+ employees|&#/i.test(text)) return '';
  // Runs of ALL-CAPS words read as scraped headers (SALES OFFICE, MARKETING OFFICE).
  if (/\b[A-Z]{3,}\s+[A-Z]{3,}\b/.test(text)) return '';
  return text;
}
