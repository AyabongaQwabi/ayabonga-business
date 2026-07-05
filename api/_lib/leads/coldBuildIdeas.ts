/** Vertical-specific value props and build ideas for cold outreach templates. */

export type ColdVertical =
  | 'legal'
  | 'healthcare'
  | 'pharmacy'
  | 'construction'
  | 'hospitality'
  | 'logistics'
  | 'retail'
  | 'education'
  | 'agriculture'
  | 'property'
  | 'accounting'
  | 'manufacturing'
  | 'nonprofit'
  | 'mining'
  | 'sme';

export function primaryColdVertical(verticals: string[] | undefined): ColdVertical {
  const order: ColdVertical[] = [
    'legal',
    'pharmacy',
    'healthcare',
    'construction',
    'hospitality',
    'logistics',
    'retail',
    'education',
    'agriculture',
    'property',
    'accounting',
    'manufacturing',
    'nonprofit',
    'mining',
    'sme',
  ];
  for (const v of order) {
    if (verticals?.includes(v)) return v;
  }
  return 'sme';
}

const VERTICAL_COPY: Record<
  ColdVertical,
  { valueHook: string; buildIdeas: string; templateSlug: string }
> = {
  legal: {
    templateSlug: 'cold-legal',
    valueHook:
      'I build intake, scheduling, and matter workflow tools for SA legal practices. One senior engineer, fixed Phase 1 scope.',
    buildIdeas:
      '- Client intake forms that feed straight into your matter workflow\n- Consultation booking with SMS or email reminders\n- Secure document upload for clients (POPIA-aware access)',
  },
  healthcare: {
    templateSlug: 'cold-healthcare',
    valueHook:
      'I build patient booking, records, and clinic ops systems for SA healthcare providers. Shipped ClinicPlus for occupational health compliance.',
    buildIdeas:
      '- Online appointment booking with practitioner calendars\n- Patient intake and referral tracking (not a full EHR replacement)\n- Staff scheduling and visit notes in one admin dashboard',
  },
  pharmacy: {
    templateSlug: 'cold-pharmacy',
    valueHook:
      'I build pharmacy ops tools: repeat scripts, stock alerts, and customer comms for SA chemists.',
    buildIdeas:
      '- Repeat prescription reminders via SMS or WhatsApp\n- Stock level alerts and supplier reorder lists\n- Customer loyalty and delivery request portal',
  },
  construction: {
    templateSlug: 'cold-construction',
    valueHook:
      'I build job tracking, quotes, and site reporting tools for SA construction teams. Replace WhatsApp chaos with one system.',
    buildIdeas:
      '- Job costing dashboard tied to quotes and invoices\n- Site photo and progress reports from foremen on mobile\n- Subcontractor scheduling and sign-off workflows',
  },
  hospitality: {
    templateSlug: 'cold-hospitality',
    valueHook:
      'I build booking, ordering, and guest comms systems for SA restaurants, hotels, and lodges.',
    buildIdeas:
      '- Table or room booking with deposits and reminders\n- Online ordering linked to your kitchen or POS workflow\n- Guest feedback and loyalty offers in one place',
  },
  logistics: {
    templateSlug: 'cold-logistics',
    valueHook:
      'I build dispatch, proof-of-delivery, and fleet tracking tools for SA transport and courier teams.',
    buildIdeas:
      '- Driver app with proof of delivery photos and signatures\n- Route planning dashboard for dispatchers\n- Customer tracking page with live ETA updates',
  },
  retail: {
    templateSlug: 'cold-retail',
    valueHook:
      'I build ecommerce, inventory, and customer follow-up systems for SA retail brands.',
    buildIdeas:
      '- Online store with PayFast or card checkout\n- Stock sync between warehouse and storefront\n- Abandoned cart and repeat buyer SMS flows',
  },
  education: {
    templateSlug: 'cold-education',
    valueHook:
      'I build enrolment, scheduling, and parent comms platforms for SA schools and training providers.',
    buildIdeas:
      '- Course enrolment with payments (shipped Ilithiyana Academics in 7 days)\n- Tutor scheduling and small-group session booking\n- Parent or learner progress portal',
  },
  agriculture: {
    templateSlug: 'cold-agriculture',
    valueHook:
      'I build farm ops, traceability, and buyer order tools for SA agriculture businesses.',
    buildIdeas:
      '- Harvest and batch tracking from field to buyer\n- Buyer order portal with delivery scheduling\n- Input stock and equipment maintenance logs',
  },
  property: {
    templateSlug: 'cold-property',
    valueHook:
      'I build listing, viewing, and tenant workflow tools for SA estate agencies and property managers.',
    buildIdeas:
      '- Viewing booking with agent calendars and reminders\n- Tenant maintenance request portal\n- Landlord reporting on occupancy and rent collection',
  },
  accounting: {
    templateSlug: 'cold-accounting',
    valueHook:
      'I build client onboarding, document collection, and workflow tools for SA accounting firms.',
    buildIdeas:
      '- Client document upload for tax and audit packs\n- Engagement letter and onboarding checklist automation\n- Task tracking across bookkeepers and partners',
  },
  manufacturing: {
    templateSlug: 'cold-manufacturing',
    valueHook:
      'I build production tracking, quality checks, and order fulfilment tools for SA manufacturers.',
    buildIdeas:
      '- Work order tracking from raw material to dispatch\n- Quality inspection checklists on tablet or mobile\n- Customer order status portal',
  },
  nonprofit: {
    templateSlug: 'cold-nonprofit',
    valueHook:
      'I build donor, beneficiary, and programme tracking tools for SA NGOs and community organisations.',
    buildIdeas:
      '- Donation page with receipts and campaign tracking\n- Beneficiary intake and case notes (POPIA-aware)\n- Volunteer shift booking and attendance',
  },
  mining: {
    templateSlug: 'cold-mining',
    valueHook:
      'I build compliance, workforce, and site reporting tools for SA mining and mining services companies.',
    buildIdeas:
      '- Occupational health visit scheduling and records\n- Contractor onboarding and induction tracking\n- Site incident reporting with photo evidence',
  },
  sme: {
    templateSlug: 'cold-sme',
    valueHook:
      'I replace spreadsheets and manual workflows with custom software for SA SMEs. One senior engineer, no agency overhead.',
    buildIdeas:
      '- Customer portal or internal admin dashboard\n- Booking, invoicing, or inventory in one system\n- WhatsApp or SMS automations tied to your existing process',
  },
};

