import type { LucideIcon } from 'lucide-react';
import {
  Bot,
  Building2,
  Calculator,
  Car,
  ClipboardList,
  Cpu,
  Globe,
  Layout,
  Network,
  Package,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Users,
  Warehouse,
  Zap,
} from 'lucide-react';
import type { PricingTableBlock } from '../components/PricingTable';
import { HERO_IMAGES } from '../lib/hero-images';

export type ServiceLandingService = {
  icon: LucideIcon;
  title: string;
  copy: string;
};

export type ServiceLandingProcessStep = {
  step: string;
  title: string;
  copy: string;
};

export type ServiceLandingProject = {
  title: string;
  description: string;
  url: string;
  tech: string[];
};

export type ServiceLandingFaq = {
  question: string;
  answer: string;
};

export type ServiceLandingPageConfig = {
  slug: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  heroSubhead: string;
  heroImage?: string;
  heroImageAlt?: string;
  serviceType: string;
  services: ServiceLandingService[];
  processSteps: ServiceLandingProcessStep[];
  pricingTables: PricingTableBlock[];
  pricingSectionTitle?: string;
  pricingSectionIntro?: string;
  projects: ServiceLandingProject[];
  projectsIntro?: string;
  faqs: ServiceLandingFaq[];
  relatedLinks: { label: string; path: string }[];
  ctaHeadline: string;
  ctaSubhead: string;
};

const mobileAppPricingTables: PricingTableBlock[] = [
  {
    id: 'mobile-build',
    title: 'Mobile app development (ZAR, 2026)',
    intro:
      'Cross-platform (React Native / Flutter) is usually faster to ship than dual native codebases. Native makes sense for NFC, heavy background work, or strict performance.',
    tiers: [
      {
        name: 'Android or iOS MVP',
        rangeZar: 'R100k – R250k',
        summary: 'One platform first, API backend, auth, core user flows.',
        timeline: '6–10 weeks',
      },
      {
        name: 'iOS + Android production',
        rangeZar: 'R250k – R600k',
        summary: 'Both stores, push notifications, analytics, release pipeline.',
        timeline: '10–16 weeks',
      },
      {
        name: 'Native or hardware-heavy',
        rangeZar: 'R500k – R1m+',
        summary: 'NFC campus wallets, BLE, offline-first, strict performance.',
        timeline: '4–8 months',
      },
    ],
    note: 'Store fees, Meta/WhatsApp API charges, and third-party SaaS are excluded.',
  },
  {
    id: 'startup-mobile',
    title: 'Startup app packages',
    tiers: [
      {
        name: 'Idea validation',
        rangeZar: 'R40k – R120k',
        summary: 'Clickable prototype or waitlist app, no production payments.',
        timeline: '3–6 weeks',
      },
      {
        name: 'Fundable MVP',
        rangeZar: 'R120k – R350k',
        summary: 'Real users, one core loop, basic admin, one platform launch.',
        timeline: '6–10 weeks',
      },
      {
        name: 'Post-seed v1',
        rangeZar: 'R350k – R750k',
        summary: 'Payments, growth hooks, monitoring, second platform or role.',
        timeline: '3–6 months',
      },
    ],
  },
];

const customSoftwarePricingTables: PricingTableBlock[] = [
  {
    id: 'crm-ops',
    title: 'CRM & customer operations',
    intro: 'Pipelines, tasks, and integrations that match how your team actually sells and supports.',
    tiers: [
      {
        name: 'Light CRM',
        rangeZar: 'R80k – R180k',
        summary: 'Contacts, deals, notes, exports, small team roles.',
        timeline: '6–9 weeks',
      },
      {
        name: 'Production CRM',
        rangeZar: 'R180k – R450k',
        summary: 'Automations, email/WhatsApp hooks, reporting, accounting sync.',
        timeline: '3–5 months',
      },
      {
        name: 'Multi-branch CRM',
        rangeZar: 'R450k – R900k+',
        summary: 'Territories, commissions, audit trails, ERP or data warehouse feeds.',
        timeline: '6–10 months',
      },
    ],
  },
  {
    id: 'hr-payroll',
    title: 'HR & payroll systems',
    tiers: [
      {
        name: 'Leave & employee records',
        rangeZar: 'R70k – R160k',
        summary: 'Profiles, leave requests, approvals, basic reporting.',
        timeline: '5–8 weeks',
      },
      {
        name: 'Payroll-ready HR hub',
        rangeZar: 'R160k – R400k',
        summary: 'Payslip exports, shifts, policies, integration handoff to payroll provider.',
        timeline: '3–6 months',
      },
      {
        name: 'Enterprise workforce',
        rangeZar: 'R400k – R850k+',
        summary: 'Multi-site, compliance logs, SSO, legacy payroll bridges.',
        timeline: '6–12 months',
      },
    ],
  },
  {
    id: 'inventory-warehouse',
    title: 'Inventory, warehouse & fleet',
    tiers: [
      {
        name: 'Stock & orders',
        rangeZar: 'R90k – R220k',
        summary: 'SKUs, stock levels, purchase orders, simple dashboards.',
        timeline: '6–10 weeks',
      },
      {
        name: 'Warehouse operations',
        rangeZar: 'R220k – R550k',
        summary: 'Bins, pick/pack, barcodes, supplier portals, low-stock alerts.',
        timeline: '3–6 months',
      },
      {
        name: 'Fleet & logistics',
        rangeZar: 'R300k – R750k+',
        summary: 'Job dispatch, driver apps, proof of delivery, route history.',
        timeline: '4–8 months',
      },
    ],
  },
  {
    id: 'property-accounting',
    title: 'Property management & small-business accounting',
    tiers: [
      {
        name: 'Property listings & leases',
        rangeZar: 'R120k – R280k',
        summary: 'Units, tenants, rent schedules, maintenance tickets.',
        timeline: '8–12 weeks',
      },
      {
        name: 'Portfolio operations',
        rangeZar: 'R280k – R650k',
        summary: 'Owner statements, arrears workflows, contractor jobs, document store.',
        timeline: '4–7 months',
      },
      {
        name: 'Accounting operations tool',
        rangeZar: 'R100k – R320k',
        summary: 'Invoicing, expenses, VAT-friendly exports, accountant handoff (not a full GL replacement).',
        timeline: '6–14 weeks',
      },
    ],
    note: 'Regulated accounting products need your accountant or auditor in scope conversations early.',
  },
];

const webDevelopmentPricingTables: PricingTableBlock[] = [
  {
    id: 'marketing-site',
    title: 'Marketing & brochure sites',
    intro:
      'Fast, accessible sites when the goal is credibility and lead capture, not a full product backend.',
    tiers: [
      {
        name: 'Single-page or small site',
        rangeZar: 'R25k – R70k',
        summary: 'Landing page, contact form, analytics, basic CMS or static content.',
        timeline: '2–4 weeks',
      },
      {
        name: 'Multi-page company site',
        rangeZar: 'R70k – R150k',
        summary: 'Services, case studies, blog or insights feed, SEO foundations.',
        timeline: '4–8 weeks',
      },
      {
        name: 'Content-heavy site',
        rangeZar: 'R150k – R280k',
        summary: 'Many templates, localization, performance budget, editorial workflow.',
        timeline: '6–12 weeks',
      },
    ],
  },
  {
    id: 'web-app',
    title: 'Web applications & customer portals',
    intro:
      'Logged-in experiences, dashboards, and APIs. This is where most founders need a software partner, not a theme install.',
    tiers: [
      {
        name: 'Customer portal MVP',
        rangeZar: 'R120k – R280k',
        summary: 'Auth, core workflows, admin, one integration (payments or CRM).',
        timeline: '6–10 weeks',
      },
      {
        name: 'Production web platform',
        rangeZar: 'R280k – R650k',
        summary: 'Roles, reporting, webhooks, monitoring, staged releases.',
        timeline: '3–6 months',
      },
      {
        name: 'Multi-tenant or marketplace web',
        rangeZar: 'R650k – R1.2m+',
        summary: 'Vendor onboarding, payouts, dispute flows, scale planning.',
        timeline: '6–12 months',
      },
    ],
    note: 'See website development pricing for retainer bands after launch.',
  },
];

const aiSoftwarePricingTables: PricingTableBlock[] = [
  {
    id: 'ai-copilot',
    title: 'AI copilots & workflow automation',
    intro:
      'Focused AI layers on top of software you already run. Scoped so models, prompts, and guardrails stay maintainable.',
    tiers: [
      {
        name: 'Single workflow pilot',
        rangeZar: 'R45k – R120k',
        summary: 'One high-volume task (support triage, doc Q&A, internal search) with human review.',
        timeline: '3–6 weeks',
      },
      {
        name: 'Multi-workflow rollout',
        rangeZar: 'R120k – R320k',
        summary: 'Several connected flows, admin tuning, logging, and role-based access.',
        timeline: '2–4 months',
      },
      {
        name: 'Production AI operations',
        rangeZar: 'R320k – R750k+',
        summary: 'Monitoring, evals, model routing, and integration across CRM, ERP, or data warehouse.',
        timeline: '4–8 months',
      },
    ],
    note: 'LLM API usage (OpenAI, Anthropic, etc.) is billed separately or passed through at cost.',
  },
  {
    id: 'ai-agent-build',
    title: 'Custom AI agents & orchestration',
    tiers: [
      {
        name: 'Task agent MVP',
        rangeZar: 'R80k – R200k',
        summary: 'One agent with tools (email, calendar, CRM lookup) and approval gates.',
        timeline: '4–8 weeks',
      },
      {
        name: 'Multi-agent system',
        rangeZar: 'R200k – R550k',
        summary: 'Handoffs between agents, structured outputs, audit trails, staging environments.',
        timeline: '3–6 months',
      },
      {
        name: 'Enterprise agent platform',
        rangeZar: 'R550k – R1.2m+',
        summary: 'SSO, policy layers, observability, and integration with legacy APIs.',
        timeline: '6–12 months',
      },
    ],
  },
];

