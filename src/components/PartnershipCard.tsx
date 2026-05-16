import { Link } from 'react-router-dom';
import { ArrowRight, Handshake } from 'lucide-react';
import { PRICING_STRATEGY_PAGE } from '../lib/site-config';

export function PartnershipCard() {
  return (
    <aside className="p-6 md:p-8 rounded-2xl border border-primary/20 bg-primary/5">
      <div className="flex items-start gap-3 mb-3">
        <span className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
          <Handshake className="w-5 h-5 text-primary" aria-hidden />
        </span>
        <div>
          <h2 className="text-lg font-bold text-foreground">Monthly partnership, not a one-off handoff</h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Retainers cover monitoring, fixes, releases, and product iteration. Tier depends on how
            complex your stack is and how fast the business needs to move.
          </p>
        </div>
      </div>
      <Link
        to={PRICING_STRATEGY_PAGE}
        className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        View retainer pricing
        <ArrowRight className="w-4 h-4" aria-hidden />
      </Link>
    </aside>
  );
}
