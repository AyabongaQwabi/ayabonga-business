export type RetainerTierId = 'essential' | 'growth' | 'ecosystem';

export type RetainerTier = {
  id: RetainerTierId;
  name: string;
  tagline: string;
  monthlyFromZar: string;
  bestFor: string;
  systemExamples: string[];
  characteristics: string[];
  includes: string[];
  highlighted?: boolean;
};

export const RETAINER_TIERS: RetainerTier[] = [
  {
    id: 'essential',
    name: 'Essential',
    tagline: 'Lightweight systems with predictable upkeep',
    monthlyFromZar: 'R18 000',
    bestFor: 'MVPs, internal tools, and marketing sites that need a steady technical owner',
    systemExamples: [
      'Landing pages and brochure sites',
      'Internal admin panels',
      'Lightweight mobile apps',
      'Early MVPs with minimal integrations',
    ],
    characteristics: [
      'Lower change velocity',
      'Fewer third-party integrations',
      'Simpler cloud footprint',
    ],
    includes: [
      'Uptime and error monitoring',
      'Bug fixes and security patches',
      'Small feature updates',
      'Basic support with clear response windows',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'Active product iteration for evolving businesses',
    monthlyFromZar: 'R45 000',
    bestFor: 'Products shipping features monthly and integrating payments or ops tools',
    systemExamples: [
      'Subscription products',
      'Booking and operations platforms',
      'Customer portals with payments',
      'WhatsApp automation with admin oversight',
    ],
    characteristics: [
      'Regular releases',
      'Multiple integrations',
      'Growing user and support load',
    ],
    includes: [
      'Continuous feature development',
      'Integration work (payments, CRM, messaging)',
      'Performance and UX improvements',
      'Analytics and conversion support',
      'Product iteration partnership',
    ],
    highlighted: true,
  },
  {
    id: 'ecosystem',
    name: 'Ecosystem',
    tagline: 'Complex platforms that cannot afford downtime',
    monthlyFromZar: 'R85 000',
    bestFor: 'Multi-app platforms, marketplaces, and cloud-heavy products',
    systemExamples: [
      'Marketplaces and logistics networks',
      'Fintech and multi-sided platforms',
      'AI-powered products',
      'Real-time systems across web and mobile',
    ],
    characteristics: [
      'Continuous deployment',
      'Infrastructure and scaling responsibility',
      'High support and incident load',
    ],
    includes: [
      'Multi-system architecture ownership',
      'Cloud infrastructure and cost discipline',
      'AI and data integrations',
      'Scaling, reliability, and incident response',
      'Operational engineering and advanced support',
    ],
  },
];

export const PRICING_FACTORS = [
  {
    title: 'System complexity',
    copy: 'Data models, roles, workflows, and how many moving parts must stay in sync.',
  },
  {
    title: 'Maintenance burden',
    copy: 'How often production breaks, how much legacy exists, and how fast you need fixes.',
  },
  {
    title: 'Support load',
    copy: 'User volume, SLAs, on-call expectations, and how much hand-holding the business needs.',
  },
  {
    title: 'Integrations',
    copy: 'Payments, ERP, messaging, identity, webhooks, and third-party APIs that must not fail quietly.',
  },
  {
    title: 'Cloud infrastructure',
    copy: 'Environments, observability, backups, and the cost of running at scale in South Africa.',
  },
  {
    title: 'Product evolution',
    copy: 'Roadmap velocity, experiments, and whether you are maintaining or actively growing the product.',
  },
] as const;

export const PARTNERSHIP_PILLARS = [
  {
    title: 'Long-term ownership',
    copy: 'I stay with the system after launch. Maintenance, debugging, and improvements are part of the relationship, not a surprise invoice.',
  },
  {
    title: 'Business-first engineering',
    copy: 'Decisions favour revenue, operations, and risk. I will tell you when a feature should wait and when infrastructure matters more than polish.',
  },
  {
    title: 'Operational continuity',
    copy: 'Monitoring, incident response, and predictable release rhythm so your team is not firefighting every week.',
  },
] as const;

export const PRICING_FAQ = [
  {
    id: 'retainer-vs-project',
    question: 'How is a monthly retainer different from a once-off build?',
    answer:
      'A once-off build hands you software and walks away. A retainer keeps a senior engineer responsible for the live product: fixes, integrations, releases, and architecture as the business changes. Most founders who outgrow junior builds need the second model.',
  },
  {
    id: 'how-priced',
    question: 'How do you decide which tier fits?',
    answer:
      'We map your stack, integrations, release cadence, and support expectations. Simpler systems with low operational load sit in Essential. Platforms with payments, multiple apps, or constant feature work sit in Growth or Ecosystem.',
  },
  {
    id: 'quote-tool',
    question: 'What is the project scope estimator for?',
    answer:
      'It is an optional ballpark for greenfield builds: platforms, payments, and timeline assumptions. Retainer pricing is agreed after a technical review, not generated automatically.',
  },
  {
    id: 'minimum-term',
    question: 'Is there a minimum commitment?',
    answer:
      'Most partnerships start with a three-month retainer so we can stabilise the system and establish a release rhythm. Shorter engagements are possible for rescues or audits.',
  },
] as const;
