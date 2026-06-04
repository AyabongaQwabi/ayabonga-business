/**
 * Shared route list for sitemap.xml and post-build prerendering.
 * Keep sitemap and prerender in sync so discovered URLs are crawlable with real HTML.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const blogDir = path.join(root, 'src/content/blog');
const pseoDataPath = path.join(root, 'src/data/pseo-pages.json');
const comparisonsDataPath = path.join(root, 'src/data/comparisons.json');
const localDevelopersPath = path.join(root, 'src/data/local-developers.json');
const buyerIntentPath = path.join(root, 'src/data/buyer-intent-pages.ts');
const partnershipPath = path.join(root, 'src/data/partnership-landing-pages.ts');
const serviceLandingPath = path.join(root, 'src/data/service-landing-pages.ts');
const pricingClusterPath = path.join(root, 'src/data/pricing-cluster-pages.ts');
const caseStudiesPath = path.join(root, 'src/data/case-studies.ts');
const industryPagesPath = path.join(root, 'src/data/industry-pages.ts');
const insightsPagesPath = path.join(root, 'src/data/insights-pages.ts');

export function getSiteUrl() {
  return (
    process.env.SITE_URL ||
    process.env.VITE_SITE_URL ||
    'https://business.qwabi.co.za'
  ).replace(/\/$/, '');
}

function parseFrontmatterDate(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return undefined;
  const dateLine = m[1].split(/\r?\n/).find((line) => /^date:\s*/i.test(line));
  if (!dateLine) return undefined;
  let v = dateLine.replace(/^date:\s*/i, '').trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1);
  }
  const t = Date.parse(v);
  if (Number.isNaN(t)) return undefined;
  return new Date(t).toISOString().split('T')[0];
}

function parseFrontmatterSlug(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return undefined;
  const line = m[1].split(/\r?\n/).find((l) => /^slug:\s*/i.test(l));
  if (!line) return undefined;
  let v = line.replace(/^slug:\s*/i, '').trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1);
  }
  return v.trim() || undefined;
}

function collectBlogEntries() {
  if (!fs.existsSync(blogDir)) return [];
  const entries = [];
  for (const name of fs.readdirSync(blogDir)) {
    if (!name.endsWith('.md')) continue;
    const fileSlug = name.replace(/\.md$/i, '');
    const raw = fs.readFileSync(path.join(blogDir, name), 'utf8');
    const slug = parseFrontmatterSlug(raw) ?? fileSlug;
    const lastmod = parseFrontmatterDate(raw);
    entries.push({ slug, lastmod });
  }
  return entries.sort((a, b) => a.slug.localeCompare(b.slug));
}

/** Slugs from `export const SOME_ARRAY = [` until the next export. */
function collectSlugsBetweenExports(filePath, arrayExportName, nextExportName) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const start = raw.indexOf(`export const ${arrayExportName}`);
  const end = raw.indexOf(`export const ${nextExportName}`);
  if (start < 0 || end <= start) return [];
  const section = raw.slice(start, end);
  return [...section.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);
}

function collectCaseStudyLinks() {
  try {
    const raw = fs.readFileSync(caseStudiesPath, 'utf8');
    const indexMatch = raw.match(/CASE_STUDIES_INDEX_PATH = '([^']+)'/);
    const indexPath = indexMatch?.[1] ?? '/case-studies';
    const slugs = collectSlugsBetweenExports(
      caseStudiesPath,
      'CASE_STUDIES',
      'CASE_STUDIES_INDEX_PATH',
    );
    return [
      { url: indexPath, changefreq: 'monthly', priority: 0.9 },
      ...slugs.map((slug) => ({
        url: `${indexPath}/${slug}`,
        changefreq: 'monthly',
        priority: 0.86,
      })),
    ];
  } catch {
    console.warn('collect-indexable-routes: could not read case-studies.ts');
    return [];
  }
}

function collectIndustryLinks() {
  try {
    const slugs = collectSlugsBetweenExports(
      industryPagesPath,
      'industryPages',
      'industriesBySlug',
    );
    return [
      { url: '/industries', changefreq: 'monthly', priority: 0.9 },
      ...slugs.map((slug) => ({
        url: `/industries/${slug}`,
        changefreq: 'monthly',
        priority: 0.84,
      })),
    ];
  } catch {
    console.warn('collect-indexable-routes: could not read industry-pages.ts');
    return [];
  }
}

function collectInsightLinks() {
  try {
    const raw = fs.readFileSync(insightsPagesPath, 'utf8');
    const indexMatch = raw.match(/INSIGHTS_INDEX_PATH = '([^']+)'/);
    const indexPath = indexMatch?.[1] ?? '/insights';
    const slugs = collectSlugsBetweenExports(
      insightsPagesPath,
      'insightPages',
      'insightSlugs',
    );
    const dateBySlug = {};
    for (const m of raw.matchAll(
      /slug: '([^']+)'[\s\S]*?datePublished: '([^']+)'/g,
    )) {
      dateBySlug[m[1]] = m[2];
    }
    return [
      { url: indexPath, changefreq: 'weekly', priority: 0.88 },
      ...slugs.map((slug) => ({
        url: `${indexPath}/${slug}`,
        changefreq: 'monthly',
        priority: 0.82,
        ...(dateBySlug[slug] ? { lastmod: dateBySlug[slug] } : {}),
      })),
    ];
  } catch {
    console.warn('collect-indexable-routes: could not read insights-pages.ts');
    return [];
  }
}

