/**
 * Full project catalog for /projects and homepage work section.
 * `visibility: internal` entries are excluded from public pages.
 */

export type ProjectCatalogStatus =
  | 'live'
  | 'shipped-inactive'
  | 'in-progress'
  | 'white-label'
  | 'discontinued'
  | 'partner-cancelled'
  | 'built-unpaid';

export type ProjectVisibility = 'public' | 'internal';

export type ProjectCatalogLink = {
  label: string;
  url: string;
};

export type ProjectCatalogEntry = {
  id: string;
  title: string;
  url: string;
  status: ProjectCatalogStatus;
  visibility: ProjectVisibility;
  category: string;
  description: string;
  tech?: string[];
  relatedLinks?: ProjectCatalogLink[];
  /** Show on homepage #work grid */
  homepageFeatured?: boolean;
  homepageOrder?: number;
  imageUrl?: string;
  imageAlt?: string;
};

export const PROJECT_STATUS_LABELS: Record<ProjectCatalogStatus, string> = {
  live: 'Live',
  'shipped-inactive': 'Shipped · paused',
  'in-progress': 'In progress',
  'white-label': 'White-label SaaS',
  discontinued: 'MVP · discontinued',
  'partner-cancelled': 'Built · partnership ended',
  'built-unpaid': 'Built · unpaid',
};

export const PROJECT_CATALOG_SECTIONS: {
  status: ProjectCatalogStatus | ProjectCatalogStatus[];
  title: string;
  intro: string;
}[] = [
  {
    status: 'live',
    title: 'Live and active',
    intro:
      'Production systems in use today. Client-operated hosting and ongoing delivery where retainers apply.',
  },
  {
    status: 'in-progress',
    title: 'In progress',
    intro:
      'Active builds across client engagements and platform products. Architecture, integrations, and launch paths in flight.',
  },
  {
    status: 'white-label',
    title: 'White-label SaaS',
    intro:
      'Multi-app laundry marketplace stack delivered for agency partners. Sales, admin, and partner surfaces.',
  },
  {
    status: 'shipped-inactive',
    title: 'Shipped · paused by client',
    intro:
      'Launched systems we engineered. Some are idle due to client hosting, budget, or operational choices. Work remains credible shipped proof.',
  },
  {
    status: 'discontinued',
    title: 'Technical co-founder MVPs',
    intro:
      'Validation-stage builds where groundwork was completed and the venture path ended after learning.',
  },
  {
    status: 'partner-cancelled',
    title: 'Partnership-ended builds',
    intro: 'Software delivered successfully; the commercial partnership concluded.',
  },
];

const SCREENSHOTS = '/images/screenshots';

