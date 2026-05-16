import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calculator, ChevronDown, MessageCircle } from 'lucide-react';
import { useId, useState } from 'react';
import { PageBreadcrumbs } from '../components/PageBreadcrumbs';
import { LeadMagnetCard } from '../components/LeadMagnetCard';
import { PricingTable } from '../components/PricingTable';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import ProjectCard from '../components/ProjectCard';
import { SiteFooter } from '../components/SiteFooter';
import { serviceLandingPagesByPath } from '../data/service-landing-pages';
import {
  absoluteUrl,
  APP_DEVELOPMENT_COST_PAGE,
  DEFAULT_OG_IMAGE,
  QUOTE_PAGE,
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
import NotFound from './NotFound';

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <button
        type="button"
        id={`${panelId}-trigger`}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-expanded={open}
      >
        <span className="font-semibold text-foreground">{question}</span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      {open ? (
        <p
          id={panelId}
          role="region"
          aria-labelledby={`${panelId}-trigger`}
          className="px-5 pb-4 text-muted-foreground leading-relaxed"
        >
          {answer}
        </p>
      ) : null}
    </div>
  );
}

export default function ServiceLandingPage() {
  const { pathname } = useLocation();
  const page = serviceLandingPagesByPath[pathname];

  if (!page) {
    return <NotFound />;
  }

  const canonical = absoluteUrl(page.path);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: page.h1, path: page.path },
  ]);
  const faqSchema = buildFaqPageSchema(page.faqs);
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      authorPersonSchema({ url: absoluteUrl('/about') }),
      {
        '@type': 'Service',
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
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
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

      <nav className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Home
          </Link>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Link
              to="/services"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link
              to={APP_DEVELOPMENT_COST_PAGE}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Cost guide
            </Link>
            <Link
              to={QUOTE_PAGE}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </nav>

      <FloatingWhatsApp />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-10 md:py-14 w-full">
        <PageBreadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Services', to: '/services' },
            { label: page.h1 },
          ]}
        />

        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          {page.eyebrow}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-5">
          {page.h1}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">{page.heroSubhead}</p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-16">
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
          <Link
            to={APP_DEVELOPMENT_COST_PAGE}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-primary hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
          >
            Free cost guide
          </Link>
        </div>

        <section className="mb-16" aria-labelledby="services-heading">
          <h2 id="services-heading" className="text-2xl font-bold text-foreground mb-3">
            What I build
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Senior-led delivery: architecture, implementation, and production ownership in one
            relationship.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {page.services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="p-5 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors"
                >
                  <Icon className="w-8 h-8 text-primary mb-3" aria-hidden />
                  <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-16" aria-labelledby="process-heading">
          <h2 id="process-heading" className="text-2xl font-bold text-foreground mb-8">
            How we work
          </h2>
          <ol className="grid md:grid-cols-2 gap-5">
            {page.processSteps.map((item) => (
              <li
                key={item.step}
                className="relative p-5 rounded-2xl border border-border bg-muted/20"
              >
                <span className="text-xs font-bold text-primary tracking-widest">{item.step}</span>
                <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-16 space-y-10" aria-labelledby="pricing-heading">
          <div>
            <h2 id="pricing-heading" className="text-2xl font-bold text-foreground">
              {page.pricingSectionTitle ?? 'Pricing ranges (ZAR)'}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mt-3">
              {page.pricingSectionIntro ??
                'Ballpark ranges for planning. Your quote depends on scope, integrations, and operational load.'}{' '}
              <Link to={QUOTE_PAGE} className="text-primary hover:underline underline-offset-4">
                Get a scoped estimate
              </Link>{' '}
              or read the{' '}
              <Link
                to={APP_DEVELOPMENT_COST_PAGE}
                className="text-primary hover:underline underline-offset-4"
              >
                full 2026 cost guide
              </Link>
              .
            </p>
          </div>
          {page.pricingTables.map((table) => (
            <PricingTable key={table.id} table={table} />
          ))}
        </section>

        <div className="mb-16">
          <LeadMagnetCard
            title="Free App Development Cost Guide"
            description="ZAR tables for mobile, ecommerce, marketplaces, MVPs, and business ops. Use it to sanity-check quotes before you sign."
            ctaLabel="Open the 2026 cost guide"
            to={APP_DEVELOPMENT_COST_PAGE}
          />
        </div>

        <section className="mb-16" aria-labelledby="proof-heading">
          <h2 id="proof-heading" className="text-2xl font-bold text-foreground mb-3">
            Shipped work
          </h2>
          {page.projectsIntro ? (
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              {page.projectsIntro}
            </p>
          ) : null}
          <div className="grid md:grid-cols-3 gap-5">
            {page.projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </section>

        <section className="mb-16 pt-4 border-t border-border" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold text-foreground mb-6">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {page.faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        <section className="p-8 rounded-2xl bg-primary/5 border border-primary/15">
          <h2 className="text-xl font-bold text-foreground mb-2">{page.ctaHeadline}</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">{page.ctaSubhead}</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
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
            <Link
              to={APP_DEVELOPMENT_COST_PAGE}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-primary hover:underline underline-offset-4"
            >
              Cost guide
            </Link>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Related
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
      </main>

      <SiteFooter />
    </div>
  );
}
