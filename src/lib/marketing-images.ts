/** Shared marketing imagery (team photos, local heroes, Pexels fallbacks). */

export const BUSINESS_HERO_PEXELS =
  'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600';

export const AUTHOR_HEADSHOT =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/634131924_4362348684012184_2809328754212142225_n%20%281%29-n9dEY5Noh5Y0nxfTCK3TwAMABTs8KG.jpg';

/** Real team photography under /public/team — use instead of Pexels on heroes. */
export const TEAM_IMAGES = {
  teamGroupHoodies: '/team/team8.png',
  teamTableSelfie: '/team/team3.png',
  teamArchitecture: '/team/team5.png',
  teamOffice: '/team/team0.jpg',
  teamCollaboration: '/team/team2.png',
  teamDesk: '/team/team10.png',
} as const;

/** Curated team shots for homepage showcase — crop + caption tuned per image. */
export type TeamShowcaseSlide = {
  src: string;
  alt: string;
  caption: string;
  objectPosition: string;
  featured?: boolean;
};

export const TEAM_SHOWCASE_SLIDES: TeamShowcaseSlide[] = [
  {
    src: TEAM_IMAGES.teamGroupHoodies,
    alt: 'Qwabi Engineering team in branded hoodies at the Queenstown studio',
    caption: 'Queenstown studio',
    objectPosition: 'center 30%',
    featured: true,
  },
  {
    src: TEAM_IMAGES.teamArchitecture,
    alt: 'Senior engineer sketching system architecture on a whiteboard',
    caption: 'Architecture first',
    objectPosition: 'center 20%',
  },
  {
    src: TEAM_IMAGES.teamTableSelfie,
    alt: 'Team planning session around the studio table',
    caption: 'Senior-led delivery',
    objectPosition: 'center center',
  },
];

/** @deprecated Use TEAM_SHOWCASE_SLIDES */
export const TEAM_HERO_IMAGES = TEAM_SHOWCASE_SLIDES.map((slide) => slide.src);

export const HERO_IMAGES = {
  /** Primary marketing hero — team in branded hoodies, not stock */
  businessHome: TEAM_IMAGES.teamGroupHoodies,
  costGuide: '/images/heroes/app-development-cost.jpg',
  services: TEAM_IMAGES.teamArchitecture,
  technicalCofounder: TEAM_IMAGES.teamCollaboration,
  mvpDeveloper: TEAM_IMAGES.teamDesk,
  customSoftware: '/images/heroes/custom-software.jpg',
  mobileApp: '/images/heroes/mobile-app.jpg',
} as const;

/**
 * Product screenshots to source for service/industry heroes.
 * Do not replace with placeholders — add files under /public/images when ready.
 */
export const HERO_SCREENSHOTS_NEEDED = [
  {
    id: 'utap',
    label: 'uTap campus wallet',
    suggestedPath: '/images/utap-screenshot.png',
    status: 'available' as const,
  },
  {
    id: 'fundibot',
    label: 'Fundibot bursary matcher dashboard',
    suggestedPath: '/images/heroes/fundibot-screenshot.png',
    status: 'needed' as const,
  },
  {
    id: 'ilithiyana',
    label: 'Ilithiyana Academics enrolment portal',
    suggestedPath: '/ilithiyana-case-study/1.png',
    status: 'available' as const,
  },
] as const;

/** Self-hosted undraw illustrations (see scripts/download-service-illustrations.mjs) */
export const SERVICE_ILLUSTRATIONS = {
  mobile: '/images/services/mobile.svg',
  web: '/images/services/web.svg',
  business: '/images/services/business.svg',
  ecommerce: '/images/services/ecommerce.svg',
  ai: '/images/services/ai.svg',
  bespoke: '/images/services/bespoke.svg',
} as const;

export const PROJECT_THUMBNAILS: Record<string, string> = {
  'Laundry Marketplace': '/images/saas.webp',
  ClinicPlus: '/images/clinicplus.jpg',
  UTap: '/images/projects/utap.jpg',
  'Queens Connect': '/images/projects/queens-connect.jpg',
};

export function faviconForUrl(url: string, size = 128): string {
  try {
    const host = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${host}&sz=${size}`;
  } catch {
    return '';
  }
}

export function projectThumbnail(title: string, siteUrl: string): string {
  return PROJECT_THUMBNAILS[title] ?? faviconForUrl(siteUrl);
}
