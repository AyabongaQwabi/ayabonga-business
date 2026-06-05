import { Link, useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calculator, Check, MessageCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { PageBreadcrumbs } from '../components/PageBreadcrumbs';
import { PageHero, HERO_CTA_ROW_CLASS } from '../components/PageHero';
import { PricingTable } from '../components/PricingTable';
import { PageShell } from '../components/layout/PageShell';
import {
  getPricingClusterByPath,
  type PricingClusterPageConfig,
} from '../data/pricing-cluster-pages';
import { RETAINER_TIERS } from '../data/pricing-strategy';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  GET_ESTIMATE_LABEL,
  PRICING_STRATEGY_PAGE,
  QUOTE_PAGE,
  SITE_NAME,
  SITE_ORIGIN,
  TWITTER_HANDLE,
  WHATSAPP_URL,
} from '../lib/site-config';
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildJsonLdGraph,
  buildWebSiteSchema,
} from '../lib/entity-schema';

function ClusterRetainerCards({ page }: { page: PricingClusterPageConfig }) {
  return (
    <div className="grid lg:grid-cols-3 gap-5 lg:gap-6">
      {page.retainerOptions.map((option) => {
        const tier = RETAINER_TIERS.find((t) => t.id === option.tierId);
        if (!tier) return null;
        const featured = Boolean(tier.highlighted);
        return (
          <article
            key={option.tierId}
            className={`relative flex flex-col rounded-2xl border p-5 md:p-6 transition-colors duration-200 motion-reduce:transition-none ${
              featured
                ? 'border-primary/40 bg-primary/5 ring-1 ring-primary/20'
                : 'border-border bg-card hover:border-primary/30'
            }`}
          >
            {featured ? (
              <span className="mb-3 inline-flex self-start rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Most common after launch
              </span>
            ) : null}
            <h3 className="text-lg font-bold text-foreground">{option.displayName}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {tier.tagline} · maps to {tier.name} tier
            </p>
            <p className="mt-4 font-display text-2xl font-bold text-foreground">
              {tier.monthlyFromZar}
              <span className="text-sm font-normal text-muted-foreground"> / month from</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{option.fitNote}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground flex-1">
              {tier.includes.slice(0, 4).map((item) => (
                <li key={item} className="flex gap-2 leading-relaxed">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to={PRICING_STRATEGY_PAGE}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4"
            >
              Full tier breakdown
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </article>
        );
      })}
    </div>
  );
}

function PricingClusterContent({ page }: { page: PricingClusterPageConfig }) {
  const canonical = absoluteUrl(page.path);

  const pageSchema = buildJsonLdGraph([
    buildWebSiteSchema(),
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      name: page.h1,
      description: page.metaDescription,
      url: canonical,
      inLanguage: 'en-ZA',
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    },
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: page.h1, path: page.path },
    ]),
    buildFaqPageSchema(page.faqs),
  ]);

  return (
    <>
      <Helmet>
        <title>{`${page.metaTitle} | ${SITE_NAME}`}</title>
        <meta name="description" content={page.metaDescription} />
        <meta name="keywords" content={page.keywords.join(', ')} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={`${page.metaTitle} | ${SITE_NAME}`} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:locale" content="en_ZA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="twitter:title" content={`${page.metaTitle} | ${SITE_NAME}`} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <PageShell mainClassName="flex-1 max-w-4xl mx-auto w-full px-6 pt-[4.5rem] pb-10 md:pb-14">
        <PageBreadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Services', to: '/services' },
            { label: page.h1 },
          ]}
        />

        <PageHero
          className="pt-4 mb-12 md:mb-14"
          eyebrow={page.eyebrow}
          title={page.h1}
          subtitle={page.heroSubhead}
        >
          <div className={HERO_CTA_ROW_CLASS}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#128C7E] transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <MessageCircle className="w-5 h-5" aria-hidden />
              Discuss budget on WhatsApp
            </a>
            <Link
              to={QUOTE_PAGE}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-card border border-border rounded-xl font-semibold hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Calculator className="w-5 h-5 text-primary" aria-hidden />
              {GET_ESTIMATE_LABEL}
            </Link>
          </div>
        </PageHero>

        <p className="text-muted-foreground leading-relaxed mb-12 -mt-4">{page.introParagraph}</p>

        <section
          className="pb-14 border-t border-surface-border pt-12"
          aria-labelledby="cost-drivers-heading"
        >
          <h2 id="cost-drivers-heading" className="text-2xl font-bold text-foreground mb-3">
            What moves the price
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-3xl leading-relaxed">
            Use these drivers when you compare quotes. Two proposals with the same page count can
            differ sharply once integrations, roles, and post-launch load are included.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {page.costDrivers.map((driver) => (
              <div
                key={driver.title}
                className="p-5 rounded-2xl border border-surface-border bg-surface-raised hover:border-primary/25 transition-colors duration-200 motion-reduce:transition-none"
              >
                <h3 className="font-semibold text-foreground mb-2">{driver.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{driver.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="pb-14 border-t border-surface-border pt-12"
          aria-labelledby="project-types-heading"
        >
          <h2 id="project-types-heading" className="text-2xl font-bold text-foreground mb-3">
            {page.projectTypesHeading}
          </h2>
          {page.projectTypesIntro ? (
            <p className="text-sm text-muted-foreground mb-6 max-w-3xl leading-relaxed">
              {page.projectTypesIntro}
            </p>
          ) : null}
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th scope="col" className="text-left px-4 py-3 font-semibold text-foreground">
                    Project type
                  </th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold text-foreground">
                    Typical range (ZAR)
                  </th>
                  <th
                    scope="col"
                    className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell"
                  >
                    Timeline
                  </th>
                </tr>
              </thead>
              <tbody>
                {page.projectTypes.map((project, index) => (
                  <tr
                    key={project.name}
                    className={index % 2 === 0 ? 'bg-card' : 'bg-muted/20'}
                  >
                    <td className="px-4 py-3 align-top">
                      <p className="font-medium text-foreground">{project.name}</p>
                      <p className="text-muted-foreground mt-1 leading-relaxed">{project.summary}</p>
                    </td>
                    <td className="px-4 py-3 align-top font-semibold text-primary whitespace-nowrap">
                      {project.rangeZar}
                    </td>
                    <td className="px-4 py-3 align-top text-muted-foreground hidden sm:table-cell whitespace-nowrap">
                      {project.timeline ?? 'Varies'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
            Ranges are planning guides for South African delivery in 2026. Final quotes follow
            discovery. Third-party fees (stores, APIs, messaging) are excluded unless stated in
            scope.
          </p>
        </section>

        {page.pricingTables?.length ? (
          <section
            className="pb-14 space-y-10 border-t border-surface-border pt-12"
            aria-labelledby="detail-tables-heading"
          >
            <h2 id="detail-tables-heading" className="text-2xl font-bold text-foreground">
              Detailed breakdown
            </h2>
            {page.pricingTables.map((table) => (
              <PricingTable key={table.id} table={table} />
            ))}
          </section>
        ) : null}

        <section
          id="retainer-options"
          className="pb-14 border-t border-surface-border pt-12 scroll-mt-24"
          aria-labelledby="retainer-options-heading"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <h2 id="retainer-options-heading" className="text-2xl font-bold text-foreground">
                Retainer options after launch
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed text-sm">
                {page.retainerSectionIntro}
              </p>
            </div>
            <Link
              to={PRICING_STRATEGY_PAGE}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4 shrink-0"
            >
              Monthly retainer philosophy
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
          <ClusterRetainerCards page={page} />
        </section>

        <section className="pb-14 border-t border-surface-border pt-12 max-w-3xl" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold text-foreground mb-6">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {page.faqs.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="p-8 rounded-2xl bg-primary/5 border border-primary/15">
          <h2 className="text-xl font-bold text-foreground mb-2">Compare your scope to these bands</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Send your brief on WhatsApp or run the estimate tool for a ballpark on greenfield builds.
            Retainer fit is agreed after we review your live stack and roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#128C7E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
            >
              <MessageCircle className="w-5 h-5" aria-hidden />
              WhatsApp
            </a>
            <Link
              to={QUOTE_PAGE}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border rounded-xl font-semibold hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {GET_ESTIMATE_LABEL}
            </Link>
            <Link
              to={PRICING_STRATEGY_PAGE}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border rounded-xl font-semibold hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Retainer tiers
            </Link>
          </div>
        </section>

        <section className="mt-12 pb-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Related pages
          </h2>
          <ul className="space-y-2">
            {page.relatedLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-primary hover:underline underline-offset-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </PageShell>
    </>
  );
}

export default function PricingClusterPage() {
  const { pathname } = useLocation();
  const page = getPricingClusterByPath(pathname);

  if (!page) {
    return <Navigate to="/404" replace />;
  }

  return <PricingClusterContent page={page} />;
}
