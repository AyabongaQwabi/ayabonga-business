import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  BUILD_TO_RETAINER_BRIDGE,
  BUILD_TO_RETAINER_BRIDGE_ROWS,
  type BuildRetainerBridgeRow,
} from '../data/build-retainer-bridge';
import { RETAINER_TIERS } from '../data/pricing-strategy';
import {
  APP_DEVELOPMENT_COST_PAGE,
  PRICING_STRATEGY_PAGE,
} from '../lib/site-config';

type BuildToRetainerBridgeProps = {
  id?: string;
  showSmmeCallout?: boolean;
  showCostGuideLink?: boolean;
};

function tierName(tierId: BuildRetainerBridgeRow['retainerTierId']): string {
  return RETAINER_TIERS.find((t) => t.id === tierId)?.name ?? tierId;
}

export function BuildToRetainerBridge({
  id = 'build-to-retainer',
  showSmmeCallout = true,
  showCostGuideLink = true,
}: BuildToRetainerBridgeProps) {
  return (
    <section id={id} className="scroll-mt-24" aria-labelledby={`${id}-heading`}>
      <h2
        id={`${id}-heading`}
        className="font-display font-bold text-text-primary mb-3"
        style={{ fontSize: 'var(--type-heading-lg)', lineHeight: 'var(--leading-heading)' }}
      >
        {BUILD_TO_RETAINER_BRIDGE.heading}
      </h2>
      <p className="text-text-secondary leading-relaxed max-w-3xl mb-4">
        {BUILD_TO_RETAINER_BRIDGE.intro}
      </p>
      {showSmmeCallout ? (
        <p className="text-sm text-text-primary/90 leading-relaxed max-w-3xl mb-8 p-4 rounded-xl border border-accent-emerald/30 bg-accent-emerald/5">
          {BUILD_TO_RETAINER_BRIDGE.smmeCallout}
        </p>
      ) : (
        <div className="mb-8" aria-hidden />
      )}

      <BridgeTableDesktop rows={BUILD_TO_RETAINER_BRIDGE_ROWS} />
      <BridgeTableMobile rows={BUILD_TO_RETAINER_BRIDGE_ROWS} />

      <p className="mt-4 text-xs text-text-muted leading-relaxed max-w-3xl">
        {BUILD_TO_RETAINER_BRIDGE.planningNote}
      </p>

      {showCostGuideLink ? (
        <p className="mt-6 text-sm text-text-secondary">
          <Link
            to={APP_DEVELOPMENT_COST_PAGE}
            className="inline-flex items-center gap-1.5 text-accent-gold font-medium hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)] rounded-sm"
          >
            Full 2026 build ranges by product type
            <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
          <span className="mx-2 text-text-muted" aria-hidden>
            ·
          </span>
          <Link
            to={`${PRICING_STRATEGY_PAGE}#tiers`}
            className="text-accent-gold font-medium hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-gold)] rounded-sm"
          >
            Retainer tier details
          </Link>
        </p>
      ) : null}
    </section>
  );
}

function BridgeTableDesktop({ rows }: { rows: BuildRetainerBridgeRow[] }) {
  return (
    <div className="hidden lg:block overflow-x-auto rounded-xl border border-surface-border bg-surface-raised">
      <table className="w-full text-left font-technical border-collapse min-w-[720px]">
        <caption className="sr-only">
          How typical South African build budgets map to Essential, Growth, and Ecosystem retainer
          tiers
        </caption>
        <thead>
          <tr className="border-b border-surface-border">
            <th
              scope="col"
              className="p-4 text-xs font-semibold uppercase tracking-wider text-text-muted"
            >
              Typical launch spend
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-semibold uppercase tracking-wider text-text-muted"
            >
              Product shape
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-semibold uppercase tracking-wider text-text-muted"
            >
              Starting retainer
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-semibold uppercase tracking-wider text-text-muted"
            >
              What to expect
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-surface-border last:border-0">
              <td className="p-4 align-top">
                <p className="font-semibold text-text-primary whitespace-nowrap">
                  {row.buildRangeLabel}
                </p>
                <p className="text-xs text-text-muted mt-1">{row.buildSourceNote}</p>
                {row.smmeFit ? (
                  <span className="mt-2 inline-block text-xs font-semibold text-accent-emerald">
                    Common SMME path
                  </span>
                ) : null}
              </td>
              <td className="p-4 align-top text-sm text-text-secondary leading-relaxed">
                {row.productExamples}
              </td>
              <td className="p-4 align-top">
                <p className="font-display font-bold text-text-primary">
                  {tierName(row.retainerTierId)}
                </p>
                <p className="text-sm text-accent-gold mt-1">{row.retainerFromLabel}</p>
              </td>
              <td className="p-4 align-top text-sm text-text-secondary leading-relaxed">
                {row.guidance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BridgeTableMobile({ rows }: { rows: BuildRetainerBridgeRow[] }) {
  return (
    <div className="lg:hidden space-y-4">
      {rows.map((row) => (
        <article
          key={row.id}
          className={`rounded-xl border p-5 bg-surface-raised ${
            row.smmeFit ? 'border-accent-emerald/35' : 'border-surface-border'
          }`}
        >
          {row.smmeFit ? (
            <span className="mb-3 inline-block text-xs font-semibold text-accent-emerald">
              Common SMME path
            </span>
          ) : null}
          <p className="font-display font-bold text-text-primary text-lg">{row.buildRangeLabel}</p>
          <p className="text-xs text-text-muted mt-1">{row.buildSourceNote}</p>
          <dl className="mt-4 space-y-3 text-sm">
            <BridgeDl label="Product shape">{row.productExamples}</BridgeDl>
            <BridgeDl label="Starting retainer">
              <span className="font-semibold text-text-primary">{tierName(row.retainerTierId)}</span>
              <span className="block text-accent-gold mt-0.5">{row.retainerFromLabel}</span>
            </BridgeDl>
            <BridgeDl label="What to expect">{row.guidance}</BridgeDl>
          </dl>
        </article>
      ))}
    </div>
  );
}

function BridgeDl({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
        {label}
      </dt>
      <dd className="text-text-secondary leading-relaxed">{children}</dd>
    </div>
  );
}
