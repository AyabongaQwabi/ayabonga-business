import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { BuildToRetainerBridge } from '../components/BuildToRetainerBridge';
import { RetainerPricingCards } from '../components/RetainerPricingCards';
import { PageShell } from '../components/layout/PageShell';
import {
  PARTNERSHIP_PILLARS,
  PRICING_FACTORS,
  PRICING_FAQ,
  RETAINER_TIERS,
} from '../data/pricing-strategy';
import { BookDiscoveryCallButton } from '../components/shared/BookDiscoveryCallButton';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  GET_ESTIMATE_LABEL,
  PARTNERSHIP_CTA_LABEL,
  PRICING_STRATEGY_PAGE,
  QUOTE_PAGE,
  QUOTE_TOOL_LABEL,
  SITE_NAME,
  TWITTER_HANDLE,
  WHATSAPP_URL,
} from '../lib/site-config';

const PAGE_TITLE = 'Retainer pricing for long-term product partnership';
const PAGE_DESCRIPTION =
  'Monthly engineering retainers scaled to system complexity, maintenance load, integrations, and how fast your product must evolve. Essential, Growth, and Ecosystem tiers for South African founders.';

const COMPARISON_ROWS: { label: string; key: 'monthlyFromZar' | 'bestFor' | 'includes' | 'characteristics' }[] = [
  { label: 'Monthly from', key: 'monthlyFromZar' },
  { label: 'Best for', key: 'bestFor' },
  { label: 'Includes', key: 'includes' },
  { label: 'Complexity signals', key: 'characteristics' },
];

