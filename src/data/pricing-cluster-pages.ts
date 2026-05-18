import type { RetainerTierId } from './pricing-strategy';
import type { PricingTableBlock } from '../components/PricingTable';

export type PricingClusterRetainerOption = {
  tierId: RetainerTierId;
  /** Public-facing name (maps to RETAINER_TIERS). */
  displayName: string;
  fitNote: string;
};

export type PricingClusterCostDriver = {
  title: string;
  copy: string;
};

export type PricingClusterProjectType = {
  name: string;
  rangeZar: string;
  summary: string;
  timeline?: string;
};

export type PricingClusterPageConfig = {
  slug: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  heroSubhead: string;
  introParagraph: string;
  costDrivers: PricingClusterCostDriver[];
  projectTypes: PricingClusterProjectType[];
  projectTypesHeading: string;
  projectTypesIntro?: string;
  retainerOptions: PricingClusterRetainerOption[];
  retainerSectionIntro: string;
  pricingTables?: PricingTableBlock[];
  faqs: { question: string; answer: string }[];
  relatedLinks: { label: string; path: string }[];
};

/** Display names for RETAINER_TIERS on cluster pricing pages. */
export const CLUSTER_RETAINER_DISPLAY_NAMES: Record<RetainerTierId, string> = {
  essential: 'Build & Support Retainer',
  growth: 'Product Growth Retainer',
  ecosystem: 'AI Systems Retainer',
};

