import data from '../data/local-developers.json';
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_ORIGIN } from './site-config';
import { organizationRef, personRef } from './entity-schema';

export type RegionSlug =
  | 'eastern-cape'
  | 'south-africa'
  | 'gauteng'
  | 'kwazulu-natal';

/** Regions with per-city landing pages in local-developers.json */
export type CityHubRegionSlug = 'eastern-cape' | 'gauteng' | 'kwazulu-natal';

export type RoleSlug =
  | 'software-developer'
  | 'software-engineer'
  | 'web-developer'
  | 'web-designer'
  | 'cloud-architect';

export interface LocalCity {
  slug: string;
  name: string;
  alternateName: string | null;
  region: string;
  localIntro: string;
  nearbyProof: string;
}

export interface LocalRole {
  slug: RoleSlug;
  label: string;
  labelPlural: string;
  shortFocus: string;
  keywords: string[];
}

export interface LocalRegion {
  slug: RegionSlug;
  name: string;
  title: string;
  description: string;
  hubKeywords: string[];
}

const regions = data.regions as Record<RegionSlug, LocalRegion>;
const roles = data.roles as Record<RoleSlug, LocalRole>;
const cities = data.cities as LocalCity[];

const CITY_HUB_REGIONS: CityHubRegionSlug[] = [
  'eastern-cape',
  'gauteng',
  'kwazulu-natal',
];

export function getRegion(slug: string): LocalRegion | undefined {
  return regions[slug as RegionSlug];
}

export function getRole(slug: string): LocalRole | undefined {
  return roles[slug as RoleSlug];
}

export function getCity(slug: string): LocalCity | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getCitiesByRegion(region: string): LocalCity[] {
  return cities.filter((c) => c.region === region);
}

export function getEasternCapeCities(): LocalCity[] {
  return getCitiesByRegion('eastern-cape');
}

export function getAllRoles(): LocalRole[] {
  return Object.values(roles);
}

export function getCityHubRegions(): CityHubRegionSlug[] {
  return [...CITY_HUB_REGIONS];
}

export function regionHubPath(regionSlug: CityHubRegionSlug | RegionSlug): string {
  return `/developers/${regionSlug}`;
}

export function getAllLocalPages(): { region: CityHubRegionSlug; city: string; role: RoleSlug }[] {
  const roleSlugs = Object.keys(roles) as RoleSlug[];
  return CITY_HUB_REGIONS.flatMap((region) =>
    getCitiesByRegion(region).flatMap((city) =>
      roleSlugs.map((role) => ({
        region,
        city: city.slug,
        role,
      })),
    ),
  );
}

export function cityDisplayName(city: LocalCity): string {
  if (city.alternateName) {
    return `${city.name} (${city.alternateName})`;
  }
  return city.name;
}

function regionNameForCity(city: LocalCity): string {
  return getRegion(city.region)?.name ?? city.region;
}

export function buildLocalPageTitle(role: LocalRole, city: LocalCity): string {
  const regionName = regionNameForCity(city);
  return `${role.label} in ${city.name}, ${regionName}`;
}

export function buildLocalPageDescription(role: LocalRole, city: LocalCity): string {
  const alt = city.alternateName ? ` (${city.alternateName})` : '';
  const regionName = regionNameForCity(city);
  return `Hire a senior ${role.label.toLowerCase()} in ${city.name}${alt}, ${regionName}. ${role.shortFocus}. Based in Queenstown, serving ${city.name} and all of SA remotely.`;
}

