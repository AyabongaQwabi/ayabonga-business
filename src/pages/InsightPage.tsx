import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calculator, MessageCircle } from 'lucide-react';
import { PageBreadcrumbs } from '../components/PageBreadcrumbs';
import { FaqAccordionItem } from '../components/FaqAccordionItem';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageShell } from '../components/layout/PageShell';
import { PageHero, HERO_CTA_ROW_CLASS } from '../components/PageHero';
import { insightPagesBySlug } from '../data/insights-pages';
import { HERO_IMAGES } from '../lib/hero-images';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  QUOTE_PAGE,
  TWITTER_HANDLE,
  WHATSAPP_URL,
} from '../lib/site-config';
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildOrganizationSchema,
} from '../lib/entity-schema';
import { authorPersonSchema } from '../lib/author-profile';
import NotFound from './NotFound';

function heroImageForInsight(path: string, override?: string): string {
  if (override) return override;
  if (path.includes('cost')) return HERO_IMAGES.appCost;
  if (path.includes('marketplace') || path.includes('stack')) {
    return HERO_IMAGES.mvpDeveloper;
  }
  if (path.includes('whatsapp') || path.includes('digitise')) {
    return HERO_IMAGES.customSoftware;
  }
  return HERO_IMAGES.servicesHub;
}

function InsightCtaRow() {
  return (
    <div className={HERO_CTA_ROW_CLASS}>
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
  );
}

export default function InsightPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? insightPagesBySlug[slug] : undefined;

  if (!page) {
    return <NotFound />;
  }

  const canonical = absoluteUrl(page.path);
  const heroSrc = heroImageForInsight(page.path);
  const heroAlt = page.h1;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: page.h1, path: page.path },
  ]);
  const faqSchema = page.faqs.length ? buildFaqPageSchema(page.faqs) : null;
  const articleSchema = buildArticleSchema({
    headline: page.h1,
    description: page.excerpt || page.metaDescription,
    canonical,
    datePublished: page.datePublished,
    articleSection: page.eyebrow.split('·')[0]?.trim(),
  });
  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      authorPersonSchema({ url: absoluteUrl('/about') }),
      articleSchema,
      breadcrumbSchema,
      ...(faqSchema ? [faqSchema] : []),
    ],
  };

  return (
    <>
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta name="keywords" content={page.keywords.join(', ')} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:locale" content="en_ZA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(graphSchema)}</script>
      </Helmet>

      <PageShell
        mainClassName="flex-1 mx-auto w-full max-w-3xl px-6 pt-[4.5rem] pb-10 md:pb-14"
      >
        <PageBreadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Insights', to: '/insights' },
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
            <InsightCtaRow />
          </PageHero>
        </ScrollReveal>

        <ScrollReveal>
          <div className="space-y-12">
            {page.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-xl font-bold text-foreground mb-4">
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
        </ScrollReveal>

        {page.faqs.length > 0 ? (
          <ScrollReveal>
            <section className="mt-16 pt-12 border-t border-border" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-2xl font-bold text-foreground mb-6">
                Frequently asked questions
              </h2>
              <div className="space-y-3">
                {page.faqs.map((faq) => (
                  <FaqAccordionItem
                    key={faq.question}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </section>
          </ScrollReveal>
        ) : null}

        <section className="mt-14 p-8 rounded-2xl bg-primary/5 border border-primary/15">
          <h2 className="text-xl font-bold text-foreground mb-2">{page.ctaHeadline}</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">{page.ctaSubhead}</p>
          <InsightCtaRow />
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
      </PageShell>
    </>
  );
}
