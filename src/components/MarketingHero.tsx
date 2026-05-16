import type { ReactNode } from 'react';
import { BUSINESS_HERO_PEXELS, HERO_IMAGES } from '../lib/marketing-images';
import { HeroImageFrame } from './HeroImageFrame';

export const BUSINESS_HERO_LOCAL = HERO_IMAGES.businessHome;
export { BUSINESS_HERO_PEXELS };

const heroShellClass =
  'relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-[#0A192F] via-background to-secondary/80';

function HeroShellDecorations() {
  return (
    <>
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
    </>
  );
}

export type MarketingHeroLayout = 'image-right' | 'background';

export interface MarketingHeroProps {
  layout?: MarketingHeroLayout;
  showImage?: boolean;
  imageSrc?: string;
  imageFallbackSrc?: string;
  imageAlt?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  proofPoints?: ReactNode;
  className?: string;
}

export function MarketingHero({
  layout = 'image-right',
  showImage = true,
  imageSrc = BUSINESS_HERO_LOCAL,
  imageFallbackSrc = BUSINESS_HERO_PEXELS,
  imageAlt = '',
  eyebrow,
  title,
  description,
  children,
  proofPoints,
  className = '',
}: MarketingHeroProps) {
  if (!showImage) {
    return (
      <section className={`pt-28 pb-16 md:pt-36 md:pb-20 ${className}`}>
        <header className={heroShellClass}>
          <HeroShellDecorations />
          <div className="relative z-10 p-6 md:p-10 max-w-3xl">
            {eyebrow ? <div className="mb-4">{eyebrow}</div> : null}
            <div>{title}</div>
            <div className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {description}
            </div>
            {proofPoints ? <div className="mt-8">{proofPoints}</div> : null}
            {children ? (
              <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3">{children}</div>
            ) : null}
          </div>
        </header>
      </section>
    );
  }

  if (layout === 'background') {
    return (
      <section
        className={`relative overflow-hidden rounded-3xl border border-border min-h-[420px] md:min-h-[480px] ${className}`}
      >
        <div className="absolute inset-0" aria-hidden>
          <HeroImageFrame
            src={imageSrc}
            fallbackSrc={imageFallbackSrc}
            alt={imageAlt}
            decorative
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F]/95 via-[#0A192F]/88 to-[#0A192F]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        </div>

        <div className="relative z-10 px-6 py-14 md:px-10 md:py-20 max-w-3xl">
          {eyebrow}
          <div className="mt-4">{title}</div>
          <div className="mt-6">{description}</div>
          {proofPoints ? <div className="mt-8">{proofPoints}</div> : null}
          {children ? <div className="mt-10 flex flex-wrap gap-3">{children}</div> : null}
        </div>
      </section>
    );
  }

  return (
    <section className={`pt-28 pb-16 md:pt-36 md:pb-20 ${className}`}>
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div>
          {eyebrow}
          <div className="mt-4">{title}</div>
          <div className="mt-6">{description}</div>
          {proofPoints ? <div className="mt-8">{proofPoints}</div> : null}
          {children ? (
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3">{children}</div>
          ) : null}
        </div>

        <div className="relative group motion-reduce:transform-none">
          <div
            className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/40 to-accent/40 blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 motion-reduce:transition-none motion-reduce:opacity-30"
            aria-hidden
          />
          <HeroImageFrame
            src={imageSrc}
            fallbackSrc={imageFallbackSrc}
            alt={imageAlt}
            aspect="3/2"
            priority
            frameClassName="rounded-2xl border border-white/10 shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
