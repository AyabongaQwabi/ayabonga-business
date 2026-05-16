import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import GetAQuote from '../components/GetAQuote.jsx';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import {
  absoluteUrl,
  APP_DEVELOPMENT_COST_PAGE,
  DEFAULT_OG_IMAGE,
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
    <div className="min-h-screen bg-background text-foreground font-sans">
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

      <nav className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to home</span>
          </Link>
        </div>
      </nav>

      <FloatingWhatsApp label="Questions? WhatsApp me" />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <header className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Optional · greenfield builds
          </p>
          <h1 className="text-3xl font-bold text-foreground mb-3">{PAGE_TITLE}</h1>
          <p className="text-muted-foreground leading-relaxed">{PAGE_DESCRIPTION}</p>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            Not sure which features matter yet? Start with the{' '}
            <Link
              to={APP_DEVELOPMENT_COST_PAGE}
              className="text-primary hover:underline underline-offset-4"
            >
              free app development cost guide
            </Link>
            , then return here for a ballpark. For live products and long-term ownership, see{' '}
            <Link to="/pricing-strategy" className="text-primary hover:underline underline-offset-4">
              retainer pricing
            </Link>
            .
          </p>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Prefer a conversation?{' '}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-4"
            >
              Message on WhatsApp
            </a>{' '}
            with your idea in one paragraph. I reply with fit and next steps.
          </p>
        </header>

        <GetAQuote />
      </main>
    </div>
  );
}
