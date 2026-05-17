import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MvpScopeChecklist } from '../components/MvpScopeChecklist';
import { PageShell } from '../components/layout/PageShell';
import {
  MVP_SCOPE_CHECKLIST_META_DESCRIPTION,
  MVP_SCOPE_CHECKLIST_META_TITLE,
  MVP_SCOPE_CHECKLIST_PATH,
} from '../data/mvp-scope-checklist';
import {
  absoluteUrl,
  APP_DEVELOPMENT_COST_PAGE,
  DEFAULT_OG_IMAGE,
  PARTNERSHIP_CTA_LABEL,
  PRICING_STRATEGY_PAGE,
  QUOTE_PAGE,
  SITE_NAME,
  TWITTER_HANDLE,
  WHATSAPP_URL,
} from '../lib/site-config';

export default function MvpScopeChecklistPage() {
  const canonical = absoluteUrl(MVP_SCOPE_CHECKLIST_PATH);

  return (
    <>
      <Helmet>
        <title>{`${MVP_SCOPE_CHECKLIST_META_TITLE} | ${SITE_NAME}`}</title>
        <meta name="description" content={MVP_SCOPE_CHECKLIST_META_DESCRIPTION} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta
          property="og:title"
          content={`${MVP_SCOPE_CHECKLIST_META_TITLE} | ${SITE_NAME}`}
        />
        <meta property="og:description" content={MVP_SCOPE_CHECKLIST_META_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:locale" content="en_ZA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${MVP_SCOPE_CHECKLIST_META_TITLE} | ${SITE_NAME}`}
        />
        <meta name="twitter:description" content={MVP_SCOPE_CHECKLIST_META_DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <PageShell
        className="bg-surface-base text-text-primary font-technical"
        mainClassName="container flex-1 pt-[4.5rem] pb-10 md:pb-14"
        whatsappLabel="Questions about scope?"
      >
        <header className="mb-10 max-w-3xl">
          <p className="section-label mb-3">Free tool · MVP planning</p>
          <h1
            className="font-display font-bold text-text-primary mb-4"
            style={{
              fontSize: 'var(--type-display-md)',
              lineHeight: 'var(--leading-heading)',
              letterSpacing: '-0.02em',
            }}
          >
            {MVP_SCOPE_CHECKLIST_META_TITLE}
          </h1>
          <p
            className="text-text-secondary leading-relaxed"
            style={{ fontSize: 'var(--type-body-md)', lineHeight: 'var(--leading-body)' }}
          >
            {MVP_SCOPE_CHECKLIST_META_DESCRIPTION}
          </p>
          <p
            className="text-text-secondary mt-4 leading-relaxed"
            style={{ fontSize: 'var(--type-body-sm)' }}
          >
            When essentials are mostly checked, use the{' '}
            <Link
              to={QUOTE_PAGE}
              className="text-accent-gold hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)] rounded-sm"
            >
              project scope estimator
            </Link>{' '}
            for a ZAR ballpark, or read the{' '}
            <Link
              to={APP_DEVELOPMENT_COST_PAGE}
              className="text-accent-gold hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)] rounded-sm"
            >
              app development cost guide
            </Link>
            . For live products, see{' '}
            <Link
              to={PRICING_STRATEGY_PAGE}
              className="text-accent-gold hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)] rounded-sm"
            >
              retainer pricing
            </Link>
            .
          </p>
          <p
            className="text-text-secondary mt-3 leading-relaxed"
            style={{ fontSize: 'var(--type-body-sm)' }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-gold hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)] rounded-sm"
            >
              Message on WhatsApp
            </a>{' '}
            with your copied checklist summary.
          </p>
          <p className="mt-6">
            <Link to={PRICING_STRATEGY_PAGE} className="btn-outline">
              {PARTNERSHIP_CTA_LABEL}
            </Link>
          </p>
        </header>

        <MvpScopeChecklist />
      </PageShell>
    </>
  );
}
