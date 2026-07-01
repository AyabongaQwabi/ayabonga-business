import { Link } from 'react-router-dom';
import { HERO_PROOF_METRICS } from '../data/hero-proof-metrics';

const BLOCK_ACCENTS = [
  'bg-accent-emerald text-text-primary',
  'bg-accent-gold text-text-inverse',
  'bg-surface-overlay text-text-primary border-y border-surface-border',
  'bg-accent-emerald/90 text-text-primary',
] as const;

type HeroMetricStripProps = {
  className?: string;
};

export function HeroMetricStrip({ className = '' }: HeroMetricStripProps) {
  return (
    <div
      className={`hero-metric-strip -mx-4 sm:-mx-6 lg:-mx-8 ${className}`.trim()}
      role="list"
      aria-label="Shipped results"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 min-w-0">
        {HERO_PROOF_METRICS.map((metric, index) => {
          const accent = BLOCK_ACCENTS[index % BLOCK_ACCENTS.length];
          const inner = (
            <>
              <p
                className="hero-metric-value font-display font-black tracking-tight text-balance break-words"
                style={{
                  fontSize: 'clamp(1.5rem, 4.2vw, 2.75rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {metric.value}
              </p>
              <p className="mt-1.5 sm:mt-2 text-[0.6875rem] sm:text-xs lg:text-sm font-technical leading-snug opacity-90 text-pretty [overflow-wrap:anywhere]">
                {metric.label}
              </p>
            </>
          );

          const blockClass = `hero-metric-block flex flex-col justify-end min-w-0 min-h-[8.5rem] sm:min-h-[9.5rem] p-3 sm:p-4 lg:p-5 overflow-hidden ${accent}`;

          if (metric.href) {
            return (
              <Link
                key={metric.value}
                to={metric.href}
                role="listitem"
                className={`${blockClass} no-underline transition-colors hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent-gold`}
              >
                {inner}
              </Link>
            );
          }

          return (
            <div key={metric.value} role="listitem" className={blockClass}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