function ComparisonCell({
  tier,
  rowKey,
}: {
  tier: (typeof RETAINER_TIERS)[number];
  rowKey: (typeof COMPARISON_ROWS)[number]['key'];
}) {
  if (rowKey === 'monthlyFromZar') {
    return (
      <span className="font-display font-bold text-text-primary text-lg">
        {tier.monthlyFromZar}
        <span className="text-text-secondary text-sm font-technical font-normal"> / month</span>
      </span>
    );
  }
  if (rowKey === 'bestFor') {
    return <p className="text-sm text-text-secondary leading-relaxed">{tier.bestFor}</p>;
  }
  if (rowKey === 'includes') {
    return (
      <ul className="text-sm text-text-secondary space-y-1.5">
        {tier.includes.map((item) => (
          <li key={item} className="flex gap-2 leading-relaxed">
            <Check className="w-4 h-4 text-accent-emerald shrink-0 mt-0.5" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="text-sm text-text-secondary space-y-1">
      {tier.characteristics.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function PricingStrategyPage() {
  return (
    <>
      <Helmet>
        <title>{`${PAGE_TITLE} | ${SITE_NAME}`}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={absoluteUrl(PRICING_STRATEGY_PAGE)} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl(PRICING_STRATEGY_PAGE)} />
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
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: PRICING_FAQ.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          })}
        </script>
      </Helmet>

      <PageShell
        className="bg-surface-base text-text-primary font-technical"
        mainClassName="flex-1 pt-[4.5rem]"
      >
        <header className="container w-full pt-14 pb-12 md:pt-20 md:pb-16">
          <p className="section-label mb-4">Subscription-first partnership</p>
          <h1
            className="font-display font-black text-text-primary text-balance max-w-4xl"
            style={{
              fontSize: 'var(--type-display-lg)',
              lineHeight: 'var(--leading-display)',
              letterSpacing: '-0.03em',
            }}
          >
            Pricing that follows the responsibility you hand over
          </h1>
          <p
            className="mt-6 max-w-3xl text-text-secondary leading-relaxed"
            style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
          >
            I do not sell one-off gigs or quote factories. I take ongoing ownership of your
            systems: maintain them, improve them, debug them, integrate them, and evolve them as
            your business changes. Monthly retainers scale with technical complexity and operational
            load, not with how many pages a brochure has.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary min-h-[44px]">
              <MessageCircle className="w-5 h-5 shrink-0" aria-hidden />
              Message on WhatsApp
            </a>
            <Link to={QUOTE_PAGE} className="btn-outline min-h-[44px]">
              {QUOTE_TOOL_LABEL}
            </Link>
          </div>
          <p className="mt-4 text-sm text-text-muted max-w-2xl leading-relaxed">
            Share what you run today, what breaks, and where the product needs to be in six months.
            If we fit, I send a written proposal with retainer tier and first priorities.
          </p>
        </header>

        <section className="container py-12 border-t border-surface-border">
          <h2
            className="font-display font-bold text-text-primary mb-8"
            style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
          >
            How retainers are sized
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRICING_FACTORS.map(({ title, copy }) => (
              <div
                key={title}
                className="p-5 rounded-xl border border-surface-border bg-surface-raised"
              >
                <h3 className="font-semibold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container py-12 md:py-16 border-t border-surface-border">
          <BuildToRetainerBridge />
        </section>

        <section id="tiers" className="container py-12 md:py-16 border-t border-surface-border scroll-mt-24">
          <div className="max-w-2xl mb-10">
            <h2
              className="font-display font-bold text-text-primary mb-3"
              style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
            >
              Monthly partnership tiers
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Three starting points. We confirm tier and scope after a technical review of your
              stack, roadmap, and support expectations.
            </p>
          </div>
          <RetainerPricingCards />
        </section>

        <section className="container py-12 md:py-16 border-t border-surface-border">
          <h2
            className="font-display font-bold text-text-primary mb-3"
            style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
          >
            Tier comparison
          </h2>
          <p className="text-text-secondary text-sm mb-8 max-w-2xl leading-relaxed">
            Side-by-side view of what changes as operational load and product ambition increase.
          </p>

          <div className="hidden lg:block overflow-x-auto rounded-xl border border-surface-border bg-surface-raised">
            <table className="w-full text-left font-technical border-collapse">
              <caption className="sr-only">
                Retainer tier comparison for Essential, Growth, and Ecosystem partnerships
              </caption>
              <thead>
                <tr className="border-b border-surface-border">
                  <th
                    scope="col"
                    className="p-4 text-xs font-semibold uppercase tracking-wider text-text-muted w-[140px]"
                  >
                    {' '}
                  </th>
                  {RETAINER_TIERS.map((tier) => (
                    <th
                      key={tier.id}
                      scope="col"
                      className="p-4 align-bottom border-l border-surface-border"
                    >
                      <span className="block font-display font-bold text-text-primary text-lg">
                        {tier.name}
                      </span>
                      {tier.highlighted ? (
                        <span className="mt-1 inline-block text-xs font-semibold text-accent-gold">
                          Most common
                        </span>
                      ) : null}
                      <span className="block text-sm text-text-muted mt-1">{tier.tagline}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.key} className="border-b border-surface-border last:border-0">
                    <th
                      scope="row"
                      className="p-4 text-sm font-semibold text-text-primary align-top"
                    >
                      {row.label}
                    </th>
                    {RETAINER_TIERS.map((tier) => (
                      <td
                        key={tier.id}
                        className="p-4 align-top border-l border-surface-border text-text-secondary"
                      >
                        <ComparisonCell tier={tier} rowKey={row.key} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:hidden space-y-4">
            {RETAINER_TIERS.map((tier) => (
              <article
                key={tier.id}
                className={`rounded-xl border p-5 bg-surface-raised ${
                  tier.highlighted ? 'border-accent-gold/40' : 'border-surface-border'
                }`}
              >
                <h3 className="font-display font-bold text-text-primary text-lg">{tier.name}</h3>
                <p className="text-sm text-text-muted mt-1">{tier.tagline}</p>
                <dl className="mt-4 space-y-4">
                  {COMPARISON_ROWS.map((row) => (
                    <div key={row.key}>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                        {row.label}
                      </dt>
                      <dd>
                        <ComparisonCell tier={tier} rowKey={row.key} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="container py-12 border-t border-surface-border">
          <h2
            className="font-display font-bold text-text-primary mb-8"
            style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
          >
            What you get as a partner
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {PARTNERSHIP_PILLARS.map(({ title, copy }) => (
              <div
                key={title}
                className="p-6 rounded-xl border border-surface-border bg-surface-raised"
              >
                <h3 className="font-semibold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container w-full py-12 border-t border-surface-border">
          <h2
            className="font-display font-bold text-text-primary mb-6 max-w-2xl"
            style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
          >
            Common questions
          </h2>
          <Accordion type="single" collapsible className="w-full max-w-none">
            {PRICING_FAQ.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-surface-border">
                <AccordionTrigger className="text-left text-text-primary hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="container py-16 md:py-20 border-t border-surface-border">
          <div className="rounded-xl border border-surface-border bg-surface-raised p-8 md:p-12 text-center max-w-2xl mx-auto">
            <h2
              className="font-display font-bold text-text-primary mb-3"
              style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
            >
              Plan your product partnership
            </h2>
            <p className="text-text-secondary leading-relaxed mb-8">
              WhatsApp is the fastest path. Share what you run today, what breaks, and where you
              need the product to be in six months.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
              <Link to={QUOTE_PAGE} className="btn-primary min-h-[44px]">
                {GET_ESTIMATE_LABEL}
              </Link>
              <BookDiscoveryCallButton variant="outline" />
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline min-h-[44px]"
              >
                <MessageCircle className="w-5 h-5" aria-hidden />
                WhatsApp
              </a>
              <Link to={QUOTE_PAGE} className="btn-outline min-h-[44px] text-sm">
                {QUOTE_TOOL_LABEL}
              </Link>
            </div>
            <p className="mt-8 text-xs text-text-muted">
              Greenfield build? Use the optional{' '}
              <Link
                to={QUOTE_PAGE}
                className="text-accent-gold hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)] rounded-sm"
              >
                {QUOTE_TOOL_LABEL}
              </Link>{' '}
              for a rough scope ballpark before we talk retainers.
            </p>
            <p className="mt-4">
              <Link
                to="/technical-cofounder"
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)] rounded-sm"
              >
                Technical co-founder model
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            </p>
          </div>
        </section>
      </PageShell>
    </>
  );
}
