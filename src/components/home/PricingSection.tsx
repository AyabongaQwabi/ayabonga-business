import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RetainerPricingCards } from '../RetainerPricingCards';
import { PRICING_STRATEGY_PAGE } from '../../lib/site-config';

/**
 * Evaluation zone: static render only. No ScrollReveal or scroll-reveal classes.
 */
export function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 border-t border-surface-border scroll-mt-24">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <p className="section-label mb-3">Retainer pricing</p>
            <h2
              className="font-display font-bold text-text-primary mb-4"
              style={{
                fontSize: 'var(--type-display-md)',
                lineHeight: 'var(--leading-heading)',
                letterSpacing: '-0.02em',
              }}
            >
              Monthly retainer tiers
            </h2>
            <p
              className="text-text-secondary"
              style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
            >
              After launch, most clients move to retainers for maintenance, features, and
              integrations. Pricing scales with system complexity and how fast your product must
              evolve.
            </p>
          </div>
          <Link
            to={PRICING_STRATEGY_PAGE}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-gold hover:underline underline-offset-4 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-sm"
          >
            Full pricing philosophy
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
        <RetainerPricingCards showSystemExamples={false} />
      </div>
    </section>
  );
}
