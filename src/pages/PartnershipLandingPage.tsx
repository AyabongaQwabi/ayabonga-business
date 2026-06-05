import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MessageCircle } from 'lucide-react';
import { FaqAccordionItem } from '../components/FaqAccordionItem';
import { ScrollReveal } from '../components/ScrollReveal';
import { LeadCaptureForm } from '../components/leads/LeadCaptureForm';
import { PageShell } from '../components/layout/PageShell';
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
  authorGraphNode,
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildJsonLdGraph,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from '../lib/entity-schema';
import NotFound from './NotFound';

export default function PartnershipLandingPage() {
  const { pathname } = useLocation();
  const page = partnershipPagesByPath[pathname];

  if (!page) {
    return <NotFound />;
  }

  const canonical = absoluteUrl(page.path);
  const faqSchema = buildFaqPageSchema(page.faqs);
  const schema = buildJsonLdGraph([
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    authorGraphNode(),
    {
      '@type': 'Service',
      '@id': `${canonical}#service`,
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
  ]);

  return (
    <>
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

      <PageShell mainClassName="flex-1 max-w-3xl mx-auto w-full px-6 pt-[4.5rem] pb-10 md:pb-14">
        <ScrollReveal>
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
        </ScrollReveal>

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

        <ScrollReveal>
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">FAQ</h2>
          <div className="space-y-3">
            {page.faqs.map((faq) => (
              <FaqAccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>
        </ScrollReveal>

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
          <Link to={QUOTE_PAGE} className="btn-primary min-h-[44px]">
            Full quote tool
          </Link>
        </section>
      </PageShell>
    </>
  );
}
