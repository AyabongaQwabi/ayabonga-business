import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  Car,
  GraduationCap,
  HeartPulse,
  Scissors,
  Shield,
  ShoppingBag,
  Store,
  Truck,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react';

export type IndustryChallenge = {
  title: string;
  description: string;
};

export type IndustryAutomationPoint = {
  title: string;
  description: string;
};

export type IndustryWorkflowExample = {
  name: string;
  summary: string;
  steps: string[];
};

export type IndustryLink = {
  label: string;
  path: string;
};

export type IndustryCaseStudy = {
  label: string;
  path: string;
  blurb: string;
};

export type IndustryPageConfig = {
  slug: string;
  path: string;
  icon: LucideIcon;
  name: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  heroSubhead: string;
  intro: string;
  operationalChallenges: IndustryChallenge[];
  automationLeverage: IndustryAutomationPoint[];
  workflowExamples: IndustryWorkflowExample[];
  serviceLinks: IndustryLink[];
  caseStudies: IndustryCaseStudy[];
  relatedIndustrySlugs: string[];
  ctaHeadline: string;
  ctaSubhead: string;
};

export const INDUSTRIES_INDEX_PATH = '/industries';

function industryPath(slug: string): string {
  return `/industries/${slug}`;
}

const DEFAULT_SERVICES: IndustryLink[] = [
  { label: 'Custom software development', path: '/custom-software-development-south-africa' },
  { label: 'Mobile app development', path: '/mobile-app-development-south-africa' },
  { label: 'All services', path: '/services' },
  { label: 'Project scope estimator', path: '/get-a-quote' },
];

