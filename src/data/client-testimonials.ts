/**
 * Approved client feedback for marketing surfaces.
 * Quotes from `.agents/product-marketing-context.md`. Do not fabricate new direct quotes.
 */

export type ClientTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  organization: string;
  location: string;
  projectSummary: string;
  projectUrl: string;
  /** When set, used instead of placeholder initials avatar */
  imageSrc?: string;
  imageAlt?: string;
  /** Homepage grid priority (lower = earlier) */
  homepageOrder?: number;
};

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'future-start',
    homepageOrder: 1,
    quote:
      'Qwabi Engineering helped us build a student accommodation request platform that also supported digital book sales. Communication was clear, timelines were respected, and the implementation process was smooth from start to finish.',
    name: 'Ntokozo Mtheethwa',
    role: 'Director',
    organization: 'Future Start',
    location: 'Johannesburg',
    projectSummary:
      'Student accommodation request system with digital book sales for tertiary learners.',
    projectUrl: 'https://futurestart.co.za',
  },
  {
    id: 'warner-music-africa',
    homepageOrder: 2,
    quote:
      'Qwabi Engineering built a custom participant management system for the Warner Culture Shifters competition, helping streamline participant handling and operational coordination.',
    name: 'Temi Adeniji',
    role: 'Managing Director',
    organization: 'Warner Music Africa',
    location: 'Nigeria',
    projectSummary: 'Participant management system for the Warner Culture Shifters competition.',
    projectUrl: 'https://www.warnermusicafrica.com/',
  },
  {
    id: 'ilithiyana',
    homepageOrder: 3,
    quote:
      'Qwabi Engineering developed a bookings and CRM system for our business operations. The solution made it easier to manage clients and improve operational visibility.',
    name: 'Masande Dudula',
    role: 'Director',
    organization: 'Ilithiyana',
    location: 'Mthatha',
    projectSummary: 'Bookings and CRM system for day-to-day client operations.',
    projectUrl: 'https://ilithiyana.co.za',
  },
  {
    id: 'estudio-glam',
    homepageOrder: 4,
    quote:
      'We partnered with Qwabi Engineering to build an educational platform for hairstylists. The platform aligned well with our vision and helped us establish a stronger online learning experience.',
    name: 'Lwandy Ngebe',
    role: 'Founder',
    organization: 'eStudio Glam',
    location: 'East London',
    projectSummary: 'Edutech platform for hairstylist training and online learning.',
    projectUrl: 'https://www.estudioglam.co.za',
  },
  {
    id: 'lungi-the-strategist',
    homepageOrder: 5,
    quote:
      'They built an ecommerce platform tailored to our business requirements and branding. The process was professional, collaborative and detail-oriented.',
    name: 'Lungi Ntuli',
    role: 'Director',
    organization: 'Lungi The Strategist',
    location: 'Durban',
    projectSummary: 'Ecommerce platform aligned to brand and commercial requirements.',
    projectUrl: 'https://lungithestrategist.com',
  },
  {
    id: 'an-consulting',
    homepageOrder: 6,
    quote:
      'They developed a custom financial records management system tailored to our operational needs. The process was collaborative and the system significantly improved how we manage internal financial information.',
    name: 'Axolile Ntongana',
    role: 'CFO',
    organization: 'AN Consulting',
    location: 'Johannesburg',
    projectSummary: 'Financial records management system for internal operations.',
    projectUrl: 'https://www.anconsulting.co.za',
  },
  {
    id: 'mpumelelo-foundation',
    homepageOrder: 7,
    quote:
      'Qwabi Engineering built a donation collection platform that helped us improve our digital presence and simplify online contribution management.',
    name: 'Nomsa Mbatha',
    role: 'Founder and Executive Director',
    organization: 'Mpumelelo Foundation',
    location: 'Pretoria',
    projectSummary: 'Donation collection website for online contributions.',
    projectUrl: 'https://mpumelelo.vercel.app',
  },
  {
    id: 'western-cape-labs',
    homepageOrder: 8,
    quote:
      'We collaborated with Qwabi Engineering on the development of a case management system. Their technical contribution and product development support added strong value to the project.',
    name: 'Mike Jones',
    role: 'Managing Director',
    organization: 'Western Cape Labs',
    location: 'Cape Town',
    projectSummary: 'Case management system (Case Pro) built in collaboration.',
    projectUrl: 'https://mlab.co.za/',
    imageSrc: '/images/mike_jones.avif',
    imageAlt: 'Portrait of Mike Jones',
  },
  {
    id: 'clinicplus',
    homepageOrder: 9,
    quote:
      'Qwabi Engineering developed a custom occupational health management system aligned with the operational requirements of our practice.',
    name: 'Dr. Bertha van der Spuy-Lombaard',
    role: 'MD and Occupational Health Specialist',
    organization: 'ClinicPlus',
    location: 'Witbank',
    projectSummary: 'Occupational health management and bookings for mining teams.',
    projectUrl: 'https://www.clinicpluswtb.co.za/',
    imageSrc: '/images/spuy.avif',
    imageAlt: 'Portrait of Dr. Bertha van der Spuy-Lombaard',
  },
];

/** Homepage grid: priority clients first, then remainder. */
export const HOMEPAGE_TESTIMONIALS = [...CLIENT_TESTIMONIALS].sort(
  (a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99),
);
