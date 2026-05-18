import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { PageBreadcrumbs } from '../components/PageBreadcrumbs';
import { ScrollReveal } from '../components/ScrollReveal';
import { PageShell } from '../components/layout/PageShell';
import { INSIGHTS_INDEX_PATH, insightPages } from '../data/insights-pages';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  TWITTER_HANDLE,
} from '../lib/site-config';
import { buildBreadcrumbSchema, buildOrganizationSchema } from '../lib/entity-schema';

const INDEX_TITLE = 'Insights for founders building software in South Africa';
const INDEX_DESCRIPTION =
  'Practical guides on MVPs, SaaS, automation, tech stacks, and digitising SMME operations. Written for non-technical founders by a senior product engineer.';

export default function InsightIndexPage() {
  const canonical = absoluteUrl(INSIGHTS_INDEX_PATH);
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Insights', path: INSIGHTS_INDEX_PATH },
      ]),
      {
        '@type': 'CollectionPage',
        name: INDEX_TITLE,
        description: INDEX_DESCRIPTION,
        url: canonical,
        inLanguage: 'en-ZA',
        hasPart: insightPages.map((page) => ({
          '@type': 'Article',
          headline: page.h1,
          url: absoluteUrl(page.path),
          description: page.excerpt,
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{`${INDEX_TITLE} | ${SITE_NAME}`}</title>
        <meta name="description" content={INDEX_DESCRIPTION} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={`${INDEX_TITLE} | ${SITE_NAME}`} />
        <meta property="og:description" content={INDEX_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:locale" content="en_ZA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>

      <PageShell mainClassName="flex-1 mx-auto w-full max-w-3xl px-6 pt-[4.5rem] pb-10 md:pb-14">
        <PageBreadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Insights' },
          ]}
        />

        <header className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Insights
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Guides for founders shipping real software
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">{INDEX_DESCRIPTION}</p>
        </header>

        <ScrollReveal>
          <ul className="space-y-4">
            {insightPages.map((page) => (
              <li key={page.slug}>
                <Link
                  to={page.path}
                  className="group block rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/40 hover:bg-card/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    {page.eyebrow}
                  </p>
                  <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {page.h1}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {page.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Read guide
                    <ArrowRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </PageShell>
    </>
  );
}
