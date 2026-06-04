import type { BuyerIntentFaq, BuyerIntentSection } from './buyer-intent-pages';

export type PartnershipLandingPage = {
  slug: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  heroSubhead: string;
  formType: string;
  formHeadline: string;
  formSubhead: string;
  proofBullets: string[];
  sections: BuyerIntentSection[];
  faqs: BuyerIntentFaq[];
  serviceType: string;
};

export const partnershipLandingPages: PartnershipLandingPage[] = [
  {
    slug: 'ai-agents-whatsapp-south-africa',
    path: '/ai-agents-whatsapp-south-africa',
    metaTitle: 'AI Agents and WhatsApp Workflows South Africa',
    metaDescription:
      'Production LLM agents and WhatsApp Business flows for SA companies. Guardrails, handoff to humans, POPIA-aware patterns.',
    keywords: ['whatsapp ai south africa', 'llm agents', 'mzansi chatbot developer'],
    eyebrow: 'AI · WhatsApp · SA',
    h1: 'AI agents and WhatsApp flows built for SA operations',
    heroSubhead:
      'From research bots to customer support: I ship agent memory, tool calls, and human handoff without the six-month R&D detour.',
    formType: 'ai_whatsapp',
    formHeadline: 'Describe your agent or WhatsApp use case',
    formSubhead: 'Include languages, volume, and whether money or PII moves through the flow.',
    proofBullets: [
      'LangGraph, Mastra, and WhatsApp-adjacent production patterns',
      'Local language and tone considerations (isiXhosa, SA English)',
      'Agent guardrails for support and transactional flows',
    ],
    serviceType: 'AI agent and conversational engineering',
    sections: [
      {
        id: 'stack',
        heading: 'What you get',
        paragraphs: ['A defined agent architecture, not a demo that breaks on week two.'],
        bullets: [
          'Tool routing, retries, and observability',
          'Staging environment before production traffic',
          'Documentation your next hire can read',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can you integrate WhatsApp Business API?',
        answer:
          'Yes, alongside your CRM or custom backend. Scope depends on provider and template approval timelines.',
      },
    ],
  },
  {
    slug: 'marketplace-development-south-africa',
    path: '/marketplace-development-south-africa',
    metaTitle: 'Marketplace Development South Africa | Multi-Sided Platforms',
    metaDescription:
      'Senior engineering for SA marketplaces: customer, provider, and admin apps, payments, and ops tooling. Laundry and logistics experience.',
    keywords: ['marketplace developer south africa', 'multi sided platform mvp'],
    eyebrow: 'Marketplaces · SA',
    h1: 'Marketplace engineering with three sides in mind',
    heroSubhead:
      'Customer app, provider app, admin, payments, and support workflows. I have shipped white-label marketplace stacks in SA.',
    formType: 'marketplace',
    formHeadline: 'Tell me about your marketplace',
    formSubhead: 'Which sides exist today, and what is on fire first?',
    proofBullets: [
      'Laundry marketplace (customer, driver, partner, admin)',
      'Ride and logistics-adjacent product experience',
      'Paystack and multi-tenant patterns',
    ],
    serviceType: 'Marketplace product engineering',
    sections: [
      {
        id: 'sides',
        heading: 'Three-sided reality',
        paragraphs: [
          'Marketplaces fail when admin and payouts are an afterthought. I scope those in Phase 1 when they matter.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can you white-label for multiple cities?',
        answer: 'Yes. Architecture and tenancy model should be decided early, not after launch.',
      },
    ],
  },
  {
    slug: 'logistics-platform-development-south-africa',
    path: '/logistics-platform-development-south-africa',
    metaTitle: 'Logistics Platform Development South Africa',
    metaDescription:
      'Engineering for logistics aggregation, last-mile routing, and merchant fulfillment tools in South Africa.',
    keywords: ['logistics software south africa', 'delivery platform developer'],
    eyebrow: 'Logistics · E-commerce · SA',
    h1: 'Logistics platforms that connect merchants and couriers',
    heroSubhead:
      'Single integration to many couriers, routing logic, and merchant dashboards. Built for SA e-commerce realities.',
    formType: 'logistics',
    formHeadline: 'Scope logistics or fulfillment software',
    formSubhead: 'Couriers, SLAs, address quality, and admin needs help me quote accurately.',
    proofBullets: [
      'Aggregation and routing product thinking',
      'AI for address verification and ops automation',
      'Integration-heavy builds (Shopify, WooCommerce)',
    ],
    serviceType: 'Logistics platform engineering',
    sections: [
      {
        id: 'problem',
        heading: 'Common pain',
        paragraphs: [
          'Fragmented courier APIs, failed deliveries from bad addresses, and manual ops at scale. Engineering should target those first.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do you build driver apps?',
        answer: 'Yes, when they are part of a defined Phase 1 scope with clear priorities.',
      },
    ],
  },
  {
    slug: 'technical-partnership-phase-1',
    path: '/technical-partnership-phase-1',
    metaTitle: 'Phase 1 Technical Partnership | R50k+ Engineering Sprints',
    metaDescription:
      'Fixed-scope Phase 1 sprints for funded SA startups: architecture, build, and handoff in 4–8 weeks. Senior product engineer, no agency markup.',
    keywords: ['technical cofounder south africa', 'phase 1 mvp sprint', 'senior developer contract'],
    eyebrow: 'Phase 1 · Fixed scope',
    h1: 'Phase 1 engineering sprints for funded teams',
    heroSubhead:
      'One critical workflow, documented and shipped in 4–8 weeks. Typical entry R50k+. You keep the code and the architecture notes.',
    formType: 'phase_1_partnership',
    formHeadline: 'Request a Phase 1 scope conversation',
    formSubhead: 'Tell me the one workflow that unlocks the next quarter. I will reply with fit and next steps.',
    proofBullets: [
      'Discovery + architecture + implementation in one engagement',
      'No open-ended retainer required to start',
      'Handoff written for your next hire or agency',
    ],
    serviceType: 'Technical partnership',
    sections: [
      {
        id: 'includes',
        heading: 'What Phase 1 usually includes',
        paragraphs: ['Scope is tight on purpose.'],
        bullets: [
          'Written architecture and milestone plan',
          'Implementation of one priority workflow',
          'Staging deploy and basic monitoring hooks',
          'Handover session and documentation',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is this a retainer?',
        answer:
          'No. Phase 1 is fixed scope. Ongoing partnership is optional after delivery if there is mutual fit.',
      },
      {
        question: 'Minimum budget?',
        answer: 'Roughly R50k for a meaningful Phase 1. Smaller scopes are usually quote-tool sized work.',
      },
    ],
  },
  {
    slug: 'senior-product-engineer-south-africa',
    path: '/senior-product-engineer-south-africa',
    metaTitle: 'Senior Product Engineer South Africa | Hire Without the Junior Lottery',
    metaDescription:
      'Hire a senior product engineer in South Africa for web, mobile, cloud, and AI. One accountable engineer, ZAR-scoped builds, and shipped references like ClinicPlus and Laundry Marketplace.',
    keywords: ['senior product engineer south africa', 'hire senior developer cape town'],
    eyebrow: 'Senior hire · SA',
    h1: 'Senior product engineering without the junior lottery',
    heroSubhead:
      'One senior engineer who owns architecture, implementation, and founder communication. Based in the Eastern Cape, working with funded teams nationally.',
    formType: 'senior_engineer',
    formHeadline: 'Tell me what you need built',
    formSubhead: 'Role, timeline, and budget band help me respond with an honest yes or no.',
    proofBullets: [
      'AI Specialist and Cloud Architect (public profile)',
      '10+ years product engineering across SA startups and enterprises',
      'Shipped marketplaces, fintech, and agent tooling',
    ],
    serviceType: 'Senior product engineering',
    sections: [
      {
        id: 'vs',
        heading: 'How this differs from an agency',
        paragraphs: [
          'You work with the person writing code and making tradeoffs, not an account manager relaying tickets.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Remote or on-site?',
        answer: 'Remote-first across SA. On-site is possible for Eastern Cape and major cities by arrangement.',
      },
    ],
  },
];

export const partnershipPaths = partnershipLandingPages.map((p) => p.path);

export const partnershipPagesByPath = Object.fromEntries(
  partnershipLandingPages.map((p) => [p.path, p]),
) as Record<string, PartnershipLandingPage>;
