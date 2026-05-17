import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MessageCircle } from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { CatalogProjectCard } from '../components/projects/CatalogProjectCard';
import { BookDiscoveryCallButton } from '../components/shared/BookDiscoveryCallButton';
import { SectionLabel } from '../components/shared/SectionLabel';
import {
  getProjectsByStatus,
  PROJECT_CATALOG_SECTIONS,
} from '../data/project-catalog';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  GET_ESTIMATE_LABEL,
  QUOTE_PAGE,
  SITE_NAME,
  TWITTER_HANDLE,
  WHATSAPP_URL,
} from '../lib/site-config';

const PAGE_TITLE = 'Projects and shipped systems';
const PAGE_DESCRIPTION =
  'Live products, in-progress platforms, white-label SaaS, and honestly paused client builds from Qwabi Engineering across South Africa.';

export default function ProjectsPage() {
  return (
    <>
      <Helmet>
        <title>{`${PAGE_TITLE} | ${SITE_NAME}`}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={absoluteUrl('/projects')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl('/projects')} />
        <meta property="og:title" content={`${PAGE_TITLE} | ${SITE_NAME}`} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <PageShell mainClassName="flex-1 pt-[4.5rem]">
        <div className="container py-12 md:py-16">
          <SectionLabel className="mb-3">Proof of work</SectionLabel>
          <h1
            className="font-display font-bold text-text-primary mb-4 max-w-3xl"
            style={{
              fontSize: 'var(--type-display-md)',
              lineHeight: 'var(--leading-heading)',
              letterSpacing: '-0.02em',
            }}
          >
            Systems we built, launched, and stood behind
          </h1>
          <p
            className="text-text-secondary max-w-2xl mb-8"
            style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
          >
            Transparency matters. This catalog includes live products, active builds, white-label
            platforms, and shipped work that paused on the client side. We do not hide delivered
            systems when hosting or operations stop.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-14">
            <Link to={QUOTE_PAGE} className="btn-primary min-h-[44px]">
              {GET_ESTIMATE_LABEL}
            </Link>
            <BookDiscoveryCallButton variant="outline" />
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline min-h-[44px]">
              <MessageCircle className="w-5 h-5 shrink-0" aria-hidden />
              WhatsApp
            </a>
          </div>

          {PROJECT_CATALOG_SECTIONS.map((section) => {
            const projects = getProjectsByStatus(section.status);
            if (projects.length === 0) return null;

            return (
              <section
                key={section.title}
                className="mb-16 md:mb-20 border-t border-surface-border pt-12 first:border-t-0 first:pt-0"
                aria-labelledby={`catalog-${section.title.replace(/\s+/g, '-')}`}
              >
                <h2
                  id={`catalog-${section.title.replace(/\s+/g, '-')}`}
                  className="font-display font-bold text-text-primary mb-3"
                  style={{
                    fontSize: 'var(--type-heading-lg)',
                    lineHeight: 'var(--leading-heading)',
                  }}
                >
                  {section.title}
                </h2>
                <p className="text-text-secondary max-w-2xl mb-8 text-sm md:text-base leading-relaxed">
                  {section.intro}
                </p>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
                  {projects.map((project) => (
                    <li key={project.id}>
                      <CatalogProjectCard project={project} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </PageShell>
    </>
  );
}
