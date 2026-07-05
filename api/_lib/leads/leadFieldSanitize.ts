/** Clean scraped discovery fields before they reach email templates. */

const PHONE_RE = /(?:\+27|0)\d{2}[\s-]?\d{3}[\s-]?\d{4}/g;
const POSTCODE_RE = /\b\d{4}\b/g;

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

export function sanitizeCompanyName(raw: string | undefined, sourceUrl?: string): string {
  if (!raw?.trim()) return companyFromHost(sourceUrl) ?? 'your team';
  let name = raw
    .replace(/\s*[-|–].*$/, '')
    .replace(/\s*\|.*$/, '')
    .replace(/\s*·.*$/, '')
    .trim();

  if (!name || looksLikeDirectoryListing(name) || /^\d+$/.test(name)) {
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

export function sanitizeFirstName(
  name: string | undefined,
  company: string | undefined,
): string {
  const candidates = [
    name?.split(/\s+/)[0],
    company?.split(/\s+/)[0],
  ].filter(Boolean) as string[];

  for (const c of candidates) {
    const clean = c.replace(/[^a-zA-Z'-]/g, '');
    if (clean.length < 2) continue;
    if (/^\d+$/.test(clean)) continue;
    if (/^(ms|mr|dr|prof)$/i.test(clean)) continue;
    return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
  }
  return 'there';
}

/** Search snippets are often address books. Only keep short, readable hooks. */
export function sanitizeWhyNow(raw: string | undefined): string {
  if (!raw?.trim()) return '';
  const text = raw.replace(/\s+/g, ' ').trim();
  if (looksLikeDirectoryListing(text)) return '';
  if (text.length > 140) return '';
  if (PHONE_RE.test(text)) return '';
  if ((text.match(POSTCODE_RE) ?? []).length >= 2) return '';
  if (digitRatio(text) > 0.12) return '';
  return text;
}
