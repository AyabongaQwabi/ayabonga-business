import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  Calculator,
  Car,
  ClipboardList,
  Cpu,
  Globe,
  Layout,
  Package,
  ShoppingCart,
  Smartphone,
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

export const serviceLandingPages: ServiceLandingPageConfig[] = [
  {
    slug: 'mobile-app-development-south-africa',
    path: '/mobile-app-development-south-africa',
    metaTitle:
      'Mobile App Development South Africa | App Development Company',
    metaDescription:
      'Professional mobile app developers in South Africa. Android and iOS apps for startups and SMEs, with ZAR pricing ranges, shipped references, and WhatsApp-first discovery.',
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
      'Bespoke software for South African businesses: CRM, payroll, HR, inventory, property, fleet, and accounting operations. ZAR pricing ranges and senior-led delivery.',
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
      { label: 'App development cost guide (2026)', path: '/app-development-cost-south-africa' },
      { label: 'Mobile app development', path: '/mobile-app-development-south-africa' },
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
      'South African web development company for customer portals, SaaS dashboards, ecommerce, and marketing sites. Senior-led React/Next.js delivery with ZAR pricing bands.',
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
];

export const serviceLandingPagesByPath = Object.fromEntries(
  serviceLandingPages.map((page) => [page.path, page]),
) as Record<string, ServiceLandingPageConfig>;

export const serviceLandingPaths = serviceLandingPages.map((p) => p.path);