export const PROJECT_CATALOG: ProjectCatalogEntry[] = [
  // —— Live / active ——
  {
    id: 'fundibot',
    title: 'Fundibot',
    url: 'https://fundibot.qwabi.co.za',
    status: 'in-progress',
    visibility: 'public',
    category: 'Education technology',
    description:
      'Free platform for South African matriculants. Course finder, APS checker, bursary matcher, salary predictor, and personalised career timeline. 23+ prospectuses scraped. 75+ institutions. No login required.',
    tech: ['React', 'TypeScript', 'Python', 'Supabase', 'Vercel'],
    homepageFeatured: false,
  },
  {
    id: 'clinicplus',
    title: 'ClinicPlus',
    url: 'https://clinicplusbookings.co.za/',
    status: 'live',
    visibility: 'public',
    category: 'Occupational health',
    description:
      'Occupational health bookings and practice management for mining and construction teams in Witbank and Mpumalanga.',
    tech: ['React', 'Node.js', 'MongoDB'],
    homepageFeatured: true,
    homepageOrder: 3,
    imageUrl: `${SCREENSHOTS}/clinicplus-clients.png`,
    imageAlt: 'ClinicPlus booking application',
  },
  {
    id: 'warner-music-africa',
    title: 'Warner Music Africa · Culture Shifters',
    url: 'https://www.warnermusicafrica.com/',
    status: 'live',
    visibility: 'public',
    category: 'Music · operations',
    description: 'Participant management for the Warner Culture Shifters competition across regions.',
    tech: ['Web platform', 'Operations'],
    homepageFeatured: true,
    homepageOrder: 2,
  },
  {
    id: 'future-start',
    title: 'Future Start',
    url: 'https://futurestart.co.za/',
    status: 'live',
    visibility: 'public',
    category: 'Student services',
    description:
      'Student accommodation requests and digital book sales for South African tertiary learners.',
    tech: ['Web', 'Commerce'],
    homepageFeatured: true,
    homepageOrder: 1,
    imageUrl: `${SCREENSHOTS}/futurestart.png`,
    imageAlt: 'Future Start website',
  },
  {
    id: 'lungi-the-strategist',
    title: 'Lungi The Strategist',
    url: 'https://lungithestrategist.co.za/',
    status: 'live',
    visibility: 'public',
    category: 'Ecommerce',
    description: 'Branded ecommerce platform for strategy and retail offerings.',
    tech: ['Ecommerce', 'Web'],
    homepageFeatured: true,
    homepageOrder: 6,
  },
  {
    id: 'an-consulting',
    title: 'AN Consulting',
    url: 'https://www.anconsulting.co.za/',
    status: 'live',
    visibility: 'public',
    category: 'Financial operations',
    description: 'Custom financial records management for internal consulting workflows.',
    tech: ['Web app', 'Records'],
    homepageFeatured: true,
    homepageOrder: 7,
  },
  {
    id: 'ilithiyana',
    title: 'Ilithiyana',
    url: 'https://ilithiyana.co.za/',
    status: 'live',
    visibility: 'public',
    category: 'Bookings · CRM',
    description: 'Bookings and CRM for client operations and visibility.',
    tech: ['CRM', 'Scheduling'],
    homepageFeatured: true,
    homepageOrder: 4,
  },
  {
    id: 'namoota-tech',
    title: 'Namoota Technologies',
    url: 'https://www.namootatech.com/',
    status: 'live',
    visibility: 'public',
    category: 'Agency · systems',
    description: 'Corporate web presence and systems delivery for the Namoota agency brand.',
    tech: ['Web'],
  },
  {
    id: 'estudio-glam',
    title: 'eStudio Glam',
    url: 'https://www.estudioglam.co.za/',
    status: 'live',
    visibility: 'public',
    category: 'Edutech',
    description: 'Educational platform for hairstylist training and online learning.',
    tech: ['Edutech', 'Web'],
    homepageFeatured: true,
    homepageOrder: 5,
  },
  {
    id: 'western-cape-labs-case-pro',
    title: 'Case Pro · Western Cape Labs',
    url: 'https://mlab.co.za/',
    status: 'live',
    visibility: 'public',
    category: 'Case management',
    description:
      'Case management system built in collaboration with Western Cape Labs for operational workflows.',
    tech: ['Web', 'Operations'],
    homepageFeatured: true,
    homepageOrder: 9,
  },
  {
    id: 'mzeke',
    title: 'Mzeke',
    url: 'https://mzeke.vercel.app/',
    status: 'live',
    visibility: 'public',
    category: 'Client platform',
    description: 'Custom business web platform (Mzeke).',
    tech: ['Web'],
  },
  {
    id: 'sa-tech',
    title: 'SA Tech',
    url: 'https://satech.vercel.app/',
    status: 'live',
    visibility: 'public',
    category: 'Client platform',
    description: 'Custom software delivery for SA Tech.',
    tech: ['Web'],
  },
  {
    id: 'laundry-marketplace',
    title: 'Laundry Marketplace',
    url: 'https://laundry.qwabi.co.za/',
    status: 'live',
    visibility: 'public',
    category: 'Marketplace',
    description:
      'Turnkey laundry marketplace with admin, partner, driver, and customer surfaces.',
    tech: ['Next.js', 'Marketplace'],
    imageUrl: `${SCREENSHOTS}/laundry-marketplace-admin.png`,
    imageAlt: 'Laundry marketplace admin',
  },
  {
    id: 'queens-connect',
    title: 'Queens Connect',
    url: 'https://queensconnect.qwabi.co.za/',
    status: 'live',
    visibility: 'public',
    category: 'AI · community',
    description: 'Community AI assistant for Queenstown local information.',
    tech: ['Next.js', 'OpenAI'],
    imageUrl: `${SCREENSHOTS}/queensconnect.png`,
    imageAlt: 'Queens Connect',
  },
  {
    id: 'kingly',
    title: 'Kingly',
    url: 'https://kingly.qwabi.co.za/',
    status: 'live',
    visibility: 'public',
    category: 'Developer tools',
    description: 'Documentation-first vibe coding prompts for developer workflows.',
    tech: ['React', 'TypeScript'],
    imageUrl: `${SCREENSHOTS}/kingly.png`,
    imageAlt: 'Kingly',
  },

  {
    id: 'dj-ntsira',
    title: 'DJ Ntsira',
    url: 'https://djntsira.qwabi.co.za',
    status: 'live',
    visibility: 'public',
    category: 'Music · artist platform',
    description:
      'Artist platform for Gqom DJ Ntsira from Queenstown. Music store with Yoco payments and MP3 delivery, gig booking with transport fee logic, deposit rules, and anti-double-booking. Bilingual isiXhosa and English.',
    tech: ['React', 'Vite', 'TypeScript', 'Supabase', 'Yoco', 'Resend', 'Vercel'],
    homepageFeatured: true,
    homepageOrder: 10,
  },

  // —— In progress (client) ——
  {
    id: 'mygradzaka',
    title: 'My Grad Zaka',
    url: 'https://mygradzaka-web.vercel.app/',
    status: 'in-progress',
    visibility: 'public',
    category: 'Fintech · savings',
    description:
      'Milestone savings with vault discipline, sponsor links, and compliance-minded architecture on Supabase.',
    tech: ['React Native', 'Supabase'],
    imageUrl: `${SCREENSHOTS}/mygradzaka.png`,
    imageAlt: 'My Grad Zaka',
  },

  // —— In progress (technical co-founder / platforms) ——
  {
    id: 'utap',
    title: 'uTap',
    url: 'https://utaptech.co.za/',
    status: 'in-progress',
    visibility: 'public',
    category: 'Campus wallet · SaaS',
    description:
      'Campus NFC wallet, vendor ordering, and admin analytics. Student app, vendor portal, and admin console.',
    tech: ['React Native', 'Supabase'],
    imageUrl: `${SCREENSHOTS}/utapadmin.png`,
    imageAlt: 'uTap admin',
    relatedLinks: [
      { label: 'Vendor portal', url: 'https://vendors.utaptech.co.za/' },
      { label: 'Admin', url: 'http://admin.utaptech.co.za/' },
    ],
  },
  {
    id: 'trip',
    title: 'Trip (Taxi Assist)',
    url: 'https://trip.qwabi.co.za/',
    status: 'in-progress',
    visibility: 'public',
    category: 'Ride-hailing',
    description:
      'Compliance-first ride-hailing with driver onboarding, wallets, and ops tooling for pilot corridors.',
    tech: ['Flutter', 'Supabase', 'React'],
    imageUrl: `${SCREENSHOTS}/trip-website.png`,
    imageAlt: 'Trip marketing site',
    relatedLinks: [
      { label: 'Trip admin', url: 'https://tripadmin.qwabi.co.za/' },
      { label: 'Trip Media', url: 'https://media.qwabi.co.za/' },
    ],
  },

  // —— White-label ——
  {
    id: 'tecla-sales',
    title: 'Tecla Laundry · Sales',
    url: 'https://tecla-laundry-sales.vercel.app/',
    status: 'white-label',
    visibility: 'public',
    category: 'White-label · laundry',
    description: 'Customer-facing sales surface for agency white-label laundry marketplace.',
    tech: ['Next.js', 'Marketplace'],
  },
  {
    id: 'tecla-admin',
    title: 'Tecla Laundry · Admin',
    url: 'https://tecla-laundry-admin.vercel.app/',
    status: 'white-label',
    visibility: 'public',
    category: 'White-label · laundry',
    description: 'Operations admin for multi-tenant laundry partners.',
    tech: ['Next.js', 'Admin'],
  },
  {
    id: 'tecla-partners',
    title: 'Tecla Laundry · Partners',
    url: 'https://tecla-laundry-partners.vercel.app/',
    status: 'white-label',
    visibility: 'public',
    category: 'White-label · laundry',
    description: 'Partner portal for laundry providers on the white-label stack.',
    tech: ['Next.js', 'Partners'],
  },

  // —— Shipped · inactive ——
  {
    id: 'espazza',
    title: 'eSpazza (Xhosa Hip Hop)',
    url: 'https://xhosahiphop.netlify.app/',
    status: 'shipped-inactive',
    visibility: 'public',
    category: 'Media · streaming',
    description:
      'Xhosa hip hop streaming and blogging. Shipped; client hosting and operations paused.',
    tech: ['React', 'Express', 'MongoDB'],
    imageUrl: `${SCREENSHOTS}/espazza.png`,
    imageAlt: 'eSpazza',
  },
  {
    id: 'nmtplay',
    title: 'NMT Play',
    url: 'https://nmtplay.netlify.app/',
    status: 'shipped-inactive',
    visibility: 'public',
    category: 'Media',
    description: 'Media playback experience. Launched; inactive on client side.',
    tech: ['Web'],
  },
  {
    id: 'umicandles',
    title: 'Umi Candles',
    url: 'https://umicandles.vercel.app/',
    status: 'shipped-inactive',
    visibility: 'public',
    category: 'Ecommerce',
    description: 'Ecommerce storefront. Built and handed over; client operations paused.',
    tech: ['Web', 'Commerce'],
  },
  {
    id: 'ubuntuafrican',
    title: 'Ubuntu African',
    url: 'https://ubuntuafrican.vercel.app/',
    status: 'shipped-inactive',
    visibility: 'public',
    category: 'Brand · web',
    description: 'Brand and content site. Shipped; hosting maintained by client intermittently.',
    tech: ['Web'],
  },
  {
    id: 'mpumelelo',
    title: 'Mpumelelo Foundation',
    url: 'https://mpumelelo.vercel.app/',
    status: 'shipped-inactive',
    visibility: 'public',
    category: 'Non-profit',
    description: 'Donation collection website for the foundation. Live path may move to custom domain.',
    tech: ['Web', 'Donations'],
    homepageFeatured: true,
    homepageOrder: 8,
  },
  {
    id: 'zach-repairs',
    title: 'Zach Repairs',
    url: 'https://v0-zach-repairs.vercel.app/',
    status: 'shipped-inactive',
    visibility: 'public',
    category: 'Local services',
    description: 'Service business web presence. Delivered; client-side hosting constraints.',
    tech: ['Web'],
  },
  {
    id: 'dollup-vendor',
    title: 'Dollup Vendor',
    url: 'https://dollup-vendor.vercel.app/',
    status: 'shipped-inactive',
    visibility: 'public',
    category: 'Vendor portal',
    description: 'Vendor-side commerce tooling. Shipped; operational pause on client budget.',
    tech: ['Web', 'Vendor'],
  },
  {
    id: 'siavista',
    title: 'Siavista',
    url: 'https://siavista.vercel.app/',
    status: 'shipped-inactive',
    visibility: 'public',
    category: 'Client platform',
    description: 'Custom platform build for Siavista. Inactive due to client operational constraints.',
    tech: ['Web'],
  },
  {
    id: 'xhapp',
    title: 'XHapp',
    url: 'https://xhapp.vercel.app/',
    status: 'shipped-inactive',
    visibility: 'public',
    category: 'Consumer app',
    description: 'Consumer-facing web app. Launched; paused on client hosting and spend.',
    tech: ['Web'],
  },

  // —— Discontinued co-founder ——
  {
    id: 'helpem',
    title: 'Help EM System',
    url: 'https://helpemsystem.vercel.app/',
    status: 'discontinued',
    visibility: 'public',
    category: 'Health MVP',
    description:
      'Technical co-founder MVP for emergency health workflows. Discontinued after validation.',
    tech: ['Web MVP'],
  },
  {
    id: 'molemeno',
    title: 'Molemeno',
    url: 'https://v0-molemeno-wesbite.vercel.app/',
    status: 'discontinued',
    visibility: 'public',
    category: 'Venture MVP',
    description: 'Early venture site and MVP groundwork. Path discontinued post-validation.',
    tech: ['Web MVP'],
  },

  // —— Partner cancelled ——
  {
    id: 'music-loopy-ui',
    title: 'Music Loopy UI',
    url: 'https://www.npmjs.com/package/music-loopy-ui',
    status: 'partner-cancelled',
    visibility: 'public',
    category: 'Open source · UI',
    description: 'Published UI package from a ended partnership. Code remains available on npm.',
    tech: ['npm', 'React'],
  },
  {
    id: 'music-loopy-landing',
    title: 'Music Loopy',
    url: 'https://music-loopy-landing-page.vercel.app/',
    status: 'partner-cancelled',
    visibility: 'public',
    category: 'Product landing',
    description: 'Landing and product surfaces built before the partnership concluded.',
    tech: ['Web'],
  },

  // —— Internal only (built unpaid) ——
  {
    id: 'leaders-excellency',
    title: 'Leaders of Excellency Solutions',
    url: 'https://leaders-of-exccelency-solutions.vercel.app/',
    status: 'built-unpaid',
    visibility: 'internal',
    category: 'Internal reference',
    description: 'Built delivery; unpaid. Not shown on public marketing surfaces.',
    tech: ['Web'],
  },
  {
    id: 'agoate-bumbs',
    title: 'Agoate Bumbs',
    url: 'https://v0-agoate-bumbs.vercel.app/',
    status: 'built-unpaid',
    visibility: 'internal',
    category: 'Internal reference',
    description: 'Built delivery; unpaid. Internal reference only.',
    tech: ['Web'],
  },
];

export function getPublicProjects(): ProjectCatalogEntry[] {
  return PROJECT_CATALOG.filter((p) => p.visibility === 'public');
}

export function getProjectsByStatus(
  status: ProjectCatalogStatus | ProjectCatalogStatus[],
): ProjectCatalogEntry[] {
  const statuses = Array.isArray(status) ? status : [status];
  return getPublicProjects().filter((p) => statuses.includes(p.status));
}

export function getHomepageWorkProjects(): ProjectCatalogEntry[] {
  return getPublicProjects()
    .filter((p) => p.homepageFeatured)
    .sort((a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99));
}
