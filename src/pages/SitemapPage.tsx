import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageShell } from '../components/layout/PageShell';
import { PageBreadcrumbs } from '../components/PageBreadcrumbs';
import { SectionLabel } from '../components/shared/SectionLabel';
import { CASE_STUDIES, CASE_STUDIES_INDEX_PATH } from '../data/case-studies';
import { industryPages, INDUSTRIES_INDEX_PATH } from '../data/industry-pages';
import { insightPages, INSIGHTS_INDEX_PATH } from '../data/insights-pages';
import { buyerIntentPages } from '../data/buyer-intent-pages';
import { partnershipLandingPages } from '../data/partnership-landing-pages';
import { serviceLandingPages } from '../data/service-landing-pages';
import pseoPages from '../data/pseo-pages.json';
import { absoluteUrl, SITE_NAME } from '../lib/site-config';
import { buildBreadcrumbSchema } from '../lib/entity-schema';

const PAGE_TITLE = 'Sitemap';
const PAGE_DESCRIPTION =
  'Every page on the Qwabi Engineering site, organised by section. Services, case studies, industries, insights, pricing, and more.';
const PAGE_PATH = '/sitemap';

// ─── Types ───────────────────────────────────────────────────────────────────

type SitemapLink = {
  label: string;
  path: string;
  external?: boolean;
};

type SitemapChild = {
  id: string;
  label: string;
  heading: string;
  links: SitemapLink[];
};

type SitemapGroup = {
  id: string;
  label: string;
  heading: string;
  links: SitemapLink[];
  children?: SitemapChild[];
};

// ─── Static data ─────────────────────────────────────────────────────────────

const CORE_LINKS: SitemapLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Services overview', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Get an estimate', path: '/get-a-quote' },
  { label: 'MVP scope checklist', path: '/mvp-scope-checklist' },
  { label: 'Technical co-founder', path: '/technical-cofounder' },
  { label: 'Privacy policy', path: '/privacy' },
  { label: 'Editorial standards', path: '/editorial' },
  { label: 'Corrections', path: '/corrections' },
];

const SERVICE_LANDING_LINKS: SitemapLink[] = serviceLandingPages.map((p) => ({
  label: p.h1,
  path: p.path,
}));

const BUYER_INTENT_LINKS: SitemapLink[] = buyerIntentPages.map((p) => ({
  label: p.h1,
  path: p.path,
}));

const PARTNERSHIP_LINKS: SitemapLink[] = partnershipLandingPages.map((p) => ({
  label: p.h1,
  path: p.path,
}));

const PRICING_LINKS: SitemapLink[] = [
  { label: 'Pricing strategy and retainer tiers', path: '/pricing-strategy' },
  { label: 'App development cost guide (2026)', path: '/app-development-cost-south-africa' },
  { label: 'Custom software development pricing', path: '/software-development-pricing' },
  { label: 'SaaS development pricing', path: '/saas-development-pricing' },
  { label: 'AI automation pricing', path: '/ai-automation-pricing' },
  { label: 'Website development pricing', path: '/website-development-pricing' },
];

const CASE_STUDY_LINKS: SitemapLink[] = CASE_STUDIES.map((s) => ({
  label: s.clientName,
  path: `${CASE_STUDIES_INDEX_PATH}/${s.slug}`,
}));

const INDUSTRY_LINKS: SitemapLink[] = industryPages.map((p) => ({
  label: p.name,
  path: p.path,
}));

const INSIGHT_LINKS: SitemapLink[] = insightPages.map((p) => ({
  label: p.h1,
  path: p.path,
}));