export function coldCopyForLead(verticals: string[] | undefined): {
  valueHook: string;
  buildIdeas: string;
  templateSlug: string;
  vertical: ColdVertical;
} {
  const vertical = primaryColdVertical(verticals);
  const copy = VERTICAL_COPY[vertical];
  return { ...copy, vertical };
}

export function outreachCopyForTemplate(
  templateSlug: string | undefined,
  verticals: string[] | undefined,
): { valueHook: string; buildIdeas: string; templateSlug: string; vertical: ColdVertical } {
  if (templateSlug === 'cold-mobile-app') {
    return {
      vertical: primaryColdVertical(verticals),
      templateSlug: 'cold-mobile-app',
      valueHook:
        'I build iOS and Android apps for SA teams without agency overhead. React Native, offline-first where it matters.',
      buildIdeas:
        '- Customer-facing app with bookings or orders\n- Field worker app with photo uploads and GPS check-in\n- Internal tool for stock counts or job sign-off',
    };
  }
  if (templateSlug === 'cold-web-app') {
    return {
      vertical: primaryColdVertical(verticals),
      templateSlug: 'cold-web-app',
      valueHook:
        'I ship web applications for SA businesses: customer portals, admin dashboards, and secure APIs.',
      buildIdeas:
        '- Customer self-service portal with login and payments\n- Admin dashboard replacing spreadsheet trackers\n- Booking or enrolment flow with email confirmations',
    };
  }
  if (templateSlug === 'cold-ai-integration') {
    return {
      vertical: primaryColdVertical(verticals),
      templateSlug: 'cold-ai-integration',
      valueHook:
        'I build production AI workflows for SA teams: WhatsApp bots, document automation, and guarded LLM agents.',
      buildIdeas:
        '- WhatsApp support bot with human handoff\n- Document intake and classification from PDFs or scans\n- Internal Q&A over your policies and SOPs',
    };
  }
  return coldCopyForLead(verticals);
}
