import { HERO_IMAGES as MARKETING_HERO_IMAGES, TEAM_IMAGES } from './marketing-images';

/** Default hero imagery by route path (team photos + local heroes under /public). */
export const HERO_IMAGES = {
  appCost: MARKETING_HERO_IMAGES.costGuide,
  mvpDeveloper: MARKETING_HERO_IMAGES.mvpDeveloper,
  chooseDeveloper: MARKETING_HERO_IMAGES.mvpDeveloper,
  customSoftware: MARKETING_HERO_IMAGES.customSoftware,
  servicesHub: MARKETING_HERO_IMAGES.services,
  ayabongaDesk: MARKETING_HERO_IMAGES.technicalCofounder,
  mobileApp: MARKETING_HERO_IMAGES.mobileApp,
} as const;

const serviceHeroByPath: Record<string, string> = {
  '/mobile-app-development-south-africa': HERO_IMAGES.mobileApp,
  '/custom-software-development-south-africa': HERO_IMAGES.customSoftware,
  '/web-development-company-south-africa': HERO_IMAGES.servicesHub,
  '/web-development-south-africa': HERO_IMAGES.servicesHub,
  '/software-developers-south-africa': HERO_IMAGES.servicesHub,
  '/software-development-companies-south-africa': HERO_IMAGES.servicesHub,
  '/ai-ready-bespoke-software': HERO_IMAGES.customSoftware,
  '/digital-transformation-south-africa': HERO_IMAGES.customSoftware,
  '/bespoke-crm-systems-south-africa': HERO_IMAGES.customSoftware,
  '/ai-system-integration-south-africa': HERO_IMAGES.customSoftware,
  '/ai-software-development-company': HERO_IMAGES.mvpDeveloper,
  '/bespoke-ai-solutions': HERO_IMAGES.mvpDeveloper,
  '/ai-agent-development-south-africa': HERO_IMAGES.mvpDeveloper,
  '/services/ai-powered-rapid-app-development': TEAM_IMAGES.teamArchitecture,
};

export function heroImageForServicePath(path: string, override?: string): string {
  if (override) return override;
  return serviceHeroByPath[path] ?? HERO_IMAGES.servicesHub;
}

export function heroImageForBuyerIntentPath(
  path: string,
  override?: string,
): string {
  if (override) return override;
  const buyerHeroByPath: Record<string, string> = {
    '/mvp-developer-south-africa': HERO_IMAGES.mvpDeveloper,
    '/best-app-developers-south-africa': HERO_IMAGES.chooseDeveloper,
    '/custom-software-development-south-africa': HERO_IMAGES.customSoftware,
  };
  return buyerHeroByPath[path] ?? HERO_IMAGES.appCost;
}
