import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import GetAQuote from '../components/GetAQuote.jsx';
import { PageShell } from '../components/layout/PageShell';
import {
  absoluteUrl,
  APP_DEVELOPMENT_COST_PAGE,
  DEFAULT_OG_IMAGE,
  PARTNERSHIP_CTA_LABEL,
  PRICING_STRATEGY_PAGE,
  SITE_NAME,
  TWITTER_HANDLE,
  WHATSAPP_URL,
} from '../lib/site-config';
import {
  CLIENT_QUOTE_BUFFER_PERCENT,
  CLIENT_QUOTE_HOURLY_RATE_ZAR,
  CLIENT_QUOTE_HOURS_PER_DAY,
  CLIENT_QUOTE_YEARS_EXPERIENCE,
} from '../config/quoteToolConfig';

const PAGE_TITLE = 'Project scope estimator';
const PAGE_DESCRIPTION = `Optional ballpark for greenfield builds: feature selection and timeline-adjusted pricing. Assumptions are fixed at R${CLIENT_QUOTE_HOURLY_RATE_ZAR}/hr, ${CLIENT_QUOTE_YEARS_EXPERIENCE} years experience, ${CLIENT_QUOTE_HOURS_PER_DAY} billable hours per day, ${CLIENT_QUOTE_BUFFER_PERCENT}% buffer, ZAR display. Ongoing partnerships use monthly retainers on the pricing page.`;

export default function GetAQuotePage() {
  return (
    <>
      <Helmet>
        <title>{`${PAGE_TITLE} | ${SITE_NAME}`}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={absoluteUrl('/get-a-quote')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl('/get-a-quote')} />
        <meta property="og:title" content={`${PAGE_TITLE} | ${SITE_NAME}`} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:locale" content="en_ZA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${PAGE_TITLE} | ${SITE_NAME}`} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <PageShell
        className="bg-surface-base text-text-primary font-technical"
        mainClassName="container flex-1 pt-[4.5rem] pb-10 md:pb-14"
        whatsappLabel="Questions? WhatsApp me"
      >
        <header className="mb-10 max-w-3xl">
          <p className="section-label mb-3">Optional · greenfield builds</p>
          <h1
            className="font-display font-bold text-text-primary mb-4"
            style={{
              fontSize: 'var(--type-display-md)',
              lineHeight: 'var(--leading-heading)',
              letterSpacing: '-0.02em',
            }}
          >
            {PAGE_TITLE}
          </h1>
          <p
            className="text-text-secondary leading-relaxed"
            style={{ fontSize: 'var(--type-body-md)', lineHeight: 'var(--leading-body)' }}
          >
            {PAGE_DESCRIPTION}
          </p>
          <p
            className="text-text-secondary mt-4 leading-relaxed"
            style={{ fontSize: 'var(--type-body-sm)' }}
          >
            Not sure which features matter yet? Start with the{' '}
            <Link
              to={APP_DEVELOPMENT_COST_PAGE}
              className="text-accent-gold hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)] rounded-sm"
            >
              free app development cost guide
            </Link>
            , then return here for a ballpark. For live products and long-term ownership, see{' '}
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
            Prefer a conversation?{' '}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-gold hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)] rounded-sm"
            >
              Message on WhatsApp
            </a>{' '}
            with your idea in one paragraph. I reply with fit and next steps.
          </p>
          <p className="mt-6">
            <Link to={PRICING_STRATEGY_PAGE} className="btn-outline">
              {PARTNERSHIP_CTA_LABEL}
            </Link>
          </p>
        </header>

        <GetAQuote />
      </PageShell>
    </>
  );
}