export function buildLocalPageKeywords(role: LocalRole, city: LocalCity): string[] {
  const alt = city.alternateName?.toLowerCase();
  const regionName = regionNameForCity(city).toLowerCase();
  const base = [
    `${role.label.toLowerCase()} ${city.name}`,
    `${role.label.toLowerCase()} ${city.name} ${regionName}`,
    `${role.keywords[0]} ${city.name}`,
    `${role.label.toLowerCase()} ${regionName}`,
    'software developer south africa',
  ];
  if (alt) {
    base.push(`${role.label.toLowerCase()} ${alt}`);
    if (city.slug === 'gqeberha') {
      base.push(`${role.label.toLowerCase()} port elizabeth`);
    }
    if (city.slug === 'makhanda') {
      base.push(`${role.label.toLowerCase()} grahamstown`);
    }
    if (city.slug === 'qonce') {
      base.push(`${role.label.toLowerCase()} king williams town`);
    }
    if (city.slug === 'queenstown') {
      base.push(`${role.label.toLowerCase()} komani`);
    }
    if (city.slug === 'johannesburg') {
      base.push(`${role.label.toLowerCase()} joburg`);
    }
    if (city.slug === 'pretoria') {
      base.push(`${role.label.toLowerCase()} tshwane`);
    }
    if (city.slug === 'durban') {
      base.push(`${role.label.toLowerCase()} ethekwini`);
    }
  }
  return [...new Set([...base, ...role.keywords.map((k) => `${k} ${city.name}`)])];
}

export function buildLocalFaqs(role: LocalRole, city: LocalCity) {
  const place = cityDisplayName(city);
  const regionName = regionNameForCity(city);
  return [
    {
      id: 'on-site',
      question: `Do you work on-site in ${city.name}?`,
      answer: `I am based in Queenstown and work with ${city.name} clients remote-first. For discovery workshops or launch support in ${place}, we can arrange on-site time. Day-to-day delivery is async with visible demos every few days.`,
    },
    {
      id: 'cost',
      question: `How much does a ${role.label.toLowerCase()} cost in ${regionName}?`,
      answer: `Rates depend on scope: MVP, rebuild, or retainer. I scope Phase 1 as a fixed build so you are not stuck in hourly drift. Use the quote tool on this site for a ballpark, or message on WhatsApp with your timeline and budget.`,
    },
    {
      id: 'agency',
      question: `Are you a software agency in ${city.name}?`,
      answer: `No. I am a senior product engineer (one accountable builder), not a room of juniors behind account managers. You get direct access, test-driven code, and local payment expertise (Paystack, Stitch) without agency overhead.`,
    },
    {
      id: 'remote',
      question: `Can you build for ${city.name} while based elsewhere?`,
      answer: `Yes. Most ${regionName} clients work with me remotely. Products are built mobile-first for SA networks, with staging links you can test from ${city.name} on real devices before launch.`,
    },
  ];
}

export function localPagePath(
  citySlug: string,
  roleSlug: string,
  regionSlug: string = 'eastern-cape',
): string {
  return `/developers/${regionSlug}/${citySlug}/${roleSlug}`;
}

export function easternCapeHubPath(): string {
  return regionHubPath('eastern-cape');
}

export function gautengHubPath(): string {
  return regionHubPath('gauteng');
}

export function kznHubPath(): string {
  return regionHubPath('kwazulu-natal');
}

export function southAfricaHubPath(): string {
  return regionHubPath('south-africa');
}

export function buildLocalSchema(role: LocalRole, city: LocalCity, pageUrl: string) {
  const regionName = regionNameForCity(city);
  return {
    '@type': 'ProfessionalService',
    '@id': `${pageUrl}#service`,
    name: `${role.label}, ${city.name}, ${regionName}`,
    description: buildLocalPageDescription(role, city),
    url: pageUrl,
    image: DEFAULT_OG_IMAGE,
    provider: personRef(),
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: regionName,
      },
    },
    serviceType: role.label,
  };
}

export function buildLocalFaqSchema(role: LocalRole, city: LocalCity) {
  const faqs = buildLocalFaqs(role, city);
  const pageUrl = absoluteUrl(localPagePath(city.slug, role.slug, city.region));
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function buildHubSchema(region: LocalRegion, pageUrl: string) {
  const areaServed =
    region.slug === 'south-africa'
      ? { '@type': 'Country' as const, name: 'South Africa' }
      : {
          '@type': 'AdministrativeArea' as const,
          name: region.name,
          containedInPlace: { '@type': 'Country' as const, name: 'South Africa' },
        };
  return {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    name: region.title,
    description: region.description,
    url: pageUrl,
    isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    about: {
      '@type': 'ProfessionalService',
      name: `${SITE_NAME}, ${region.name}`,
      provider: organizationRef(),
      areaServed,
    },
    inLanguage: 'en-ZA',
  };
}
