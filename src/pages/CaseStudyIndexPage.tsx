import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { PageBreadcrumbs } from '../components/PageBreadcrumbs';
import { SectionLabel } from '../components/shared/SectionLabel';
import {
  CASE_STUDIES,
  CASE_STUDIES_INDEX_PATH,
  getCaseStudyTitle,
} from '../data/case-studies';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  TWITTER_HANDLE,
} from '../lib/site-config';
import { buildBreadcrumbSchema } from '../lib/entity-schema';

const PAGE_TITLE = 'Case studies';
const PAGE_DESCRIPTION =
  'How Qwabi Engineering ships custom software for South African clients: challenges, build decisions, technical approach, and measured outcomes.';

export default function CaseStudyIndexPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: PAGE_TITLE, path: CASE_STUDIES_INDEX_PATH },
  ]);

  const indexSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema,
      {
        '@type': 'CollectionPage',
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        url: absoluteUrl(CASE_STUDIES_INDEX_PATH),
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: CASE_STUDIES.map((study, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: getCaseStudyTitle(study),
            url: absoluteUrl(`${CASE_STUDIES_INDEX_PATH}/${study.slug}`),
          })),
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{`${PAGE_TITLE} | ${SITE_NAME}`}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={absoluteUrl(CASE_STUDIES_INDEX_PATH)} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl(CASE_STUDIES_INDEX_PATH)} />
        <meta property="og:title" content={`${PAGE_TITLE} | ${SITE_NAME}`} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(indexSchema)}</script>
      </Helmet>

      <PageShell mainClassName="flex-1 pt-[4.5rem]">
        <div className="container py-12 md:py-16">
          <PageBreadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: PAGE_TITLE },
            ]}
          />

          <SectionLabel className="mb-3">Client work</SectionLabel>
          <h1
            className="font-display font-bold text-text-primary mb-4 max-w-3xl"
            style={{
              fontSize: 'var(--type-display-md)',
              lineHeight: 'var(--leading-heading)',
              letterSpacing: '-0.02em',
            }}
          >
            Case studies from shipped systems
          </h1>
          <p
            className="text-text-secondary max-w-2xl mb-12"
            style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
          >
            {PAGE_DESCRIPTION}
          </p>

          <ul className="grid gap-6 sm:grid-cols-2 list-none p-0 m-0">
            {CASE_STUDIES.map((study) => (
              <li key={study.slug}>
                <article className="flex h-full flex-col rounded-2xl border border-surface-border bg-surface-raised p-6 md:p-8 transition-colors hover:border-accent-gold/25 motion-reduce:transition-none">
                  <p className="section-label mb-3">
                    {study.sector} · {study.location}
                  </p>
                  <h2
                    className="font-display font-bold text-text-primary mb-3 text-balance"
                    style={{
                      fontSize: 'var(--type-heading-md)',
                      lineHeight: 'var(--leading-heading)',
                    }}
                  >
                    <Link
                      to={`${CASE_STUDIES_INDEX_PATH}/${study.slug}`}
                      className="hover:text-accent-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
                    >
                      {getCaseStudyTitle(study)}
                    </Link>
                  </h2>
                  <p className="text-text-secondary text-sm md:text-base leading-relaxed flex-1 mb-6">
                    {study.projectSummary}
                  </p>
                  <Link
                    to={`${CASE_STUDIES_INDEX_PATH}/${study.slug}`}
                    className="inline-flex items-center gap-2 font-technical font-semibold text-sm text-accent-gold hover:text-accent-gold-hover transition-colors"
                  >
                    Read case study
                    <ArrowRight className="w-4 h-4" aria-hidden />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </PageShell>
    </>
  );
}
