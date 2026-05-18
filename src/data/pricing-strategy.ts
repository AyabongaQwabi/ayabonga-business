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
    bestFor:
      'South African SMMEs, MVPs, internal tools, and marketing sites that need a steady technical owner after launch',
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
      'Product iteration with a dedicated engineering team',
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
    copy: 'We stay with the system after launch. Maintenance, debugging, and improvements are part of the relationship, not a surprise invoice.',
  },
  {
    title: 'Business-first engineering',
    copy: 'Decisions favour revenue, operations, and risk. We will tell you when a feature should wait and when infrastructure matters more than polish.',
  },
  {
    title: 'Operational continuity',
    copy: 'Monitoring, incident response, and a predictable release rhythm so your team is not firefighting every week.',
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
    question: 'What is the get-an-estimate tool for?',
    answer:
      'It is an optional ballpark for greenfield builds: platforms, payments, and timeline assumptions. Retainer pricing is agreed after a technical review, not generated automatically.',
  },
  {
    id: 'minimum-term',
    question: 'Is there a minimum commitment?',
    answer:
      'Most partnerships start with a three-month retainer so we can stabilise the system and establish a release rhythm. Shorter engagements are possible for rescues or audits.',
  },
  {
    id: 'after-build',
    question: 'How does launch spend relate to my monthly retainer?',
    answer:
      'A smaller, focused launch (often in the R120k – R350k band for a fundable MVP) usually pairs with Essential once the product is live. Heavier builds with payments, marketplaces, or constant releases move toward Growth or Ecosystem. The mapping table on this page uses the same ZAR bands as the 2026 app development cost guide.',
  },
  {
    id: 'rapid-build-faq',
    question: 'What is the AI-Powered Rapid Build and the Paid Scoping Sprint?',
    answer:
      'The AI-Powered Rapid Build is a next-generation engineering workflow that cuts both development timelines and cost by 50% through AI-assisted software production under strict human-architected quality gates. To start, we offer a 1-week Paid Scoping Sprint (ZAR 15,000) where we collaboratively map your requirements, database schema, and clickable wireframe. This R15,000 fee is credited back to you in full if you build the project with us.',
  },
] as const;

export const RAPID_BUILD_STRATEGY = {
  id: 'rapid-build',
  name: 'AI-Powered Rapid Build',
  description: 'Next-generation engineering workflow using AI-assisted software production and documentation-driven development, protected by strict human-architected quality gates.',
  multiplier: 0.5,
  savingPercent: 50,
  scopingSprintZar: 15000,
  scopingSprintRefundable: true,
  scopingSprintDeliverables: [
    'Comprehensive Product Requirements Document (PRD)',
    'Core Database and Schema Architectures',
    'Interactive Click-through Wireframe Blueprint',
    'Guaranteed Fixed-Scope Implementation Quote'
  ]
} as const;

