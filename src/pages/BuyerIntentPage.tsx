import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calculator, MessageCircle } from 'lucide-react';
import { PageBreadcrumbs } from '../components/PageBreadcrumbs';
import { FaqAccordionItem } from '../components/FaqAccordionItem';
import { ScrollReveal } from '../components/ScrollReveal';
import { LeadMagnetCard } from '../components/LeadMagnetCard';
import { PricingTable } from '../components/PricingTable';
import { PageShell } from '../components/layout/PageShell';
import { PageHero } from '../components/PageHero';
import { buyerIntentPagesByPath } from '../data/buyer-intent-pages';
import { heroImageForBuyerIntentPath } from '../lib/hero-images';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  APP_DEVELOPMENT_COST_PAGE,
  QUOTE_PAGE,
  SITE_ORIGIN,
  TWITTER_HANDLE,
  WHATSAPP_URL,
} from '../lib/site-config';
import {
  authorGraphNode,
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildJsonLdGraph,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from '../lib/entity-schema';
import NotFound from './NotFound';

export default function BuyerIntentPage() {
  const { pathname } = useLocation();
  const page = buyerIntentPagesByPath[pathname];

  if (!page) {
    return <NotFound />;
  }

  const canonical = absoluteUrl(page.path);
  const heroSrc = heroImageForBuyerIntentPath(page.path, page.heroImage);
  const heroAlt = page.heroImageAlt ?? `${page.h1} in South Africa`;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: page.h1, path: page.path },
  ]);
  const faqSchema = buildFaqPageSchema(page.faqs);
  const serviceSchema = buildJsonLdGraph([
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    authorGraphNode(),
    {
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: page.h1,
      description: page.metaDescription,
      provider: { '@id': `${SITE_ORIGIN}/#organization` },
      areaServed: {
        '@type': 'Country',
        name: 'South Africa',
      },
      serviceType: page.serviceType,
      url: canonical,
    },
    breadcrumbSchema,
    faqSchema,
  ]);

  return (
    <>
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta name="keywords" content={page.keywords.join(', ')} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:locale" content="en_ZA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <PageShell
        mainClassName={`flex-1 mx-auto w-full px-6 pt-[4.5rem] pb-10 md:pb-14 ${
          page.pricingTables?.length ? 'max-w-4xl' : 'max-w-3xl'
        }`}
      >
                <PageBreadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Services', to: '/services' },
            { label: page.h1 },
          ]}
        />

        <ScrollReveal>
        <PageHero
          className="mb-14"
          eyebrow={page.eyebrow}
          title={page.h1}
          subtitle={page.heroSubhead}
          imageSrc={heroSrc}
          imageAlt={heroAlt}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#128C7E] transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <MessageCircle className="w-5 h-5" aria-hidden />
              Message on WhatsApp
            </a>
            <Link
              to={QUOTE_PAGE}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-card border border-border rounded-xl font-semibold hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Calculator className="w-5 h-5 text-primary" aria-hidden />
              Scope and estimate
            </Link>
          </div>
        </PageHero>
        </ScrollReveal>

        {page.pricingTables?.length ? (
          <section className="mb-16 space-y-10" aria-labelledby="pricing-tables-heading">
            <h2 id="pricing-tables-heading" className="text-2xl font-bold text-foreground">
              Pricing by app type (ZAR, 2026)
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed -mt-6">
              Ballpark ranges for planning. Your quote depends on scope, integrations, and who writes
              production code.{' '}
              <Link to={QUOTE_PAGE} className="text-primary hover:underline underline-offset-4">
                Get a scoped estimate
              </Link>
              .
            </p>
            {page.pricingTables.map((table) => (
              <PricingTable key={table.id} table={table} />
            ))}
          </section>
        ) : null}

        {page.showLeadMagnet ? (
          <div className="mb-16">
            <LeadMagnetCard
              title="Free App Development Cost Guide"
              description="You are already reading it. Bookmark this page or share it with a co-founder comparing quotes."
              ctaLabel="Jump to pricing tables"
              to={`${APP_DEVELOPMENT_COST_PAGE}#pricing-tables-heading`}
            />
          </div>
        ) : null}

        <ScrollReveal>
        <div className="space-y-12">
          {page.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl font-bold text-foreground mb-4">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-muted-foreground leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="space-y-2.5 text-muted-foreground">
                  {section.bullets.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed">
                      <span className="text-primary mt-1.5 shrink-0" aria-hidden>
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <section className="mt-16 pt-12 border-t border-border" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold text-foreground mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {page.faqs.map((faq) => (
              <FaqAccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>
        </ScrollReveal>

        <section className="mt-14 p-8 rounded-2xl bg-primary/5 border border-primary/15">
          <h2 className="text-xl font-bold text-foreground mb-2">{page.ctaHeadline}</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">{page.ctaSubhead}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle className="w-5 h-5" aria-hidden />
              WhatsApp
            </a>
            <Link
              to={QUOTE_PAGE}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border rounded-xl font-semibold hover:border-primary/50 transition-colors"
            >
              Get a quote
            </Link>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Related
          </h2>
          <ul className="space-y-2">
            {page.relatedLinks.map((link) => {
              const external = link.path.startsWith('http');
              return (
                <li key={link.path}>
                  {external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline underline-offset-4"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-primary hover:underline underline-offset-4"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </PageShell>
    </>
  );
}
