import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { APP_DEVELOPMENT_COST_PAGE } from '../lib/site-config';

const teasers = [
  {
    label: 'Mobile app development',
    range: 'R100k – R600k',
    detail: 'One platform MVP through iOS + Android production',
    hash: 'mobile',
  },
  {
    label: 'Business systems & custom software',
    range: 'R80k – R500k',
    detail: 'CRM, payroll, inventory, HR, and fleet workflows',
    hash: 'business-ops',
  },
  {
    label: 'Ecommerce & marketplaces',
    range: 'R120k – R950k',
    detail: 'Storefront MVPs through multi-vendor platforms',
    hash: 'ecommerce',
  },
] as const;

export function CostGuideTeaser() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        {teasers.map(({ label, range, detail, hash }) => (
          <Link
            key={hash}
            to={`${APP_DEVELOPMENT_COST_PAGE}#${hash}`}
            className="interactive-card group flex flex-col p-5 rounded-2xl border border-border bg-card hover:border-primary/40"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Ballpark build
            </p>
            <h3 className="font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
              {label}
            </h3>
            <p className="mt-2 text-xl font-bold text-foreground tracking-tight">{range}</p>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed flex-1">{detail}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary">
              View breakdown
              <ArrowRight
                className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform motion-reduce:group-hover:translate-x-0"
                aria-hidden
              />
            </span>
          </Link>
        ))}
      </div>
      <p className="text-sm text-muted-foreground text-center md:text-left">
        Ranges are scoped with founders after a technical review, not checkout prices.{' '}
        <Link
          to={APP_DEVELOPMENT_COST_PAGE}
          className="text-primary font-medium hover:underline underline-offset-4"
        >
          Full app development cost guide (2026)
        </Link>
      </p>
    </div>
  );
}
