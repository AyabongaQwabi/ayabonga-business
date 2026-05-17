import { gsap } from 'gsap';

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Run GSAP animation only when reduced motion is off. */
export const safeAnimate = (fn: () => void): void => {
  if (!prefersReducedMotion()) fn();
};

/**
 * Staggered word entrance for hero headlines.
 * Words must use class "hero-word" inside containerEl.
 */
export const animateHeroHeadline = (containerEl: HTMLElement): void => {
  safeAnimate(() => {

    const words = containerEl.querySelectorAll<HTMLElement>('.hero-word');
    if (!words.length) return;

    gsap.fromTo(
      words,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2,
      },
    );
  });
};

/**
 * Subheadline, CTAs, and proof chips after the hero headline.
 */
export const animateHeroSupport = (elements: HTMLElement[]): void => {
  safeAnimate(() => {
    const targets = elements.filter(Boolean);
    if (!targets.length) return;

    gsap.fromTo(
      targets,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.9,
      },
    );
  });
};
