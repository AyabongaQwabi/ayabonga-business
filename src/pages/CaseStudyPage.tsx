import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ExternalLink } from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { PageBreadcrumbs } from '../components/PageBreadcrumbs';
import { PageHero, HERO_CTA_ROW_CLASS } from '../components/PageHero';
import { BookDiscoveryCallButton } from '../components/shared/BookDiscoveryCallButton';
import { SectionLabel } from '../components/shared/SectionLabel';
import { TestimonialCard } from '../components/shared/TestimonialCard';
import { CLIENT_TESTIMONIALS } from '../data/client-testimonials';
import {
  CASE_STUDIES_INDEX_PATH,
  getCaseStudyBySlug,
  getCaseStudyServiceLinks,
  getCaseStudyTitle,
} from '../data/case-studies';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  GET_ESTIMATE_LABEL,
  QUOTE_PAGE,
  SITE_NAME,
  TWITTER_HANDLE,
} from '../lib/site-config';
import {
  buildBreadcrumbSchema,
  buildOrganizationSchema,
} from '../lib/entity-schema';
import { authorPersonSchema } from '../lib/author-profile';
import NotFound from './NotFound';

const TESTIMONIAL_PLACEHOLDER = '[Client feedback coming soon]';

type CaseStudySectionProps = {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
};

function CaseStudySection({ id, label, title, children }: CaseStudySectionProps) {
  return (
    <section
      id={id}
      className="border-t border-surface-border pt-12 md:pt-16 scroll-mt-24"
      aria-labelledby={`${id}-heading`}
    >
      <SectionLabel className="mb-3">{label}</SectionLabel>
      <h2
        id={`${id}-heading`}
        className="font-display font-bold text-text-primary mb-6"
        style={{
          fontSize: 'var(--type-heading-lg)',
          lineHeight: 'var(--leading-heading)',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function ProseBlock({ text }: { text: string }) {
  return (
    <p className="text-text-secondary leading-relaxed max-w-3xl">{text}</p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-none p-0 m-0 space-y-3 max-w-3xl">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-text-secondary leading-relaxed">
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-gold"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams();
  const study = slug ? getCaseStudyBySlug(slug) : undefined;

  if (!study) {
    return <NotFound />;
  }

  const title = getCaseStudyTitle(study);
  const canonicalPath = `${CASE_STUDIES_INDEX_PATH}/${study.slug}`;
  const canonical = absoluteUrl(canonicalPath);
  const testimonial = study.testimonialKey
    ? CLIENT_TESTIMONIALS.find((t) => t.id === study.testimonialKey)
    : undefined;
  const relatedServices = getCaseStudyServiceLinks(study);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Case studies', path: CASE_STUDIES_INDEX_PATH },
    { name: title, path: canonicalPath },
  ]);

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      authorPersonSchema({ url: absoluteUrl('/about') }),
      breadcrumbSchema,
      {
        '@type': 'Article',
        headline: title,
        description: study.metaDescription,
        url: canonical,
        author: authorPersonSchema(),
        publisher: buildOrganizationSchema(),
        about: {
          '@type': 'Organization',
          name: study.clientName,
        },
        inLanguage: 'en-ZA',
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{`${study.metaTitle} | ${SITE_NAME}`}</title>
        <meta name="description" content={study.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={`${study.metaTitle} | ${SITE_NAME}`} />
        <meta property="og:description" content={study.metaDescription} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <PageShell mainClassName="flex-1 pt-[4.5rem]">
        <div className="container py-12 md:py-16">
          <PageBreadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Case studies', to: CASE_STUDIES_INDEX_PATH },
              { label: study.clientName },
            ]}
          />

          {/* 1. Hero */}
          <PageHero
            className="mb-12 md:mb-16"
            eyebrow={`${study.sector} · ${study.location}`}
            title={title}
            subtitle={study.projectSummary}
          >
            <div className={HERO_CTA_ROW_CLASS}>
              {study.url ? (
                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline min-h-11"
                >
                  View live product
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden />
                </a>
              ) : null}
              <Link to={CASE_STUDIES_INDEX_PATH} className="btn-outline min-h-11">
                All case studies
              </Link>
            </div>
          </PageHero>

          {/* 2. About client */}
          <CaseStudySection id="about-client" label="Client" title={`About ${study.clientName}`}>
            <ProseBlock
              text={`${study.clientName} is led by ${study.contactName}, ${study.contactTitle}, based in ${study.location}. ${study.projectSummary}`}
            />
          </CaseStudySection>

          {/* 3. Challenge */}
          <CaseStudySection id="challenge" label="Problem" title="The challenge">
            <ProseBlock text={study.challenge} />
          </CaseStudySection>

          {/* 4. What we built */}
          <CaseStudySection id="what-we-built" label="Delivery" title="What we built">
            <BulletList items={study.whatWeBuilt} />
          </CaseStudySection>

          {/* 5. Technical implementation */}
          <CaseStudySection
            id="technical-implementation"
            label="Engineering"
            title="Technical implementation"
          >
            <BulletList items={study.technologiesUsed} />
          </CaseStudySection>

          {/* 6. Outcomes */}
          <CaseStudySection id="outcomes" label="Results" title="Outcomes">
            <BulletList items={study.outcomes} />
          </CaseStudySection>

          {/* 7. Testimonial */}
          <CaseStudySection id="testimonial" label="Client voice" title="What the client said">
            {testimonial ? (
              <div className="max-w-2xl">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ) : (
              <p className="text-text-muted italic max-w-3xl">{TESTIMONIAL_PLACEHOLDER}</p>
            )}
          </CaseStudySection>

          {/* 8. Related services */}
          <CaseStudySection id="related-services" label="Services" title="Related services">
            <ul className="flex flex-wrap gap-3 list-none p-0 m-0">
              {relatedServices.map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="inline-flex items-center min-h-[44px] px-4 py-2 rounded-md border border-surface-border bg-surface-raised text-sm font-technical font-medium text-text-primary hover:border-accent-gold/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </CaseStudySection>

          {/* 9. CTA */}
          <section
            id="next-step"
            className="mt-16 md:mt-20 rounded-2xl border border-surface-border bg-surface-raised p-8 md:p-10 text-center"
            aria-labelledby="next-step-heading"
          >
            <h2
              id="next-step-heading"
              className="font-display font-bold text-text-primary mb-4"
              style={{
                fontSize: 'var(--type-heading-md)',
                lineHeight: 'var(--leading-heading)',
              }}
            >
              Planning something similar?
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
              Share your workflow on the estimator or book a discovery call. We reply with fit,
              risks, and a realistic ZAR range before you commit.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
              <Link to={QUOTE_PAGE} className="btn-primary min-h-[44px]">
                {GET_ESTIMATE_LABEL}
              </Link>
              <BookDiscoveryCallButton variant="outline" />
            </div>
          </section>
        </div>
      </PageShell>
    </>
  );
}
