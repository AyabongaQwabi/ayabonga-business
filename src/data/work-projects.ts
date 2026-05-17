/** Selected work cards for the business homepage. */

export type WorkProjectLink = {
  label: string;
  url: string;
};

export type WorkProject = {
  title: string;
  category: string;
  description: string;
  url: string;
  tech: string[];
  featured?: boolean;
  wip?: boolean;
  relatedLinks?: WorkProjectLink[];
};

export const WORK_PROJECTS: WorkProject[] = [
  {
    title: 'uTap',
    category: 'Campus digital wallet',
    description:
      'Campus super-app for South African students: phone-first student card access, campus vendor orders with Yoco checkout, and event tickets in one place. Student mobile app, vendor portal, and admin console in active build.',
    url: 'https://utaptech.co.za',
    tech: ['React Native', 'Expo', 'Supabase'],
    featured: true,
    wip: true,
    relatedLinks: [{ label: 'Vendor portal', url: 'https://vendors.utaptech.co.za' }],
  },
  {
    title: 'Trip (Taxi Assist)',
    category: 'Ride-hailing platform',
    description:
      'Compliance-first ride-hailing connecting verified drivers and riders. Document-heavy onboarding, wallet and card payments, in-trip ad credits, and ops tooling for pilot corridors in the Eastern Cape and Gauteng.',
    url: 'https://trip.qwabi.co.za/',
    tech: ['Flutter', 'Supabase', 'React'],
    wip: true,
    relatedLinks: [{ label: 'Trip Media', url: 'https://media.qwabi.co.za/' }],
  },
  {
    title: 'My Grad Zaka',
    category: 'Fintech & savings',
    description:
      'Milestone savings platform with locked and liquid vault discipline, sponsor contribution links, and gamification. Compliance layer targets FICA, POPIA, and AML from day one on Supabase.',
    url: 'https://mygradzaka-web.vercel.app/',
    tech: ['React Native', 'Supabase', 'TypeScript'],
    wip: true,
  },
  {
    title: 'Future Start',
    category: 'Student services',
    description:
      'Student success services for South African tertiary learners: application support, mentoring, accommodation help, and national student excellence programs including SASEA.',
    url: 'https://www.futurestart.co.za/',
    tech: ['Web', 'Student services'],
  },
  {
    title: 'ClinicPlus',
    category: 'Health & business systems',
    description:
      'Occupational health bookings for mining and construction companies in Witbank and Mpumalanga. Customer web app and admin console on MERN with Google Cloud, plus realtime coordination between clinics and sites.',
    url: 'https://clinicplusbookings.co.za/',
    tech: ['React', 'Node.js', 'MongoDB', 'GCP'],
  },
  {
    title: 'Laundry Marketplace',
    category: 'Ecommerce & marketplace',
    description:
      'Turnkey laundry marketplace with admin, partner, driver, and customer apps. Full order lifecycle from booking through pickup, processing, delivery, and payouts.',
    url: 'https://laundry.qwabi.co.za',
    tech: ['Next.js', 'Marketplace', 'Payments'],
  },
  {
    title: 'Queens Connect',
    category: 'AI & community',
    description:
      'Friendly AI companion for the Queenstown community with local information and assistance. Built as a web experience with patterns ready for WhatsApp-style outreach.',
    url: 'https://queensconnect.qwabi.co.za',
    tech: ['AI', 'Next.js', 'OpenAI'],
  },
  {
    title: 'Kingly',
    category: 'Developer tools',
    description:
      'AI tool for documentation-first vibe coding: structured prompts and project docs aimed at developer productivity in Cursor-style workflows.',
    url: 'https://kingly.qwabi.co.za',
    tech: ['AI', 'React', 'TypeScript'],
  },
  {
    title: 'eSpazza',
    category: 'Media & streaming',
    description:
      'Xhosa hip hop music streaming and blogging celebrating Eastern Cape hip hop culture. React and Express stack with MongoDB for content and playback.',
    url: 'https://xhosahiphop.co.za/',
    tech: ['React', 'Express', 'MongoDB'],
  },
];
