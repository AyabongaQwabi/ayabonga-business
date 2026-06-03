/**
 * Client case studies for /work and SEO surfaces.
 * Facts from shipped projects, client sites, and approved testimonials in client-testimonials.ts.
 */

export type CaseStudy = {
  slug: string;
  clientName: string;
  contactName: string;
  contactTitle: string;
  location: string;
  sector: string;
  url: string;
  projectSummary: string;
  challenge: string;
  whatWeBuilt: string[];
  technologiesUsed: string[];
  outcomes: string[];
  testimonialKey: string | null;
  relatedServices: string[];
  metaTitle: string;
  metaDescription: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'future-start',
    clientName: 'Future Start',
    contactName: 'Ntokozo Mthethwa',
    contactTitle: 'Director',
    location: 'Johannesburg',
    sector: 'Student services',
    url: 'https://futurestart.co.za',
    projectSummary:
      'Student accommodation request flows and digital book sales for tertiary learners, built to match how Future Start runs applications and mentoring alongside day-to-day student support.',
    challenge:
      'Future Start needed more than a brochure site. Accommodation requests, book sales, and student-facing workflows had to work under tight scope without breaking during peak intake periods.',
    whatWeBuilt: [
      'Student accommodation request system with structured submissions and staff visibility',
      'Digital book store integrated with their student services offer',
      'Web platform aligned to Future Start branding and existing service lines',
    ],
    technologiesUsed: ['React', 'TypeScript', 'Node.js', 'Commerce workflows', 'Hosted web platform'],
    outcomes: [
      'The team can run accommodation requests and book sales from one digital stack instead of scattered forms',
      'Students get a clear path to request housing and purchase materials online',
      'Future Start can launch student-facing features without rebuilding the whole site each term',
    ],
    testimonialKey: 'future-start',
    relatedServices: [
      '/custom-software-development-south-africa',
      '/mobile-app-development-south-africa',
    ],
    metaTitle: 'Future Start Case Study | Student Accommodation and Book Sales',
    metaDescription:
      'How Qwabi Engineering shipped student accommodation requests and digital book sales for Future Start in Johannesburg, with clear scope and stable launches.',
  },
  {
    slug: 'an-consulting',
    clientName: 'AN Consulting',
    contactName: 'Axolile Ntongana',
    contactTitle: 'CFO',
    location: 'Johannesburg',
    sector: 'Financial consulting',
    url: 'https://www.anconsulting.co.za',
    projectSummary:
      'Custom financial records management for AN Consulting internal operations, shaped around how the finance team already works rather than forcing an off-the-shelf product.',
    challenge:
      'Generic accounting and CRM tools did not match how AN Consulting tracks client work, internal records, and financial information. The team needed software that followed their operational logic.',
    whatWeBuilt: [
      'Financial records management workspace for internal consulting workflows',
      'Role-appropriate views so finance staff can find and update records without parallel spreadsheets',
      'Web application designed around AN Consulting service lines and reporting habits',
    ],
    technologiesUsed: ['React', 'TypeScript', 'Node.js', 'Web application', 'Secure data storage'],
    outcomes: [
      'The finance team can manage internal records in a system that matches how they already think about the work',
      'Staff spend less time reconciling spreadsheets and duplicate entries',
      'AN Consulting has a stable base to extend as new service lines or compliance needs appear',
    ],
    testimonialKey: 'an-consulting',
    relatedServices: ['/custom-software-development-south-africa'],
    metaTitle: 'AN Consulting Case Study | Financial Records System',
    metaDescription:
      'Custom financial records software for AN Consulting in Johannesburg. Built for internal operations, not a forced off-the-shelf CRM.',
  },
  {
    slug: 'mpumelelo-foundation',
    clientName: 'Mpumelelo Foundation',
    contactName: 'Nomsa Mbatha',
    contactTitle: 'Founder and Executive Director',
    location: 'Pretoria',
    sector: 'Non-profit',
    url: 'https://mpumelelo.vercel.app',
    projectSummary:
      'Donation collection website for Mpumelelo Foundation so supporters can contribute online with a credible, simple experience aligned to their rural community programs.',
    challenge:
      'As a non-profit, every process and rand matters. Mpumelelo needed a donation path that felt trustworthy and easy to maintain without enterprise software overhead.',
    whatWeBuilt: [
      'Donation-focused website with clear program storytelling and contribution flows',
      'Pages for programs, impact, and ways to get involved',
      'Lightweight deployment path suitable for a foundation team without in-house engineering',
    ],
    technologiesUsed: ['React', 'TypeScript', 'Vercel hosting', 'Payment-ready donation flows'],
    outcomes: [
      'Supporters can contribute online through a credible public site',
      'The foundation team can point partners and donors to one stable URL for giving',
      'Staff can update program content without rebuilding the site from scratch each campaign',
    ],
    testimonialKey: 'mpumelelo-foundation',
    relatedServices: ['/custom-software-development-south-africa'],
    metaTitle: 'Mpumelelo Foundation Case Study | Donation Website',
    metaDescription:
      'Donation collection website for Mpumelelo Foundation in Pretoria. Simple, credible online giving for a non-profit serving rural communities.',
  },
  {
    slug: 'estudio-glam',
    clientName: 'eStudio Glam',
    contactName: 'Lwandy Ngebe',
    contactTitle: 'Founder',
    location: 'East London',
    sector: 'Beauty education',
    url: 'https://www.estudioglam.co.za',
    projectSummary:
      'Educational platform for hairstylist training and online learning, built as a real learning experience rather than a video gallery on a marketing site.',
    challenge:
      'eStudio Glam needed learners to engage with structured programs, applications, and training content. A generic website builder could not carry seminars, skills tracks, mentorship, and incubation support in one coherent product.',
    whatWeBuilt: [
      'Edutech platform for programs, applications, and learner-facing content',
      'Information architecture for empowerment seminars, skills training, mentorship, and incubation tracks',
      'Brand-aligned experience that supports eStudio Glam events and Eastern Cape beauty industry positioning',
    ],
    technologiesUsed: ['React', 'TypeScript', 'Web platform', 'Content and program modules'],
    outcomes: [
      'Students can engage with training content in the structure the founder envisioned',
      'The team can promote programs and events from one platform instead of scattered PDFs and links',
      'eStudio Glam has a stronger online learning presence for hairstylist education in the Eastern Cape',
    ],
    testimonialKey: 'estudio-glam',
    relatedServices: ['/custom-software-development-south-africa'],
    metaTitle: 'eStudio Glam Case Study | Hairstylist Edutech Platform',
    metaDescription:
      'Educational platform for eStudio Glam in East London. Online learning and program flows for beauty entrepreneurs, not just a video brochure site.',
  },
  {
    slug: 'ilithiyana',
    clientName: 'Ilithiyana Academics',
    contactName: 'Masande Dudula',
    contactTitle: 'Director',
    location: 'Mthatha',
    sector: 'Education technology',
    url: 'https://ilithiyana.co.za',
    projectSummary:
      'Full-platform rebuild for an online tutoring centre — from PDF application forms and manual EFTs to a production-grade system with enrolment, PayFast payments, parent portal, tutor management, and admin dashboard. Delivered in 7 days using our Rapid AI development process.',
    challenge:
      'Ilithiyana Academics was running their entire operation on WhatsApp group chats and Excel spreadsheets. Parents received PDF application forms by email, filled them out manually, and sent them back. Payments were manual EFTs tracked by hand. Tutors submitted paper log sheets at month end. The admin team was buried in data entry — there was no system, no automation, and no visibility. As they moved from 6 learners toward 20+ enrolments per year with an eventual global STEM ambition, this approach could not scale.',
    whatWeBuilt: [
      'Full public site rebuild — home, about, contact, career guidance, terms, privacy policy, and a machine-readable site index across 60+ pages with scroll-reveal animations',
      'SEO competitor pages — 10 alternatives pages targeting Superprof, Kip McGrath, Tutor Doctor and others, plus 10 head-to-head comparison pages and a CAPS subject choice lead magnet for email capture',
      '6-step online enrolment wizard — account creation, child profiles, package selection, PayFast checkout, school report upload, and confirmation — with Supabase session persistence at every step',
      'PayFast payment integration — ITN webhook, subscription fulfilment, cancelled and return routes, and automated Resend email reminders via cron job covering up to 3,000 emails per month',
      'Parent portal — magic link auth, children management with add-child wizard, class schedules with Google Meet join links, school report OCR pipeline, subscription status and payment history',
      'Tutor portal — become-a-tutor marketing page, application with document uploads, assigned class schedule view, monthly timesheet submission, and admin approve/reject workflow',
      'Admin dashboard — applications management with filter, approve/reject and export, classes management with enrollment caps and CAPS phase seeds, subscriptions, timesheets and payroll totals, tutor vetting, parent and learner CRM, leads and outreach dashboard',
      '28 Supabase database migrations — profiles, learners, parents, applications, subscriptions, classes, enrolments, timesheets, reports, leads, and row-level security policies',
    ],
    technologiesUsed: [
      'Next.js 14 (App Router)',
      'TypeScript',
      'Supabase (Postgres + Auth + Storage + RLS)',
      'PayFast (ITN webhook, subscriptions)',
      'Resend (transactional email + cron reminders)',
      'Vercel (deployment + cron jobs)',
      'OCR pipeline for school report extraction',
      'Rapid AI development process',
    ],
    outcomes: [
      'Went from zero digital infrastructure to a live, production-grade platform in 7 days — 69 commits across the staging branch',
      'Parents can apply, pay, track class schedules, view session balance, and upload school reports entirely online — no WhatsApp required',
      'Admin team moved from manual data entry into Excel to a centralised dashboard covering finance, subscriptions, applications, and CRM',
      'Tutors submit monthly timesheets digitally — admin approves or rejects with one click, payroll totals auto-calculated',
      'Automated payment reminders via Resend replace manual WhatsApp follow-ups, scaled to 3,000 emails per month at near-zero cost',
      'SEO competitor and comparison pages built into the platform to drive organic enrolment leads from day one',
      'Project delivered at R50,400 — less than one month of a full-time mid-level developer salary',
    ],
    testimonialKey: 'ilithiyana',
    relatedServices: [
      '/custom-software-development-south-africa',
      '/mobile-app-development-south-africa',
    ],
    metaTitle: 'Ilithiyana Academics Case Study | Full Platform in 7 Days',
    metaDescription:
      'How Qwabi Engineering replaced WhatsApp and Excel with a full enrolment platform, PayFast payments, parent portal, tutor management, and admin dashboard for Ilithiyana Academics in 7 days.',
  },
  {
    slug: 'lungi-the-strategist',
    clientName: 'Lungi The Strategist',
    contactName: 'Lungi Ntuli',
    contactTitle: 'Director',
    location: 'Durban',
    sector: 'Strategy consulting and retail',
    url: 'https://lungithestrategist.com',
    projectSummary:
      'Branded ecommerce platform for Lungi The Strategist, aligned to strategy consulting positioning and product sales without a generic template storefront.',
    challenge:
      'Lungi needed a shop and brand presence that felt personal and professional. Off-the-shelf ecommerce themes could not carry the strategy brand, product catalog, and buying experience clients expect.',
    whatWeBuilt: [
      'Ecommerce storefront with brand-aligned layout and navigation',
      'Product and checkout flows tuned for mobile buyers',
      'Web platform connected to Lungi The Strategist consulting positioning and WhatsApp-led sales habits',
    ],
    technologiesUsed: ['React', 'TypeScript', 'Ecommerce', 'Web platform'],
    outcomes: [
      'Clients can browse and buy with a site that matches the Lungi The Strategist brand',
      'The director can run retail alongside consulting without maintaining two disconnected presences',
      'The team gets feedback that the store is easy to navigate, which supports repeat purchases',
    ],
    testimonialKey: 'lungi-the-strategist',
    relatedServices: [
      '/custom-software-development-south-africa',
      '/mobile-app-development-south-africa',
    ],
    metaTitle: 'Lungi The Strategist Case Study | Branded Ecommerce',
    metaDescription:
      'Custom ecommerce for Lungi The Strategist in Durban. A branded store built for strategy positioning, not a generic template.',
  },
  {
    slug: 'western-cape-labs',
    clientName: 'Western Cape Labs',
    contactName: 'Mike Jones',
    contactTitle: 'Managing Director',
    location: 'Cape Town',
    sector: 'Innovation and case management',
    url: 'https://mlab.co.za',
    projectSummary:
      'Case Pro case management system built in collaboration with Western Cape Labs (mLab), supporting operational workflows for innovation and programme teams.',
    challenge:
      'Western Cape Labs needed solid engineering on Case Pro while internal teams focused on programmes, startups, and ecosystem work. The product architecture had to stay maintainable as requirements grew.',
    whatWeBuilt: [
      'Case Pro case management modules for operational tracking and workflows',
      'Product architecture support integrated with the existing mLab engineering context',
      'Collaborative delivery with Western Cape Labs stakeholders on priority features',
    ],
    technologiesUsed: ['Web application', 'Case management workflows', 'API-backed services'],
    outcomes: [
      'The Case Pro team can extend the product with clearer technical foundations',
      'Programme staff have software that supports case workflows instead of ad hoc spreadsheets',
      'Western Cape Labs can keep building ecosystem programmes with a stronger internal operations tool',
    ],
    testimonialKey: 'western-cape-labs',
    relatedServices: ['/custom-software-development-south-africa'],
    metaTitle: 'Western Cape Labs Case Study | Case Pro System',
    metaDescription:
      'Case Pro case management built with Western Cape Labs (mLab) in Cape Town. Engineering collaboration on a live operations platform.',
  },
  {
    slug: 'warner-music-africa',
    clientName: 'Warner Music Africa',
    contactName: 'Temi Adeniji',
    contactTitle: 'Managing Director',
    location: 'Nigeria',
    sector: 'Music and entertainment',
    url: 'https://www.warnermusicafrica.com',
    projectSummary:
      'Participant management system for the Warner Culture Shifters competition, supporting multi-country operations and high-volume entrant data.',
    challenge:
      'Culture Shifters runs across multiple countries with large entrant volumes. Previous years relied on processes that were hard to coordinate at scale. Warner Music Africa needed a system that could hold up under competition peaks.',
    whatWeBuilt: [
      'Participant management system for Culture Shifters registration and operational coordination',
      'Administrative views for competition staff handling entrant data at scale',
      'Web platform integrated with Warner Music Africa public presence and competition operations',
    ],
    technologiesUsed: ['Web platform', 'Operations tooling', 'Scalable data handling'],
    outcomes: [
      'Competition operators can manage participant data without the process falling apart at peak load',
      'Regional teams have a single system for coordination instead of fragmented spreadsheets',
      'Warner Music Africa can run Culture Shifters with less operational friction than prior editions',
    ],
    testimonialKey: 'warner-music-africa',
    relatedServices: ['/custom-software-development-south-africa'],
    metaTitle: 'Warner Music Africa Case Study | Culture Shifters Platform',
    metaDescription:
      'Participant management for Warner Culture Shifters across Africa. Custom operations software for multi-country competition delivery.',
  },
  {
    slug: 'clinicplus',
    clientName: 'ClinicPlus',
    contactName: 'Dr. Bertha van der Spuy-Lombaard',
    contactTitle: 'MD and Occupational Health Specialist',
    location: 'Witbank',
    sector: 'Occupational health',
    url: 'https://www.clinicpluswtb.co.za',
    projectSummary:
      'Occupational health management and bookings for mining and construction employers in Witbank and Mpumalanga, with records structured for compliance-minded practice operations.',
    challenge:
      'Occupational health records demand accuracy, structure, and accessibility. ClinicPlus needed bookings and health administration that reduce admin load while keeping compliance workflows traceable.',
    whatWeBuilt: [
      'Occupational health management system aligned to ClinicPlus practice workflows',
      'Booking flows for mining-sector employers and clinic operations',
      'Structured health records and admin tooling for compliance-friendly day-to-day use',
    ],
    technologiesUsed: ['React', 'Node.js', 'MongoDB', 'Booking workflows', 'Health operations'],
    outcomes: [
      'Clinic staff can manage bookings and health records in one system built for their practice',
      'Administrative load drops because repetitive tasks move off paper and scattered files',
      'The practice can handle compliance-oriented work with clearer structure and audit-friendly records',
    ],
    testimonialKey: 'clinicplus',
    relatedServices: [
      '/custom-software-development-south-africa',
      '/mobile-app-development-south-africa',
    ],
    metaTitle: 'ClinicPlus Case Study | Occupational Health System',
    metaDescription:
      'Occupational health management and bookings for ClinicPlus in Witbank. Built for mining-sector employers and compliance-minded clinic operations.',
  },
];

export const CASE_STUDIES_INDEX_PATH = '/case-studies';

export const caseStudiesBySlug = Object.fromEntries(
  CASE_STUDIES.map((study) => [study.slug, study]),
) as Record<string, CaseStudy>;

export const caseStudySlugs = CASE_STUDIES.map((s) => s.slug);

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudiesBySlug[slug];
}

/** Display title from metaTitle (strip trailing site segment if present). */
export function getCaseStudyTitle(study: CaseStudy): string {
  const base = study.metaTitle.replace(/\s*\|\s*[^|]+$/, '').trim();
  return base || study.clientName;
}

function humanizeServicePath(path: string): string {
  const segment = path.replace(/^\/|\/$/g, '').split('/')[0] ?? path;
  return segment
    .replace(/-south-africa$/i, '')
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getCaseStudyServiceLinks(
  study: CaseStudy,
): { label: string; path: string }[] {
  return study.relatedServices.map((path) => ({
    path,
    label: humanizeServicePath(path),
  }));
}