const DEVELOPERS_LINKS: SitemapLink[] = [
  { label: 'Developers in South Africa', path: '/developers/south-africa' },
  { label: 'Developers in the Eastern Cape', path: '/developers/eastern-cape' },
  { label: 'Developers in Gauteng', path: '/developers/gauteng' },
  { label: 'Developers in KwaZulu-Natal', path: '/developers/kwazulu-natal' },
  { label: 'Queenstown', path: '/developers/eastern-cape/queenstown/software-developer' },
  { label: 'East London', path: '/developers/eastern-cape/east-london/software-developer' },
  { label: 'Gqeberha (Port Elizabeth)', path: '/developers/eastern-cape/gqeberha/software-developer' },
  { label: 'Mthatha', path: '/developers/eastern-cape/mthatha/software-developer' },
  { label: 'Makhanda (Grahamstown)', path: '/developers/eastern-cape/makhanda/software-developer' },
  { label: 'Butterworth', path: '/developers/eastern-cape/butterworth/software-developer' },
  { label: 'Qonce (King William\'s Town)', path: '/developers/eastern-cape/qonce/software-developer' },
  { label: 'Qonce (web developer)', path: '/developers/eastern-cape/qonce/web-developer' },
  { label: 'Port Alfred (software developer)', path: '/developers/eastern-cape/port-alfred/software-developer' },
  { label: 'Port Alfred (web designer)', path: '/developers/eastern-cape/port-alfred/web-designer' },
  { label: 'Gqeberha (web developer)', path: '/developers/eastern-cape/gqeberha/web-developer' },
  { label: 'Gqeberha (web designer)', path: '/developers/eastern-cape/gqeberha/web-designer' },
  { label: 'Johannesburg', path: '/developers/gauteng/johannesburg/software-developer' },
  { label: 'Sandton', path: '/developers/gauteng/sandton/software-developer' },
  { label: 'Pretoria (Tshwane)', path: '/developers/gauteng/pretoria/software-developer' },
  { label: 'Durban (eThekwini)', path: '/developers/kwazulu-natal/durban/software-developer' },
];

const PROJECTS_LINKS: SitemapLink[] = [
  { label: 'All projects', path: '/projects' },
  { label: 'eSpazza project', path: '/projects/espazza' },
];

const PSEO_SOLUTION_LINKS: SitemapLink[] = pseoPages.map((p) => ({
  label: p.title,
  path: `/solutions/${p.slug}`,
}));

// ─── Grouped structure ───────────────────────────────────────────────────────

