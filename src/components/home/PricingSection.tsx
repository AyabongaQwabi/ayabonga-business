import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RetainerPricingCards } from '../RetainerPricingCards';
import { BUILD_TO_RETAINER_BRIDGE } from '../../data/build-retainer-bridge';
import { PRICING_STRATEGY_PAGE } from '../../lib/site-config';
import { BookDiscoveryCallButton } from '../shared/BookDiscoveryCallButton';

const BRIDGE_SECTION_PATH = `${PRICING_STRATEGY_PAGE}#build-to-retainer`;

/**
 * Evaluation zone: static render only. No ScrollReveal or scroll-reveal classes.
 */
export function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 border-t border-surface-border scroll-mt-24">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div className="max-w-2xl">
            <p className="section-label mb-3">Post-launch · SMME (small, medium, micro enterprise)</p>
            <h2
              className="font-display font-bold text-text-primary mb-4"
              style={{
                fontSize: 'var(--type-display-md)',
                lineHeight: 'var(--leading-heading)',
                letterSpacing: '-0.02em',
              }}
            >
              Monthly retainers after your product is live
            </h2>
            <p
              className="text-text-secondary leading-relaxed"
              style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
            >
              {BUILD_TO_RETAINER_BRIDGE.smmeCallout}
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <Link
              to={BRIDGE_SECTION_PATH}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-gold hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-sm"
            >
              Launch budget → retainer mapping
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
            <Link
              to={PRICING_STRATEGY_PAGE}
              className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-text-primary hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-sm"
            >
              Full retainer philosophy
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed max-w-3xl mb-10">
          Most South African SMME teams start on{' '}
          <span className="font-semibold text-text-primary">Essential</span> once an MVP or internal
          tool is in production. Growth and Ecosystem are for heavier payments, integrations, and
          release pressure.{' '}
          <Link
            to={BRIDGE_SECTION_PATH}
            className="text-accent-gold font-medium hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)] rounded-sm"
          >
            See how launch spend maps to each tier
          </Link>
          .
        </p>

        <RetainerPricingCards
          showSystemExamples={false}
          featuredTierId="essential"
          featuredBadge="Common SMME path"
        />

        <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
          <BookDiscoveryCallButton variant="primary" />
        </div>
      </div>
    </section>
  );
}
