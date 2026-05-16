import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft,
  ArrowRight,
  Layers,
  MessageCircle,
  Shield,
  Sparkles,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { RetainerPricingCards } from '../components/RetainerPricingCards';
import { SiteFooter } from '../components/SiteFooter';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import {
  PARTNERSHIP_PILLARS,
  PRICING_FACTORS,
  PRICING_FAQ,
  RETAINER_TIERS,
} from '../data/pricing-strategy';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
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

export default function PricingStrategyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
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

      <nav className="border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            Home
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] text-white text-sm font-semibold hover:bg-[#128C7E] transition-colors"
          >
            <MessageCircle className="w-4 h-4" aria-hidden />
            WhatsApp
          </a>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto px-6">
        <header className="pt-14 pb-12 md:pt-20 md:pb-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Subscription-first partnership
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] text-balance">
            Pricing that follows the responsibility you hand over
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            I do not sell one-off gigs or quote factories. I take ongoing ownership of your
            systems: maintain them, improve them, debug them, integrate them, and evolve them as
            your business changes. Monthly retainers scale with technical complexity and operational
            load, not with how many pages a brochure has.
          </p>
        </header>

        <section className="py-12 border-t border-border">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">How retainers are sized</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRICING_FACTORS.map(({ title, copy }) => (
              <div
                key={title}
                className="p-5 rounded-2xl border border-border bg-card hover:border-primary/25 transition-colors"
              >
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 border-t border-border">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="p-6 md:p-8 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Layers className="w-5 h-5" aria-hidden />
                <h2 className="text-xl font-bold text-foreground">Lower-complexity systems</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Cheaper monthly packages fit products with slower change, fewer integrations, and a
                lighter cloud footprint.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                {RETAINER_TIERS[0].systemExamples.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="p-6 md:p-8 rounded-2xl border border-primary/30 bg-primary/5">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Sparkles className="w-5 h-5" aria-hidden />
                <h2 className="text-xl font-bold text-foreground">Higher-complexity ecosystems</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Premium retainers match platforms where downtime costs money, releases are frequent,
                and infrastructure must stay ahead of growth.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                {RETAINER_TIERS[2].systemExamples.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="tiers" className="py-12 md:py-16 border-t border-border scroll-mt-24">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Monthly partnership tiers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Three starting points. We confirm tier and scope after a technical review of your
              stack, roadmap, and support expectations.
            </p>
          </div>
          <RetainerPricingCards />
        </section>

        <section className="py-12 border-t border-border">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">What you get as a partner</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {PARTNERSHIP_PILLARS.map(({ title, copy }) => (
              <div key={title} className="p-6 rounded-2xl border border-border bg-card">
                <Shield className="w-8 h-8 text-primary mb-4" aria-hidden />
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 border-t border-border max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">Common questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {PRICING_FAQ.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="py-16 md:py-20 border-t border-border">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-12 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">Plan your product partnership</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              WhatsApp is the fastest path. Share what you run today, what breaks, and where you
              need the product to be in six months.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#128C7E] transition-colors"
              >
                <MessageCircle className="w-5 h-5" aria-hidden />
                Discuss your product
              </a>
              <Link
                to="/technical-cofounder"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-border rounded-xl font-semibold hover:border-primary/40 transition-colors"
              >
                Technical co-founder model
                <ArrowRight className="w-4 h-4" aria-hidden />
              </Link>
            </div>
            <p className="mt-8 text-xs text-muted-foreground">
              Greenfield build? Use the optional{' '}
              <Link to={QUOTE_PAGE} className="text-primary hover:underline underline-offset-4">
                {QUOTE_TOOL_LABEL}
              </Link>{' '}
              for a rough scope ballpark before we talk retainers.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
