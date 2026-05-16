import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRICING_STRATEGY_PAGE } from '../lib/site-config';

type LeadMagnetCardProps = {
  title?: string;
  description?: string;
  ctaLabel?: string;
  /** Defaults to retainer pricing page. Use APP_DEVELOPMENT_COST_PAGE for the cost guide lead magnet. */
  to?: string;
};

export function LeadMagnetCard({
  title = 'Monthly retainer pricing',
  description =
    'See how partnership tiers scale with system complexity, integrations, and how fast your product must evolve.',
  ctaLabel = 'View retainer tiers',
  to = PRICING_STRATEGY_PAGE,
}: LeadMagnetCardProps) {
  return (
    <aside className="p-6 md:p-8 rounded-2xl border border-primary/20 bg-primary/5">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{description}</p>
      <Link
        to={to}
        className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {ctaLabel}
        <ArrowRight className="w-4 h-4" aria-hidden />
      </Link>
    </aside>
  );
}