export const serviceLandingPages: ServiceLandingPageConfig[] = [
  {
    slug: 'mobile-app-development-south-africa',
    path: '/mobile-app-development-south-africa',
    metaTitle:
      'Mobile App Development South Africa | App Development Company',
    metaDescription:
      'App development in South Africa for startups and SMEs. Android and iOS builds, ZAR pricing ranges, shipped references, and WhatsApp-first discovery with senior-led delivery.',
    keywords: [
      'mobile app development',
      'app development company south africa',
      'professional app developers',
      'best app developers for startups',
      'create android app',
      'find app developer',
      'app making company',
    ],
    eyebrow: 'App development company · South Africa',
    h1: 'Mobile App Development South Africa',
    heroSubhead:
      'We build Android and iOS products with senior-led delivery, not a hand-off agency bench. You get store-ready apps, APIs, admin tooling, and honest ZAR ranges before you commit.',
    heroImage: HERO_IMAGES.mobileApp,
    heroImageAlt: 'Mobile app development workspace with smartphone and laptop',
    serviceType: 'Mobile application development',
    services: [
      {
        icon: Smartphone,
        title: 'Android & iOS apps',
        copy: 'React Native, Flutter, or native when NFC and performance demand it. One codebase when it saves months, two when it saves incidents.',
      },
      {
        icon: ClipboardList,
        title: 'Startup MVPs',
        copy: 'One critical workflow, real users, and admin you can operate without calling a dev for every CSV export.',
      },
      {
        icon: Package,
        title: 'Marketplace & on-demand',
        copy: 'Customer app, provider tools, payouts, and ops dashboards. Laundry Marketplace is the reference pattern.',
      },
      {
        icon: Users,
        title: 'Rescue & store unblock',
        copy: 'Rejected builds, broken payments, and legacy codebases that need a senior audit before another sprint burns budget.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Scope call',
        copy: 'You share the problem, users, and deadline. We ask about payments, admin, and what must work on day one.',
      },
      {
        step: '02',
        title: 'Fixed-phase quote',
        copy: 'Written scope, ZAR range, and milestones. No vague "per screen" pricing that doubles mid-build.',
      },
      {
        step: '03',
        title: 'Build & review',
        copy: 'Weekly demos, TestFlight/Play internal tracks, and API contracts your future team can maintain.',
      },
      {
        step: '04',
        title: 'Launch',
        copy: 'Store submission support, monitoring, and handover docs. Optional retainer for ongoing releases.',
      },
    ],
    pricingTables: mobileAppPricingTables,
    pricingSectionTitle: 'Mobile app pricing ranges (ZAR)',
    pricingSectionIntro:
      'Planning numbers for founders comparing quotes. Final price depends on screens, integrations, and who owns production quality.',
    projects: [
      {
        title: 'Future Start',
        description: 'Student accommodation requests and digital book sales.',
        url: 'https://futurestart.co.za/',
        tech: ['Web', 'Commerce'],
      },
      {
        title: 'ClinicPlus',
        description: 'Occupational health bookings for mining-sector employers.',
        url: 'https://clinicplusbookings.co.za/',
        tech: ['React', 'Node.js', 'Operations'],
      },
      {
        title: 'Lungi The Strategist',
        description: 'Branded ecommerce aligned to retail and strategy offerings.',
        url: 'https://lungithestrategist.co.za/',
        tech: ['Ecommerce', 'Web'],
      },
    ],
    projectsIntro:
      'Client apps and platforms across education, health, and retail. Ask for architecture detail on a scope call.',
    faqs: [
      {
        question: 'How do I find a reliable app developer in South Africa?',
        answer:
          'Look for shipped apps in your category, clear ownership of backend and admin, and willingness to show production repos or walkthroughs. Avoid quotes that only price screens without APIs, payments, or ops tooling.',
      },
      {
        question: 'Should I build Android first or both platforms?',
        answer:
          'If your users skew Android, ship there first with a shared codebase ready for iOS. If investors or enterprise buyers expect iOS parity, plan both stores in the quote from day one.',
      },
      {
        question: 'What is the cheapest way to create an Android app?',
        answer:
          'Templates and no-code tools work for brochures. Production apps with accounts, payments, and support need custom engineering. The cost guide on this site breaks down realistic ZAR bands.',
      },
      {
        question: 'Do you work with startups only?',
        answer:
          'Most clients are founders and SME operators. We also rescue live products and support retainers when the app is already in market.',
      },
    ],
    relatedLinks: [
      { label: 'App development cost guide (2026)', path: '/app-development-cost-south-africa' },
      { label: 'Project scope estimator', path: '/get-a-quote' },
      { label: 'Custom software development', path: '/custom-software-development-south-africa' },
      { label: 'Web development company', path: '/web-development-company-south-africa' },
      { label: 'All engineering services', path: '/services' },
    ],
    ctaHeadline: 'Ready to scope your mobile app?',
    ctaSubhead:
      'Send a short brief on WhatsApp or use the estimator. We reply with fit, risks, and a realistic ZAR range.',
  },
  {
    slug: 'custom-software-development-south-africa',
    path: '/custom-software-development-south-africa',
    metaTitle:
      'Custom Software Development South Africa | Bespoke Business Systems',
    metaDescription:
      'Custom software development South Africa for CRM, payroll, HR, inventory, property, fleet, and finance ops. Bespoke systems, ZAR pricing ranges, and senior-led delivery from Queenstown.',
    keywords: [
      'custom software development',
      'bespoke software development company',
      'crm',
      'payroll',
      'inventory',
      'hr',
      'property management',
      'warehouse',
      'fleet',
      'business operations software',
      'accounting software for small business',
    ],
    eyebrow: 'Bespoke systems · South Africa',
    h1: 'Custom Software Development South Africa',
    heroSubhead:
      'Replace spreadsheets and broken off-the-shelf tools with software that matches how your team works. We design, build, and stay responsible for CRM, ops, HR, inventory, and industry-specific platforms.',
    heroImage: HERO_IMAGES.customSoftware,
    heroImageAlt: 'Business team using custom operations software on desktop',
    serviceType: 'Custom business software development',
    services: [
      {
        icon: Building2,
        title: 'CRM & sales ops',
        copy: 'Pipelines, tasks, and customer history wired to WhatsApp, email, or your existing stack.',
      },
      {
        icon: Users,
        title: 'HR & payroll workflows',
        copy: 'Leave, shifts, employee records, and exports your payroll partner can trust.',
      },
      {
        icon: Warehouse,
        title: 'Inventory & warehouse',
        copy: 'Stock, purchase orders, barcodes, and alerts that stop silent stock-outs.',
      },
      {
        icon: Car,
        title: 'Fleet & field teams',
        copy: 'Dispatch, mobile proof of delivery, and dashboards for coordinators.',
      },
      {
        icon: Calculator,
        title: 'Accounting & finance ops',
        copy: 'Invoicing, expenses, and reconciliation helpers for small business finance teams (not a full ERP replacement unless scoped).',
      },
      {
        icon: ClipboardList,
        title: 'Property & facilities',
        copy: 'Units, leases, maintenance, and owner reporting in one place.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Process mapping',
        copy: 'We walk your current spreadsheets, WhatsApp groups, and pain points. Then we document roles and must-not-break rules.',
      },
      {
        step: '02',
        title: 'Phased roadmap',
        copy: 'Module-by-module delivery so staff adopt early. Each phase has a ZAR cap and clear done criteria.',
      },
      {
        step: '03',
        title: 'Build & train',
        copy: 'Staging environment, import scripts, and short Loom-style guides for operators.',
      },
      {
        step: '04',
        title: 'Operate & extend',
        copy: 'Monitoring, fixes, and feature work on retainer so the system grows with the business.',
      },
    ],
    pricingTables: customSoftwarePricingTables,
    pricingSectionTitle: 'Bespoke software pricing ranges (ZAR)',
    pricingSectionIntro:
      'Module complexity, integrations, and compliance drive quotes. Use these bands for budgeting; we confirm after a technical review.',
    projects: [
      {
        title: 'ClinicPlus',
        description: 'Occupational health bookings and clinic operations for mining-sector employers.',
        url: 'https://clinicplusbookings.co.za/',
        tech: ['React', 'Node.js', 'Operations'],
      },
      {
        title: 'AN Consulting',
        description: 'Financial records management for internal consulting workflows.',
        url: 'https://www.anconsulting.co.za/',
        tech: ['Web app', 'Records'],
      },
      {
        title: 'Ilithiyana',
        description: 'Bookings and CRM for day-to-day client operations.',
        url: 'https://ilithiyana.co.za/',
        tech: ['CRM', 'Scheduling'],
      },
    ],
    projectsIntro:
      'Operations-heavy products where uptime and staff adoption matter as much as the UI.',
    faqs: [
      {
        question: 'Custom software vs off-the-shelf CRM or ERP?',
        answer:
          'Off-the-shelf wins when your process matches the product. Custom wins when you have already bent five tools and staff still run parallel spreadsheets. We will tell you honestly if SaaS is enough.',
      },
      {
        question: 'Can you integrate with Sage, Xero, or Paystack?',
        answer:
          'Yes, when scope includes webhooks, exports, or API sync. Integration work is priced explicitly so reconciliation does not become a surprise line item.',
      },
      {
        question: 'How long does a business operations system take?',
        answer:
          'A focused single-department tool can ship in two months. Multi-module platforms usually roll out over two to three phases across six to twelve months.',
      },
      {
        question: 'Do you maintain the system after launch?',
        answer:
          'Most clients move to a monthly retainer for fixes, releases, and infrastructure. That keeps one senior owner instead of rotating freelancers.',
      },
    ],
    relatedLinks: [
      { label: 'Web development South Africa', path: '/web-development-south-africa' },
      { label: 'Digital transformation', path: '/digital-transformation-south-africa' },
      { label: 'App development cost guide (2026)', path: '/app-development-cost-south-africa' },
      { label: 'Mobile app development', path: '/mobile-app-development-south-africa' },
      { label: 'Software developers South Africa', path: '/software-developers-south-africa' },
      { label: 'Bespoke CRM systems', path: '/bespoke-crm-systems-south-africa' },
      { label: 'Retainer pricing', path: '/pricing-strategy' },
      { label: 'Project scope estimator', path: '/get-a-quote' },
    ],
    ctaHeadline: 'Need bespoke software that fits your operations?',
    ctaSubhead:
      'Describe the workflow on WhatsApp or use the estimator. We map phases and ZAR ranges without a sales deck.',
  },
  {
    slug: 'web-development-company-south-africa',
    path: '/web-development-company-south-africa',
    metaTitle: 'Web Development Company South Africa | Apps & Platforms',
    metaDescription:
      'Web development company in South Africa for portals, SaaS dashboards, and ecommerce. React and Next.js builds, ZAR pricing bands, and production launch support. Get a quote in minutes.',
    keywords: [
      'web development company south africa',
      'web development companies in south africa',
      'web developers south africa',
      'web development south africa',
      'web application development',
      'react development south africa',
    ],
    eyebrow: 'Web apps · South Africa',
    h1: 'Web Development Company South Africa',
    heroSubhead:
      'We build web applications and platforms founders can run in production: auth, payments, admin, and integrations. Not brochure-only sites unless that is what you actually need.',
    heroImage: HERO_IMAGES.servicesHub,
    heroImageAlt: 'Web development team building a production platform for a South African business',
    serviceType: 'Web application and platform development',
    services: [
      {
        icon: Layout,
        title: 'Customer portals & dashboards',
        copy: 'Logged-in experiences for clients, tenants, or members with role-based access.',
      },
      {
        icon: ShoppingCart,
        title: 'Ecommerce & marketplaces',
        copy: 'Catalogues, checkout, vendor onboarding, and ops tools behind the storefront.',
      },
      {
        icon: Globe,
        title: 'Marketing & content sites',
        copy: 'Fast landing pages and company sites when SEO and conversion matter.',
      },
      {
        icon: Cpu,
        title: 'APIs & integrations',
        copy: 'Paystack, CRM, webhooks, and legacy system bridges your web UI depends on.',
      },
      {
        icon: Zap,
        title: 'AI-assisted workflows',
        copy: 'Support bots, document tools, and internal copilots wired into your product.',
      },
      {
        icon: Users,
        title: 'Admin & internal tools',
        copy: 'Back-office panels support teams use daily, not afterthought spreadsheets.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Scope the product surface',
        copy: 'We separate marketing pages from authenticated app flows so quotes match what users actually do.',
      },
      {
        step: '02',
        title: 'Architecture & stack',
        copy: 'React or Next.js on modern hosting, with auth, database, and observability chosen for your scale.',
      },
      {
        step: '03',
        title: 'Ship in phases',
        copy: 'Staging, QA, and launch checklists. You see working software before polish layers pile up.',
      },
      {
        step: '04',
        title: 'Operate after launch',
        copy: 'Retainers for fixes, releases, and performance as traffic and features grow.',
      },
    ],
    pricingTables: webDevelopmentPricingTables,
    pricingSectionTitle: 'Web development pricing ranges (ZAR)',
    pricingSectionIntro:
      'Marketing sites and full web apps sit in different budget bands. Use these for planning; we confirm after reviewing your spec.',
    projects: [
      {
        title: 'Laundry Marketplace',
        description: 'Multi-sided laundry marketplace with customer booking and provider dashboards.',
        url: 'https://laundry.qwabi.co.za/',
        tech: ['Next.js', 'React', 'Marketplace'],
      },
      {
        title: 'ClinicPlus',
        description: 'Web booking and clinic operations for occupational health programmes.',
        url: 'https://clinicplusbookings.co.za/',
        tech: ['React', 'Node.js', 'Bookings'],
      },
      {
        title: 'AN Consulting',
        description: 'Secure records and workflow tooling for consulting operations.',
        url: 'https://www.anconsulting.co.za/',
        tech: ['Web app', 'Operations'],
      },
    ],
    projectsIntro: 'Production web platforms, not demo landing pages.',
    faqs: [
      {
        question: 'Web development company vs freelancer?',
        answer:
          'Freelancers fit small marketing sites with clear specs. Product web apps with auth, payments, and admin usually need a senior partner who owns architecture and launch risk.',
      },
      {
        question: 'Do you only build marketing websites?',
        answer:
          'No. We prefer web apps and portals when the business runs on software. We still ship marketing sites when that is the right scope.',
      },
      {
        question: 'Which stack do you use?',
        answer:
          'Most builds use React or Next.js with TypeScript, Postgres or Firebase/Supabase depending on needs, and hosting on Vercel or GCP. Stack follows maintainability, not trends.',
      },
      {
        question: 'How is web pricing different from mobile?',
        answer:
          'Single responsive web apps can be cheaper than dual native stores. Complex marketplaces or compliance-heavy portals can exceed mobile MVPs. Compare bands on our cost and pricing pages.',
      },
    ],
    relatedLinks: [
      { label: 'Website development pricing', path: '/website-development-pricing' },
      { label: 'Mobile app development', path: '/mobile-app-development-south-africa' },
      { label: 'Custom software development', path: '/custom-software-development-south-africa' },
      { label: 'Project scope estimator', path: '/get-a-quote' },
    ],
    ctaHeadline: 'Need a web platform, not just pages?',
    ctaSubhead:
      'Share your users, integrations, and launch date on WhatsApp or use the estimator. We reply with fit and a realistic ZAR range.',
  },
  {
    slug: 'ai-powered-rapid-app-development',
    path: '/services/ai-powered-rapid-app-development',
    metaTitle:
      'AI-Powered Rapid App Development South Africa | Accelerated MVPs',
    metaDescription:
      'Accelerated custom application and MVP development using documentation-driven AI engineering workflows. Shipped in 2-4 weeks with senior-led quality gates.',
    keywords: [
      'ai app development',
      'rapid app development south africa',
      'ai software engineering',
      'mvp development south africa',
      'documentation driven development',
      'fast mvp build',
    ],
    eyebrow: 'Accelerated Delivery · Qwabi Engineering',
    h1: 'AI-Powered Rapid App Development',
    heroSubhead:
      'Build high-fidelity MVPs and bespoke business systems in weeks, not months. By combining senior-led software architecture with advanced AI-assisted engineering pipelines, we ship production-grade code at a fraction of standard timelines.',
    heroImage: HERO_IMAGES.mvpDeveloper,
    heroImageAlt: 'Senior software architect designing an AI-accelerated application architecture',
    serviceType: 'AI-Powered Rapid App Development',
    services: [
      {
        icon: Cpu,
        title: 'AI-Assisted Boilerplate & Setup',
        copy: 'We bypass weeks of manual plumbing by using customized LLM generators for robust schemas, API routers, and test coverage, focusing human creativity on your unique business rules.',
      },
      {
        icon: Zap,
        title: 'Documentation-Driven Engineering',
        copy: 'Rigid specs and clear PRDs are parsed directly into high-fidelity code. If you lack complete specs, our scoping phase prepares them so implementation is continuous and error-free.',
      },
      {
        icon: ClipboardList,
        title: 'Senior-Led Architecture',
        copy: 'AI writes code, but senior human engineers design the system, review security, govern the data schema, and handle deployment. Zero compromise on future-proof code quality.',
      },
      {
        icon: Users,
        title: 'Dual-Platform Native & Web',
        copy: 'Rapid deployment across iOS, Android, and Web using state-of-the-art cross-platform systems (React Native/Expo and Next.js) tailored for speed and performance.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Scoping / Alignment',
        copy: 'We align on a rigid specification (PRD / wireframes). If missing, we kick off a 1-week Paid Scoping Sprint (ZAR 15,000) to design the exact blueprint.',
      },
      {
        step: '02',
        title: 'AI-Accelerated Sprints',
        copy: 'Our proprietary agentic prompt workflows and code generators construct the foundation, backend schemas, and UI components in record time.',
      },
      {
        step: '03',
        title: 'Senior Quality Gates',
        copy: 'A senior engineer audits every line, runs security sweeps, connects payment integrations, and sets up automated release pipelines.',
      },
      {
        step: '04',
        title: 'Store & Web Launch',
        copy: 'We deploy to Vercel, Expo, App Store, and Google Play, handing over clean, documented, and fully owned repositories in 2–4 weeks.',
      },
    ],
    pricingTables: [
      {
        id: 'rapid-app-pricing',
        title: 'Rapid AI-Assisted Build Pricing (ZAR, 2026)',
        intro: 'Rigid specifications (PRD / wireframes) are required to qualify for rapid builds. Otherwise, we start with a paid scoping sprint.',
        tiers: [
          {
            name: 'Single-Platform MVP',
            rangeZar: 'R40k – R80k',
            summary: 'Focused core loop, single client (iOS, Android, or Web), database integration, and basic admin panel.',
            timeline: '2–3 weeks (10–15 working days)',
          },
          {
            name: 'Dual-Platform MVP',
            rangeZar: 'R80k – R150k',
            summary: 'Cross-platform mobile apps (iOS + Android) or dynamic web + mobile system with shared backend and full authentication.',
            timeline: '3–4 weeks (15–20 working days)',
          },
          {
            name: 'Paid Scoping Sprint',
            rangeZar: 'R15,000 flat',
            summary: '1-week interactive scoping phase. We produce a complete PRD, architecture blueprint, and wireframes. Fully credited back if you build with us.',
            timeline: '1 week (5 working days)',
          },
        ],
        note: 'Rapid pricing requires pre-approved rigid specifications and is subject to availability.',
      },
    ],
    pricingSectionTitle: 'Clear, Accelerated Pricing Plans',
    pricingSectionIntro: 'Fixed ZAR tiers backed by our AI-assisted engineering pipeline. We eliminate administrative overhead to deliver premium software under strict timelines.',
    projects: [
      {
        title: 'Future Start',
        description: 'Student accommodation requests and digital commerce platform.',
        url: 'https://futurestart.co.za/',
        tech: ['Web', 'Next.js', 'Commerce'],
      },
      {
        title: 'ClinicPlus',
        description: 'Occupational health booking system designed and shipped rapidly.',
        url: 'https://clinicplusbookings.co.za/',
        tech: ['SaaS Portal', 'Node.js', 'Operations'],
      },
    ],
    projectsIntro: 'Production-ready MVPs built with speed, clarity, and structural integrity.',
    faqs: [
      {
        question: 'What is AI-Powered Rapid App Development?',
        answer: 'It is a next-generation software production model that utilizes advanced AI-assisted engineering pipelines (such as automated boilerplate generation, prompt-driven schema construction, and automated test writing) overseen by a senior software architect. This allows us to cut delivery times by 50% without compromising on the underlying codebase quality.',
      },
      {
        question: 'Why do rapid builds require rigid specifications?',
        answer: 'To build at maximum speed, there is no time for mid-sprint changes or open-ended design discussions. A rigid specification (PRD / wireframes) serves as a precise blueprint for our AI engines and senior developers. This enables continuous, uninterrupted code production.',
      },
      {
        question: 'What if I do not have a PRD or wireframes?',
        answer: 'We offer a dedicated 1-Week Paid Scoping Sprint for ZAR 15,000. We work with you interactively to translate your idea into a high-fidelity PRD, data schema design, and UI wireframes. If you proceed with the build with us, this scoping fee is fully credited back to your final invoice.',
      },
      {
        question: 'Is this a low-code or no-code solution?',
        answer: 'No. We write actual, clean TypeScript and JavaScript code (React Native, Expo, Next.js, and Node.js) that you fully own. There are no vendor lock-ins or closed platforms. It is premium, custom software engineered at high speed.',
      },
      {
        question: 'Do we get support and updates after launch?',
        answer: 'Yes. Once shipped, rapid builds can seamlessly transition to our standard operational retainers or be handed over to your internal team with full documentation and clean repositories.',
      },
    ],
    relatedLinks: [
      { label: 'Project scope estimator', path: '/get-a-quote' },
      { label: 'Mobile app development', path: '/mobile-app-development-south-africa' },
      { label: 'Custom software development', path: '/custom-software-development-south-africa' },
      { label: 'All engineering services', path: '/services' },
    ],
    ctaHeadline: 'Have a clear specification ready to build?',
    ctaSubhead: 'Share your brief on WhatsApp or run it through our rapid quote wizard to see if your app qualifies for an accelerated build.',
  },
  {
    slug: 'web-development-south-africa',
    path: '/web-development-south-africa',
    metaTitle: 'Web Development South Africa | Founder Web Apps and Sites',
    metaDescription:
      'Web development in South Africa for founder-led products and marketing sites. Custom web apps, lead capture sites, and ZAR pricing bands with senior React delivery.',
    keywords: [
      'web development',
      'web development south africa',
      'web developer south africa',
      'custom web application',
      'marketing website development',
      'react development south africa',
    ],
    eyebrow: 'Founder web builds · South Africa',
    h1: 'Web Development South Africa',
    heroSubhead:
      'We ship marketing sites when that is the whole job, and web apps when your business runs on logged-in users, payments, and admin. Built for South African founders who need production software, not a theme that breaks at scale.',
    heroImage: HERO_IMAGES.servicesHub,
    heroImageAlt: 'Founder reviewing a custom web application built in South Africa',
    serviceType: 'Web development for founders',
    services: [
      {
        icon: Layout,
        title: 'Founder web apps',
        copy: 'Dashboards, customer portals, and internal tools with auth, roles, and APIs your team can extend.',
      },
      {
        icon: Globe,
        title: 'Marketing and launch sites',
        copy: 'Fast company sites with SEO, case studies, and forms wired to WhatsApp or your CRM.',
      },
      {
        icon: ShoppingCart,
        title: 'Ecommerce and bookings',
        copy: 'Catalogues, checkout, and scheduling when revenue depends on the site, not a brochure.',
      },
      {
        icon: Cpu,
        title: 'Integrations',
        copy: 'Paystack, Xero, webhooks, and legacy exports so the site talks to how you already operate.',
      },
      {
        icon: Zap,
        title: 'Performance and SEO foundations',
        copy: 'Core Web Vitals, structured data, and crawlable content so discovery is not an afterthought.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Outcome-first brief',
        copy: 'We clarify whether you need pages, a product surface, or both. That keeps the quote aligned with what users actually do.',
      },
      {
        step: '02',
        title: 'Scope and ZAR range',
        copy: 'Written milestones, stack choices, and a realistic band before design or code starts.',
      },
      {
        step: '03',
        title: 'Build in the open',
        copy: 'Staging links, weekly reviews, and QA on real devices and browsers your customers use.',
      },
      {
        step: '04',
        title: 'Launch and handover',
        copy: 'DNS, monitoring, and documentation so you are not locked into one freelancer for every tweak.',
      },
    ],
    pricingTables: webDevelopmentPricingTables,
    pricingSectionTitle: 'Web development pricing (ZAR)',
    pricingSectionIntro:
      'Marketing sites and product web apps sit in different bands. Use these ranges for budgeting; we confirm after reviewing your brief.',
    projects: [
      {
        title: 'Laundry Marketplace',
        description: 'Customer booking and provider operations on the web.',
        url: 'https://laundry.qwabi.co.za/',
        tech: ['Next.js', 'Marketplace'],
      },
      {
        title: 'Future Start',
        description: 'Student accommodation and digital commerce flows.',
        url: 'https://futurestart.co.za/',
        tech: ['Web', 'Commerce'],
      },
      {
        title: 'AN Consulting',
        description: 'Secure workflow tooling for consulting operations.',
        url: 'https://www.anconsulting.co.za/',
        tech: ['Web app', 'Operations'],
      },
    ],
    projectsIntro: 'Founder-led web products and revenue-facing sites in production.',
    faqs: [
      {
        question: 'How is this different from a web development company page?',
        answer:
          'This page is for founders comparing general web development options. The company page goes deeper on platforms, marketplaces, and larger product teams. Start here if you are early in vendor research.',
      },
      {
        question: 'Do you build brochure-only websites?',
        answer:
          'Yes, when that matches the goal. We will say so if a smaller marketing build is enough instead of a full application.',
      },
      {
        question: 'What stack do you use for web development?',
        answer:
          'React or Next.js with TypeScript, Postgres or Supabase/Firebase depending on needs, and hosting on Vercel or GCP. Stack follows maintainability and skills your team already has.',
      },
      {
        question: 'How fast can a founder site go live?',
        answer:
          'A focused marketing site can ship in two to four weeks. Web apps with accounts and payments usually need six to ten weeks for a credible MVP.',
      },
    ],
    relatedLinks: [
      { label: 'Web development company', path: '/web-development-company-south-africa' },
      { label: 'Website development pricing', path: '/website-development-pricing' },
      { label: 'Custom software development', path: '/custom-software-development-south-africa' },
      { label: 'Project scope estimator', path: '/get-a-quote' },
    ],
    ctaHeadline: 'Planning web development in South Africa?',
    ctaSubhead:
      'Share pages, users, and integrations on WhatsApp or use the estimator. We reply with fit and a ZAR range.',
  },
  {
    slug: 'ai-software-development-company',
    path: '/ai-software-development-company',
    metaTitle: 'AI Software Development Company South Africa | Qwabi',
    metaDescription:
      'AI software development company in South Africa. Custom copilots, agents, and AI-ready platforms with senior architecture, ZAR pricing, and production guardrails.',
    keywords: [
      'ai software development company south africa',
      'ai software development',
      'ai development company',
      'custom ai software',
      'llm integration south africa',
    ],
    eyebrow: 'AI engineering · South Africa',
    h1: 'AI Software Development Company South Africa',
    heroSubhead:
      'We build AI features as part of real products, not slide decks. LLM workflows, agents, and integrations sit on maintainable TypeScript backends with human review, logging, and clear ownership.',
    heroImage: HERO_IMAGES.mvpDeveloper,
    heroImageAlt: 'Engineer designing AI software architecture for a South African product',
    serviceType: 'AI software development',
    services: [
      {
        icon: Cpu,
        title: 'LLM product features',
        copy: 'In-app assistants, document tools, and support copilots with prompts and evals you can change without redeploying the whole app.',
      },
      {
        icon: Bot,
        title: 'Custom AI agents',
        copy: 'Agents that call your APIs, respect roles, and stop for approval on high-risk actions.',
      },
      {
        icon: Network,
        title: 'RAG and knowledge bases',
        copy: 'Search over policies, manuals, and tickets with citation-friendly answers for staff or customers.',
      },
      {
        icon: Zap,
        title: 'Workflow automation',
        copy: 'Email triage, lead scoring, and ops tasks where AI drafts and humans confirm.',
      },
      {
        icon: ClipboardList,
        title: 'Governance and observability',
        copy: 'Logging, cost caps, PII rules, and test sets so AI behavior is debuggable in production.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Use-case selection',
        copy: 'We pick one workflow with measurable time saved. Vanity chatbots without owners are out of scope.',
      },
      {
        step: '02',
        title: 'Data and safety review',
        copy: 'Sources, retention, and what the model must never do. Documented before prompts go wide.',
      },
      {
        step: '03',
        title: 'Pilot in staging',
        copy: 'Real documents and API sandboxes. Staff test with feedback loops before customer exposure.',
      },
      {
        step: '04',
        title: 'Production rollout',
        copy: 'Monitoring, fallbacks, and handover so your team can tune prompts and swap models.',
      },
    ],
    pricingTables: aiSoftwarePricingTables,
    pricingSectionTitle: 'AI software development pricing (ZAR)',
    pricingSectionIntro:
      'Model API spend is separate. These bands cover engineering, integration, and operational hardening.',
    projects: [
      {
        title: 'Queens Connect',
        description: 'Community AI companion with local context and guardrails.',
        url: 'https://queensconnect.qwabi.co.za/',
        tech: ['AI', 'Next.js', 'OpenAI'],
      },
      {
        title: 'Kingly',
        description: 'AI tooling for documentation and developer prompts.',
        url: 'https://kingly.qwabi.co.za/',
        tech: ['AI', 'React', 'Productivity'],
      },
      {
        title: 'ClinicPlus',
        description: 'Operations platform with room for AI-assisted scheduling insights.',
        url: 'https://clinicplusbookings.co.za/',
        tech: ['Web', 'Operations'],
      },
    ],
    projectsIntro: 'AI shipped inside products people use daily, not isolated demos.',
    faqs: [
      {
        question: 'What makes a credible AI software development company?',
        answer:
          'Look for production logging, eval datasets, integration ownership, and honesty about what LLMs cannot do. Demos without guardrails are not delivery.',
      },
      {
        question: 'Do you train custom models?',
        answer:
          'Most clients need integration and orchestration on top of frontier APIs. Fine-tuning is scoped when retrieval and prompts are insufficient.',
      },
      {
        question: 'Can AI be added to software you did not build?',
        answer:
          'Yes, when APIs or exports exist. We map integration effort explicitly so legacy systems do not block a useful pilot.',
      },
      {
        question: 'How do you control AI cost?',
        answer:
          'Caching, smaller models for classification, usage caps, and batch jobs. We set expectations in ZAR for engineering and show API spend separately.',
      },
    ],
    relatedLinks: [
      { label: 'AI agent development', path: '/ai-agent-development-south-africa' },
      { label: 'Bespoke AI solutions', path: '/bespoke-ai-solutions' },
      { label: 'AI-powered rapid development', path: '/services/ai-powered-rapid-app-development' },
      { label: 'Project scope estimator', path: '/get-a-quote' },
    ],
    ctaHeadline: 'Need an AI software development partner?',
    ctaSubhead:
      'Describe the workflow on WhatsApp or use the estimator. We suggest a pilot scope and ZAR range.',
  },
  {
    slug: 'ai-ready-bespoke-software',
    path: '/ai-ready-bespoke-software',
    metaTitle: 'AI-Ready Bespoke Software South Africa | Custom Platforms',
    metaDescription:
      'AI-ready bespoke software for South African businesses. Custom platforms built for LLM features, agents, and automation without a rebuild later. ZAR pricing and senior-led delivery.',
    keywords: [
      'ai-ready bespoke software south africa',
      'ai ready custom software',
      'bespoke software with ai',
      'custom platform ai integration',
      'ai-ready architecture south africa',
    ],
    eyebrow: 'Bespoke systems · AI-ready',
    h1: 'AI-Ready Bespoke Software for South African Teams',
    heroSubhead:
      'We build custom business software with APIs, data models, and audit trails that can host copilots and agents later. You get operations software that works today and a foundation that does not block AI next quarter.',
    heroImage: HERO_IMAGES.customSoftware,
    heroImageAlt: 'Operations team using bespoke software designed for future AI features',
    serviceType: 'AI-ready bespoke software development',
    services: [
      {
        icon: Building2,
        title: 'Operations platforms',
        copy: 'CRM, inventory, HR, and finance workflows on one coherent data layer instead of bolt-on chat widgets.',
      },
      {
        icon: Cpu,
        title: 'AI-ready architecture',
        copy: 'Structured events, role boundaries, and APIs so LLM features plug in without scraping the UI.',
      },
      {
        icon: Bot,
        title: 'Copilot and agent hooks',
        copy: 'Approval gates, tool endpoints, and logging designed before the first prompt ships.',
      },
      {
        icon: Network,
        title: 'Integrations',
        copy: 'Paystack, Xero, WhatsApp, and legacy exports so AI and humans share the same source of truth.',
      },
      {
        icon: ClipboardList,
        title: 'Phased delivery',
        copy: 'Core ops first, AI layers second. Each phase has a ZAR cap and clear acceptance criteria.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Process and data map',
        copy: 'We document roles, records, and what must never be automated without human sign-off.',
      },
      {
        step: '02',
        title: 'Platform blueprint',
        copy: 'Schema, APIs, and module order. AI use cases are named even if they ship in phase two.',
      },
      {
        step: '03',
        title: 'Build core operations',
        copy: 'Staff adopt real workflows on staging before any model touches production data.',
      },
      {
        step: '04',
        title: 'Extend with AI',
        copy: 'Copilots, search, or agents on the same stack with monitoring and cost controls.',
      },
    ],
    pricingTables: customSoftwarePricingTables,
    pricingSectionTitle: 'AI-ready bespoke software pricing (ZAR)',
    pricingSectionIntro:
      'Platform modules drive the quote. AI pilots are scoped separately once operations data is trustworthy.',
    projects: [
      {
        title: 'ClinicPlus',
        description: 'Clinic operations platform with room for scheduling insights and automation.',
        url: 'https://clinicplusbookings.co.za/',
        tech: ['Operations', 'Web', 'Node.js'],
      },
      {
        title: 'AN Consulting',
        description: 'Secure workflow tooling built for growing consulting operations.',
        url: 'https://www.anconsulting.co.za/',
        tech: ['Web app', 'Records'],
      },
      {
        title: 'Ilithiyana',
        description: 'Bookings and CRM aligned to how the team actually works.',
        url: 'https://ilithiyana.co.za/',
        tech: ['CRM', 'Scheduling'],
      },
    ],
    projectsIntro: 'Bespoke systems where uptime and staff trust matter as much as features.',
    faqs: [
      {
        question: 'What does AI-ready bespoke software mean?',
        answer:
          'It means your custom platform has clean APIs, permissions, and observability so AI features are integrations, not hacks on top of spreadsheets.',
      },
      {
        question: 'Can you add AI to software you build for us later?',
        answer:
          'Yes. That is the point of AI-ready design. We scope copilots or agents once core workflows are stable.',
      },
      {
        question: 'Is this different from off-the-shelf CRM with an AI add-on?',
        answer:
          'SaaS wins when your process matches the product. Bespoke wins when you have already bent multiple tools and need one system your team owns.',
      },
      {
        question: 'How long before AI features go live?',
        answer:
          'Most teams ship operations software in two to four months, then a focused AI pilot in three to six weeks on top of that foundation.',
      },
    ],
    relatedLinks: [
      { label: 'Custom software development', path: '/custom-software-development-south-africa' },
      { label: 'Bespoke AI solutions', path: '/bespoke-ai-solutions' },
      { label: 'AI software development company', path: '/ai-software-development-company' },
      { label: 'Project scope estimator', path: '/get-a-quote' },
    ],
    ctaHeadline: 'Planning bespoke software that can grow into AI?',
    ctaSubhead:
      'Describe your operations and future AI ideas on WhatsApp or use the estimator. We map phases and ZAR ranges.',
  },
  {
    slug: 'software-developers-south-africa',
    path: '/software-developers-south-africa',
    metaTitle: 'Software Developers in South Africa | Senior Product Engineers',
    metaDescription:
      'Software developers in South Africa for web and mobile products. Senior-led React and React Native delivery, ZAR pricing bands, and production references for founders and SMEs.',
    keywords: [
      'software developers in south africa',
      'software developer south africa',
      'hire software developers south africa',
      'app developers south africa',
      'web developers south africa',
    ],
    eyebrow: 'Senior developers · South Africa',
    h1: 'Software Developers in South Africa',
    heroSubhead:
      'You work with the engineers who scope, build, and launch your product. No account manager layer, no rotating juniors on critical paths. Web and mobile from one studio in Queenstown.',
    heroImage: HERO_IMAGES.servicesHub,
    heroImageAlt: 'Senior software developers building a product for a South African founder',
    serviceType: 'Software development for founders',
    services: [
      {
        icon: Layout,
        title: 'Web product development',
        copy: 'React and Next.js apps with auth, payments, admin, and APIs your next hire can extend.',
      },
      {
        icon: Smartphone,
        title: 'Mobile app development',
        copy: 'React Native and Flutter when one codebase beats dual native builds, native when hardware demands it.',
      },
      {
        icon: Cpu,
        title: 'Backend and APIs',
        copy: 'Node.js, Postgres, Supabase, or Firebase chosen for maintainability, not resume-driven stack picks.',
      },
      {
        icon: Zap,
        title: 'Rescue and hardening',
        copy: 'Audits on live codebases before another agency sprint burns budget on unclear scope.',
      },
      {
        icon: Users,
        title: 'Founder-friendly delivery',
        copy: 'Weekly demos, written milestones, and honest pushback when scope does not match the deadline.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Fit and brief',
        copy: 'We confirm whether you need web, mobile, or both, and what must work on day one.',
      },
      {
        step: '02',
        title: 'Written scope and ZAR range',
        copy: 'Milestones, stack, and risks before design or code starts.',
      },
      {
        step: '03',
        title: 'Build with visibility',
        copy: 'Staging links, device testing, and integration checks on real payment and auth flows.',
      },
      {
        step: '04',
        title: 'Launch and handover',
        copy: 'Store submission, hosting, docs, and optional retainer so you are not stuck on one freelancer.',
      },
    ],
    pricingTables: [
      ...webDevelopmentPricingTables.slice(0, 1),
      ...mobileAppPricingTables.slice(0, 1),
    ],
    pricingSectionTitle: 'Software developer pricing bands (ZAR)',
    pricingSectionIntro:
      'Web and mobile sit in different ranges. Use these for budgeting; we confirm after your brief.',
    projects: [
      {
        title: 'UTap',
        description: 'Campus NFC wallet and access flows on mobile.',
        url: 'https://utaptech.co.za/',
        tech: ['React Native', 'NFC', 'Firebase'],
      },
      {
        title: 'Laundry Marketplace',
        description: 'Customer and provider experiences on web.',
        url: 'https://laundry.qwabi.co.za/',
        tech: ['Next.js', 'Marketplace'],
      },
      {
        title: 'Queens Connect',
        description: 'Community product with AI-assisted local assistance.',
        url: 'https://queensconnect.qwabi.co.za/',
        tech: ['Next.js', 'AI', 'OpenAI'],
      },
    ],
    projectsIntro: 'Shipped products across mobile, web, and AI-assisted features.',
    faqs: [
      {
        question: 'How do I hire software developers in South Africa?',
        answer:
          'Look for production references, direct access to senior engineers, and quotes that cover backend and ops, not screens alone. Ask who owns architecture on your project.',
      },
      {
        question: 'Freelancer vs software development studio?',
        answer:
          'Freelancers fit small sites with frozen specs. Products with auth, payments, and admin usually need a senior partner who stays through launch.',
      },
      {
        question: 'Do you supply a full team or one developer?',
        answer:
          'You get senior-led delivery with specialists pulled in when needed. The person on your scope call is involved in build decisions.',
      },
      {
        question: 'Remote or on-site?',
        answer:
          'Most work is remote with async updates and weekly calls. On-site workshops are available for discovery when complexity is high.',
      },
    ],
    relatedLinks: [
      { label: 'Web development South Africa', path: '/web-development-south-africa' },
      { label: 'Mobile app development', path: '/mobile-app-development-south-africa' },
      { label: 'Software development companies', path: '/software-development-companies-south-africa' },
      { label: 'Project scope estimator', path: '/get-a-quote' },
    ],
    ctaHeadline: 'Looking for software developers you can trust?',
    ctaSubhead:
      'Share your product, stack, and timeline on WhatsApp or use the estimator. We reply with fit and a ZAR range.',
  },
  {
    slug: 'bespoke-ai-solutions',
    path: '/bespoke-ai-solutions',
    metaTitle: 'Bespoke AI Solutions South Africa | Custom AI Engineering',
    metaDescription:
      'Bespoke AI solutions in South Africa. Custom copilots, agents, RAG, and workflow automation on your data with production guardrails and ZAR pricing.',
    keywords: [
      'bespoke ai solutions in south africa',
      'bespoke ai solutions',
      'custom ai solutions south africa',
      'tailored ai software',
      'enterprise ai south africa',
    ],
    eyebrow: 'Custom AI · South Africa',
    h1: 'Bespoke AI Solutions in South Africa',
    heroSubhead:
      'Off-the-shelf AI tools rarely match your policies, roles, or legacy systems. We design bespoke AI solutions that sit on your software, respect approvals, and stay debuggable after launch.',
    heroImage: HERO_IMAGES.mvpDeveloper,
    heroImageAlt: 'Engineer configuring bespoke AI workflows for a South African business',
    serviceType: 'Bespoke AI solutions',
    services: [
      {
        icon: Sparkles,
        title: 'Tailored copilots',
        copy: 'Assistants trained on your docs and SOPs with citations staff can verify before acting.',
      },
      {
        icon: Bot,
        title: 'Custom agents',
        copy: 'Agents that call your CRM, ticketing, or ops APIs with role checks and human approval on risky steps.',
      },
      {
        icon: Network,
        title: 'RAG over private data',
        copy: 'Search policies, contracts, and tickets without sending raw exports to a public chatbot.',
      },
      {
        icon: Zap,
        title: 'Workflow automation',
        copy: 'Draft emails, classify leads, and summarize calls where AI proposes and humans confirm.',
      },
      {
        icon: ClipboardList,
        title: 'Evals and governance',
        copy: 'Test sets, logging, and cost caps so behavior is measurable, not mysterious.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Workflow selection',
        copy: 'One measurable outcome (hours saved, faster response) owns the pilot. Vanity bots without owners are out.',
      },
      {
        step: '02',
        title: 'Data and policy design',
        copy: 'Sources, retention, PII rules, and escalation paths documented before prompts scale.',
      },
      {
        step: '03',
        title: 'Pilot with real users',
        copy: 'Staff test on staging data with feedback loops before customers see outputs.',
      },
      {
        step: '04',
        title: 'Production and tuning',
        copy: 'Monitoring, fallbacks, and handover so your team can adjust prompts and swap models.',
      },
    ],
    pricingTables: aiSoftwarePricingTables,
    pricingSectionTitle: 'Bespoke AI solution pricing (ZAR)',
    pricingSectionIntro:
      'Engineering bands below exclude LLM API spend, which we estimate separately from usage patterns.',
    projects: [
      {
        title: 'Queens Connect',
        description: 'Community companion with local context and safety guardrails.',
        url: 'https://queensconnect.qwabi.co.za/',
        tech: ['AI', 'Next.js', 'OpenAI'],
      },
      {
        title: 'Kingly',
        description: 'AI tooling for documentation and structured prompts.',
        url: 'https://kingly.qwabi.co.za/',
        tech: ['AI', 'React', 'Productivity'],
      },
      {
        title: 'ClinicPlus',
        description: 'Operations platform ready for AI-assisted scheduling insights.',
        url: 'https://clinicplusbookings.co.za/',
        tech: ['Web', 'Operations'],
      },
    ],
    projectsIntro: 'Bespoke AI inside products people use, not one-off demos.',
    faqs: [
      {
        question: 'How is bespoke AI different from ChatGPT for business?',
        answer:
          'Bespoke solutions use your permissions, APIs, and audit logs. Generic chat lacks role boundaries and creates compliance risk.',
      },
      {
        question: 'Do we need new software before AI?',
        answer:
          'Not always. Useful pilots need reachable APIs or exports. We say when a small platform fix should come first.',
      },
      {
        question: 'Can bespoke AI connect to Microsoft or Google?',
        answer:
          'Yes, when identity and data access are scoped. Integration effort is priced explicitly in the proposal.',
      },
      {
        question: 'Who maintains prompts after launch?',
        answer:
          'We hand over playbooks and can stay on retainer. Your team owns tuning; we own architecture and integration health.',
      },
    ],
    relatedLinks: [
      { label: 'AI software development company', path: '/ai-software-development-company' },
      { label: 'AI agent development', path: '/ai-agent-development-south-africa' },
      { label: 'AI system integration', path: '/ai-system-integration-south-africa' },
      { label: 'Project scope estimator', path: '/get-a-quote' },
    ],
    ctaHeadline: 'Need bespoke AI that fits your business?',
    ctaSubhead:
      'Describe the workflow on WhatsApp or use the estimator. We suggest a pilot and ZAR range.',
  },
  {
    slug: 'software-development-companies-south-africa',
    path: '/software-development-companies-south-africa',
    metaTitle: 'Software Development Companies South Africa | Why Qwabi',
    metaDescription:
      'Compare software development companies in South Africa. See how senior-led delivery, ZAR transparency, and shipped references differ from typical agency pitches.',
    keywords: [
      'software development companies in south africa',
      'software development company south africa',
      'best software development company',
      'custom software company south africa',
      'compare software developers',
    ],
    eyebrow: 'Vendor comparison · South Africa',
    h1: 'Software Development Companies in South Africa',
    heroSubhead:
      'Most lists compare logos and office cities. This page compares how work actually gets done: who writes your architecture, how scope is priced in ZAR, and whether you can see production references before you sign.',
    heroImage: HERO_IMAGES.servicesHub,
    heroImageAlt: 'Founder comparing software development companies in South Africa',
    serviceType: 'Software development company comparison',
    services: [
      {
        icon: Users,
        title: 'Senior-led delivery',
        copy: 'The engineer on your discovery call stays involved in architecture and release decisions, not handed off to a junior bench.',
      },
      {
        icon: Calculator,
        title: 'ZAR ranges upfront',
        copy: 'Written bands for web, mobile, and bespoke ops before polish work starts. Fewer surprise change orders mid-sprint.',
      },
      {
        icon: Package,
        title: 'Shipped references',
        copy: 'Live products you can click through, not stock photography and vague case studies.',
      },
      {
        icon: Building2,
        title: 'Bespoke when SaaS fails',
        copy: 'CRM, inventory, and HR modules when your team already runs parallel spreadsheets beside off-the-shelf tools.',
      },
      {
        icon: Cpu,
        title: 'AI without theater',
        copy: 'Copilots and agents scoped on measurable workflows with logging, not slideware demos.',
      },
      {
        icon: Globe,
        title: 'Web and mobile together',
        copy: 'One studio for React web apps and React Native mobile when your product spans both surfaces.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Compare on outcomes',
        copy: 'Ask each vendor what ships in ninety days, who owns backend quality, and what happens after launch.',
      },
      {
        step: '02',
        title: 'Review references',
        copy: 'We walk live apps and explain architecture tradeoffs. You should expect the same rigor elsewhere.',
      },
      {
        step: '03',
        title: 'Align scope and ZAR',
        copy: 'Apples-to-apples quotes need the same user roles, integrations, and admin depth.',
      },
      {
        step: '04',
        title: 'Start with a phase',
        copy: 'A bounded pilot beats a twelve-month waterfall contract when requirements are still moving.',
      },
    ],
    pricingTables: [
      ...customSoftwarePricingTables.slice(0, 2),
      ...webDevelopmentPricingTables.slice(1, 2),
    ],
    pricingSectionTitle: 'What South African software companies should quote',
    pricingSectionIntro:
      'Use these public bands to spot quotes that hide backend, admin, or integration work.',
    projects: [
      {
        title: 'Laundry Marketplace',
        description: 'Multi-sided marketplace with real payouts and operations tooling.',
        url: 'https://laundry.qwabi.co.za/',
        tech: ['Next.js', 'Marketplace'],
      },
      {
        title: 'ClinicPlus',
        description: 'Occupational health bookings and clinic operations at scale.',
        url: 'https://clinicplusbookings.co.za/',
        tech: ['React', 'Operations'],
      },
      {
        title: 'Future Start',
        description: 'Student accommodation and commerce on one platform.',
        url: 'https://futurestart.co.za/',
        tech: ['Web', 'Commerce'],
      },
    ],
    projectsIntro: 'Production software you can evaluate before choosing a partner.',
    faqs: [
      {
        question: 'How do I choose between software development companies?',
        answer:
          'Weight shipped references, senior access, integration ownership, and post-launch support. Price per screen is a red flag for product work.',
      },
      {
        question: 'Large agency vs boutique studio?',
        answer:
          'Large agencies fit enterprise procurement and big teams. Boutique studios fit founders who need speed, direct engineer access, and less overhead.',
      },
      {
        question: 'Why list Qwabi on a comparison page?',
        answer:
          'Transparency. You should compare vendors on the same criteria. We publish ZAR bands and live references so you can decide without a sales deck.',
      },
      {
        question: 'Do you compete on the lowest quote?',
        answer:
          'No. We compete on predictable delivery and maintainable code. We will tell you when a smaller scope or SaaS tool is the better spend.',
      },
    ],
    relatedLinks: [
      { label: 'Software developers South Africa', path: '/software-developers-south-africa' },
      { label: 'Custom software development', path: '/custom-software-development-south-africa' },
      { label: 'Web development company', path: '/web-development-company-south-africa' },
      { label: 'Project scope estimator', path: '/get-a-quote' },
    ],
    ctaHeadline: 'Comparing software development companies?',
    ctaSubhead:
      'Share your shortlist and requirements on WhatsApp. We will be direct about fit and how our ZAR ranges compare.',
  },
  {
    slug: 'digital-transformation-south-africa',
    path: '/digital-transformation-south-africa',
    metaTitle: 'Digital Transformation Company South Africa | Ops Software',
    metaDescription:
      'Digital transformation company in South Africa for SMEs. Replace spreadsheets with bespoke ops software, phased rollouts, ZAR pricing, and staff adoption support.',
    keywords: [
      'digital transformation company south africa',
      'digital transformation south africa',
      'business digital transformation',
      'operations digitization',
      'sme digital transformation',
    ],
    eyebrow: 'Operations digitization · South Africa',
    h1: 'Digital Transformation for South African Businesses',
    heroSubhead:
      'Transformation here means software your team actually uses: CRM, inventory, HR, and customer portals that replace WhatsApp chaos and parallel spreadsheets. Phased delivery, not a three-year slide deck.',
    heroImage: HERO_IMAGES.customSoftware,
    heroImageAlt: 'Team adopting digital operations software in South Africa',
    serviceType: 'Digital transformation and bespoke software',
    services: [
      {
        icon: ClipboardList,
        title: 'Process discovery',
        copy: 'We map how work moves today, including informal channels, before proposing modules.',
      },
      {
        icon: Building2,
        title: 'Core systems replacement',
        copy: 'CRM, stock, HR, and finance ops tailored to roles on the ground, not generic enterprise templates.',
      },
      {
        icon: Users,
        title: 'Change and training',
        copy: 'Short guides, staging walkthroughs, and phased cutovers so adoption sticks.',
      },
      {
        icon: Network,
        title: 'Integration layer',
        copy: 'Bridges to accounting, payments, and legacy exports during transition.',
      },
      {
        icon: Sparkles,
        title: 'Automation and AI later',
        copy: 'Once data is trustworthy, copilots and agents amplify teams instead of bypassing them.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Baseline audit',
        copy: 'Tools, spreadsheets, and bottlenecks. We quantify what digitization should fix first.',
      },
      {
        step: '02',
        title: 'Roadmap and ZAR phases',
        copy: 'Module order with caps per phase. Leadership signs off before build starts.',
      },
      {
        step: '03',
        title: 'Pilot department',
        copy: 'One team goes live on staging, imports real data, and feeds back before company-wide rollout.',
      },
      {
        step: '04',
        title: 'Scale and improve',
        copy: 'Retainer for fixes, new modules, and automation as habits change.',
      },
    ],
    pricingTables: customSoftwarePricingTables,
    pricingSectionTitle: 'Digital transformation software pricing (ZAR)',
    pricingSectionIntro:
      'Transformation budget is mostly bespoke ops software and integration. Use these module bands for planning.',
    projects: [
      {
        title: 'Ilithiyana',
        description: 'CRM and bookings replacing manual client tracking.',
        url: 'https://ilithiyana.co.za/',
        tech: ['CRM', 'Scheduling'],
      },
      {
        title: 'AN Consulting',
        description: 'Records and workflow digitization for consulting ops.',
        url: 'https://www.anconsulting.co.za/',
        tech: ['Web app', 'Operations'],
      },
      {
        title: 'ClinicPlus',
        description: 'Health operations moved off phone coordination into one system.',
        url: 'https://clinicplusbookings.co.za/',
        tech: ['React', 'Operations'],
      },
    ],
    projectsIntro: 'Digitization projects where staff adoption determined success.',
    faqs: [
      {
        question: 'What does a digital transformation company do for SMEs?',
        answer:
          'For most SMEs it means replacing manual ops with software that matches your process, plus training and integrations. Giant strategy decks are optional; working systems are not.',
      },
      {
        question: 'How long does transformation take?',
        answer:
          'A single department pilot can go live in two months. Multi-module programmes usually roll out over six to twelve months in phases.',
      },
      {
        question: 'Can we keep Excel during transition?',
        answer:
          'Yes, with imports and parallel running until staff trust the new system. Cutover dates are planned, not forced overnight.',
      },
      {
        question: 'Is AI part of digital transformation?',
        answer:
          'It can be, after core data and permissions exist. We sequence AI once operations software is stable.',
      },
    ],
    relatedLinks: [
      { label: 'Custom software development', path: '/custom-software-development-south-africa' },
      { label: 'AI-ready bespoke software', path: '/ai-ready-bespoke-software' },
      { label: 'Bespoke CRM systems', path: '/bespoke-crm-systems-south-africa' },
      { label: 'Project scope estimator', path: '/get-a-quote' },
    ],
    ctaHeadline: 'Ready to digitize operations that still run on spreadsheets?',
    ctaSubhead:
      'Describe current tools and pain points on WhatsApp or use the estimator. We propose phased ZAR ranges.',
  },
  {
    slug: 'ai-agent-development-south-africa',
    path: '/ai-agent-development-south-africa',
    metaTitle: 'AI Agent Development South Africa | Custom Agents',
    metaDescription:
      'AI agent development in South Africa. Task agents, multi-step workflows, tool use, and approval gates on your APIs. ZAR pricing and production observability.',
    keywords: [
      'ai agent development south africa',
      'ai agents south africa',
      'custom ai agent development',
      'autonomous agent development',
      'llm agents south africa',
    ],
    eyebrow: 'AI agents · South Africa',
    h1: 'AI Agent Development in South Africa',
    heroSubhead:
      'We build agents that do real work inside your product: lookup CRM records, draft replies, schedule follow-ups, and stop for human approval when money or compliance is involved.',
    heroImage: HERO_IMAGES.mvpDeveloper,
    heroImageAlt: 'AI agent workflow diagram for a South African business application',
    serviceType: 'AI agent development',
    services: [
      {
        icon: Bot,
        title: 'Task agents',
        copy: 'Single-purpose agents with a small tool set and clear success metrics.',
      },
      {
        icon: Network,
        title: 'Multi-step orchestration',
        copy: 'Handoffs between steps with structured outputs your app can verify.',
      },
      {
        icon: ClipboardList,
        title: 'Approval gates',
        copy: 'Humans confirm payouts, contract changes, and customer-facing messages before send.',
      },
      {
        icon: Cpu,
        title: 'Tool integrations',
        copy: 'CRM, email, calendars, and internal APIs exposed as typed tools, not free-form shell access.',
      },
      {
        icon: Zap,
        title: 'Observability',
        copy: 'Traces, cost tracking, and replay so you can debug agent behavior in production.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Agent charter',
        copy: 'Allowed actions, forbidden actions, and escalation paths written before code.',
      },
      {
        step: '02',
        title: 'Tooling and sandbox',
        copy: 'API wrappers and staging data so agents train on realistic but safe inputs.',
      },
      {
        step: '03',
        title: 'Pilot with operators',
        copy: 'Staff use agents on real queues with feedback before customer-facing automation.',
      },
      {
        step: '04',
        title: 'Harden and scale',
        copy: 'Rate limits, fallbacks, and model routing as volume grows.',
      },
    ],
    pricingTables: aiSoftwarePricingTables,
    pricingSectionTitle: 'AI agent development pricing (ZAR)',
    pricingSectionIntro:
      'Agent complexity and number of integrations drive quotes. Model API costs are estimated separately.',
    projects: [
      {
        title: 'Queens Connect',
        description: 'Conversational agent with local knowledge and safety boundaries.',
        url: 'https://queensconnect.qwabi.co.za/',
        tech: ['AI', 'Agents', 'OpenAI'],
      },
      {
        title: 'Kingly',
        description: 'Structured prompt and document agents for developer workflows.',
        url: 'https://kingly.qwabi.co.za/',
        tech: ['AI', 'React', 'Tools'],
      },
      {
        title: 'Laundry Marketplace',
        description: 'Operations platform where agent-assisted support can extend over time.',
        url: 'https://laundry.qwabi.co.za/',
        tech: ['Next.js', 'Marketplace'],
      },
    ],
    projectsIntro: 'Agents shipped with guardrails, not unattended experiments.',
    faqs: [
      {
        question: 'What is AI agent development?',
        answer:
          'It is software that plans steps, calls tools (APIs, search, email), and returns structured results. Good agents include logging, approvals, and clear boundaries.',
      },
      {
        question: 'Are agents safe for customer-facing use?',
        answer:
          'Only with review flows and tested prompts. We default to human approval for financial, legal, and reputational actions.',
      },
      {
        question: 'Which frameworks do you use?',
        answer:
          'We pick orchestration based on maintainability, often LangChain-style patterns or lightweight custom runners on TypeScript backends.',
      },
      {
        question: 'Can agents run on our existing app?',
        answer:
          'Yes, when your APIs and auth model support it. We scope integration effort explicitly in the proposal.',
      },
    ],
    relatedLinks: [
      { label: 'Bespoke AI solutions', path: '/bespoke-ai-solutions' },
      { label: 'AI system integration', path: '/ai-system-integration-south-africa' },
      { label: 'AI software development company', path: '/ai-software-development-company' },
      { label: 'Project scope estimator', path: '/get-a-quote' },
    ],
    ctaHeadline: 'Planning AI agents for real workflows?',
    ctaSubhead:
      'Describe tasks, systems, and risk tolerance on WhatsApp or use the estimator. We propose a pilot and ZAR range.',
  },
  {
    slug: 'ai-system-integration-south-africa',
    path: '/ai-system-integration-south-africa',
    metaTitle: 'AI System Integration South Africa | LLM and API Wiring',
    metaDescription:
      'AI system integration services in South Africa. Connect LLMs to CRM, ERP, data warehouses, and custom apps with secure APIs, RAG, and ZAR-priced engineering.',
    keywords: [
      'ai system integration services south africa',
      'ai integration south africa',
      'llm integration services',
      'connect ai to crm',
      'enterprise ai integration',
    ],
    eyebrow: 'AI integration · South Africa',
    h1: 'AI System Integration Services in South Africa',
    heroSubhead:
      'Models are easy to demo; integration is hard. We wire AI into the systems you already run with auth, sync, and fallbacks so answers reflect live data, not stale exports.',
    heroImage: HERO_IMAGES.mvpDeveloper,
    heroImageAlt: 'AI system integration between business software and LLM services',
    serviceType: 'AI system integration',
    services: [
      {
        icon: Network,
        title: 'CRM and support integration',
        copy: 'Copilots that read tickets, accounts, and history with the same permissions as your staff.',
      },
      {
        icon: Building2,
        title: 'ERP and ops data',
        copy: 'Inventory, orders, and HR records exposed safely to retrieval and agent tools.',
      },
      {
        icon: Cpu,
        title: 'API and webhook layers',
        copy: 'Stable contracts between your app and model providers with retries and idempotency.',
      },
      {
        icon: Sparkles,
        title: 'RAG pipelines',
        copy: 'Chunking, embeddings, and refresh jobs so knowledge bases stay current.',
      },
      {
        icon: ClipboardList,
        title: 'Security review',
        copy: 'PII handling, tenant isolation, and audit logs for regulated or sensitive workflows.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Systems map',
        copy: 'We inventory APIs, exports, and auth methods for each data source AI must touch.',
      },
      {
        step: '02',
        title: 'Integration design',
        copy: 'Sync frequency, caching, and failure modes documented before prompts are finalized.',
      },
      {
        step: '03',
        title: 'Staging integration',
        copy: 'Sandboxes with masked data prove answers and actions before production keys go live.',
      },
      {
        step: '04',
        title: 'Operate and monitor',
        copy: 'Alerts on drift, failed syncs, and token spend so integration health is visible.',
      },
    ],
    pricingTables: aiSoftwarePricingTables,
    pricingSectionTitle: 'AI system integration pricing (ZAR)',
    pricingSectionIntro:
      'Integration surface area and legacy constraints drive quotes. API usage is billed separately.',
    projects: [
      {
        title: 'ClinicPlus',
        description: 'Booking platform ready to connect scheduling data to AI insights.',
        url: 'https://clinicplusbookings.co.za/',
        tech: ['Web', 'APIs', 'Operations'],
      },
      {
        title: 'Queens Connect',
        description: 'Integrated AI layer on a production community product.',
        url: 'https://queensconnect.qwabi.co.za/',
        tech: ['AI', 'Integration', 'Next.js'],
      },
      {
        title: 'AN Consulting',
        description: 'Internal records system with structured data for future automation.',
        url: 'https://www.anconsulting.co.za/',
        tech: ['Web app', 'Data'],
      },
    ],
    projectsIntro: 'Integrations where correct data mattered more than model choice.',
    faqs: [
      {
        question: 'What are AI system integration services?',
        answer:
          'They connect LLMs or agents to your CRM, databases, and internal APIs with auth, logging, and sync so AI outputs use current, permissioned data.',
      },
      {
        question: 'Can you integrate AI without replacing our ERP?',
        answer:
          'Usually yes. We bridge via APIs or controlled exports. Replacement is a separate business decision.',
      },
      {
        question: 'How do you handle sensitive data?',
        answer:
          'Role-based access, masking in non-production, retention policies, and optional on-region hosting depending on requirements.',
      },
      {
        question: 'What if our legacy system has no API?',
        answer:
          'We scope file-based or database bridges honestly. Some paths need a small middleware service first.',
      },
    ],
    relatedLinks: [
      { label: 'Bespoke AI solutions', path: '/bespoke-ai-solutions' },
      { label: 'AI agent development', path: '/ai-agent-development-south-africa' },
      { label: 'AI-ready bespoke software', path: '/ai-ready-bespoke-software' },
      { label: 'Project scope estimator', path: '/get-a-quote' },
    ],
    ctaHeadline: 'Need AI wired into systems you already run?',
    ctaSubhead:
      'List your stack and data sources on WhatsApp or use the estimator. We outline integration phases and ZAR ranges.',
  },
  {
    slug: 'bespoke-crm-systems-south-africa',
    path: '/bespoke-crm-systems-south-africa',
    metaTitle: 'Bespoke CRM Systems South Africa | Custom Sales Ops',
    metaDescription:
      'Bespoke CRM systems in South Africa. Custom pipelines, WhatsApp and email hooks, reporting, and ZAR pricing when off-the-shelf CRM no longer fits your sales process.',
    keywords: [
      'bespoke crm system',
      'bespoke crm south africa',
      'custom crm development',
      'crm software south africa',
      'tailored crm system',
    ],
    eyebrow: 'Custom CRM · South Africa',
    h1: 'Bespoke CRM Systems in South Africa',
    heroSubhead:
      'When HubSpot or generic CRM fields fight how your team sells, a bespoke CRM matches pipelines, territories, and follow-ups. Built for South African teams that live on WhatsApp and need honest ZAR scope.',
    heroImage: HERO_IMAGES.customSoftware,
    heroImageAlt: 'Sales team using a bespoke CRM built for South African workflows',
    serviceType: 'Bespoke CRM development',
    services: [
      {
        icon: Building2,
        title: 'Pipeline design',
        copy: 'Stages, fields, and automations that mirror how deals actually move in your market.',
      },
      {
        icon: Users,
        title: 'Roles and territories',
        copy: 'Branch access, commissions, and manager visibility without paying for enterprise seats you do not need.',
      },
      {
        icon: Zap,
        title: 'WhatsApp and email hooks',
        copy: 'Log conversations and trigger tasks from channels your reps already use daily.',
      },
      {
        icon: Calculator,
        title: 'Reporting and exports',
        copy: 'Dashboards and VAT-friendly exports your finance team can reconcile.',
      },
      {
        icon: Network,
        title: 'Accounting and marketing sync',
        copy: 'Xero, Paystack, or web forms feeding the same customer record.',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Sales process workshop',
        copy: 'We document lead sources, handoffs, and what managers need to see weekly.',
      },
      {
        step: '02',
        title: 'CRM blueprint',
        copy: 'Entities, permissions, and automations signed off before UI build.',
      },
      {
        step: '03',
        title: 'Build and import',
        copy: 'Historical deals migrated with validation scripts and a staging trial for reps.',
      },
      {
        step: '04',
        title: 'Adopt and extend',
        copy: 'Training, tweaks after first month live, and optional retainer for new modules.',
      },
    ],
    pricingTables: customSoftwarePricingTables.filter((t) => t.id === 'crm-ops'),
    pricingSectionTitle: 'Bespoke CRM pricing (ZAR)',
    pricingSectionIntro:
      'Light CRM for small teams sits below multi-branch systems with commissions and ERP feeds.',
    projects: [
      {
        title: 'Ilithiyana',
        description: 'Client bookings and CRM aligned to service workflows.',
        url: 'https://ilithiyana.co.za/',
        tech: ['CRM', 'Scheduling'],
      },
      {
        title: 'Laundry Marketplace',
        description: 'Customer and provider relationship data across a marketplace.',
        url: 'https://laundry.qwabi.co.za/',
        tech: ['CRM', 'Marketplace'],
      },
      {
        title: 'ClinicPlus',
        description: 'Employer and clinic relationship tracking for health programmes.',
        url: 'https://clinicplusbookings.co.za/',
        tech: ['Operations', 'Bookings'],
      },
    ],
    projectsIntro: 'CRM-style systems where generic SaaS fields were not enough.',
    faqs: [
      {
        question: 'Bespoke CRM vs Salesforce or HubSpot?',
        answer:
          'SaaS wins when your process fits the product out of the box. Bespoke wins when you pay for many seats yet reps still track deals in WhatsApp and Excel.',
      },
      {
        question: 'Can you migrate from our current CRM?',
        answer:
          'Yes, with export mapping and deduplication scripts. Migration effort is scoped separately from net-new build.',
      },
      {
        question: 'How long does a custom CRM take?',
        answer:
          'A light CRM for a small team can ship in six to nine weeks. Multi-branch systems with integrations often need three to five months.',
      },
      {
        question: 'Will mobile sales reps get an app?',
        answer:
          'We can add a mobile-friendly web app or React Native client when field access is in scope from day one.',
      },
    ],
    relatedLinks: [
      { label: 'Custom software development', path: '/custom-software-development-south-africa' },
      { label: 'Digital transformation', path: '/digital-transformation-south-africa' },
      { label: 'AI-ready bespoke software', path: '/ai-ready-bespoke-software' },
      { label: 'Project scope estimator', path: '/get-a-quote' },
    ],
    ctaHeadline: 'Need a CRM built around how you sell?',
    ctaSubhead:
      'Share pipelines, team size, and integrations on WhatsApp or use the estimator. We reply with a ZAR range.',
  },
];

export const serviceLandingPagesByPath = Object.fromEntries(
  serviceLandingPages.map((page) => [page.path, page]),
) as Record<string, ServiceLandingPageConfig>;

export const serviceLandingPaths = serviceLandingPages.map((p) => p.path);