export const industryPages: IndustryPageConfig[] = [
  {
    slug: 'small-businesses',
    path: industryPath('small-businesses'),
    icon: Building2,
    name: 'Small businesses',
    metaTitle: 'Software for Small Businesses in South Africa | Qwabi Engineering',
    metaDescription:
      'Bespoke ops software for South African SMEs. Replace spreadsheets, WhatsApp chaos, and mismatched SaaS with systems your staff will actually use.',
    eyebrow: 'Industries · SMME · South Africa',
    h1: 'Software for small businesses',
    heroSubhead:
      'You do not need an ERP from day one. You need one workflow fixed properly: quotes, stock, jobs, or customer follow-ups, with room to grow.',
    intro:
      'Most SMMEs in South Africa run on a mix of Excel, WhatsApp, and one overworked person who remembers where everything lives. Custom software pays off when off-the-shelf tools force you to change how you already sell and deliver.',
    operationalChallenges: [
      {
        title: 'Invisible operations',
        description:
          'Sales, finance, and delivery live in different chats and files. Nobody sees cash flow and workload in one place until month-end.',
      },
      {
        title: 'Owner as integration layer',
        description:
          'The founder reconciles invoices, chases payments, and answers staff questions because the systems do not talk.',
      },
      {
        title: 'Cheap tools, expensive workarounds',
        description:
          'Five subscriptions still leave gaps. Staff export CSVs, retype into spreadsheets, and duplicate effort daily.',
      },
    ],
    automationLeverage: [
      {
        title: 'Single source of truth',
        description:
          'One customer record, one job status, one invoice trail. Fewer "which version is correct?" arguments.',
      },
      {
        title: 'Alerts before crises',
        description:
          'Low stock, overdue invoices, and stalled quotes surface automatically instead of during a client call.',
      },
      {
        title: 'Phased delivery',
        description:
          'Ship one department at a time so adoption sticks. Expand modules when the first team trusts the system.',
      },
    ],
    workflowExamples: [
      {
        name: 'Quote to cash',
        summary: 'From WhatsApp enquiry to paid invoice without retyping.',
        steps: [
          'Lead captured with source and owner',
          'Quote approved and sent with Paystack link',
          'Job marked complete triggers invoice',
          'Payment status syncs to a simple dashboard',
        ],
      },
      {
        name: 'Weekly owner review',
        summary: 'Friday numbers without exporting five sheets.',
        steps: [
          'Open pipeline and outstanding debtors',
          'Drill into jobs stuck past SLA',
          'Assign follow-ups to staff with due dates',
        ],
      },
    ],
    serviceLinks: DEFAULT_SERVICES,
    caseStudies: [
      {
        label: 'AN Consulting',
        path: 'https://www.anconsulting.co.za/',
        blurb: 'Financial records and internal ops for a consulting practice.',
      },
      {
        label: 'Ilithiyana',
        path: 'https://ilithiyana.co.za/',
        blurb: 'Bookings and CRM for day-to-day client operations.',
      },
      {
        label: 'All projects',
        path: '/projects',
        blurb: 'Live systems, in-progress builds, and shipped proof across sectors.',
      },
    ],
    relatedIndustrySlugs: ['retail', 'field-services', 'ecommerce'],
    ctaHeadline: 'Map your highest-friction workflow',
    ctaSubhead:
      'Describe what breaks every week on WhatsApp. We scope a first module with a clear ZAR range before you commit.',
  },
  {
    slug: 'logistics',
    path: industryPath('logistics'),
    icon: Truck,
    name: 'Logistics',
    metaTitle: 'Logistics Software South Africa | Fleet and Dispatch Systems',
    metaDescription:
      'Dispatch, proof of delivery, driver apps, and ops dashboards for South African logistics teams. Load-shedding aware, mobile-first field workflows.',
    eyebrow: 'Industries · Logistics · South Africa',
    h1: 'Logistics and delivery operations',
    heroSubhead:
      'Coordinators should not live in phone calls. Drivers need offline-friendly capture. Finance needs delivery truth before invoicing.',
    intro:
      'Last-mile and regional logistics in SA deal with uneven connectivity, subcontracted drivers, and clients who expect WhatsApp updates. Software should match that reality, not assume always-on fibre.',
    operationalChallenges: [
      {
        title: 'Dispatch in group chats',
        description:
          'Routes change in voice notes. Proof of delivery sits in camera rolls. Billing disputes start because evidence is scattered.',
      },
      {
        title: 'Subcontractor blind spots',
        description:
          'You book the job but do not see when the partner actually delivered until someone complains.',
      },
      {
        title: 'COD and reconciliation pain',
        description:
          'Cash-on-delivery and split payments make end-of-day reconciliation slow and error-prone.',
      },
    ],
    automationLeverage: [
      {
        title: 'Structured dispatch',
        description:
          'Assign jobs with windows, capture status changes, and push customer notifications from one board.',
      },
      {
        title: 'Mobile proof of delivery',
        description:
          'Photos, signatures, and GPS timestamps attached to the job record, not a lost chat thread.',
      },
      {
        title: 'Billing hooks',
        description:
          'Completed jobs feed invoicing rules so finance works from delivery truth, not guesses.',
      },
    ],
    workflowExamples: [
      {
        name: 'Morning dispatch',
        summary: 'Plan routes when loadshedding might kill the office network.',
        steps: [
          'Import overnight orders',
          'Assign drivers with capacity limits',
          'Drivers accept jobs on mobile',
          'Customers get ETA messages when status changes',
        ],
      },
      {
        name: 'Failed delivery loop',
        summary: 'Handle returns without losing the original job context.',
        steps: [
          'Driver marks attempt with reason code',
          'Coordinator reschedules or escalates',
          'Client notified with new window',
          'Warehouse updated if stock returns',
        ],
      },
    ],
    serviceLinks: [
      ...DEFAULT_SERVICES,
      { label: 'MVP developer for logistics startups', path: '/mvp-developer-south-africa' },
    ],
    caseStudies: [
      {
        label: 'Laundry Marketplace',
        path: 'https://laundry.qwabi.co.za/',
        blurb: 'Marketplace with driver, partner, and customer surfaces.',
      },
      {
        label: 'All projects',
        path: '/projects',
        blurb: 'Fleet, marketplace, and ops builds in the catalog.',
      },
    ],
    relatedIndustrySlugs: ['field-services', 'ride-hailing', 'ecommerce'],
    ctaHeadline: 'Scope dispatch and driver workflows',
    ctaSubhead:
      'Share how you run today (spreadsheets, ERP, WhatsApp). We propose a phased build with honest integration work priced in.',
  },
  {
    slug: 'restaurants',
    path: industryPath('restaurants'),
    icon: UtensilsCrossed,
    name: 'Restaurants',
    metaTitle: 'Restaurant Operations Software South Africa',
    metaDescription:
      'Kitchen display, order routing, stock alerts, and staff tools for South African restaurants. Integrate payments and delivery without duct-tape spreadsheets.',
    eyebrow: 'Industries · Hospitality · South Africa',
    h1: 'Restaurant operations',
    heroSubhead:
      'Peak-hour chaos is predictable. Systems should keep tickets, stock, and staff shifts aligned when the floor is full.',
    intro:
      'Many restaurants juggle POS exports, delivery apps, and manual stock counts. Custom layers make sense when you need branded ordering, central kitchen logic, or reporting your franchise owner actually trusts.',
    operationalChallenges: [
      {
        title: 'Ticket chaos at peak',
        description:
          'Orders arrive from walk-in, phone, and aggregators. Kitchen misses modifiers when channels are separate.',
      },
      {
        title: 'Stock surprises',
        description:
          'Popular items sell out mid-service because counts lag behind reality.',
      },
      {
        title: 'Labour and shift gaps',
        description:
          'Rosters live in one app, payroll in another, and managers reconcile by hand.',
      },
    ],
    automationLeverage: [
      {
        title: 'Unified order queue',
        description:
          'Route all channels into one kitchen view with clear prep states.',
      },
      {
        title: 'Recipe-level stock',
        description:
          'Deplete ingredients from sales, not just SKU toggles, so purchasing gets early warnings.',
      },
      {
        title: 'Manager dashboards',
        description:
          'Labour cost, voids, and top sellers visible per shift without waiting for accountant exports.',
      },
    ],
    workflowExamples: [
      {
        name: 'Friday night service',
        summary: 'Keep front and kitchen aligned under volume.',
        steps: [
          'Orders print or display with modifiers intact',
          'Kitchen bumps status to "ready"',
          'Runners see pickup queue on tablet',
          'Close shift with cash-up checklist',
        ],
      },
      {
        name: 'Supplier order',
        summary: 'Reorder before weekend rush.',
        steps: [
          'System suggests par levels from usage',
          'Manager approves PO',
          'Goods received updates stock',
          'Variance flagged if delivery short',
        ],
      },
    ],
    serviceLinks: DEFAULT_SERVICES,
    caseStudies: [
      {
        label: 'All projects',
        path: '/projects',
        blurb: 'Hospitality and commerce builds in the portfolio.',
      },
    ],
    relatedIndustrySlugs: ['retail', 'ecommerce', 'small-businesses'],
    ctaHeadline: 'Fix one service bottleneck first',
    ctaSubhead:
      'Kitchen flow, stock, or multi-branch reporting. We phase so you keep serving while software rolls out.',
  },
  {
    slug: 'salons',
    path: industryPath('salons'),
    icon: Scissors,
    name: 'Salons and beauty',
    metaTitle: 'Salon Booking Software South Africa',
    metaDescription:
      'Bookings, chair scheduling, client history, and retail add-ons for South African salons and beauty businesses.',
    eyebrow: 'Industries · Beauty · South Africa',
    h1: 'Salons and beauty businesses',
    heroSubhead:
      'Clients expect WhatsApp reminders and card payments. Staff need calendars that respect chair time and product usage.',
    intro:
      'Salon software fails when it ignores how stylists actually work: walk-ins, deposits, product sales, and chair turnover. We build around your booking rules, not generic calendar defaults.',
    operationalChallenges: [
      {
        title: 'Double bookings',
        description:
          'Phone, Instagram DMs, and front-desk books overlap. Clients arrive to no slot.',
      },
      {
        title: 'No client history',
        description:
          'Formula notes and preferences sit in stylists\' phones instead of the business.',
      },
      {
        title: 'Retail at the chair',
        description:
          'Product sales are tracked separately from services, so margin is unclear.',
      },
    ],
    automationLeverage: [
      {
        title: 'Chair-aware scheduling',
        description:
          'Services block the right duration and skill level. Walk-ins slot into gaps automatically.',
      },
      {
        title: 'Deposits and no-show rules',
        description:
          'Paystack links for deposits. Policies enforced before the day is fully booked.',
      },
      {
        title: 'Client profiles',
        description:
          'History, allergies, and retail purchases follow the client across stylists.',
      },
    ],
    workflowExamples: [
      {
        name: 'Online booking with deposit',
        summary: 'Reduce no-shows without chasing every client manually.',
        steps: [
          'Client picks service and stylist',
          'Deposit paid via Paystack',
          'Reminder sent day before',
          'Check-in moves appointment to in-progress',
        ],
      },
      {
        name: 'End-of-day reconciliation',
        summary: 'Match till, card, and tips.',
        steps: [
          'Close appointments still open',
          'Record retail sales per stylist',
          'Export daily summary for owner',
        ],
      },
    ],
    serviceLinks: DEFAULT_SERVICES,
    caseStudies: [
      {
        label: 'eStudio Glam',
        path: 'https://www.estudioglam.co.za/',
        blurb: 'Educational platform for hairstylist training and online learning.',
      },
      {
        label: 'Ilithiyana',
        path: 'https://ilithiyana.co.za/',
        blurb: 'Bookings and CRM patterns reused for service businesses.',
      },
    ],
    relatedIndustrySlugs: ['small-businesses', 'retail', 'healthcare'],
    ctaHeadline: 'Bookings that match your floor',
    ctaSubhead:
      'Tell us how chairs, deposits, and retail work today. We scope mobile-friendly tools staff can learn in one shift.',
  },
  {
    slug: 'insurance',
    path: industryPath('insurance'),
    icon: Shield,
    name: 'Insurance',
    metaTitle: 'Insurance Operations Software South Africa',
    metaDescription:
      'Policy workflows, broker tools, claims intake, and compliance-friendly audit trails for South African insurance operators and MGAs.',
    eyebrow: 'Industries · Insurance · South Africa',
    h1: 'Insurance operations',
    heroSubhead:
      'Brokers and underwriters need traceable decisions, not another inbox. Build intake, quoting, and servicing layers that respect POPIA and your existing core systems.',
    intro:
      'Insurance software in SA often means integrating with legacy policy admin while giving brokers and clients a modern front door. We focus on workflow, documents, and visibility without pretending to replace your entire core in v1.',
    operationalChallenges: [
      {
        title: 'Email-driven underwriting',
        description:
          'Risk details sit in attachments. Approvals lack a single timeline auditors can follow.',
      },
      {
        title: 'Broker tool sprawl',
        description:
          'Partners use different formats. Ops teams retype into the policy system.',
      },
      {
        title: 'Claims visibility',
        description:
          'Clients call for updates because status is trapped in back-office queues.',
      },
    ],
    automationLeverage: [
      {
        title: 'Structured intake',
        description:
          'Forms, document upload, and validation before a human touches the case.',
      },
      {
        title: 'Audit-friendly events',
        description:
          'Who changed what, when, with immutable event logs for compliance reviews.',
      },
      {
        title: 'Integration boundaries',
        description:
          'Sync to policy admin via API or controlled exports so data stays authoritative in one place.',
      },
    ],
    workflowExamples: [
      {
        name: 'Broker quote request',
        summary: 'Standardize submissions without blocking experienced brokers.',
        steps: [
          'Broker completes risk questionnaire',
          'Documents scanned and tagged',
          'Underwriter queue prioritized by SLA',
          'Decision recorded with notes and attachments',
        ],
      },
      {
        name: 'Claims status portal',
        summary: 'Cut "any update?" calls.',
        steps: [
          'Claim registered with reference',
          'Milestones pushed to client view',
          'Requests for info sent securely',
          'Closure triggers satisfaction survey',
        ],
      },
    ],
    serviceLinks: DEFAULT_SERVICES,
    caseStudies: [
      {
        label: 'Case Pro · Western Cape Labs',
        path: 'https://mlab.co.za/',
        blurb: 'Case management workflows for operational teams.',
      },
      {
        label: 'All projects',
        path: '/projects',
        blurb: 'Regulated and document-heavy builds.',
      },
    ],
    relatedIndustrySlugs: ['healthcare', 'small-businesses', 'field-services'],
    ctaHeadline: 'Modernize intake without replacing your core',
    ctaSubhead:
      'Share your policy system and broker journey. We map integration risk and phase one workflows with clear compliance boundaries.',
  },
  {
    slug: 'healthcare',
    path: industryPath('healthcare'),
    icon: HeartPulse,
    name: 'Healthcare',
    metaTitle: 'Healthcare Software South Africa | Clinics and Occupational Health',
    metaDescription:
      'Booking, occupational health, patient intake, and clinic operations for South African healthcare providers. POPIA-aware design and audit trails.',
    eyebrow: 'Industries · Healthcare · South Africa',
    h1: 'Healthcare and clinic operations',
    heroSubhead:
      'Clinics need reliable scheduling, employer reporting, and records staff can trust. We build for occupational health, private practice, and program delivery across SA.',
    intro:
      'Healthcare software must balance speed for reception, clinical accuracy, and privacy law. We have shipped occupational health booking in mining regions and can extend patterns to intake, referrals, and employer dashboards.',
    operationalChallenges: [
      {
        title: 'Phone-heavy booking',
        description:
          'Reception toggles between calls, walk-ins, and employer mandates. Double bookings hurt trust.',
      },
      {
        title: 'Employer reporting lag',
        description:
          'Mining and corporate clients need fit-for-work status on schedule, not after manual consolidation.',
      },
      {
        title: 'Records scattered',
        description:
          'Forms in PDF, results in email, billing in another system. Audits become archaeology.',
      },
    ],
    automationLeverage: [
      {
        title: 'Role-based access',
        description:
          'Reception, nurse, doctor, and employer views see only what POPIA allows.',
      },
      {
        title: 'Appointment rules',
        description:
          'Site-specific slots, medical surveillance cycles, and reminders reduce no-shows.',
      },
      {
        title: 'Employer portals',
        description:
          'HR sees workforce compliance without calling the clinic daily.',
      },
    ],
    workflowExamples: [
      {
        name: 'Mining medical surveillance',
        summary: 'Book and track occupational visits at scale.',
        steps: [
          'Employer uploads workforce roster',
          'Employees receive booking links',
          'Clinic captures visit outcomes',
          'Employer dashboard shows compliance gaps',
        ],
      },
      {
        name: 'Daily clinic run sheet',
        summary: 'Front desk knows who is in the building.',
        steps: [
          'Check-in updates waiting room board',
          'Clinical notes linked to appointment',
          'Billing codes captured at checkout',
          'Follow-up booked before patient leaves',
        ],
      },
    ],
    serviceLinks: DEFAULT_SERVICES,
    caseStudies: [
      {
        label: 'ClinicPlus',
        path: 'https://clinicplusbookings.co.za/',
        blurb: 'Occupational health bookings for mining and construction employers.',
      },
      {
        label: 'All projects',
        path: '/projects',
        blurb: 'Healthcare and operations platforms.',
      },
    ],
    relatedIndustrySlugs: ['insurance', 'education', 'field-services'],
    ctaHeadline: 'Scope clinic or employer workflows',
    ctaSubhead:
      'Describe sites, roles, and reporting you owe clients. We outline POPIA considerations and a realistic first release.',
  },
  {
    slug: 'education',
    path: industryPath('education'),
    icon: GraduationCap,
    name: 'Education',
    metaTitle: 'Education Technology South Africa | Campus and Training Platforms',
    metaDescription:
      'Student services, campus tools, training portals, and admin systems for South African schools, colleges, and edutech operators.',
    eyebrow: 'Industries · Education · South Africa',
    h1: 'Education and training',
    heroSubhead:
      'Students expect mobile-friendly access. Administrators need accurate records. Instructors need content delivery without fighting the LMS.',
    intro:
      'Edutech in SA spans campus wallets, accommodation marketplaces, vocational training, and corporate academies. We build when off-the-shelf LMS or SIS products force awkward workarounds for local payments and connectivity.',
    operationalChallenges: [
      {
        title: 'Fragmented student journeys',
        description:
          'Applications, payments, and support live on different URLs and WhatsApp groups.',
      },
      {
        title: 'Manual compliance reporting',
        description:
          'Accreditation and attendance exports eat admin time every term.',
      },
      {
        title: 'Content stuck in PDF',
        description:
          'Training material does not track progress, assessments, or retries.',
      },
    ],
    automationLeverage: [
      {
        title: 'Unified student profile',
        description:
          'One record for enrolment, payments, and support tickets.',
      },
      {
        title: 'Progress tracking',
        description:
          'Modules, quizzes, and certificates generated when criteria are met.',
      },
      {
        title: 'Campus integrations',
        description:
          'NFC access, wallet top-ups, and vendor payments when mobility matters.',
      },
    ],
    workflowExamples: [
      {
        name: 'Accommodation request cycle',
        summary: 'Students apply, pay, and get assigned without inbox chaos.',
        steps: [
          'Student submits profile and preferences',
          'Availability matched to residences',
          'Deposit via Paystack',
          'Assignment letter and move-in checklist issued',
        ],
      },
      {
        name: 'Cohort training portal',
        summary: 'Instructors run a term without emailing ZIP files.',
        steps: [
          'Learners invited to cohort',
          'Lessons unlock on schedule',
          'Assessments auto-marked where possible',
          'Facilitator dashboard flags at-risk learners',
        ],
      },
    ],
    serviceLinks: [
      ...DEFAULT_SERVICES,
      { label: 'Mobile apps for campus', path: '/mobile-app-development-south-africa' },
    ],
    caseStudies: [
      {
        label: 'Future Start',
        path: 'https://futurestart.co.za/',
        blurb: 'Student accommodation requests and digital book sales.',
      },
      {
        label: 'eStudio Glam',
        path: 'https://www.estudioglam.co.za/',
        blurb: 'Online learning and training delivery.',
      },
      {
        label: 'uTap',
        path: 'https://utaptech.co.za/',
        blurb: 'Campus NFC wallet and access patterns.',
      },
    ],
    relatedIndustrySlugs: ['small-businesses', 'ecommerce', 'healthcare'],
    ctaHeadline: 'Plan your next student or campus workflow',
    ctaSubhead:
      'Share enrolment, payments, or training goals. We recommend build vs buy with ZAR ranges you can take to council or investors.',
  },
  {
    slug: 'retail',
    path: industryPath('retail'),
    icon: Store,
    name: 'Retail',
    metaTitle: 'Retail Software South Africa | Inventory and Omnichannel',
    metaDescription:
      'POS integrations, inventory, loyalty, and staff tools for South African retailers across single-store and multi-branch operations.',
    eyebrow: 'Industries · Retail · South Africa',
    h1: 'Retail operations',
    heroSubhead:
      'Stock accuracy, promotions, and staff performance should not depend on closing the store to count boxes.',
    intro:
      'Retailers here balance card and cash, load shedding at tills, and customers who want WhatsApp receipts. We connect channels when your POS alone cannot handle how you actually sell.',
    operationalChallenges: [
      {
        title: 'Stock drift',
        description:
          'Shrinkage and sync errors between floor, warehouse, and online channels.',
      },
      {
        title: 'Promotion complexity',
        description:
          'Bundles and loyalty rules are managed in spreadsheets ahead of weekends.',
      },
      {
        title: 'Weak branch visibility',
        description:
          'Owners cannot compare stores without manual consolidation.',
      },
    ],
    automationLeverage: [
      {
        title: 'Central inventory',
        description:
          'Transfers, adjustments, and alerts across branches in one system.',
      },
      {
        title: 'Staff accountability',
        description:
          'Shift sales, voids, and cash-up tied to users, not generic tills.',
      },
      {
        title: 'Customer touchpoints',
        description:
          'Receipts, loyalty, and reorder prompts on channels clients already use.',
      },
    ],
    workflowExamples: [
      {
        name: 'Stock take without shutdown',
        summary: 'Cycle counts while trading continues.',
        steps: [
          'Assign aisles to staff on handheld',
          'Scan and reconcile variances',
          'Manager approves adjustments',
          'Purchasing sees updated par levels',
        ],
      },
      {
        name: 'Whatsapp receipt and reorder',
        summary: 'Stay close to customers after purchase.',
        steps: [
          'Sale completes at POS',
          'Digital receipt sent automatically',
          'Favorite SKU triggers reorder nudge next month',
        ],
      },
    ],
    serviceLinks: DEFAULT_SERVICES,
    caseStudies: [
      {
        label: 'Lungi The Strategist',
        path: 'https://lungithestrategist.co.za/',
        blurb: 'Branded ecommerce for strategy and retail offerings.',
      },
      {
        label: 'Laundry Marketplace',
        path: 'https://laundry.qwabi.co.za/',
        blurb: 'Multi-sided retail and fulfilment patterns.',
      },
    ],
    relatedIndustrySlugs: ['ecommerce', 'small-businesses', 'logistics'],
    ctaHeadline: 'Unify stock and selling channels',
    ctaSubhead:
      'Tell us your POS, branches, and online plans. We scope integrations explicitly so reconciliation stays honest.',
  },
  {
    slug: 'property-management',
    path: industryPath('property-management'),
    icon: Building2,
    name: 'Property management',
    metaTitle: 'Property Management Software South Africa',
    metaDescription:
      'Leases, maintenance, tenant portals, and owner reporting for South African property managers and landlords.',
    eyebrow: 'Industries · Property · South Africa',
    h1: 'Property management',
    heroSubhead:
      'Tenants, trustees, and owners need different views of the same building. Spreadsheets break when portfolios grow past a handful of units.',
    intro:
      'Property ops in SA include sectional title rules, arrears processes, and maintenance vendors paid on approval. Software should mirror your mandate letters and trustee reporting, not a generic US landlord template.',
    operationalChallenges: [
      {
        title: 'Arrears tracking',
        description:
          'Who owes what, which reminders went out, and what legal step is next lives in personal notes.',
      },
      {
        title: 'Maintenance black holes',
        description:
          'Tickets start on WhatsApp and end without cost allocation to the right owner or body corporate.',
      },
      {
        title: 'Owner reporting fatigue',
        description:
          'Monthly packs are rebuilt manually from bank exports and emails.',
      },
    ],
    automationLeverage: [
      {
        title: 'Tenant and owner portals',
        description:
          'Statements, tickets, and documents available without calling the agent.',
      },
      {
        title: 'Maintenance workflows',
        description:
          'Assign vendors, capture quotes, and close jobs with photo proof.',
      },
      {
        title: 'Portfolio dashboards',
        description:
          'Occupancy, arrears aging, and capex plans per building or mandate.',
      },
    ],
    workflowExamples: [
      {
        name: 'Arrears escalation',
        summary: 'Consistent reminders with audit trail.',
        steps: [
          'Invoice generated on schedule',
          'Reminder at 7 and 30 days',
          'Trustee pack includes ledger and communication log',
          'Payment plan recorded if approved',
        ],
      },
      {
        name: 'Maintenance from ticket to invoice',
        summary: 'Vendors paid against approved work.',
        steps: [
          'Tenant logs issue with photos',
          'Agent assigns approved vendor',
          'Completion signed off',
          'Cost allocated to owner or BC account',
        ],
      },
    ],
    serviceLinks: DEFAULT_SERVICES,
    caseStudies: [
      {
        label: 'Future Start',
        path: 'https://futurestart.co.za/',
        blurb: 'Student accommodation requests and assignments.',
      },
      {
        label: 'All projects',
        path: '/projects',
        blurb: 'Property and operations software references.',
      },
    ],
    relatedIndustrySlugs: ['small-businesses', 'insurance', 'field-services'],
    ctaHeadline: 'Digitize leases and maintenance first',
    ctaSubhead:
      'Share portfolio size and trustee reporting needs. We phase owner portals after internal ops trust the data.',
  },
  {
    slug: 'ride-hailing',
    path: industryPath('ride-hailing'),
    icon: Car,
    name: 'Ride-hailing and mobility',
    metaTitle: 'Ride-Hailing App Development South Africa',
    metaDescription:
      'Driver apps, rider experiences, dispatch, and payouts for South African mobility startups. Maps, safety, and Paystack-ready payments.',
    eyebrow: 'Industries · Mobility · South Africa',
    h1: 'Ride-hailing and mobility',
    heroSubhead:
      'Competing with global apps means nailing trust, payouts, and local payments, not copying screens from Silicon Valley.',
    intro:
      'Mobility products in SA must handle cash and card, driver onboarding, safety incidents, and uneven GPS coverage. We help founders ship rider and driver apps with ops dashboards that survive real Friday nights.',
    operationalChallenges: [
      {
        title: 'Driver supply stability',
        description:
          'Onboarding, document checks, and payout delays cause churn before marketing scales.',
      },
      {
        title: 'Pricing and surge disputes',
        description:
          'Riders challenge fares when rules are opaque or trips reroute badly.',
      },
      {
        title: 'Safety response',
        description:
          'Incidents need structured escalation, not a generic support inbox.',
      },
    ],
    automationLeverage: [
      {
        title: 'Real-time matching',
        description:
          'Dispatch considers distance, acceptance rate, and vehicle class with clear audit logs.',
      },
      {
        title: 'Wallet and payouts',
        description:
          'Driver balances, instant pay options, and reconciliation with Paystack.',
      },
      {
        title: 'Trust features',
        description:
          'Share trip, masked contact, and post-ride feedback tied to accounts.',
      },
    ],
    workflowExamples: [
      {
        name: 'Trip lifecycle',
        summary: 'From request to payout.',
        steps: [
          'Rider requests with upfront estimate',
          'Driver accepts with navigation hook',
          'Trip completes with fare breakdown',
          'Payout batch includes fees and incentives',
        ],
      },
      {
        name: 'Driver onboarding',
        summary: 'Get roadworthy drivers live faster.',
        steps: [
          'Document upload and validation queue',
          'Training module completion',
          'Background check status tracked',
          'Activation when all gates pass',
        ],
      },
    ],
    serviceLinks: [
      ...DEFAULT_SERVICES,
      { label: 'Mobile app development', path: '/mobile-app-development-south-africa' },
    ],
    caseStudies: [
      {
        label: 'All projects',
        path: '/projects',
        blurb: 'Marketplace and mobile platforms with dispatch patterns.',
      },
    ],
    relatedIndustrySlugs: ['logistics', 'field-services', 'ecommerce'],
    ctaHeadline: 'Scope rider, driver, and ops surfaces',
    ctaSubhead:
      'Share your city launch plan. We map MVP features vs post-seed hardening with ZAR ranges per platform.',
  },
  {
    slug: 'ecommerce',
    path: industryPath('ecommerce'),
    icon: ShoppingBag,
    name: 'Ecommerce',
    metaTitle: 'Ecommerce Development South Africa | Custom Stores and Marketplaces',
    metaDescription:
      'Custom storefronts, marketplaces, and checkout flows for South African ecommerce with Paystack, courier integrations, and honest ZAR scoping.',
    eyebrow: 'Industries · Ecommerce · South Africa',
    h1: 'Ecommerce and marketplaces',
    heroSubhead:
      'Shopify works until you need multi-vendor payouts, complex logistics, or a brand experience templates cannot carry.',
    intro:
      'South African ecommerce means Paystack, courier APIs, VAT-aware receipts, and customers on mobile data. We build when your model outgrows plugins or when you are the marketplace operator, not a single merchant.',
    operationalChallenges: [
      {
        title: 'Checkout drop-off',
        description:
          'Slow mobile flows and surprise shipping costs kill conversion.',
      },
      {
        title: 'Marketplace payouts',
        description:
          'Splitting funds between platform and sellers manually is slow and risky.',
      },
      {
        title: 'Ops without visibility',
        description:
          'Support cannot see order, payment, and shipment state in one timeline.',
      },
    ],
    automationLeverage: [
      {
        title: 'Performance-first storefronts',
        description:
          'Next.js or headless frontends tuned for mobile networks and SEO.',
      },
      {
        title: 'Payment and refund rules',
        description:
          'Paystack webhooks drive order state so support works from facts.',
      },
      {
        title: 'Seller and admin tooling',
        description:
          'Vendors manage catalog and fulfilment without touching your core database blindly.',
      },
    ],
    workflowExamples: [
      {
        name: 'Single-brand checkout',
        summary: 'Reduce cart abandonment on mobile.',
        steps: [
          'Guest or account checkout with saved addresses',
          'Live shipping quotes from courier API',
          'Paystack payment with webhook confirmation',
          'Order status emails and WhatsApp optional',
        ],
      },
      {
        name: 'Marketplace seller payout',
        summary: 'Platform fee and seller share calculated automatically.',
        steps: [
          'Order completes and delivery confirmed',
          'Platform fee deducted per rules',
          'Seller balance updated',
          'Weekly payout batch exported or automated',
        ],
      },
    ],
    serviceLinks: [
      ...DEFAULT_SERVICES,
      { label: 'App development cost guide', path: '/app-development-cost-south-africa' },
    ],
    caseStudies: [
      {
        label: 'Lungi The Strategist',
        path: 'https://lungithestrategist.co.za/',
        blurb: 'Branded ecommerce platform.',
      },
      {
        label: 'Laundry Marketplace',
        path: 'https://laundry.qwabi.co.za/',
        blurb: 'Multi-sided marketplace with admin and partner tools.',
      },
      {
        label: 'Future Start',
        path: 'https://futurestart.co.za/',
        blurb: 'Commerce flows for student audiences.',
      },
    ],
    relatedIndustrySlugs: ['retail', 'logistics', 'small-businesses'],
    ctaHeadline: 'Scope your store or marketplace MVP',
    ctaSubhead:
      'Share catalog size, payments, and fulfilment model. We separate theme work from real platform engineering in the quote.',
  },
  {
    slug: 'field-services',
    path: industryPath('field-services'),
    icon: Wrench,
    name: 'Field services',
    metaTitle: 'Field Service Software South Africa | Jobs and Mobile Teams',
    metaDescription:
      'Job scheduling, mobile checklists, proof of work, and coordinator dashboards for South African plumbers, installers, security, and maintenance teams.',
    eyebrow: 'Industries · Field services · South Africa',
    h1: 'Field services and mobile teams',
    heroSubhead:
      'Technicians live on the road. Coordinators need boards that reflect reality. Finance needs job costing before month-end surprises.',
    intro:
      'Field service businesses lose money when jobs are quoted in the morning and invoiced from memory a week later. Mobile-first job cards, parts usage, and sign-off photos keep everyone aligned.',
    operationalChallenges: [
      {
        title: 'Scheduling conflicts',
        description:
          'Skills, regions, and parts availability are not visible when dispatch promises times.',
      },
      {
        title: 'Paper job cards',
        description:
          'Work completed but billing delayed because forms return to office late.',
      },
      {
        title: 'Parts and van stock',
        description:
          'Technicians buy emergency parts without visibility into job profitability.',
      },
    ],
    automationLeverage: [
      {
        title: 'Mobile job packs',
        description:
          'Checklists, photos, and customer sign-off offline-friendly where possible.',
      },
      {
        title: 'Coordinator map and board',
        description:
          'Drag jobs, reassign techs, and see SLA risk before clients call.',
      },
      {
        title: 'Job costing',
        description:
          'Labour, parts, and travel roll into margin per job for owner review.',
      },
    ],
    workflowExamples: [
      {
        name: 'Same-day service call',
        summary: 'Quote, execute, and invoice while on site.',
        steps: [
          'Coordinator assigns nearest qualified tech',
          'Tech reviews history on mobile',
          'Parts scanned from van stock',
          'Customer signs and pays deposit or full via link',
        ],
      },
      {
        name: 'Recurring maintenance contract',
        summary: 'Prevent missed visits on SLA accounts.',
        steps: [
          'Contract generates scheduled jobs',
          'Tech checklist enforced per visit',
          'Exceptions escalate to supervisor',
          'Monthly report auto-sent to client',
        ],
      },
    ],
    serviceLinks: DEFAULT_SERVICES,
    caseStudies: [
      {
        label: 'ClinicPlus',
        path: 'https://clinicplusbookings.co.za/',
        blurb: 'Scheduling and site operations for distributed teams.',
      },
      {
        label: 'Laundry Marketplace',
        path: 'https://laundry.qwabi.co.za/',
        blurb: 'Field partner and driver coordination patterns.',
      },
    ],
    relatedIndustrySlugs: ['logistics', 'property-management', 'small-businesses'],
    ctaHeadline: 'Digitize job cards and dispatch',
    ctaSubhead:
      'Walk us through a typical job from call to invoice. We propose mobile and office modules with adoption in mind.',
  },
];

export const industriesBySlug = Object.fromEntries(
  industryPages.map((page) => [page.slug, page]),
) as Record<string, IndustryPageConfig>;

export const industryPaths = industryPages.map((p) => p.path);

export const industrySlugs = industryPages.map((p) => p.slug);

export function getIndustryBySlug(slug: string): IndustryPageConfig | undefined {
  return industriesBySlug[slug];
}

export type IndustrySummary = {
  slug: string;
  path: string;
  name: string;
  shortDescription: string;
  icon: LucideIcon;
};

export const allIndustries: IndustrySummary[] = industryPages.map((page) => ({
  slug: page.slug,
  path: page.path,
  name: page.name,
  shortDescription: page.heroSubhead,
  icon: page.icon,
}));
