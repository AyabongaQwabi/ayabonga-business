import { ArrowRight, RefreshCw, Shield, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PARTNERSHIP_PILLARS } from '../../data/pricing-strategy';
import { PRICING_STRATEGY_PAGE } from '../../lib/site-config';
import { MarketingSection } from '../shared/MarketingSection';
import { SectionLabel } from '../shared/SectionLabel';

const partnershipIcons = [RefreshCw, Wrench, Shield] as const;

export function PartnershipSection() {
  return (
    <MarketingSection id="partnership">
      <SectionLabel className="mb-3">Partnership</SectionLabel>
      <h2
        className="font-display font-bold text-text-primary mb-4"
        style={{
          fontSize: 'var(--type-display-md)',
          lineHeight: 'var(--leading-heading)',
          letterSpacing: '-0.02em',
        }}
      >
        How the partnership works
      </h2>
      <p
        className="text-text-secondary max-w-2xl mb-8 md:mb-10"
        style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
      >
        You get a single accountable senior engineer, not a rotating agency bench. Work is
        continuous: stabilise what you have, ship what you need next, and keep the system
        reliable while the business moves.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {PARTNERSHIP_PILLARS.map(({ title, copy }, index) => {
          const Icon = partnershipIcons[index] ?? Shield;
          return (
            <article
              key={title}
              className="service-card service-card--compact scroll-reveal flex flex-col"
            >
              <Icon className="w-7 h-7 text-accent-gold mb-3" aria-hidden />
              <h3
                className="font-display font-semibold text-text-primary mb-2"
                style={{ fontSize: 'var(--type-heading-sm)' }}
              >
                {title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">{copy}</p>
            </article>
          );
        })}
      </div>

      <p className="mt-8">
        <Link
          to={PRICING_STRATEGY_PAGE}
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent-gold hover:underline underline-offset-4"
        >
          Retainer tiers and pricing philosophy
          <ArrowRight className="w-4 h-4" aria-hidden />
        </Link>
      </p>
    </MarketingSection>
  );
}
