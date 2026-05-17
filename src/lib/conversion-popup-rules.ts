import { buyerIntentPaths } from '../data/buyer-intent-pages';
import { partnershipPaths } from '../data/partnership-landing-pages';
import { serviceLandingPaths } from '../data/service-landing-pages';

export type SlideInVariant = 'mvp-checklist' | 'cost-guide';

const EXCLUDED_PREFIXES = ['/admin', '/get-a-quote', '/mvp-scope-checklist'];

const EXCLUDED_EXACT = new Set(['/', '/privacy']);

const COST_GUIDE_PATHS = new Set([
  '/app-development-cost-south-africa',
  '/developers/south-africa',
  '/developers/eastern-cape',
]);

const EXIT_INTENT_PATHS = new Set([
  '/pricing-strategy',
  '/technical-cofounder',
  ...partnershipPaths,
]);

const SLIDE_IN_STATIC_PATHS = new Set([
  '/services',
  '/about',
  '/app-development-cost-south-africa',
  '/projects/espazza',
  ...buyerIntentPaths,
  ...serviceLandingPaths,
  ...partnershipPaths,
]);

export function isConversionDisabled(pathname: string): boolean {
  if (EXCLUDED_EXACT.has(pathname)) return true;
  return EXCLUDED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function isAdminRoute(pathname: string): boolean {
  return pathname === '/admin' || pathname.startsWith('/admin/');
}

export function getSlideInVariant(pathname: string): SlideInVariant | null {
  if (isConversionDisabled(pathname) || isAdminRoute(pathname)) return null;

  if (pathname.startsWith('/blog')) return 'mvp-checklist';

  if (pathname.startsWith('/developers/') || COST_GUIDE_PATHS.has(pathname)) {
    return 'cost-guide';
  }

  if (pathname.startsWith('/solutions/') || pathname.startsWith('/vs/')) {
    return 'mvp-checklist';
  }

  if (SLIDE_IN_STATIC_PATHS.has(pathname)) {
    return pathname === '/app-development-cost-south-africa' ? 'cost-guide' : 'mvp-checklist';
  }

  return null;
}

export function isExitIntentEligible(pathname: string): boolean {
  if (isConversionDisabled(pathname) || isAdminRoute(pathname)) return false;
  if (pathname.startsWith('/vs/')) return true;
  return EXIT_INTENT_PATHS.has(pathname);
}

export function isStickyBannerEligible(pathname: string): boolean {
  if (isConversionDisabled(pathname) || isAdminRoute(pathname)) return false;
  if (pathname === '/mvp-scope-checklist') return false;
  return true;
}

/** Desktop-only exit intent. */
export function isDesktopViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(min-width: 768px)').matches;
}

export const SLIDE_IN_MIN_MS_ON_PAGE = 30_000;
export const SLIDE_IN_SCROLL_RATIO = 0.5;
export const SLIDE_IN_PAGEVIEW_TRIGGER = 2;