const SITEMAP_GROUPS: SitemapGroup[] = [
  {
    id: 'core',
    label: 'Main',
    heading: 'Main pages',
    links: CORE_LINKS,
  },
  {
    id: 'services',
    label: 'Services',
    heading: 'Services',
    links: SERVICE_LANDING_LINKS,
    children: [
      {
        id: 'services-buyer',
        label: 'Buyer guides',
        heading: 'Buyer guides and service pages',
        links: BUYER_INTENT_LINKS,
      },
      {
        id: 'services-partnerships',
        label: 'Partnerships',
        heading: 'Partnership and engagement pages',
        links: PARTNERSHIP_LINKS,
      },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing',
    heading: 'Pricing and cost guides',
    links: PRICING_LINKS,
  },
  {
    id: 'case-studies',
    label: 'Case studies',
    heading: 'Case studies',
    links: [
      { label: 'All case studies', path: CASE_STUDIES_INDEX_PATH },
      ...CASE_STUDY_LINKS,
    ],
  },
  {
    id: 'industries',
    label: 'Industries',
    heading: 'Industry pages',
    links: [
      { label: 'All industries', path: INDUSTRIES_INDEX_PATH },
      ...INDUSTRY_LINKS,
    ],
    children: [
      {
        id: 'industries-pseo',
        label: 'Industry solutions',
        heading: 'Industry solution landing pages',
        links: PSEO_SOLUTION_LINKS,
      },
    ],
  },
  {
    id: 'insights',
    label: 'Insights',
    heading: 'Insights and guides',
    links: [
      { label: 'All insights', path: INSIGHTS_INDEX_PATH },
      ...INSIGHT_LINKS,
    ],
  },
  {
    id: 'blog',
    label: 'Blog',
    heading: 'Blog',
    links: [{ label: 'Blog', path: '/blog' }],
  },
  {
    id: 'projects',
    label: 'Projects',
    heading: 'Projects',
    links: PROJECTS_LINKS,
  },
  {
    id: 'developers',
    label: 'Developers',
    heading: 'Developer location pages',
    links: DEVELOPERS_LINKS,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SitemapAnchor({ link }: { link: SitemapLink }) {
  const cls =
    'text-text-secondary hover:text-accent-gold transition-colors text-sm leading-relaxed';
  if (link.external) {
    return (
      <a href={link.path} target="_blank" rel="noopener noreferrer" className={cls}>
        {link.label}
      </a>
    );
  }
  return (
    <Link to={link.path} className={cls}>
      {link.label}
    </Link>
  );
}

function LinkList({ links }: { links: SitemapLink[] }) {
  return (
    <ul className="list-none p-0 m-0 space-y-2.5">
      {links.map((link) => (
        <li key={link.path} className="flex items-start gap-2.5">
          <span
            className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-surface-border"
            aria-hidden
          />
          <SitemapAnchor link={link} />
        </li>
      ))}
    </ul>
  );
}

function GroupBlock({ group }: { group: SitemapGroup }) {
  return (
    <section
      id={`sitemap-${group.id}`}
      className="scroll-mt-24"
      aria-labelledby={`sitemap-${group.id}-heading`}
    >
      <h2
        id={`sitemap-${group.id}-heading`}
        className="font-display font-bold text-text-primary mb-6"
        style={{
          fontSize: 'var(--type-heading-lg)',
          lineHeight: 'var(--leading-heading)',
        }}
      >
        {group.heading}
      </h2>

      <LinkList links={group.links} />

      {group.children?.map((child) => (
        <div key={child.id} className="mt-8 pl-5 border-l-2 border-surface-border">
          <h3
            className="section-label mb-4"
            id={`sitemap-${child.id}-heading`}
          >
            {child.heading}
          </h3>
          <LinkList links={child.links} />
        </div>
      ))}
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SitemapPage() {
  const canonical = absoluteUrl(PAGE_PATH);

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: PAGE_TITLE, path: PAGE_PATH },
      ]),
      {
        '@type': 'WebPage',
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        url: canonical,
        inLanguage: 'en-ZA',
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{`${PAGE_TITLE} | ${SITE_NAME}`}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <PageShell mainClassName="flex-1 pt-[4.5rem]">
        <div className="container py-12 md:py-16 max-w-4xl">
          <PageBreadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: PAGE_TITLE },
            ]}
          />

          <SectionLabel className="mb-3">Navigation</SectionLabel>
          <h1
            className="font-display font-bold text-text-primary mb-4"
            style={{
              fontSize: 'var(--type-display-md)',
              lineHeight: 'var(--leading-heading)',
              letterSpacing: '-0.02em',
            }}
          >
            Sitemap
          </h1>
          <p
            className="text-text-secondary max-w-xl mb-10 md:mb-12"
            style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
          >
            Every page on this site, grouped by section.
          </p>

          {/* Jump links */}
          <nav aria-label="Jump to section" className="mb-12 md:mb-14">
            <p className="section-label mb-3">Jump to</p>
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
              {SITEMAP_GROUPS.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#sitemap-${group.id}`}
                    className="inline-flex items-center min-h-[36px] px-3 py-1.5 rounded-md border border-surface-border bg-surface-raised text-xs font-technical font-medium text-text-secondary hover:border-accent-gold/40 hover:text-text-primary transition-colors"
                  >
                    {group.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Section groups */}
          <div className="space-y-0">
            {SITEMAP_GROUPS.map((group) => (
              <div
                key={group.id}
                className="border-t border-surface-border pt-10 pb-10 md:pt-12 md:pb-12"
              >
                <GroupBlock group={group} />
              </div>
            ))}
          </div>
        </div>
      </PageShell>
    </>
  );
}
