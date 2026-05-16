import { useEffect, useRef } from 'react';

export type UseScrollRevealOptions = IntersectionObserverInit & {
  once?: boolean;
};

/**
 * Adds `is-visible` when the element enters the viewport.
 * Pair with `.reveal` / `.reveal-stagger` classes in index.css.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: UseScrollRevealOptions,
) {
  const ref = useRef<T>(null);
  const { once = true, ...observerInit } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible');
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        el.classList.add('is-visible');
        if (once) io.disconnect();
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px', ...observerInit },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, observerInit.root, observerInit.rootMargin, observerInit.threshold]);

  return ref;
}
