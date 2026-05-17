import { Check } from 'lucide-react';
import { RETAINER_TIERS, type RetainerTier } from '../data/pricing-strategy';
import { WHATSAPP_NUMBER } from '../lib/site-config';
import { cn } from '../lib/utils';

type RetainerPricingCardsProps = {
  showSystemExamples?: boolean;
};

function tierWhatsAppHref(tier: RetainerTier): string {
  const text = encodeURIComponent(
    `Hi Ayabonga, I am interested in the ${tier.name} retainer tier for ongoing product partnership. Can we discuss fit and scope?`,
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function RetainerPricingCards({ showSystemExamples = true }: RetainerPricingCardsProps) {
  return (
    <div className="grid lg:grid-cols-3 gap-5 lg:gap-6">
      {RETAINER_TIERS.map((tier) => (
        <article
          key={tier.id}
          className={cn(
            'relative flex flex-col rounded-2xl border p-5 md:p-6 transition-all duration-200 motion-reduce:transition-none',
            tier.highlighted
              ? 'border-accent-gold/55 bg-surface-raised ring-1 ring-accent-gold/30 lg:scale-[1.02] motion-reduce:lg:scale-100'
              : 'border-surface-border bg-surface-raised hover:border-accent-gold/25',
          )}
        >
          {tier.highlighted ? (
            <span className="mb-4 inline-flex self-start rounded-full bg-accent-gold px-3 py-1 text-xs font-semibold text-text-inverse">
              Most common
            </span>
          ) : null}

          <header
            className={cn(
              'mb-5 rounded-xl',
              tier.highlighted &&
                '-mx-1 -mt-1 mb-5 border border-accent-gold/20 bg-accent-gold/10 px-4 py-4 md:px-5',
            )}
          >
            <h3 className="font-display text-xl font-bold text-text-primary">{tier.name}</h3>
            <p className="mt-1 text-sm text-text-secondary">{tier.tagline}</p>
            <p className="mt-4">
              <span className="font-display text-3xl font-bold tracking-tight text-text-primary">
                {tier.monthlyFromZar}
              </span>
              <span className="text-sm text-text-secondary"> / month</span>
            </p>
            <p className="mt-2 text-xs leading-relaxed text-text-muted">
              From. Final retainer depends on technical review.
            </p>
          </header>

          <p className="mb-4 text-sm leading-relaxed text-text-secondary">{tier.bestFor}</p>

          {showSystemExamples ? (
            <div className="mb-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                Typical systems
              </p>
              <ul className="space-y-1.5 text-sm text-text-secondary">
                {tier.systemExamples.map((example) => (
                  <li key={example} className="leading-relaxed">
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <ul className="mb-6 flex-1 space-y-2.5">
            {tier.includes.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-text-primary/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-gold" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <a
            href={tierWhatsAppHref(tier)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex w-full items-center justify-center rounded-xl py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base',
              tier.highlighted
                ? 'btn-primary min-h-[44px]'
                : 'border border-surface-border bg-surface-base text-text-primary hover:border-accent-gold/40',
            )}
          >
            Discuss {tier.name}
          </a>
        </article>
      ))}
    </div>
  );
}
