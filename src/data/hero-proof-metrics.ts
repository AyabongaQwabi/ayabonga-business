/** Real proof points for hero metric strips — checkable facts, not decoration. */

export type HeroProofMetric = {
  value: string;
  label: string;
  href?: string;
  external?: boolean;
};

export const HERO_PROOF_METRICS: HeroProofMetric[] = [
  {
    value: '7 DAYS',
    label: 'Ilithiyana Academics full platform rebuild',
    href: '/case-studies/ilithiyana',
  },
  {
    value: 'R50,400',
    label: 'Delivered price, enrolment to PayFast',
    href: '/case-studies/ilithiyana',
  },
  {
    value: '976',
    label: 'Bursaries indexed in Fundibot',
    href: '/case-studies/fundibot',
  },
  {
    value: 'R300/hr',
    label: 'Transparent quote estimator rate',
    href: '/get-a-quote',
  },
];
