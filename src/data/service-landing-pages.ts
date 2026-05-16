import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  Calculator,
  Car,
  ClipboardList,
  Package,
  Smartphone,
  Users,
  Warehouse,
} from 'lucide-react';
import type { PricingTableBlock } from '../components/PricingTable';

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
      'I build Android and iOS products as a senior engineer, not a hand-off agency. You get store-ready apps, APIs, admin tooling, and honest ZAR ranges before you commit.',
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
        copy: 'You share the problem, users, and deadline. I ask about payments, admin, and what must work on day one.',
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
        title: 'UTap',
        description: 'University NFC access wallet for campus access and payments.',
        url: 'https://utaptech.co.za/',
        tech: ['React Native', 'NFC', 'Firebase'],
      },
      {
        title: 'Laundry Marketplace',
        description: 'Customer and provider apps with marketplace operations.',
        url: 'https://laundry.qwabi.co.za/',
        tech: ['Next.js', 'Mobile web', 'Payments'],
      },
      {
        title: 'Queens Connect',
        description: 'Community AI companion with local context and assistance.',
        url: 'https://queensconnect.qwabi.co.za/',
        tech: ['Next.js', 'OpenAI', 'AI'],
      },
    ],
    projectsIntro:
      'Shipped products across fintech, marketplaces, and community apps. Ask for architecture detail on a call.',
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
          'Most clients are founders and SME operators. I also rescue live products and partner on retainers when the app is already in market.',
      },
    ],
    relatedLinks: [
      { label: 'App development cost guide (2026)', path: '/app-development-cost-south-africa' },
      { label: 'Project scope estimator', path: '/get-a-quote' },
      { label: 'Custom software development', path: '/custom-software-development-south-africa' },
      { label: 'All engineering services', path: '/services' },
    ],
    ctaHeadline: 'Ready to scope your mobile app?',
    ctaSubhead:
      'Send a short brief on WhatsApp or use the estimator. I reply with fit, risks, and a realistic ZAR range.',
  },
  {
    slug: 'custom-software-development-south-africa',
    path: '/custom-software-development-south-africa',
    metaTitle:
      'Custom Software Development South Africa | Bespoke Business Systems',
    metaDescription:
      'Bespoke software for South African businesses: CRM, payroll, HR, inventory, property, fleet, and accounting operations. ZAR pricing ranges and long-term technical partnership.',
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
      'Replace spreadsheets and broken off-the-shelf tools with software that matches how your team works. I design, build, and stay responsible for CRM, ops, HR, inventory, and industry-specific platforms.',
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
        copy: 'We walk your current spreadsheets, WhatsApp groups, and pain points. I document roles and must-not-break rules.',
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
      'Module complexity, integrations, and compliance drive quotes. Use these bands for budgeting; I confirm after a technical review.',
    projects: [
      {
        title: 'ClinicPlus',
        description: 'Occupational health bookings and clinic operations for mining-sector employers.',
        url: 'https://clinicplusbookings.co.za/',
        tech: ['React', 'Node.js', 'Operations'],
      },
      {
        title: 'Laundry Marketplace',
        description: 'Multi-sided operations: providers, customers, payouts, and admin.',
        url: 'https://laundry.qwabi.co.za/',
        tech: ['Marketplace', 'Admin', 'Payments'],
      },
      {
        title: 'Kingly',
        description: 'Internal productivity platform for structured AI-assisted delivery.',
        url: 'https://kingly.qwabi.co.za/',
        tech: ['React', 'TypeScript', 'AI'],
      },
    ],
    projectsIntro:
      'Operations-heavy products where uptime and staff adoption matter as much as the UI.',
    faqs: [
      {
        question: 'Custom software vs off-the-shelf CRM or ERP?',
        answer:
          'Off-the-shelf wins when your process matches the product. Custom wins when you have already bent five tools and staff still run parallel spreadsheets. I will tell you honestly if SaaS is enough.',
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
      'Describe the workflow on WhatsApp or book a scope conversation. I will map phases and ZAR ranges without a sales deck.',
  },
];

export const serviceLandingPagesByPath = Object.fromEntries(
  serviceLandingPages.map((page) => [page.path, page]),
) as Record<string, ServiceLandingPageConfig>;

export const serviceLandingPaths = serviceLandingPages.map((p) => p.path);
