import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { PageBreadcrumbs } from '../components/PageBreadcrumbs';
import { PageHero } from '../components/PageHero';
import { PricingTable } from '../components/PricingTable';
import { RetainerPricingCards } from '../components/RetainerPricingCards';
import { PageShell } from '../components/layout/PageShell';
import { appCostPricingTables } from '../data/app-cost-pricing-tables';
import {
  APP_DEVELOPMENT_COST_FAQS,
  APP_DEVELOPMENT_COST_H1,
  APP_DEVELOPMENT_COST_HERO,
  APP_DEVELOPMENT_COST_KEYWORDS,
  APP_DEVELOPMENT_COST_META_DESCRIPTION,
  APP_DEVELOPMENT_COST_META_TITLE,
  APP_DEVELOPMENT_COST_PATH,
  APP_DEVELOPMENT_COST_RELATED,
  APP_DEVELOPMENT_COST_SECTIONS,
  APP_DEVELOPMENT_COST_TRUST_POINTS,
} from '../data/app-development-cost-page';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
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
  buildOrganizationSchema,
} from '../lib/entity-schema';
import { authorPersonSchema } from '../lib/author-profile';

const canonical = absoluteUrl(APP_DEVELOPMENT_COST_PATH);

const pageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    buildOrganizationSchema(),
    authorPersonSchema({ url: absoluteUrl('/about') }),
    {
      '@type': 'WebPage',
      name: APP_DEVELOPMENT_COST_H1,
      description: APP_DEVELOPMENT_COST_META_DESCRIPTION,
      url: canonical,
      inLanguage: 'en-ZA',
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    },
    {
      '@type': 'Service',
      name: 'Mobile and web application development',
      description: APP_DEVELOPMENT_COST_META_DESCRIPTION,
      provider: { '@id': `${SITE_ORIGIN}/#organization` },
      areaServed: { '@type': 'Country', name: 'South Africa' },
      url: canonical,
    },
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: APP_DEVELOPMENT_COST_H1, path: APP_DEVELOPMENT_COST_PATH },
    ]),
    buildFaqPageSchema(APP_DEVELOPMENT_COST_FAQS),
  ],
};

