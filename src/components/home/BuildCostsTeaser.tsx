import { CostGuideTeaser } from '../CostGuideTeaser';

export function BuildCostsTeaser() {
  return (
    <section id="build-costs" className="py-16 md:py-24 border-t border-surface-border scroll-mt-24">
      <div className="container">
        <p className="section-label mb-3">Build costs</p>
        <h2
          className="font-display font-bold text-text-primary mb-4"
          style={{
            fontSize: 'var(--type-display-md)',
            lineHeight: 'var(--leading-heading)',
            letterSpacing: '-0.02em',
          }}
        >
          What builds typically cost
        </h2>
        <p
          className="text-text-secondary max-w-2xl mb-10"
          style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
        >
          Ballpark ZAR (South African Rand) ranges for greenfield work in South Africa. Use these to
          sanity-check quotes, then open the full guide for timelines, tiers, and scope notes.
        </p>
        <CostGuideTeaser />
      </div>
    </section>
  );
}
