export const INSIGHTS_INDEX_PATH = '/insights';

export type InsightSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type InsightFaq = {
  question: string;
  answer: string;
};

export type InsightPage = {
  slug: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  heroSubhead: string;
  excerpt: string;
  datePublished: string;
  sections: InsightSection[];
  faqs: InsightFaq[];
  relatedLinks: { label: string; path: string }[];
  ctaHeadline: string;
  ctaSubhead: string;
};

function insightPath(slug: string) {
  return `${INSIGHTS_INDEX_PATH}/${slug}`;
}

export const insightPages: InsightPage[] = [
  {
    slug: 'how-to-automate-whatsapp-bookings',
    path: insightPath('how-to-automate-whatsapp-bookings'),
    metaTitle: 'How to Automate WhatsApp Bookings for SA Businesses',
    metaDescription:
      'A practical guide to WhatsApp booking automation for South African SMEs: templates, handoffs, calendar sync, and what to build before you pay for custom software.',
    keywords: [
      'whatsapp booking automation',
      'whatsapp appointments south africa',
      'automate whatsapp bookings',
      'whatsapp business booking',
    ],
    eyebrow: 'WhatsApp · Operations · South Africa',
    h1: 'How to automate WhatsApp bookings without breaking trust',
    heroSubhead:
      'Most customers already message you on WhatsApp. The goal is fewer missed slots, less copy-paste, and a clean handoff when a human must step in.',
    excerpt:
      'Turn WhatsApp threads into reliable bookings with templates, guardrails, and the right mix of automation and human reply.',
    datePublished: '2026-05-10',
    sections: [
      {
        id: 'start-here',
        heading: 'Start with the booking workflow, not the bot',
        paragraphs: [
          'List the steps from first message to confirmed appointment: availability check, slot hold, deposit or confirmation, reminder, cancellation. If your team cannot describe that flow on a whiteboard, software will not fix it.',
          'Automation should remove repeat questions, not hide your phone number behind a useless menu tree.',
        ],
      },
      {
        id: 'layers',
        heading: 'Three layers that actually ship',
        paragraphs: [],
        bullets: [
          'Layer 1: Saved replies and labels inside WhatsApp Business for low volume',
          'Layer 2: Approved message templates plus a scheduler (Cal.com, Google Calendar, or industry tool)',
          'Layer 3: Custom flow with your CRM, payments, and branch routing when volume justifies build cost',
        ],
      },
      {
        id: 'sa-context',
        heading: 'South African realities',
        paragraphs: [
          'Mobile data costs matter. Keep messages short. Confirm times in local timezone. If you take deposits, name Paystack or PayFast clearly and send a receipt path users trust.',
          'For multi-language teams, decide which languages are human-only vs template-backed before you promise isiXhosa on the bot.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need the WhatsApp Business API?',
        answer:
          'For scalable automated booking beyond manual replies, usually yes. Smaller shops can start with Business app labels and a booking link until volume proves API spend.',
      },
      {
        question: 'Can bookings sync to Google Calendar?',
        answer:
          'Yes. Most production setups sync to Google Calendar, Outlook, or a vertical tool your industry already uses. The integration choice should match who updates availability today.',
      },
    ],
    relatedLinks: [
      { label: 'WhatsApp AI chatbot for businesses', path: '/whatsapp-ai-chatbot-south-africa' },
      { label: 'How to automate customer support', path: `${INSIGHTS_INDEX_PATH}/how-to-automate-customer-support` },
      { label: 'Get a scoped estimate', path: '/get-a-quote' },
    ],
    ctaHeadline: 'Want a booking flow designed around your ops?',
    ctaSubhead:
      'Share your current WhatsApp volume and calendar tool. We will suggest build vs configure-first and a realistic ZAR range.',
  },
  {
    slug: 'how-to-build-a-marketplace-app',
    path: insightPath('how-to-build-a-marketplace-app'),
    metaTitle: 'How to Build a Marketplace App in South Africa',
    metaDescription:
      'Marketplace apps need trust, payments, and dispatch logic before features. A senior engineer guide for SA founders on scope, stack, and v1 cuts.',
    keywords: [
      'marketplace app development',
      'build marketplace south africa',
      'two sided marketplace app',
      'marketplace mvp',
    ],
    eyebrow: 'Marketplaces · MVP · South Africa',
    h1: 'How to build a marketplace app that survives first real orders',
    heroSubhead:
      'Marketplaces fail when founders treat them like a normal ecommerce site. You are building trust between two sides, money flow, and dispute paths from day one.',
    excerpt:
      'Scope supply and demand onboarding, payments, and ops dashboards before you chase clever features.',
    datePublished: '2026-05-11',
    sections: [
      {
        id: 'v1-scope',
        heading: 'What belongs in v1',
        paragraphs: [
          'Pick one city or one category. One supplier type and one buyer type. A single payment path. Admin visibility into orders and payouts.',
          'Laundry, services, rentals, and B2B procurement marketplaces share the same skeleton even when the UI looks different.',
        ],
        bullets: [
          'Supplier onboarding with verification you can defend',
          'Buyer checkout with clear fees',
          'Order status both sides can see',
          'Basic dispute and refund rules written down',
          'Manual payout or automated split once volume is proven',
        ],
      },
      {
        id: 'payments',
        heading: 'Payments and float',
        paragraphs: [
          'In South Africa you will likely integrate Paystack or similar. Decide who holds funds during service delivery and what happens when a job is cancelled mid-route.',
          'Do not launch without a ledger mindset, even if v1 payouts are manual spreadsheets behind the scenes.',
        ],
      },
      {
        id: 'build-path',
        heading: 'Build vs phase',
        paragraphs: [
          'Many founders start with WhatsApp plus a lightweight admin and only automate matching when repeat orders hurt. That is valid if you measure conversion honestly.',
          'When custom software is justified, expect meaningful build bands in ZAR, not a brochure site budget. See the app cost guide for planning numbers.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long does a marketplace MVP take?',
        answer:
          'A focused v1 with one region and one payment path often lands in roughly 10–16 weeks with senior delivery, assuming decisions do not stall on policy questions.',
      },
      {
        question: 'Should we build mobile-first?',
        answer:
          'Usually yes in SA. Buyers live on mobile web or a native app depending on notifications and offline needs. Suppliers may need a simpler mobile web admin first.',
      },
    ],
    relatedLinks: [
      { label: 'App development cost guide', path: '/app-development-cost-south-africa' },
      { label: 'MVP developer South Africa', path: '/mvp-developer-south-africa' },
      { label: 'Validate your startup idea', path: `${INSIGHTS_INDEX_PATH}/how-to-validate-a-startup-idea` },
    ],
    ctaHeadline: 'Scoping a marketplace?',
    ctaSubhead:
      'Send your one-city v1 story. We map ledger, payments, and admin before quoting build.',
  },
  {
    slug: 'how-much-does-it-cost-to-build-an-app-in-south-africa',
    path: insightPath('how-much-does-it-cost-to-build-an-app-in-south-africa'),
    metaTitle: 'App Development Cost in South Africa (2026 ZAR Guide)',
    metaDescription:
      'What it costs to build an app in South Africa in 2026: MVP bands, marketplace and SaaS factors, agency vs senior studio, and how to get a scoped quote.',
    keywords: [
      'app development cost south africa',
      'how much does an app cost',
      'mobile app development price zar',
      'software development cost',
    ],
    eyebrow: 'Pricing · ZAR · Planning',
    h1: 'How much does it cost to build an app in South Africa?',
    heroSubhead:
      'Quotes spread because scope spreads. Here is how to read ZAR bands honestly and what pushes a build from R80k territory into R250k+.',
    excerpt:
      'Understand MVP, marketplace, and SaaS cost drivers before you compare three proposals that are not the same product.',
    datePublished: '2026-05-12',
    sections: [
      {
        id: 'bands',
        heading: 'Useful 2026 planning bands (ZAR, ex VAT)',
        paragraphs: [
          'These are planning ranges for senior-led delivery, not the cheapest offshore quote or enterprise SI (systems integrator) day rates.',
        ],
        bullets: [
          'Simple mobile or web MVP with auth and one core loop: often R80k–R180k',
          'Operations platform with roles, reporting, integrations: often R180k–R400k',
          'Marketplace or fintech with payments and compliance thinking: often R250k–R600k+',
          'Retainers after launch: common for growth, support, and AI automation layers',
        ],
      },
      {
        id: 'drivers',
        heading: 'What moves the number',
        paragraphs: [],
        bullets: [
          'Number of user types and permission models',
          'Payments, subscriptions, or marketplace splits',
          'Integrations (ERP, WhatsApp API, legacy CSV exports)',
          'Design fidelity and number of unique screens',
          'Who writes production code vs only manages vendors',
        ],
      },
      {
        id: 'compare-quotes',
        heading: 'Comparing quotes fairly',
        paragraphs: [
          'Ask each bidder what is in v1, what is phase two, and who owns bugs after launch. A low quote that excludes admin, analytics, or deployment is not comparable.',
          'Our detailed tables live on the app development cost guide page.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Why do agencies quote half your budget?',
        answer:
          'Often different scope, junior delivery, or discovery sold separately. Ask who attends your standups and who merges pull requests.',
      },
      {
        question: 'Can I pay in phases?',
        answer:
          'Yes. Staged milestones are standard for serious builds. That protects you and keeps scope honest.',
      },
    ],
    relatedLinks: [
      { label: 'Full app development cost guide', path: '/app-development-cost-south-africa' },
      { label: 'Software development pricing', path: '/software-development-pricing' },
      { label: 'Get a scoped estimate', path: '/get-a-quote' },
    ],
    ctaHeadline: 'Want a number tied to your scope?',
    ctaSubhead:
      'Use the project scope estimator or message us with your v1 workflow. We reply with a band and risks, not a fake fixed price.',
  },
  {
    slug: 'best-tech-stack-for-startups',
    path: insightPath('best-tech-stack-for-startups'),
    metaTitle: 'Best Tech Stack for Startups in South Africa',
    metaDescription:
      'How to choose a startup tech stack in 2026: React, Next.js, Supabase, Postgres, and when native mobile beats web. Practical advice for SA founders.',
    keywords: [
      'best tech stack for startups',
      'startup tech stack 2026',
      'mvp tech stack',
      'south africa startup stack',
    ],
    eyebrow: 'Architecture · Startups',
    h1: 'Best tech stack for startups (without resume-driven choices)',
    heroSubhead:
      'The best stack is the one your team can ship and support in six months. Trends matter less than hiring, hosting cost, and your core workflow.',
    excerpt:
      'Pick frameworks for speed and clarity, not because a conference slide said so.',
    datePublished: '2026-05-13',
    sections: [
      {
        id: 'default',
        heading: 'A sane default in 2026',
        paragraphs: [
          'Many SA MVPs ship on Next.js or Vite + React for web, React Native or Expo when notifications and device APIs matter, Node or serverless APIs, Postgres via Supabase or managed cloud SQL, and Paystack when money moves.',
          'That stack is boring on purpose. Boring stacks hire faster and break less mysteriously.',
        ],
      },
      {
        id: 'when-native',
        heading: 'When to choose native or cross-platform mobile',
        paragraphs: [],
        bullets: [
          'Choose mobile when push notifications, offline, or device hardware are core',
          'Choose responsive web when distribution via link matters more than App Store discovery',
          'Expo is often enough until you hit niche native modules',
        ],
      },
      {
        id: 'ai-layer',
        heading: 'Where AI fits',
        paragraphs: [
          'Use AI on bounded tasks: support drafts, document search, classification. Do not bolt a chatbot on top of a broken process.',
          'If AI is the product, budget for evaluation, logging, and human review from week one.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is WordPress ever the answer?',
        answer:
          'For marketing sites and simple content, yes. For multi-user operations, inventory, or payments, you will outgrow it quickly.',
      },
      {
        question: 'Should we use Firebase?',
        answer:
          'Firebase can speed early mobile builds. If you need complex reporting, strict relational data, or easier SQL analytics, Postgres often wins later.',
      },
    ],
    relatedLinks: [
      { label: 'Custom software vs no-code', path: `${INSIGHTS_INDEX_PATH}/custom-software-vs-no-code` },
      { label: 'How to build a SaaS product', path: `${INSIGHTS_INDEX_PATH}/how-to-build-a-saas-product` },
      { label: 'Custom software development', path: '/custom-software-development-south-africa' },
    ],
    ctaHeadline: 'Not sure what to standardise on?',
    ctaSubhead:
      'Describe your v1 workflow. We recommend stack and hosting with tradeoffs in plain language.',
  },
  {
    slug: 'how-to-digitise-a-small-business',
    path: insightPath('how-to-digitise-a-small-business'),
    metaTitle: 'How to Digitise a Small Business in South Africa',
    metaDescription:
      'Digitise SMME operations step by step: replace WhatsApp chaos, pick one workflow, measure time saved, and know when custom software beats spreadsheets.',
    keywords: [
      'digitise small business',
      'digital transformation smme',
      'business automation south africa',
      'digitize small business',
    ],
    eyebrow: 'SMME · Operations',
    h1: 'How to digitise a small business without buying the wrong platform',
    heroSubhead:
      'Digitising is not buying software. It is replacing a manual workflow with something measurable: fewer errors, faster invoicing, visible stock.',
    excerpt:
      'Start with one painful process, not ten apps your team will ignore.',
    datePublished: '2026-05-14',
    sections: [
      {
        id: 'one-workflow',
        heading: 'Pick one workflow that hurts every week',
        paragraphs: [
          'Common first wins: quote-to-invoice, job scheduling, stock counts, customer follow-ups, or grant reporting. Run it on paper and WhatsApp for a week and count hours lost.',
          'That number becomes your business case.',
        ],
      },
      {
        id: 'tool-ladder',
        heading: 'Climb the tool ladder deliberately',
        paragraphs: [],
        bullets: [
          'Spreadsheets with clear owners and version discipline',
          'Vertical SaaS if your industry has a fit',
          'Light automation (Zapier-style or WhatsApp templates)',
          'Custom system when margins and volume justify ownership',
        ],
      },
      {
        id: 'people',
        heading: 'Train the team on the outcome',
        paragraphs: [
          'Staff resist software that adds admin without removing steps. Pilot with one branch or one supervisor. Celebrate time saved publicly.',
          'POPIA (Protection of Personal Information Act) awareness matters when customer data leaves notebooks. Use access roles and export rules early.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much should digitisation cost?',
        answer:
          'Tool subscriptions can start under R5k per month. Custom builds start higher but replace several hacks. Compare three-year cost, not just month one.',
      },
      {
        question: 'Can we digitise without stopping trade?',
        answer:
          'Yes. Parallel run the old process for two weeks while the new path proves itself. Cut over when managers trust the numbers.',
      },
    ],
    relatedLinks: [
      { label: 'How to automate WhatsApp bookings', path: `${INSIGHTS_INDEX_PATH}/how-to-automate-whatsapp-bookings` },
      { label: 'AI automation pricing', path: '/ai-automation-pricing' },
      { label: 'Get a scoped estimate', path: '/get-a-quote' },
    ],
    ctaHeadline: 'Mapping your first digital workflow?',
    ctaSubhead:
      'Tell us what breaks every Friday. We will say configure, integrate, or build.',
  },
  {
    slug: 'how-to-automate-customer-support',
    path: insightPath('how-to-automate-customer-support'),
    metaTitle: 'How to Automate Customer Support in South Africa',
    metaDescription:
      'Automate customer support without angry customers: deflect FAQs, route tickets, use AI with guardrails, and know when to keep humans on WhatsApp and email.',
    keywords: [
      'automate customer support',
      'customer support automation south africa',
      'ai customer support',
      'helpdesk automation',
    ],
    eyebrow: 'Support · Automation · AI',
    h1: 'How to automate customer support that customers do not hate',
    heroSubhead:
      'Good support automation removes repeat work for your team. Bad automation hides your phone number and loops people through useless menus.',
    excerpt:
      'Deflect repetitive questions, route the rest with context, and measure resolution time instead of chat volume.',
    datePublished: '2026-05-15',
    sections: [
      {
        id: 'measure-first',
        heading: 'Measure before you buy software',
        paragraphs: [
          'Export the last 200 support conversations. Tag them: billing, how-to, broken product, sales lead, abuse. Automation targets the top two tags that are truly repetitive.',
          'If every ticket is unique, you need better product or onboarding, not a chatbot.',
        ],
      },
      {
        id: 'layers',
        heading: 'Automation layers that work',
        paragraphs: [],
        bullets: [
          'Self-service: short help articles, status page, order lookup link',
          'Assisted replies: suggested answers for agents, not unsupervised sends',
          'Deflection bots: WhatsApp or web chat grounded in your policies and prices',
          'Workflow: ticket creation, SLA timers, escalation to a named human',
        ],
      },
      {
        id: 'ai-guardrails',
        heading: 'AI with guardrails',
        paragraphs: [
          'Large language models (LLMs) should read from approved docs, not invent refund rules. Log prompts and answers in development so you can audit mistakes before production.',
          'Always show a clear path to a human. In South Africa, WhatsApp is often that path. Design handoff so the agent sees full context.',
        ],
      },
      {
        id: 'stack',
        heading: 'Tools vs custom',
        paragraphs: [
          'Zendesk, Freshdesk, Intercom, or HubSpot tiers work for many teams. Custom makes sense when support data must sit next to your operations database or industry compliance rules.',
          'We often integrate support tooling with admin dashboards clients already use.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Will automation hurt customer trust?',
        answer:
          'It hurts when answers are wrong or humans are unreachable. It helps when wait times drop and answers are consistent. Pilot on one channel first.',
      },
      {
        question: 'Can support automation work in local languages?',
        answer:
          'Yes, with tested phrases and human review. Mixed English and isiXhosa queries need real samples, not textbook training data only.',
      },
      {
        question: 'What does build cost in ZAR?',
        answer:
          'FAQ bots with WhatsApp handoff often start below full custom apps. Deep CRM sync and multi-branch routing cost more. See AI automation pricing for bands.',
      },
    ],
    relatedLinks: [
      { label: 'AI agents for businesses', path: `${INSIGHTS_INDEX_PATH}/ai-agents-for-businesses` },
      { label: 'WhatsApp AI chatbot', path: '/whatsapp-ai-chatbot-south-africa' },
      { label: 'AI automation pricing', path: '/ai-automation-pricing' },
    ],
    ctaHeadline: 'Support queue eating your week?',
    ctaSubhead:
      'Share your top ticket types and channels. We will propose deflect, integrate, or build with a realistic plan.',
  },
  {
    slug: 'how-to-build-a-saas-product',
    path: insightPath('how-to-build-a-saas-product'),
    metaTitle: 'How to Build a SaaS Product in South Africa',
    metaDescription:
      'Build a SaaS (Software as a Service) product in SA: tenancy, billing, onboarding, and v1 scope. Practical guide for founders who need recurring revenue software.',
    keywords: [
      'build saas product',
      'saas development south africa',
      'how to build saas',
      'b2b saas mvp',
    ],
    eyebrow: 'SaaS · Product · Billing',
    h1: 'How to build a SaaS product founders can sell monthly',
    heroSubhead:
      'SaaS is not a website with a login. It is recurring value, billing that survives failed cards, and onboarding that gets users to first success fast.',
    excerpt:
      'Tenancy, subscriptions, and onboarding order matter as much as feature lists.',
    datePublished: '2026-05-16',
    sections: [
      {
        id: 'definition',
        heading: 'What counts as SaaS here',
        paragraphs: [
          'You charge monthly or annually for software that keeps running. Customers expect uptime, data isolation, invoices, and upgrades without drama.',
          'Internal tools for one company are not SaaS. Multi-tenant products with separate customer data are.',
        ],
      },
      {
        id: 'v1',
        heading: 'v1 scope that actually ships',
        paragraphs: [],
        bullets: [
          'Auth, org signup, and one admin role model',
          'One killer workflow users pay for',
          'Billing with trial or paid plan (Paystack subscription or manual invoice phase)',
          'Email notifications that set expectations',
          'Basic usage or audit logs for support',
        ],
      },
      {
        id: 'tenancy',
        heading: 'Tenancy and data boundaries',
        paragraphs: [
          'Decide early: one database with tenant_id columns vs separate schemas. For most SA B2B MVPs, a disciplined single database is faster and fine until compliance forces split.',
          'Backups and export matter when customers ask for their data under POPIA.',
        ],
      },
      {
        id: 'after-launch',
        heading: 'After launch',
        paragraphs: [
          'Plan a retainer for security patches, billing edge cases, and onboarding improvements from real support tickets.',
          'SaaS development pricing page lists how we structure build plus growth retainers.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long to build SaaS v1?',
        answer:
          'Many focused B2B SaaS v1 products land in roughly 12–20 weeks with senior delivery, depending on billing and integration depth.',
      },
      {
        question: 'Do I need SOC 2 on day one?',
        answer:
          'Usually no for early SA B2B. You do need sensible access control, HTTPS, backups, and honest security answers in enterprise sales later.',
      },
      {
        question: 'Web app or mobile app first?',
        answer:
          'Most B2B SaaS starts web-first. Add mobile when the job happens away from desks or push alerts are core.',
      },
    ],
    relatedLinks: [
      { label: 'SaaS development pricing', path: '/saas-development-pricing' },
      { label: 'Best tech stack for startups', path: `${INSIGHTS_INDEX_PATH}/best-tech-stack-for-startups` },
      { label: 'How to validate a startup idea', path: `${INSIGHTS_INDEX_PATH}/how-to-validate-a-startup-idea` },
    ],
    ctaHeadline: 'Building subscription software?',
    ctaSubhead:
      'Outline your tenant model and billing plan. We scope v1 with billing and onboarding included explicitly.',
  },
  {
    slug: 'custom-software-vs-no-code',
    path: insightPath('custom-software-vs-no-code'),
    metaTitle: 'Custom Software vs No-Code for SA Businesses',
    metaDescription:
      'When no-code tools are enough and when custom software wins: cost, scale, integrations, and ownership for South African SMMEs and startups.',
    keywords: [
      'custom software vs no code',
      'no code vs custom development',
      'when to build custom software',
      'bubble vs custom app',
    ],
    eyebrow: 'Build vs buy · Strategy',
    h1: 'Custom software vs no-code (an honest split)',
    heroSubhead:
      'No-code is fast until it is not. Custom costs more upfront until spreadsheets and workarounds cost more than build.',
    excerpt:
      'Choose based on workflow fit, integrations, and who will maintain it in 18 months.',
    datePublished: '2026-05-16',
    sections: [
      {
        id: 'no-code-wins',
        heading: 'When no-code wins',
        paragraphs: [],
        bullets: [
          'Marketing sites and simple lead capture',
          'Internal tools with under 20 users and forgiving permissions',
          'Proof of concept to test demand before ZAR build spend',
          'Straightforward automations between popular SaaS tools',
        ],
      },
      {
        id: 'custom-wins',
        heading: 'When custom software wins',
        paragraphs: [],
        bullets: [
          'Multi-step operations with roles, branches, and approvals',
          'Marketplaces, ledgers, or money movement',
          'Integrations your stack does not support natively',
          'Performance or offline needs on mobile',
          'Your process is the competitive advantage',
        ],
      },
      {
        id: 'hybrid',
        heading: 'Hybrid path many SA teams use',
        paragraphs: [
          'Run no-code for marketing and early CRM. Build custom when repeat revenue or ops pain justifies ownership.',
          'Avoid rewriting too late because permissions and data models were ignored at the start.',
        ],
      },
      {
        id: 'cost-frame',
        heading: 'Cost framing in ZAR',
        paragraphs: [
          'No-code subscriptions add up across seats and plugins. Custom build is lumpy but you own the asset and are not capped by vendor limits.',
          'Compare three-year total cost, including staff time fighting workarounds.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can we migrate off no-code later?',
        answer:
          'Sometimes, but data export and logic rebuild are often painful. Plan exit before you have 10k live records.',
      },
      {
        question: 'Is no-code insecure?',
        answer:
          'Not automatically, but you depend on vendor security model. Custom lets you enforce POPIA-aligned access and hosting choices.',
      },
    ],
    relatedLinks: [
      { label: 'Custom software development', path: '/custom-software-development-south-africa' },
      { label: 'Best tech stack for startups', path: `${INSIGHTS_INDEX_PATH}/best-tech-stack-for-startups` },
      { label: 'App development cost guide', path: '/app-development-cost-south-africa' },
    ],
    ctaHeadline: 'Stuck between tools and a real system?',
    ctaSubhead:
      'Show us your no-code setup. We will say extend, integrate, or replace with a phased build.',
  },
  {
    slug: 'ai-agents-for-businesses',
    path: insightPath('ai-agents-for-businesses'),
    metaTitle: 'AI Agents for Businesses in South Africa',
    metaDescription:
      'What AI agents can do for SA businesses: bounded tasks, workflows, guardrails, and costs. When agents help ops and when they create risk.',
    keywords: [
      'ai agents for business',
      'ai automation south africa',
      'business ai agents',
      'agentic ai smme',
    ],
    eyebrow: 'AI · Agents · Operations',
    h1: 'AI agents for businesses (what is real in 2026)',
    heroSubhead:
      'An agent is software that takes multi-step actions with tools: read a ticket, draft a reply, update a row, wait for approval. Hype is high. Useful deployments are narrow.',
    excerpt:
      'Start with one bounded workflow, human approval, and logs. Not an autonomous bot for your entire company.',
    datePublished: '2026-05-17',
    sections: [
      {
        id: 'what-agent',
        heading: 'What an agent is in plain terms',
        paragraphs: [
          'Unlike a single chat reply, an agent can chain steps: fetch order status, check policy, draft a response, open a ticket. Each step should be visible and stoppable.',
          'Think junior ops assistant with strict rules, not a replacement for management judgment.',
        ],
      },
      {
        id: 'good-fits',
        heading: 'Good fits for SA businesses',
        paragraphs: [],
        bullets: [
          'Support triage and draft replies on WhatsApp or email',
          'Document Q&A over internal SOPs (standard operating procedures)',
          'Lead qualification before sales calls',
          'Reconciling exports between systems with human sign-off',
          'Monitoring alerts summarized for a duty manager',
        ],
      },
      {
        id: 'bad-fits',
        heading: 'Poor fits (for now)',
        paragraphs: [],
        bullets: [
          'Unsupervised refunds or pricing changes',
          'Legal or medical advice without professional review',
          'Anything that must be correct 100% with no audit trail',
        ],
      },
      {
        id: 'build',
        heading: 'How we build agent workflows',
        paragraphs: [
          'Ground models in your data. Add approval gates for money and customer-facing sends. Log inputs and outputs in development for debugging.',
          'Queens Connect showed community-scale assistants need tight scope. Business agents need the same discipline with CRM and payments nearby.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Are agents the same as chatbots?',
        answer:
          'Chatbots mostly respond. Agents can call tools and update systems. Many products blend both with human escalation.',
      },
      {
        question: 'What about data privacy?',
        answer:
          'Treat customer data under POPIA. Use hosting and providers your policy allows. Minimize what leaves your boundary.',
      },
      {
        question: 'Monthly cost?',
        answer:
          'Model usage plus build. Small workflows can start modestly. Broad automation across departments is a programme, not a weekend install.',
      },
    ],
    relatedLinks: [
      { label: 'How to automate customer support', path: `${INSIGHTS_INDEX_PATH}/how-to-automate-customer-support` },
      { label: 'WhatsApp AI chatbot', path: '/whatsapp-ai-chatbot-south-africa' },
      { label: 'AI automation pricing', path: '/ai-automation-pricing' },
    ],
    ctaHeadline: 'One workflow you want an agent on?',
    ctaSubhead:
      'Name the steps and approval owner. We prototype with guardrails before production spend.',
  },
  {
    slug: 'how-to-validate-a-startup-idea',
    path: insightPath('how-to-validate-a-startup-idea'),
    metaTitle: 'How to Validate a Startup Idea Before You Build',
    metaDescription:
      'Validate startup ideas with problem interviews, paid pilots, and fake-door tests. A practical guide for SA founders before funding an MVP build.',
    keywords: [
      'validate startup idea',
      'startup validation',
      'mvp validation',
      'idea validation south africa',
    ],
    eyebrow: 'Founders · Validation',
    h1: 'How to validate a startup idea before you fund the build',
    heroSubhead:
      'Validation is evidence that someone will pay or repeatedly use the product, not friends saying it sounds cool.',
    excerpt:
      'Run problem interviews, charge early, and cut scope until the riskiest assumption is tested.',
    datePublished: '2026-05-17',
    sections: [
      {
        id: 'assumptions',
        heading: 'Write the riskiest assumption first',
        paragraphs: [
          'Examples: tenants will upload listings daily, clinics will pay per seat, suppliers will accept delayed payout. Pick one assumption that kills the business if wrong.',
          'Every test should target that assumption only.',
        ],
      },
      {
        id: 'methods',
        heading: 'Methods that produce signal',
        paragraphs: [],
        bullets: [
          'Problem interviews with people who spent money on the pain',
          'Concierge MVP: deliver the outcome manually before software',
          'Paid pilot with one customer and a narrow scope letter',
          'Landing page with clear offer and measurement, not vanity likes',
          'Pre-sales or letters of intent from a credible buyer',
        ],
      },
      {
        id: 'sa',
        heading: 'South African context',
        paragraphs: [
          'Payment behaviour, mobile usage, and procurement cycles differ by industry. A test in Johannesburg may not predict Eastern Cape logistics.',
          'If you need Paystack or EFT (electronic funds transfer) behaviour in the test, include it early.',
        ],
      },
      {
        id: 'when-build',
        heading: 'When to green-light build',
        paragraphs: [
          'Green-light when you can name who pays, how much, and what v1 must do in one sentence.',
          'Then scope MVP with a senior engineer so you do not pay to learn what a spreadsheet could have proved.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How many interviews are enough?',
        answer:
          'Stop when answers repeat and you hear specific past spend or workarounds. Often 8–15 conversations if you target the right role.',
      },
      {
        question: 'Is a survey enough?',
        answer:
          'Surveys help after you know the questions. They rarely replace interviews for discovering whether the pain is urgent.',
      },
      {
        question: 'Should I build to validate?',
        answer:
          'Build only the smallest thing that tests the riskiest assumption. Full MVPs are expensive experiments.',
      },
    ],
    relatedLinks: [
      { label: 'MVP developer South Africa', path: '/mvp-developer-south-africa' },
      { label: 'MVP scope checklist', path: '/mvp-scope-checklist' },
      { label: 'How much does an app cost', path: `${INSIGHTS_INDEX_PATH}/how-much-does-it-cost-to-build-an-app-in-south-africa` },
    ],
    ctaHeadline: 'Ready to turn validation into a build plan?',
    ctaSubhead:
      'Share what you proved and what is still a guess. We help tighten v1 before you commit ZAR.',
  },
];

export const insightSlugs = insightPages.map((p) => p.slug);

export const insightPagesBySlug: Record<string, InsightPage> = Object.fromEntries(
  insightPages.map((page) => [page.slug, page]),
);
