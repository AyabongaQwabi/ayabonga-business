import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useId, useState } from 'react';
import { LeadCaptureForm } from '../components/leads/LeadCaptureForm';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { SiteFooter } from '../components/SiteFooter';
import { partnershipPagesByPath } from '../data/partnership-landing-pages';
import {
  absoluteUrl,
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
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-expanded={open}
      >
        <span className="font-semibold text-foreground">{question}</span>
        <span className="text-muted-foreground text-xl leading-none" aria-hidden>
          {open ? '−' : '+'}
        </span>
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

export default function PartnershipLandingPage() {
  const { pathname } = useLocation();
  const page = partnershipPagesByPath[pathname];

  if (!page) {
    return <NotFound />;
  }

  const canonical = absoluteUrl(page.path);
  const faqSchema = buildFaqPageSchema(page.faqs);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      authorPersonSchema({ url: absoluteUrl('/about') }),
      {
        '@type': 'Service',
        name: page.h1,
        description: page.metaDescription,
        provider: { '@id': `${SITE_ORIGIN}/#organization` },
        areaServed: { '@type': 'Country', name: 'South Africa' },
        serviceType: page.serviceType,
        url: canonical,
      },
      buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: page.h1, path: page.path },
      ]),
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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <nav className="border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Home
          </Link>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="/services" className="text-muted-foreground hover:text-foreground">
              Services
            </Link>
            <Link to={QUOTE_PAGE} className="text-muted-foreground hover:text-foreground">
              Get a quote
            </Link>
          </div>
        </div>
      </nav>

      <FloatingWhatsApp />

      <main className="flex-1 max-w-3xl mx-auto px-6 py-10 md:py-14 w-full">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          {page.eyebrow}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          {page.h1}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">{page.heroSubhead}</p>

        <ul className="space-y-2 mb-10 text-sm text-muted-foreground">
          {page.proofBullets.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-primary shrink-0" aria-hidden>
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {page.sections.map((section) => (
          <section key={section.id} id={section.id} className="mb-10 scroll-mt-24">
            <h2 className="text-xl font-bold text-foreground mb-3">{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="text-muted-foreground leading-relaxed mb-3">
                {p}
              </p>
            ))}
            {section.bullets ? (
              <ul className="space-y-2 text-muted-foreground">
                {section.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="text-primary shrink-0">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <LeadCaptureForm
          formType={page.formType}
          sourcePage={page.path}
          headline={page.formHeadline}
          subhead={page.formSubhead}
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">FAQ</h2>
          <div className="space-y-3">
            {page.faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>

        <section className="mt-12 p-6 rounded-2xl bg-muted/30 border border-border flex flex-col sm:flex-row gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#128C7E] transition-colors"
          >
            <MessageCircle className="w-5 h-5" aria-hidden />
            WhatsApp
          </a>
          <Link
            to={QUOTE_PAGE}
            className="inline-flex items-center justify-center px-5 py-3 border border-border rounded-xl font-semibold hover:border-primary/50 transition-colors"
          >
            Full quote tool
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
