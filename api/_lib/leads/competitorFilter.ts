type DiscoveryHit = {
  title: string;
  link: string;
  snippet: string;
};

/** Hosts that list agencies, not buyers. */
const DIRECTORY_HOST =
  /clutch\.co|goodfirms|designrush|sortlist|g2\.com|capterra|softwaresuggest|techbehemoths|manifest\.co/i;

/** We sell dev services — skip businesses that sell the same. */
const PROVIDER_PHRASES = [
  'software development company',
  'software development agency',
  'software development services',
  'software solutions for business',
  'software solutions for',
  'custom software development',
  'bespoke software development',
  'app development company',
  'app development agency',
  'mobile app development company',
  'web development company',
  'web development agency',
  'web design agency',
  'digital agency',
  'software house',
  'dev shop',
  'development studio',
  'it consulting firm',
  'we build apps',
  'we develop software',
  'our development services',
  'hire our developers',
  'offshore development',
  'software outsourcing',
  'leading software',
  'software company south africa',
  'app development south africa',
] as const;

const OWN_DOMAINS = /qwabi\.co\.za|business\.qwabi/i;

export function isSoftwareProviderResult(result: DiscoveryHit): boolean {
  const blob = `${result.title} ${result.snippet} ${result.link}`.toLowerCase();

  if (OWN_DOMAINS.test(result.link)) return true;
  if (DIRECTORY_HOST.test(result.link)) return true;

  for (const phrase of PROVIDER_PHRASES) {
    if (blob.includes(phrase)) return true;
  }

  // Title patterns like "Leading X Software Solutions"
  if (/\b(software|app|web) (development|solutions|services)\b/i.test(result.title)) {
    if (!/\b(hiring|jobs|careers|vacancy|seeking|need)\b/i.test(blob)) {
      return true;
    }
  }

  return false;
}

export function buyerIndustryFromQuery(query: string): string | undefined {
  const q = query.toLowerCase();
  const map: [string, string][] = [
    ['construction', 'construction'],
    ['pharmacy', 'pharmacy'],
    ['pharmacies', 'pharmacy'],
    ['legal aid', 'legal'],
    ['law firm', 'legal'],
    ['clinic', 'healthcare'],
    ['medical', 'healthcare'],
    ['dental', 'healthcare'],
    ['restaurant', 'hospitality'],
    ['hotel', 'hospitality'],
    ['farm', 'agriculture'],
    ['school', 'education'],
    ['accounting', 'accounting'],
    ['estate agent', 'property'],
    ['property', 'property'],
    ['transport', 'logistics'],
    ['logistics', 'logistics'],
    ['manufacturing', 'manufacturing'],
    ['retail', 'retail'],
    ['ngo', 'nonprofit'],
    ['church', 'nonprofit'],
    ['mining', 'mining'],
  ];
  for (const [needle, tag] of map) {
    if (q.includes(needle)) return tag;
  }
  return undefined;
}
