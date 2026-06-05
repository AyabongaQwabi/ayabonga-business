import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calculator, MessageCircle } from 'lucide-react';
import { PageBreadcrumbs } from '../components/PageBreadcrumbs';
import { PageHero } from '../components/PageHero';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageShell } from '../components/layout/PageShell';
import { getIndustryBySlug } from '../data/industry-pages';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  QUOTE_PAGE,
  SITE_ORIGIN,
  TWITTER_HANDLE,
  WHATSAPP_URL,
} from '../lib/site-config';
import {
  authorGraphNode,
  buildBreadcrumbSchema,
  buildJsonLdGraph,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from '../lib/entity-schema';
import NotFound from './NotFound';

export default function IndustryPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? getIndustryBySlug(slug) : undefined;

  if (!page) {
    return <NotFound />;
  }

  const canonical = absoluteUrl(page.path);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Industries', path: '/industries' },
    { name: page.name, path: page.path },
  ]);
  const jsonLd = buildJsonLdGraph([
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    authorGraphNode(),
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      name: page.h1,
      description: page.metaDescription,
      url: canonical,
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
      about: {
        '@type': 'Thing',
        name: page.name,
      },
      areaServed: {
        '@type': 'Country',
        name: 'South Africa',
      },
    },
    breadcrumbSchema,
  ]);

  const relatedIndustries = page.relatedIndustrySlugs
    .map((relatedSlug) => getIndustryBySlug(relatedSlug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return (
    <>
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
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
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <PageShell mainClassName="flex-1 mx-auto w-full max-w-4xl px-6 pt-[4.5rem] pb-12 md:pb-16">
        <PageBreadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Industries', to: '/industries' },
            { label: page.name },
          ]}
        />

        <ScrollReveal>
          <PageHero
            className="mb-14"
            eyebrow={page.eyebrow}
            title={page.h1}
            subtitle={page.heroSubhead}
            imageSrc="/images/heroes/services.jpg"
            imageAlt={`${page.name} software for South African businesses`}
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

        <ScrollReveal>
          <p className="text-muted-foreground leading-relaxed mb-14 max-w-3xl">{page.intro}</p>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-16" aria-labelledby="challenges-heading">
            <p className="section-label mb-3">Operational reality</p>
            <h2 id="challenges-heading" className="text-2xl font-bold text-foreground mb-6">
              Challenges we see in {page.name.toLowerCase()}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {page.operationalChallenges.map((item) => (
                <article
                  key={item.title}
                  className="p-5 rounded-2xl border border-border bg-muted/20"
                >
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-16" aria-labelledby="automation-heading">
            <p className="section-label mb-3">Where software helps</p>
            <h2 id="automation-heading" className="text-2xl font-bold text-foreground mb-6">
              Automation leverage
            </h2>
            <ul className="space-y-4">
              {page.automationLeverage.map((item) => (
                <li
                  key={item.title}
                  className="flex gap-4 p-5 rounded-2xl border border-border bg-card"
                >
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                    aria-hidden
                  />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-16" aria-labelledby="workflows-heading">
            <h2 id="workflows-heading" className="text-2xl font-bold text-foreground mb-3">
              Workflow examples
            </h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-2xl">
              Illustrative flows we map during discovery. Your build will follow your rules, payments,
              and integrations.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {page.workflowExamples.map((workflow) => (
                <article
                  key={workflow.name}
                  className="p-6 rounded-2xl border border-border bg-muted/10"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-1">{workflow.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{workflow.summary}</p>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    {workflow.steps.map((step) => (
                      <li key={step} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-16" aria-labelledby="services-heading">
            <h2 id="services-heading" className="text-2xl font-bold text-foreground mb-4">
              How we can help
            </h2>
            <ul className="flex flex-wrap gap-3">
              {page.serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card text-sm font-medium text-foreground hover:border-primary/50 transition-colors"
                  >
                    {link.label}
                    <ArrowRight className="w-3.5 h-3.5 text-primary" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="mb-16" aria-labelledby="case-studies-heading">
            <h2 id="case-studies-heading" className="text-2xl font-bold text-foreground mb-6">
              Related work
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {page.caseStudies.map((study) => {
                const external = study.path.startsWith('http');
                const inner = (
                  <>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {study.label}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{study.blurb}</p>
                  </>
                );
                return external ? (
                  <a
                    key={study.path}
                    href={study.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-colors"
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    key={study.path}
                    to={study.path}
                    className="group block p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-colors"
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
          </section>
        </ScrollReveal>

        {relatedIndustries.length > 0 ? (
          <section className="mb-16" aria-labelledby="related-industries-heading">
            <h2
              id="related-industries-heading"
              className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4"
            >
              Related industries
            </h2>
            <ul className="flex flex-wrap gap-3">
              {relatedIndustries.map((related) => (
                <li key={related.slug}>
                  <Link
                    to={related.path}
                    className="text-primary hover:underline underline-offset-4 text-sm font-medium"
                  >
                    {related.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="p-8 rounded-2xl bg-primary/5 border border-primary/15">
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
              <Calculator className="w-5 h-5 text-primary" aria-hidden />
              Get a quote
            </Link>
          </div>
        </section>
      </PageShell>
    </>
  );
}
