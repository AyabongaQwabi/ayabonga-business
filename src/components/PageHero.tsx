import type { ReactNode } from 'react';
import { HeroImageFrame } from './HeroImageFrame';

/** Wrap hero primary/secondary actions so labels stay on one line. */
export const HERO_CTA_ROW_CLASS =
  'flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full [&_a]:inline-flex [&_a]:items-center [&_a]:justify-center [&_a]:gap-2 [&_a]:whitespace-nowrap [&_a]:min-h-11 [&_a]:w-full sm:[&_a]:w-auto sm:[&_a]:shrink-0';

export type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle: string;
  imageSrc?: string;
  imageAlt?: string;
  children?: ReactNode;
  className?: string;
};

/**
 * Marketing hero: navy background, gold eyebrow, optional image column on desktop.
 * When an image is present, CTAs render in a full-width row below copy and image.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  children,
  className = '',
}: PageHeroProps) {
  const hasImage = Boolean(imageSrc);

  return (
    <header
      className={`relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-[#0A192F] via-background to-secondary/80 ${className}`}
    >
      <div
        className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl motion-reduce:blur-none"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-primary/5 blur-3xl motion-reduce:blur-none"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden
      />

      <div
        className={`grid gap-8 p-6 md:p-10 ${
          hasImage ? 'lg:grid-cols-2 lg:gap-x-12 lg:gap-y-8 lg:items-center' : ''
        }`}
      >
        <div className={`relative z-10 ${hasImage ? 'min-w-0' : 'max-w-3xl'}`}>
          {eyebrow ? (
            <p className="section-label mb-4">{eyebrow}</p>
          ) : null}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
            {title}
          </h1>
          <p
            className={`mt-5 text-lg text-muted-foreground leading-relaxed ${
              hasImage ? 'max-w-xl' : 'max-w-2xl'
            }`}
          >
            {subtitle}
          </p>
          {!hasImage && children ? (
            <div className={`mt-8 ${HERO_CTA_ROW_CLASS}`}>{children}</div>
          ) : null}
        </div>

        {hasImage && imageSrc ? (
          <div className="relative group w-full max-w-lg mx-auto lg:mx-0 lg:justify-self-end min-w-0">
            <div
              className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/40 via-primary/10 to-transparent blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-300 motion-reduce:transition-none motion-reduce:blur-none"
              aria-hidden
            />
            <HeroImageFrame
              src={imageSrc}
              alt={imageAlt ?? ''}
              aspect="3/2"
              priority
              frameClassName="rounded-2xl border border-primary/20 shadow-2xl shadow-black/40"
            />
          </div>
        ) : null}

        {hasImage && children ? (
          <div className="lg:col-span-2 pt-6 border-t border-primary/10" aria-label="Page actions">
            <div className={HERO_CTA_ROW_CLASS}>{children}</div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
