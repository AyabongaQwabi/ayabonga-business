/** Shared marketing imagery (Pexels + author assets). */

export const BUSINESS_HERO_PEXELS =
  'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600';

export const AUTHOR_HEADSHOT =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/634131924_4362348684012184_2809328754212142225_n%20%281%29-n9dEY5Noh5Y0nxfTCK3TwAMABTs8KG.jpg';

export const HERO_IMAGES = {
  businessHome:
    '/images/heroes/business-home.jpg',
  costGuide:
    '/images/heroes/app-development-cost.jpg',
  services:
    '/images/heroes/services.jpg',
  technicalCofounder:
    '/images/heroes/technical-cofounder.jpg',
  mvpDeveloper:
    '/images/heroes/mvp-developer.jpg',
  customSoftware:
    '/images/heroes/custom-software.jpg',
  mobileApp:
    '/images/heroes/mobile-app.jpg',
} as const;

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
  'Laundry Marketplace': '/images/projects/laundry-marketplace.jpg',
  ClinicPlus: '/images/projects/clinicplus.jpg',
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
