import { createHash } from 'node:crypto';
import { createLead, getLeadsIndex } from './blobStore';
import type { OutreachCampaign } from './campaigns';
import { nextDiscoveryQuery } from './discoveryCursor';
import { discoverEmailForWebsiteDetailed } from './emailEnrichment';
import { apiLog } from '../apiLog';
import type { LeadRecord } from './types';

export type SearchResult = {
  title: string;
  link: string;
  snippet: string;
};

export type DiscoveryResult = {
  query: string;
  results: SearchResult[];
};

function companyFromTitle(title: string): string {
  const cleaned = title
    .replace(/\s*[-|–].*$/, '')
    .replace(/\s*\|.*$/, '')
    .trim();
  return cleaned.slice(0, 80) || 'Unknown company';
}

function scoreFromSnippet(snippet: string, title: string, campaign: OutreachCampaign): number {
  let score = campaign === 'cold' ? 50 : 55;
  const blob = `${title} ${snippet}`.toLowerCase();
  const signals = [
    ['software', 8],
    ['app', 6],
    ['web', 5],
    ['platform', 6],
    ['startup', campaign === 'cofounder' ? 7 : 3],
    ['business', campaign === 'cold' ? 6 : 2],
    ['company', campaign === 'cold' ? 5 : 2],
    ['fintech', 7],
    ['ai', 5],
    ['marketplace', 6],
    ['south africa', 8],
    ['cape town', 5],
    ['johannesburg', 5],
    ['founder', campaign === 'cofounder' ? 6 : 2],
    ['ceo', 5],
    ['development', 7],
    ['engineering', 6],
    ['custom', 5],
  ] as const;
  for (const [word, pts] of signals) {
    if (blob.includes(word)) score += pts;
  }
  return Math.min(score, 96);
}

async function searchBrave(query: string): Promise<SearchResult[]> {
  const key =
    process.env.BRAVE_SEARCH_API_KEY?.trim() || process.env.BRAVE_API_KEY?.trim();
  if (!key) return [];

  const url = new URL('https://api.search.brave.com/res/v1/web/search');
  url.searchParams.set('q', query);
  url.searchParams.set('count', '10');
  url.searchParams.set('country', 'ZA');
  url.searchParams.set('search_lang', 'en');

  const res = await fetch(url, {
    headers: { Accept: 'application/json', 'X-Subscription-Token': key },
  });
  if (!res.ok) return [];

  const data = (await res.json()) as {
    web?: { results?: { title?: string; url?: string; description?: string }[] };
  };

  return (data.web?.results ?? [])
    .filter((r) => r.url && r.title)
    .map((r) => ({ title: r.title!, link: r.url!, snippet: r.description ?? '' }));
}

async function searchSerpApi(query: string): Promise<SearchResult[]> {
  const key = process.env.SERPAPI_API_KEY?.trim();
  if (!key) return [];
  const url = new URL('https://serpapi.com/search.json');
  url.searchParams.set('engine', 'google');
  url.searchParams.set('q', query);
  url.searchParams.set('num', '10');
  url.searchParams.set('gl', 'za');
  url.searchParams.set('hl', 'en');
  url.searchParams.set('api_key', key);

  const res = await fetch(url);
  if (!res.ok) return [];
  const data = (await res.json()) as {
    organic_results?: { title?: string; link?: string; snippet?: string }[];
  };
  return (data.organic_results ?? [])
    .filter((r) => r.link && r.title)
    .map((r) => ({ title: r.title!, link: r.link!, snippet: r.snippet ?? '' }));
}

async function searchGoogleCse(query: string): Promise<SearchResult[]> {
  const key = process.env.GOOGLE_CSE_API_KEY?.trim();
  const cx = process.env.GOOGLE_CSE_ID?.trim();
  if (!key || !cx) return [];

  const url = new URL('https://www.googleapis.com/customsearch/v1');
  url.searchParams.set('key', key);
  url.searchParams.set('cx', cx);
  url.searchParams.set('q', query);
  url.searchParams.set('num', '10');
  url.searchParams.set('gl', 'za');

  const res = await fetch(url);
  if (!res.ok) return [];
  const data = (await res.json()) as {
    items?: { title?: string; link?: string; snippet?: string }[];
  };
  return (data.items ?? [])
    .filter((r) => r.link && r.title)
    .map((r) => ({ title: r.title!, link: r.link!, snippet: r.snippet ?? '' }));
}

