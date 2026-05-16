/** Default hero imagery by route path (local WebP under /public/images/heroes). */
export const HERO_IMAGES = {
  appCost: '/images/heroes/app-development-cost.jpg',
  mvpDeveloper: '/images/heroes/mvp-developer.jpg',
  chooseDeveloper: '/images/heroes/mvp-developer.jpg',
  customSoftware: '/images/heroes/custom-software.jpg',
  servicesHub: '/images/heroes/services.jpg',
  ayabongaDesk: '/images/heroes/technical-cofounder.jpg',
  mobileApp: '/images/heroes/mobile-app.jpg',
} as const;

const serviceHeroByPath: Record<string, string> = {
  '/mobile-app-development-south-africa': HERO_IMAGES.mobileApp,
  '/custom-software-development-south-africa': HERO_IMAGES.customSoftware,
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
