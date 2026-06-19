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
    id: 'clinicplus',
    homepageOrder: 1,
    quote:
      "Occupational health records have strict requirements — accuracy, structure, accessibility. The system they built handles all of that cleanly. Our admin load has dropped significantly and the compliance side is much easier to manage now.",
    name: 'Dr. Bertha van der Spuy-Lombaard',
    role: 'MD and Occupational Health Specialist',
    organization: 'ClinicPlus',
    location: 'Witbank',
    projectSummary: 'Occupational health management and bookings for mining teams.',
    projectUrl: 'https://www.clinicpluswtb.co.za/',
    imageSrc: '/images/spuy.avif',
    imageAlt: 'Portrait of Dr. Bertha van der Spuy-Lombaard',
  },
  {
    id: 'ilithiyana',
    homepageOrder: 2,
    quote:
      "Before this we were managing bookings manually — WhatsApp messages, spreadsheets, the works. The CRM system changed that completely. Everything's in one place now and my team actually uses it, which is the real test.",
    name: 'Masande Dudula',
    role: 'Director',
    organization: 'Ilithiyana',
    location: 'Mthatha',
    projectSummary: 'Bookings and CRM system for day-to-day client operations.',
    projectUrl: 'https://ilithiyana.co.za',
    imageSrc: '/Masande.avif',
    imageAlt: 'Portrait of Masande Dudula',
  },
  {
    id: 'lungi-the-strategist',
    homepageOrder: 3,
    quote:
      "I needed an ecommerce setup that felt like me — not a generic template. The process was collaborative and they were thorough about the details. Clients have commented on how easy it is to navigate and buy, which tells me it worked.",
    name: 'Lungi Ntuli',
    role: 'Director',
    organization: 'Lungi The Strategist',
    location: 'Durban',
    projectSummary: 'Ecommerce platform aligned to brand and commercial requirements.',
    projectUrl: 'https://lungithestrategist.com',
    imageSrc: '/lungi-portrait.jpeg',
    imageAlt: 'Portrait of Lungi Ntuli',
  },
  {
    id: 'estudio-glam',
    homepageOrder: 4,
    quote:
      "I had a very clear vision for what the platform needed to be — an actual learning experience for hairstylists, not just a website with videos on it. They got that. The build matched the vision and our students have been able to engage with it in the way I hoped. Big one for us 🙌",
    name: 'Lwandy Ngebe',
    role: 'Founder',
    organization: 'eStudio Glam',
    location: 'East London',
    projectSummary: 'Edutech platform for hairstylist training and online learning.',
    projectUrl: 'https://www.estudioglam.co.za',
    imageSrc: '/lwandy-ngebe-founder.jpg',
    imageAlt: 'Portrait of Lwandy Ngebe',
  },
  {
    id: 'western-cape-labs',
    homepageOrder: 5,
    quote:
      'We brought Ayabonga in on Case Pro at a point where we needed solid engineering support. He came up to speed fast, added real value to the product architecture, and worked well with the team. Would collaborate again without hesitation.',
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
    id: 'future-start',
    homepageOrder: 6,
    quote:
      "Honestly didn't know what to expect going in — we had a tight scope and a product that needed to work for students in a very specific way. They figured it out quickly and kept us in the loop the whole time. The accommodation system and the book store both launched without drama.",
    name: 'Ntokozo Mthethwa',
    role: 'Director',
    organization: 'Future Start',
    location: 'Johannesburg',
    projectSummary:
      'Student accommodation request system with digital book sales for tertiary learners.',
    projectUrl: 'https://futurestart.co.za',
  },
  {
    id: 'warner-music-africa',
    homepageOrder: 7,
    quote:
      'The Culture Shifters competition runs across multiple countries and we needed a system that could handle participant data at scale without things falling apart. It held up well and made the operational side of the competition far easier to manage than previous years.',
    name: 'Temi Adeniji',
    role: 'Managing Director',
    organization: 'Warner Music Africa',
    location: 'Nigeria',
    projectSummary: 'Participant management system for the Warner Culture Shifters competition.',
    projectUrl: 'https://www.warnermusicafrica.com/',
    imageSrc: '/images/temii.jpeg',
    imageAlt: 'Portrait of Temi Adeniji',
  },
  {
    id: 'an-consulting',
    homepageOrder: 8,
    quote:
      "We needed something custom — the off-the-shelf options just didn't fit how we manage financial records internally. What impressed me most was that they actually understood the operational side, not just the technical. The system works the way our team thinks.",
    name: 'Axolile Ntshongwana',
    role: 'CFO',
    organization: 'AN Consulting',
    location: 'Johannesburg',
    projectSummary: 'Financial records management system for internal operations.',
    projectUrl: 'https://www.anconsulting.co.za',
    imageSrc: '/axolile.jpg',
    imageAlt: 'Portrait of Axolile Ntshongwana',
  },
  {
    id: 'mpumelelo-foundation',
    homepageOrder: 9,
    quote:
      "For a non-profit, every rand counts and every process matters. We needed a platform that made it easy for people to contribute online — something simple but credible. It came together well and it's been doing exactly what we needed it to do.",
    name: 'Nomsa Mbatha',
    role: 'Founder and Executive Director',
    organization: 'Mpumelelo Foundation',
    location: 'Pretoria',
    projectSummary: 'Donation collection website for online contributions.',
    projectUrl: 'https://mpumelelo.vercel.app',
  },
];

/** Homepage grid: priority clients first, then remainder. */
export const HOMEPAGE_TESTIMONIALS = [...CLIENT_TESTIMONIALS].sort(
  (a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99),
);