export default function AppDevelopmentCostSouthAfricaPage() {
  return (
    <>
      <Helmet>
        <title>{`${APP_DEVELOPMENT_COST_META_TITLE} | ${SITE_NAME}`}</title>
        <meta name="description" content={APP_DEVELOPMENT_COST_META_DESCRIPTION} />
        <meta name="keywords" content={APP_DEVELOPMENT_COST_KEYWORDS.join(', ')} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta
          property="og:title"
          content={`${APP_DEVELOPMENT_COST_META_TITLE} | ${SITE_NAME}`}
        />
        <meta property="og:description" content={APP_DEVELOPMENT_COST_META_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:locale" content="en_ZA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta
          name="twitter:title"
          content={`${APP_DEVELOPMENT_COST_META_TITLE} | ${SITE_NAME}`}
        />
        <meta name="twitter:description" content={APP_DEVELOPMENT_COST_META_DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <PageShell mainClassName="flex-1 max-w-4xl mx-auto w-full px-6 pt-[4.5rem] pb-10 md:pb-14">
        <PageBreadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Services', to: '/services' },
            { label: APP_DEVELOPMENT_COST_H1 },
          ]}
        />

        <PageHero
          className="pt-4 mb-12 md:mb-14"
          eyebrow="South Africa · ZAR · 2026"
          title={APP_DEVELOPMENT_COST_H1}
          subtitle={APP_DEVELOPMENT_COST_HERO}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#128C7E] transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <MessageCircle className="w-5 h-5" aria-hidden />
              Discuss your budget on WhatsApp
            </a>
            <Link
              to={QUOTE_PAGE}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-card border border-border rounded-xl font-semibold hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Calculator className="w-5 h-5 text-primary" aria-hidden />
              Get a scoped estimate
            </Link>
          </div>
        </PageHero>

        <section className="pb-14 border-t border-surface-border pt-12" aria-labelledby="trust-heading">
          <h2 id="trust-heading" className="text-2xl font-bold text-foreground mb-8">
            What honest pricing looks like
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {APP_DEVELOPMENT_COST_TRUST_POINTS.map(({ title, copy }) => (
              <div
                key={title}
                className="p-5 rounded-2xl border border-surface-border bg-surface-raised hover:border-accent-gold/30 transition-colors"
              >
                <CheckCircle2 className="w-6 h-6 text-primary mb-3" aria-hidden />
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="pb-16 space-y-10 border-t border-surface-border pt-12"
          aria-labelledby="pricing-tables-heading"
        >
          <div>
            <h2 id="pricing-tables-heading" className="text-2xl md:text-3xl font-bold text-foreground">
              2026 ZAR pricing by product type
            </h2>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-3xl">
              Ranges for planning conversations with founders and operators. Final quotes depend on
              integrations, compliance, and who owns delivery. Jump to a category:{' '}
              <a href="#mobile" className="text-primary hover:underline underline-offset-4">
                mobile
              </a>
              ,{' '}
              <a href="#web-apps" className="text-primary hover:underline underline-offset-4">
                web apps
              </a>
              ,{' '}
              <a href="#ecommerce" className="text-primary hover:underline underline-offset-4">
                ecommerce
              </a>
              ,{' '}
              <a href="#marketplace" className="text-primary hover:underline underline-offset-4">
                marketplace
              </a>
              ,{' '}
              <a href="#fintech" className="text-primary hover:underline underline-offset-4">
                payments
              </a>
              ,{' '}
              <a href="#whatsapp" className="text-primary hover:underline underline-offset-4">
                WhatsApp AI
              </a>
              ,{' '}
              <a href="#maintenance" className="text-primary hover:underline underline-offset-4">
                maintenance
              </a>
              .
            </p>
          </div>
          {appCostPricingTables.map((table) => (
            <PricingTable key={table.id} table={table} />
          ))}
        </section>

        <section
          id="retainer-cards"
          className="pb-16 border-t border-surface-border pt-12 scroll-mt-24"
          aria-labelledby="retainer-heading"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <h2 id="retainer-heading" className="text-2xl md:text-3xl font-bold text-foreground">
                Maintenance retainer tiers
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed text-sm">
                After launch, most products need a technical owner for patches, integrations, and
                steady improvements. Monthly retainers scale with complexity, not page count.
              </p>
            </div>
            <Link
              to={PRICING_STRATEGY_PAGE}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4 shrink-0"
            >
              Full retainer philosophy
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
          <RetainerPricingCards showSystemExamples={false} />
        </section>

        <div className="space-y-12 border-t border-border pt-12">
          {APP_DEVELOPMENT_COST_SECTIONS.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                {section.heading}
              </h2>
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

        <section className="mt-16 pt-12 border-t border-border max-w-3xl" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold text-foreground mb-6">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {APP_DEVELOPMENT_COST_FAQS.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mt-14 p-8 rounded-2xl bg-primary/5 border border-primary/15">
          <h2 className="text-xl font-bold text-foreground mb-2">
            Ready to compare your quote to real scope?
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Send your brief or an existing proposal on WhatsApp. I will tell you what is realistic
            for MVP scope, payment integration, and post-launch maintenance before you sign.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle className="w-5 h-5" aria-hidden />
              Contact on WhatsApp
            </a>
            <Link
              to={QUOTE_PAGE}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border rounded-xl font-semibold hover:border-primary/50 transition-colors"
            >
              Get a quote
            </Link>
          </div>
        </section>

        <section className="mt-12 pb-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Related pages
          </h2>
          <ul className="space-y-2">
            {APP_DEVELOPMENT_COST_RELATED.map((link) => (
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