export async function runWebSearch(query: string): Promise<DiscoveryResult> {
  const providers = [
    { name: 'brave', search: searchBrave },
    { name: 'serpapi', search: searchSerpApi },
    { name: 'google_cse', search: searchGoogleCse },
  ] as const;

  for (const { name, search } of providers) {
    const results = await search(query);
    if (results.length) {
      apiLog('outreach/discovery', 'search provider', { provider: name, query, results: results.length });
      return { query, results };
    }
    apiLog('outreach/discovery', 'search empty', { provider: name, query });
  }
  return { query, results: [] };
}

export async function discoverLeadsFromSearch(options: {
  campaign: OutreachCampaign;
  maxNew?: number;
  query?: string;
}): Promise<{
  created: LeadRecord[];
  skippedNoEmail: number;
  query: string;
}> {
  const maxNew = options.maxNew ?? 15;
  const query = options.query ?? (await nextDiscoveryQuery(options.campaign));
  const { results } = await runWebSearch(query);
  const index = await getLeadsIndex();
  const existingEmails = new Set(
    index.entries.map((e) => (e.email ?? '').toLowerCase()).filter(Boolean),
  );
  const existingUrls = new Set(
    index.entries
      .map((e) => e.sourcePage?.toLowerCase())
      .filter(Boolean) as string[],
  );

  const created: LeadRecord[] = [];
  let skippedNoEmail = 0;

  for (const result of results) {
    if (created.length >= maxNew) break;

    let host = '';
    try {
      host = new URL(result.link).hostname;
    } catch {
      continue;
    }

    if (/linkedin\.com|facebook\.com|twitter\.com|x\.com|instagram\.com|wikipedia\.org|youtube\.com/i.test(host)) {
      continue;
    }

    const linkKey = result.link.toLowerCase();
    if (existingUrls.has(linkKey)) continue;

    const company = companyFromTitle(result.title);
    const enrichment = await discoverEmailForWebsiteDetailed(result.link);
    const email = enrichment.email;

    if (!email) {
      skippedNoEmail += 1;
      apiLog('outreach/discovery', 'skipped (no email, not saved)', {
        campaign: options.campaign,
        company,
        link: result.link,
        reason: enrichment.rejectedReason,
        rawCount: enrichment.rawCount,
      });
      continue;
    }

    const emailKey = email.toLowerCase();
    if (existingEmails.has(emailKey)) continue;

    const altEmails = enrichment.allEmails.filter((e) => e !== email);
    const score = scoreFromSnippet(result.snippet, result.title, options.campaign);
    const lead = await createLead({
      kind: 'outbound',
      campaign: options.campaign,
      status: 'qualified',
      email,
      alternativeEmails: altEmails.length ? altEmails : undefined,
      company,
      score,
      tier: score >= 85 ? 1 : score >= 70 ? 2 : 3,
      verticals: inferVerticals(result.snippet + ' ' + result.title),
      whyNow: result.snippet.slice(0, 280) || `Found via search: ${query}`,
      sourcePage: result.link,
      formType: options.campaign === 'cold' ? 'discovery_cold' : 'discovery_cofounder',
      suggestedChannel: 'email',
      notes: `Auto-discovered ${new Date().toISOString().slice(0, 10)} · ${options.campaign} · ${query}`,
    });

    existingEmails.add(emailKey);
    existingUrls.add(linkKey);
    created.push(lead);
    apiLog('outreach/discovery', 'saved lead', {
      campaign: options.campaign,
      company,
      email,
      allFound: enrichment.allEmails,
    });
  }

  return { created, skippedNoEmail, query };
}

function inferVerticals(text: string): string[] {
  const blob = text.toLowerCase();
  const map: Record<string, string> = {
    fintech: 'fintech',
    payment: 'fintech',
    logistics: 'logistics',
    marketplace: 'marketplace',
    ai: 'ai',
    whatsapp: 'whatsapp',
    health: 'healthtech',
    edu: 'edtech',
    proptech: 'proptech',
    retail: 'ecommerce',
    ecommerce: 'ecommerce',
    mobile: 'mobile',
    web: 'web',
  };
  const out = new Set<string>();
  for (const [needle, tag] of Object.entries(map)) {
    if (blob.includes(needle)) out.add(tag);
  }
  if (!out.size) out.add('software');
  return [...out];
}

export function hostDedupeKey(url: string): string {
  return createHash('sha256').update(url.toLowerCase()).digest('hex').slice(0, 16);
}