function collectPathsFromTs(filePath, pattern = /path:\s*'(\/[^']+)'/g) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return [...raw.matchAll(pattern)].map((m) => m[1]);
  } catch {
    return [];
  }
}

/** All public URLs for sitemap.xml (includes blog; blog redirects at runtime). */
export function collectSitemapLinks() {
  const blogEntries = collectBlogEntries();

  let pseoEntries = [];
  try {
    pseoEntries = JSON.parse(fs.readFileSync(pseoDataPath, 'utf8'));
  } catch {
    console.warn('collect-indexable-routes: could not read pseo-pages.json');
  }

  let comparisonEntries = [];
  try {
    comparisonEntries = JSON.parse(fs.readFileSync(comparisonsDataPath, 'utf8'));
  } catch {
    console.warn('collect-indexable-routes: could not read comparisons.json');
  }

  let localDev = { cities: [], roles: {} };
  try {
    localDev = JSON.parse(fs.readFileSync(localDevelopersPath, 'utf8'));
  } catch {
    console.warn('collect-indexable-routes: could not read local-developers.json');
  }

  const hubRegions = ['eastern-cape', 'gauteng', 'kwazulu-natal'];
  const roleSlugs = Object.keys(localDev.roles || {});
  const cities = localDev.cities || [];
  const localPageLinks = cities.flatMap((city) =>
    roleSlugs.map((role) => ({
      url: `/developers/${city.region}/${city.slug}/${role}`,
      changefreq: 'monthly',
      priority: 0.8,
    })),
  );
  const developerHubLinks = hubRegions.map((region) => ({
    url: `/developers/${region}`,
    changefreq: 'weekly',
    priority: region === 'eastern-cape' ? 0.92 : 0.9,
  }));

  const buyerIntentPaths = collectPathsFromTs(buyerIntentPath);
  const partnershipPaths = collectPathsFromTs(partnershipPath);
  const serviceLandingPaths = collectPathsFromTs(serviceLandingPath);
  const pricingClusterPaths = [
    ...new Set(
      collectPathsFromTs(pricingClusterPath, /path:\s*'(\/[^']+-pricing)'/g),
    ),
  ];

  return [
    { url: '/', changefreq: 'weekly', priority: 1 },
    { url: '/services', changefreq: 'monthly', priority: 0.9 },
    { url: '/technical-cofounder', changefreq: 'monthly', priority: 0.95 },
    { url: '/pricing-strategy', changefreq: 'monthly', priority: 0.96 },
    { url: '/app-development-cost-south-africa', changefreq: 'monthly', priority: 0.97 },
    ...pricingClusterPaths.map((url) => ({
      url,
      changefreq: 'monthly',
      priority: 0.94,
    })),
    ...developerHubLinks,
    { url: '/developers/south-africa', changefreq: 'weekly', priority: 0.9 },
    ...localPageLinks,
    { url: '/about', changefreq: 'monthly', priority: 0.9 },
    { url: '/privacy', changefreq: 'yearly', priority: 0.3 },
    { url: '/editorial', changefreq: 'yearly', priority: 0.35 },
    { url: '/corrections', changefreq: 'yearly', priority: 0.3 },
    { url: '/sitemap', changefreq: 'monthly', priority: 0.5 },
    { url: '/get-a-quote', changefreq: 'monthly', priority: 0.7 },
    { url: '/mvp-scope-checklist', changefreq: 'monthly', priority: 0.86 },
    ...buyerIntentPaths.map((url) => ({
      url,
      changefreq: 'monthly',
      priority: url.includes('cost') ? 0.95 : 0.9,
    })),
    ...serviceLandingPaths.map((url) => ({
      url,
      changefreq: 'monthly',
      priority: 0.93,
    })),
    ...partnershipPaths.map((url) => ({
      url,
      changefreq: 'monthly',
      priority: url.includes('technical-partnership') ? 0.95 : 0.9,
    })),
    { url: '/projects', changefreq: 'monthly', priority: 0.88 },
    { url: '/projects/espazza', changefreq: 'monthly', priority: 0.75 },
    ...collectCaseStudyLinks(),
    ...collectIndustryLinks(),
    ...collectInsightLinks(),
    ...pseoEntries.map((p) => ({
      url: `/solutions/${p.slug}`,
      changefreq: 'monthly',
      priority: 0.85,
    })),
    ...comparisonEntries.map((c) => ({
      url: `/vs/${c.slug}`,
      changefreq: 'monthly',
      priority: 0.7,
    })),
    { url: '/blog', changefreq: 'weekly', priority: 0.85 },
    ...blogEntries.map(({ slug, lastmod }) => ({
      url: `/blog/${slug}`,
      changefreq: 'weekly',
      priority: 0.84,
      ...(lastmod ? { lastmod } : {}),
    })),
  ];
}

/**
 * Route paths for post-build prerender. Excludes blog (redirects to /) and admin.
 */
export function collectPrerenderRoutes(options = {}) {
  const { excludeBlog = true, excludeAdmin = true } = options;
  const seen = new Set();
  const routes = [];

  for (const link of collectSitemapLinks()) {
    const path = link.url;
    if (excludeAdmin && path.startsWith('/admin')) continue;
    if (excludeBlog && (path === '/blog' || path.startsWith('/blog/'))) continue;
    if (seen.has(path)) continue;
    seen.add(path);
    routes.push(path);
  }

  return routes;
}
