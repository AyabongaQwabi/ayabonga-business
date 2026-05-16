import { Check } from 'lucide-react';
import { RETAINER_TIERS, type RetainerTier } from '../data/pricing-strategy';
import { WHATSAPP_NUMBER } from '../lib/site-config';

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
          className={`relative flex flex-col rounded-2xl border p-6 md:p-7 transition-all duration-200 motion-reduce:transition-none ${
            tier.highlighted
              ? 'border-primary/50 bg-primary/5 shadow-[0_0_40px_-12px_rgba(255,215,0,0.25)] lg:scale-[1.02] motion-reduce:lg:scale-100'
              : 'border-border bg-card hover:border-primary/30'
          }`}
        >
          {tier.highlighted ? (
            <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              Most common
            </span>
          ) : null}

          <header className="mb-5">
            <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{tier.tagline}</p>
            <p className="mt-4">
              <span className="text-3xl font-bold text-foreground tracking-tight">
                {tier.monthlyFromZar}
              </span>
              <span className="text-muted-foreground text-sm"> / month</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              From. Final retainer depends on technical review.
            </p>
          </header>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tier.bestFor}</p>

          {showSystemExamples ? (
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Typical systems
              </p>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                {tier.systemExamples.map((example) => (
                  <li key={example} className="leading-relaxed">
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <ul className="space-y-2.5 mb-6 flex-1">
            {tier.includes.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-foreground/90">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <a
            href={tierWhatsAppHref(tier)}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center w-full py-3 rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              tier.highlighted
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'border border-border bg-background hover:border-primary/40'
            }`}
          >
            Discuss {tier.name}
          </a>
        </article>
      ))}
    </div>
  );
}
