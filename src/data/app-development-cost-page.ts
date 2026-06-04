import type { BuyerIntentFaq, BuyerIntentSection } from './buyer-intent-pages';

export const APP_DEVELOPMENT_COST_PATH = '/app-development-cost-south-africa';

export const APP_DEVELOPMENT_COST_META_TITLE =
  'App Development Cost South Africa 2026 | ZAR Pricing Guide';

export const APP_DEVELOPMENT_COST_META_DESCRIPTION =
  'App development cost South Africa 2026: ZAR ranges for mobile MVPs, full products, web apps, and marketplaces. Compare quotes before you hire. Includes payments, WhatsApp automation, and retainers.';

export const APP_DEVELOPMENT_COST_KEYWORDS = [
  'app development cost south africa',
  'mobile app development services',
  'freelance app developers cost',
  'mvp developer south africa',
  'affordable app developers',
  'payment gateway integration south africa',
  'create mobile app',
];

export const APP_DEVELOPMENT_COST_H1 = 'App Development Cost South Africa 2026';

export const APP_DEVELOPMENT_COST_HERO =
  'Ballpark ZAR ranges for founders hiring in South Africa: mobile MVPs, full products, web apps, marketplaces, payments, and what happens after launch. These numbers are planning guides, not binding quotes.';

export const APP_DEVELOPMENT_COST_TRUST_POINTS = [
  {
    title: 'Scoped for South African reality',
    copy: 'Paystack, PayFast, Ozow, patchy connectivity, and POPIA-aware design belong in real quotes, not footnotes.',
  },
  {
    title: 'Senior-led delivery',
    copy: 'You work with the engineers who own architecture and production code, not a sales layer handing work to juniors.',
  },
  {
    title: 'Honest about the rewrite tax',
    copy: 'The cheapest quote often skips admin, webhooks, and ops. Fixing that later usually costs more than building once with clear scope.',
  },
] as const;

export const APP_DEVELOPMENT_COST_SECTIONS: BuyerIntentSection[] = [
  {
    id: 'how-to-use',
    heading: 'How to use this guide',
    paragraphs: [
      'Use the tables below to sanity-check proposals. If a quote is far below these bands, ask what is excluded: payments, admin, notifications, monitoring, and who maintains the system after launch.',
      'For a scoped ballpark on your idea, use the estimate tool or message us on WhatsApp with your must-have flows.',
    ],
  },
  {
    id: 'freelance-cost',
    heading: 'Freelance app developers cost in South Africa',
    paragraphs: [
      'Freelance day rates in 2026 often land between roughly R800 and R2 500+ per hour equivalent, depending on seniority and whether they have shipped payments, marketplaces, or regulated data before.',
      'A low rate with junior execution is not affordable if you pay twice for a rewrite. Compare total cost to launch and six months of fixes, not just the first invoice.',
    ],
    bullets: [
      'Junior freelancer: cheaper upfront, higher risk on architecture and payments',
      'Senior freelancer or small product team: higher rate, fewer surprises in production',
      'Agency: adds project management and margin; more handoffs, slower decisions',
    ],
  },
  {
    id: 'affordable',
    heading: 'Affordable app developers without the lottery',
    paragraphs: [
      'Affordable should mean right-sized scope and maintainable code, not the lowest line item. A focused MVP with one payment path and basic admin is affordable. A full marketplace at MVP money is not.',
      'We would rather scope an honest MVP and a retainer that matches operational load than promise a full platform on a shoestring.',
    ],
  },
  {
    id: 'mvp-vs-production',
    heading: 'MVP vs production: different budget lines',
    paragraphs: [
      'An MVP proves demand and one critical workflow. Production means hardened auth, monitoring, role-based admin, reconciliation, support tooling, and load you have not felt yet.',
      'Founders who buy MVP scope but expect production behaviour usually fund two builds.',
    ],
  },
  {
    id: 'payments',
    heading: 'Payment gateway integration South Africa',
    paragraphs: [
      'Integrating Paystack, PayFast, Ozow, Stitch, or Yoco is more than a checkout button. Webhooks, failed payments, refunds, and reconciliation exports belong in the quote from day one.',
      'See the payment gateway table above for typical add-on or product bands. Your legal and compliance advisor still owns regulatory sign-off for financial products.',
    ],
  },
  {
    id: 'create-mobile',
    heading: 'What it costs to create a mobile app',
    paragraphs: [
      'To create a mobile app for South African users, budget for the app, a backend API, an admin view, store accounts, and at least one payment or booking flow if money changes hands in the product.',
      'Cross-platform (React Native / Expo / Flutter) is usually the right default unless you need NFC, heavy background work, or separate native teams long term.',
    ],
  },
  {
    id: 'hidden',
    heading: 'Costs quotes often skip',
    paragraphs: ['These line items separate a demo from something your ops team can run.'],
    bullets: [
      'Admin dashboards and manual overrides (refunds, disputes, provider approval)',
      'Notifications (SMS, email, push) and template management',
      'Multi-role permissions (customer, staff, partner, super-admin)',
      'Hosting, observability, backups, and on-call expectations',
      'App store fees, release pipelines, and OS compatibility each year',
      'Post-launch maintenance and security patches',
    ],
  },
];

export const APP_DEVELOPMENT_COST_FAQS: BuyerIntentFaq[] = [
  {
    question: 'How much does app development cost in South Africa in 2026?',
    answer:
      'Most serious mobile MVPs land between roughly R120k and R350k. Production apps with payments, admin, and both app stores often run R350k–R900k or more. Marketplaces and multi-sided platforms can exceed R600k before marketing spend.',
  },
  {
    question: 'What do mobile app development services include?',
    answer:
      'Typically product scoping, UX flows, API design, mobile client, basic admin, deployment, and store submission support. Excluded unless scoped: copywriting, legal compliance sign-off, paid ads, and long-term support after handoff.',
  },
  {
    question: 'Is a R50 000 app quote realistic?',
    answer:
      'It can work for a narrow prototype: landing site, simple forms, or a demo without production payments and role-based admin. It does not cover a full marketplace or fintech app with real money movement.',
  },
  {
    question: 'How do I find an MVP developer in South Africa?',
    answer:
      'Look for shipped work in your domain (payments, bookings, marketplaces), ask who writes production code, and request a written v1 scope. See the MVP developer page linked below for how we work with founders.',
  },
  {
    question: 'Do I need a monthly retainer after launch?',
    answer:
      'If the product is the business, yes. Security updates, OS changes, dependency drift, and small features do not stop at launch. Retainers start from roughly R18k per month for light systems and scale up for active platforms.',
  },
];

export const APP_DEVELOPMENT_COST_RELATED = [
  { label: 'Home', path: '/' },
  { label: 'Engineering services', path: '/services' },
  { label: 'MVP developer South Africa', path: '/mvp-developer-south-africa' },
  { label: 'Retainer pricing', path: '/pricing-strategy' },
  { label: 'Get an estimate', path: '/get-a-quote' },
] as const;
