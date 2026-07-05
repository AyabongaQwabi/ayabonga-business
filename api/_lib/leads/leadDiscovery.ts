import { createHash } from 'node:crypto';
import { createLead, getLeadsIndex } from './blobStore';
import { discoverEmailForWebsiteDetailed } from './emailEnrichment';
import { apiLog } from '../apiLog';
import { braveSearchApiKey, DISCOVERY_QUERIES } from './outreachConfig';
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

function dedupeKey(company: string, url: string): string {
  return createHash('sha256')
    .update(`${company.toLowerCase()}|${url.toLowerCase()}`)
    .digest('hex')
    .slice(0, 16);
}

function companyFromTitle(title: string): string {
  const cleaned = title
    .replace(/\s*[-|–].*$/, '')
    .replace(/\s*\|.*$/, '')
    .trim();
  return cleaned.slice(0, 80) || 'Unknown company';
}

function scoreFromSnippet(snippet: string, title: string): number {
  let score = 55;
  const blob = `${title} ${snippet}`.toLowerCase();
  const signals = [
    ['software', 8],
    ['app', 6],
    ['platform', 6],
    ['startup', 7],
    ['fintech', 7],
    ['ai', 5],
    ['marketplace', 6],
    ['south africa', 8],
    ['cape town', 5],
    ['johannesburg', 5],
    ['founder', 6],
    ['ceo', 5],
    ['cto', 5],
    ['development', 7],
    ['engineering', 6],
  ] as const;
  for (const [word, pts] of signals) {
    if (blob.includes(word)) score += pts;
  }
  return Math.min(score, 96);
}

async function searchBrave(query: string): Promise<SearchResult[]> {
  const key = braveSearchApiKey();
  if (!key) return [];

  const url = new URL('https://api.search.brave.com/res/v1/web/search');
  url.searchParams.set('q', query);
  url.searchParams.set('count', '10');
  url.searchParams.set('country', 'ZA');
  url.searchParams.set('search_lang', 'en');

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'X-Subscription-Token': key,
    },
  });
  if (!res.ok) return [];

  const data = (await res.json()) as {
    web?: { results?: { title?: string; url?: string; description?: string }[] };
  };

  return (data.web?.results ?? [])
    .filter((r) => r.url && r.title)
    .map((r) => ({
      title: r.title!,
      link: r.url!,
      snippet: r.description ?? '',
    }));
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
    .map((r) => ({
      title: r.title!,
      link: r.link!,
      snippet: r.snippet ?? '',
    }));
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
    .map((r) => ({
      title: r.title!,
      link: r.link!,
      snippet: r.snippet ?? '',
    }));
}

/** Tries Brave (free tier) first, then SerpAPI, then Google CSE. */
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

export function pickDiscoveryQuery(): string {
  const day = Math.floor(Date.now() / 86_400_000);
  return DISCOVERY_QUERIES[day % DISCOVERY_QUERIES.length];
}

export async function discoverLeadsFromSearch(maxNew = 15): Promise<{
  created: LeadRecord[];
  enriched: number;
  query: string;
}> {
  const query = pickDiscoveryQuery();
  const { results } = await runWebSearch(query);
  const index = await getLeadsIndex();
  const existingKeys = new Set(
    index.entries.map((e) => `${(e.company ?? '').toLowerCase()}|${(e.email ?? '').toLowerCase()}`),
  );

  const created: LeadRecord[] = [];
  let enriched = 0;

  for (const result of results) {
    if (created.length >= maxNew) break;

    let host = '';
    try {
      host = new URL(result.link).hostname;
    } catch {
      continue;
    }

    if (/linkedin\.com|facebook\.com|twitter\.com|x\.com|instagram\.com|wikipedia\.org/i.test(host)) {
      continue;
    }

    const company = companyFromTitle(result.title);
    const key = `${company.toLowerCase()}|`;
    if (existingKeys.has(key)) continue;

    let email: string | null = null;
    const enrichment = await discoverEmailForWebsiteDetailed(result.link);
    email = enrichment.email;
    if (email) enriched += 1;
    else {
      apiLog('outreach/discovery', 'lead without email', {
        company,
        link: result.link,
        reason: enrichment.rejectedReason,
        rawEmails: enrichment.rawCount,
        pagesFetched: enrichment.pagesFetched,
      });
    }

    const score = scoreFromSnippet(result.snippet, result.title);
    const lead = await createLead({
      kind: 'outbound',
      status: email ? 'qualified' : 'new',
      name: undefined,
      email: email ?? undefined,
      company,
      role: undefined,
      score,
      tier: score >= 85 ? 1 : score >= 70 ? 2 : 3,
      verticals: inferVerticals(result.snippet + ' ' + result.title),
      whyNow: result.snippet.slice(0, 280) || `Found via search: ${query}`,
      sourcePage: result.link,
      formType: 'discovery_search',
      suggestedChannel: email ? 'email' : 'linkedin',
      notes: `Auto-discovered ${new Date().toISOString().slice(0, 10)} · query: ${query}`,
    });

    existingKeys.add(`${company.toLowerCase()}|${(email ?? '').toLowerCase()}`);
    created.push(lead);
  }

  return { created, enriched, query };
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
  };
  const out = new Set<string>();
  for (const [needle, tag] of Object.entries(map)) {
    if (blob.includes(needle)) out.add(tag);
  }
  if (!out.size) out.add('software');
  return [...out];
}