export const PRICING_CLUSTER_PAGES: PricingClusterPageConfig[] = [
  {
    slug: 'software-development-pricing',
    path: '/software-development-pricing',
    metaTitle: 'Custom Software Development Pricing South Africa | ZAR Ranges',
    metaDescription:
      '2026 ZAR ranges for custom software, CRM, operations tools, and internal platforms in South Africa. Cost drivers, project types, and retainer options after launch.',
    keywords: [
      'custom software development pricing south africa',
      'software development cost zar',
      'crm development cost',
      'business software quote south africa',
    ],
    eyebrow: 'South Africa · ZAR · Custom software',
    h1: 'Custom software development pricing',
    heroSubhead:
      'Ballpark build ranges for operational software: CRM, inventory, HR, and platforms that run the business. Planning numbers for founders and operators, not binding quotes.',
    introParagraph:
      'We scope custom software around workflows your team already uses, not a generic template. The ranges below reflect senior-led delivery, South African payment and compliance context, and what usually moves the price up or down.',
    costDrivers: [
      {
        title: 'Workflow depth',
        copy: 'How many roles, approval paths, and edge cases exist in day-to-day operations.',
      },
      {
        title: 'Data migration and legacy',
        copy: 'Spreadsheets, old databases, and one-off imports that must be clean on day one.',
      },
      {
        title: 'Integrations',
        copy: 'Accounting, ERP, WhatsApp, email, and webhooks that cannot fail quietly in production.',
      },
      {
        title: 'Reporting and audit',
        copy: 'Dashboards, exports, and trails required for finance, compliance, or franchise oversight.',
      },
      {
        title: 'Multi-site or franchise logic',
        copy: 'Branches, territories, and permissions that multiply entities and test cases.',
      },
      {
        title: 'Post-launch change rate',
        copy: 'Whether you need a steady release rhythm after launch or a stable system with light upkeep.',
      },
    ],
    projectTypesHeading: 'Typical custom software builds',
    projectTypesIntro:
      'Ranges assume discovery, architecture, staged delivery, and handover documentation. Hardware, licensed third-party products, and long compliance projects sit above these bands.',
    projectTypes: [
      {
        name: 'Focused internal tool',
        rangeZar: 'R80k – R180k',
        summary: 'One department, clear roles, exports, light integrations.',
        timeline: '6–9 weeks',
      },
      {
        name: 'Production operations platform',
        rangeZar: 'R180k – R450k',
        summary: 'CRM, inventory, or HR hub with automations and real integrations.',
        timeline: '3–5 months',
      },
      {
        name: 'Multi-branch or enterprise ops',
        rangeZar: 'R450k – R900k+',
        summary: 'Territories, audit trails, ERP feeds, high support load.',
        timeline: '6–10 months',
      },
    ],
    retainerSectionIntro:
      'After launch, most operational software needs a technical owner for fixes, integrations, and steady improvements. These retainer names match our monthly tiers on the pricing strategy page.',
    retainerOptions: [
      {
        tierId: 'essential',
        displayName: CLUSTER_RETAINER_DISPLAY_NAMES.essential,
        fitNote:
          'Light CRMs, internal tools, and marketing-adjacent admin once the core build is stable.',
      },
      {
        tierId: 'growth',
        displayName: CLUSTER_RETAINER_DISPLAY_NAMES.growth,
        fitNote:
          'Products shipping features monthly with payments, messaging, or growing user support.',
      },
      {
        tierId: 'ecosystem',
        displayName: CLUSTER_RETAINER_DISPLAY_NAMES.ecosystem,
        fitNote:
          'Multi-app platforms, heavy integrations, and systems that cannot afford long downtime.',
      },
    ],
    faqs: [
      {
        question: 'How is custom software pricing different from a website quote?',
        answer:
          'Websites sell and inform. Custom software runs operations: roles, workflows, integrations, and data that must stay correct under load. That is why ranges are wider and discovery matters more.',
      },
      {
        question: 'Do you price per screen or per feature?',
        answer:
          'We price against outcomes and operational risk: integrations, roles, reporting, and what must work on day one. Screen count alone is a weak proxy for cost.',
      },
      {
        question: 'What happens after the build?',
        answer:
          'Most clients move to a monthly retainer so fixes, security updates, and small features do not stall behind a new project quote. Build spend and retainer tier are agreed separately after a technical review.',
      },
    ],
    relatedLinks: [
      { label: 'App development cost guide (2026)', path: '/app-development-cost-south-africa' },
      { label: 'Monthly retainer pricing', path: '/pricing-strategy' },
      { label: 'Custom software development', path: '/custom-software-development-south-africa' },
    ],
  },
  {
    slug: 'saas-development-pricing',
    path: '/saas-development-pricing',
    metaTitle: 'SaaS Development Pricing South Africa | Subscription Product ZAR',
    metaDescription:
      'ZAR ranges for SaaS and subscription products in South Africa: MVPs, multi-tenant v1, billing, and post-launch retainers. Cost drivers and project types for founders.',
    keywords: [
      'saas development cost south africa',
      'subscription app development pricing',
      'mvp saas cost zar',
      'b2b saas development south africa',
    ],
    eyebrow: 'South Africa · ZAR · SaaS products',
    h1: 'SaaS development pricing',
    heroSubhead:
      'Planning ranges for subscription products: auth, billing, admin, and the first release customers can pay for. Built for South African payment rails and realistic MVP scope.',
    introParagraph:
      'SaaS pricing rises with tenancy model, billing complexity, and how much admin and support tooling you need on day one. We use staged delivery so you can validate revenue before funding a full platform.',
    costDrivers: [
      {
        title: 'Tenancy and permissions',
        copy: 'Single-tenant vs multi-tenant, org accounts, invites, and role matrices.',
      },
      {
        title: 'Billing and subscriptions',
        copy: 'Plans, trials, proration, invoices, and Paystack or card provider edge cases.',
      },
      {
        title: 'Onboarding and activation',
        copy: 'Signup flows, email verification, empty states, and time-to-first-value.',
      },
      {
        title: 'Admin and support tooling',
        copy: 'Impersonation, refunds, usage views, and internal ops your team needs at scale.',
      },
      {
        title: 'API and integration surface',
        copy: 'Webhooks, partner APIs, and third-party tools your customers expect to connect.',
      },
      {
        title: 'Reliability expectations',
        copy: 'Uptime targets, monitoring, and incident load once paying users depend on the product.',
      },
    ],
    projectTypesHeading: 'Typical SaaS build bands',
    projectTypes: [
      {
        name: 'Validation / waitlist product',
        rangeZar: 'R40k – R120k',
        summary: 'Auth, landing, waitlist or manual onboarding, no production billing.',
        timeline: '3–6 weeks',
      },
      {
        name: 'Fundable SaaS MVP',
        rangeZar: 'R120k – R350k',
        summary: 'Core loop, basic admin, one billing path, one tenant model.',
        timeline: '6–10 weeks',
      },
      {
        name: 'Production SaaS v1',
        rangeZar: 'R350k – R750k',
        summary: 'Subscriptions, roles, monitoring, growth hooks, stronger admin.',
        timeline: '3–6 months',
      },
      {
        name: 'Multi-tenant platform',
        rangeZar: 'R750k – R1.5m+',
        summary: 'Complex billing, marketplace or B2B2C, high integration load.',
        timeline: '6–12 months',
      },
    ],
    retainerSectionIntro:
      'Subscription products rarely stop changing after v1. Retainers keep billing, integrations, and releases owned by the same engineering team that built the system.',
    retainerOptions: [
      {
        tierId: 'essential',
        displayName: CLUSTER_RETAINER_DISPLAY_NAMES.essential,
        fitNote: 'Early SaaS with low change velocity and a small paying base.',
      },
      {
        tierId: 'growth',
        displayName: CLUSTER_RETAINER_DISPLAY_NAMES.growth,
        fitNote: 'Active roadmap, regular releases, and growing support expectations.',
      },
      {
        tierId: 'ecosystem',
        displayName: CLUSTER_RETAINER_DISPLAY_NAMES.ecosystem,
        fitNote: 'Multi-sided or platform SaaS with payments, APIs, and strict uptime needs.',
      },
    ],
    faqs: [
      {
        question: 'Should we build web-only SaaS first?',
        answer:
          'Often yes. A responsive web app with solid billing and admin is faster to iterate than dual native apps. We add mobile when the workflow demands it or retention data supports the spend.',
      },
      {
        question: 'Where do Paystack and subscriptions sit in the budget?',
        answer:
          'Payment integration, webhooks, and reconciliation are line items in MVP and v1 quotes. Provider fees and Meta or email SaaS costs are excluded from build ranges.',
      },
      {
        question: 'How do retainers relate to SaaS revenue?',
        answer:
          'Retainer tier tracks operational load: support volume, release cadence, and integration count. It is not a percentage of MRR (Monthly Recurring Revenue). We align tier after reviewing your stack and roadmap.',
      },
    ],
    relatedLinks: [
      { label: 'App development cost guide (2026)', path: '/app-development-cost-south-africa' },
      { label: 'Monthly retainer pricing', path: '/pricing-strategy' },
      { label: 'Mobile app development', path: '/mobile-app-development-south-africa' },
    ],
  },
  {
    slug: 'ai-automation-pricing',
    path: '/ai-automation-pricing',
    metaTitle: 'AI Automation Development Pricing South Africa | ZAR Guide',
    metaDescription:
      'ZAR ranges for AI automation in South Africa: WhatsApp bots, workflow agents, document pipelines, and production LLM integrations. Retainers for systems that must stay reliable.',
    keywords: [
      'ai automation cost south africa',
      'whatsapp ai bot development price',
      'llm integration cost zar',
      'business automation development south africa',
    ],
    eyebrow: 'South Africa · ZAR · AI systems',
    h1: 'AI automation development pricing',
    heroSubhead:
      'Ranges for automation that saves real work: WhatsApp assistants, internal copilots, document flows, and guarded LLM integrations tied to your data and ops tools.',
    introParagraph:
      'AI project cost is driven less by model hype and more by guardrails, observability, and what happens when the model is wrong. We price for production behaviour: escalation paths, logging, and human oversight where it matters.',
    costDrivers: [
      {
        title: 'Channel and volume',
        copy: 'WhatsApp, web chat, email, or internal tools, plus peak message and token load.',
      },
      {
        title: 'Knowledge and data access',
        copy: 'RAG (Retrieval-Augmented Generation), document stores, and permissions on sensitive data.',
      },
      {
        title: 'Tooling and actions',
        copy: 'Whether the agent only answers questions or also updates CRM, tickets, or orders.',
      },
      {
        title: 'Evaluation and safety',
        copy: 'Test sets, refusal rules, PII handling, and review workflows before wide rollout.',
      },
      {
        title: 'Hosting and model costs',
        copy: 'Inference spend, caching, and South African latency and connectivity constraints.',
      },
      {
        title: 'Human-in-the-loop',
        copy: 'Admin review queues, handoff to staff, and audit logs for regulated or high-trust use cases.',
      },
    ],
    projectTypesHeading: 'Typical AI automation engagements',
    projectTypes: [
      {
        name: 'Pilot assistant',
        rangeZar: 'R80k – R200k',
        summary: 'One channel, bounded knowledge, manual review, limited actions.',
        timeline: '4–8 weeks',
      },
      {
        name: 'Production WhatsApp or ops bot',
        rangeZar: 'R200k – R500k',
        summary: 'Live channel, CRM or ticket hooks, monitoring, admin oversight.',
        timeline: '2–4 months',
      },
      {
        name: 'Multi-workflow AI platform',
        rangeZar: 'R500k – R1.2m+',
        summary: 'Several agents, document pipelines, analytics, strict reliability targets.',
        timeline: '4–8 months',
      },
    ],
    retainerSectionIntro:
      'Models, APIs, and business rules change. AI systems need ongoing evaluation, prompt and workflow updates, and incident response like any production service.',
    retainerOptions: [
      {
        tierId: 'essential',
        displayName: CLUSTER_RETAINER_DISPLAY_NAMES.essential,
        fitNote: 'Single assistant with low traffic and predictable knowledge updates.',
      },
      {
        tierId: 'growth',
        displayName: CLUSTER_RETAINER_DISPLAY_NAMES.growth,
        fitNote: 'Active tuning, new intents, and integrations with sales or support stacks.',
      },
      {
        tierId: 'ecosystem',
        displayName: CLUSTER_RETAINER_DISPLAY_NAMES.ecosystem,
        fitNote: 'AI across multiple products with high volume, compliance, or platform uptime needs.',
      },
    ],
    faqs: [
      {
        question: 'Is AI automation cheaper than custom software?',
        answer:
          'Not automatically. A thin chat demo is cheap. Production automation with logging, admin review, and integrations often sits in the same bands as serious internal tools.',
      },
      {
        question: 'Do you pass through OpenAI or other API costs?',
        answer:
          'Yes. Build quotes cover engineering and infrastructure setup. Ongoing model and messaging API spend is separate and scales with usage. Retainers include engineering ownership, not unlimited tokens.',
      },
      {
        question: 'Which retainer fits an AI product?',
        answer:
          'The AI Systems Retainer maps to our Ecosystem tier when volume, integrations, and incident load are high. Smaller assistants often start on Build & Support or Product Growth until traffic grows.',
      },
    ],
    relatedLinks: [
      { label: 'All engineering services', path: '/services' },
      { label: 'Monthly retainer pricing', path: '/pricing-strategy' },
      { label: 'Get a scoped estimate', path: '/get-a-quote' },
    ],
  },
  {
    slug: 'website-development-pricing',
    path: '/website-development-pricing',
    metaTitle: 'Website Development Pricing South Africa | ZAR Web & App Ranges',
    metaDescription:
      '2026 ZAR ranges for websites and web apps in South Africa: marketing sites, lead gen, content platforms, and lightweight products. Retainers for sites that must keep converting.',
    keywords: [
      'website development cost south africa',
      'web design and development pricing zar',
      'business website cost',
      'web app development price south africa',
    ],
    eyebrow: 'South Africa · ZAR · Web',
    h1: 'Website development pricing',
    heroSubhead:
      'Ranges for marketing sites, content-led properties, and lightweight web apps. Clear on what is a brochure build vs a product that needs auth, data, and ongoing engineering.',
    introParagraph:
      'Website quotes go wrong when scope hides a product behind “just a site.” We separate marketing delivery from web apps with accounts, payments, and admin so your budget matches what you are actually buying.',
    costDrivers: [
      {
        title: 'Content and page count',
        copy: 'Templates, CMS (Content Management System) structure, migrations, and multilingual needs.',
      },
      {
        title: 'Design fidelity',
        copy: 'Custom art direction vs adapted system, motion, and brand asset production.',
      },
      {
        title: 'Performance and SEO',
        copy: 'Core Web Vitals, structured data, and technical SEO (Search Engine Optimization) baked into the build.',
      },
      {
        title: 'Forms and lead routing',
        copy: 'CRM hooks, WhatsApp handoff, spam protection, and notification reliability.',
      },
      {
        title: 'Auth and dynamic features',
        copy: 'Portals, dashboards, or member areas that cross into product territory.',
      },
      {
        title: 'Hosting and handover',
        copy: 'Who owns DNS, analytics, and updates after launch, and whether a retainer is required.',
      },
    ],
    projectTypesHeading: 'Typical website and web app bands',
    projectTypes: [
      {
        name: 'Marketing / brochure site',
        rangeZar: 'R35k – R90k',
        summary: 'Positioning pages, contact, basic CMS, mobile-first, fast launch.',
        timeline: '3–5 weeks',
      },
      {
        name: 'Content or campaign site',
        rangeZar: 'R90k – R220k',
        summary: 'Blog, case studies, richer CMS, integrations, stronger SEO setup.',
        timeline: '5–8 weeks',
      },
      {
        name: 'Web app / customer portal',
        rangeZar: 'R220k – R550k',
        summary: 'Auth, dashboards, payments or bookings, admin, production monitoring.',
        timeline: '2–5 months',
      },
      {
        name: 'Large content or media platform',
        rangeZar: 'R550k – R1.1m+',
        summary: 'Heavy media, search, memberships, or multi-role publishing workflows.',
        timeline: '4–8 months',
      },
    ],
    retainerSectionIntro:
      'Sites that generate leads or revenue usually need security patches, content support, and small improvements after launch. Retainers match how often the site must change.',
    retainerOptions: [
      {
        tierId: 'essential',
        displayName: CLUSTER_RETAINER_DISPLAY_NAMES.essential,
        fitNote: 'Brochure and marketing sites with predictable content and light integrations.',
      },
      {
        tierId: 'growth',
        displayName: CLUSTER_RETAINER_DISPLAY_NAMES.growth,
        fitNote: 'Web apps with regular feature work, analytics, and conversion experiments.',
      },
      {
        tierId: 'ecosystem',
        displayName: CLUSTER_RETAINER_DISPLAY_NAMES.ecosystem,
        fitNote: 'Large platforms, memberships, or multi-system web estates.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between R35k and R220k for a website?',
        answer:
          'The lower band is a focused marketing site with clear templates and limited integrations. The higher band is a product-shaped web app with accounts, backend logic, and operational expectations.',
      },
      {
        question: 'Do you build on WordPress?',
        answer:
          'We default to modern React stacks when you need performance, custom integrations, or a path to a real product. We will recommend the stack after scope, not before it.',
      },
      {
        question: 'When should a website move to a retainer?',
        answer:
          'When updates, security, and integrations are ongoing, not a once-a-year refresh. Build & Support Retainer is the usual fit for marketing sites; web apps with active roadmaps often need Product Growth.',
      },
    ],
    relatedLinks: [
      { label: 'App development cost guide (2026)', path: '/app-development-cost-south-africa' },
      { label: 'Monthly retainer pricing', path: '/pricing-strategy' },
      { label: 'All engineering services', path: '/services' },
    ],
  },
];

export const pricingClusterPaths = PRICING_CLUSTER_PAGES.map((page) => page.path);

export function getPricingClusterByPath(path: string): PricingClusterPageConfig | undefined {
  return PRICING_CLUSTER_PAGES.find((page) => page.path === path);
}
