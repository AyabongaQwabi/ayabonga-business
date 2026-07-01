import type { ReactNode } from 'react';
import { BUSINESS_HERO_PEXELS, HERO_IMAGES } from '../lib/marketing-images';
import { HeroImageFrame } from './HeroImageFrame';
import { HeroMetricStrip } from './HeroMetricStrip';

export const BUSINESS_HERO_LOCAL = HERO_IMAGES.businessHome;
export { BUSINESS_HERO_PEXELS };

export type MarketingHeroLayout = 'image-right' | 'background' | 'statement';

export interface MarketingHeroProps {
  layout?: MarketingHeroLayout;
  showImage?: boolean;
  imageSrc?: string;
  imageFallbackSrc?: string;
  imageAlt?: string;
  /** Apply navy/gold duotone on hero photography */
  highContrastImage?: boolean;
  eyebrow?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  proofPoints?: ReactNode;
  /** Show the shared real-metric strip (7 days, R50,400, etc.) */
  showMetricStrip?: boolean;
  className?: string;
}

function MegaTitle({ children }: { children: ReactNode }) {
  return (
    <div
      className="font-display font-black text-text-primary text-balance"
      style={{
        fontSize: 'var(--type-display-hero)',
        lineHeight: 'var(--leading-display)',
        letterSpacing: '-0.04em',
      }}
    >
      {children}
    </div>
  );
}

export function MarketingHero({
  layout = 'image-right',
  showImage = true,
  imageSrc = BUSINESS_HERO_LOCAL,
  imageFallbackSrc = BUSINESS_HERO_PEXELS,
  imageAlt = '',
  highContrastImage = true,
  eyebrow,
  title,
  description,
  children,
  proofPoints,
  showMetricStrip = false,
  className = '',
}: MarketingHeroProps) {
  if (!showImage || layout === 'statement') {
    return (
      <section className={`pt-28 pb-16 md:pt-36 md:pb-20 ${className}`}>
        <header className="relative">
          <div className="max-w-4xl">
            {eyebrow ? <div className="mb-4">{eyebrow}</div> : null}
            <MegaTitle>{title}</MegaTitle>
            <div
              className="mt-6 text-text-secondary max-w-2xl"
              style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
            >
              {description}
            </div>
            {proofPoints ? <div className="mt-8">{proofPoints}</div> : null}
            {children ? (
              <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3">{children}</div>
            ) : null}
          </div>
          {showMetricStrip ? (
            <div className="mt-10 md:mt-12">
              <HeroMetricStrip />
            </div>
          ) : null}
        </header>
      </section>
    );
  }

  if (layout === 'background') {
    return (
      <section
        className={`relative overflow-hidden min-h-[420px] md:min-h-[520px] ${className}`}
      >
        <div className="absolute inset-0" aria-hidden>
          <HeroImageFrame
            src={imageSrc}
            fallbackSrc={imageFallbackSrc}
            alt={imageAlt}
            decorative
            fill
            priority
            highContrast={highContrastImage}
          />
        </div>

        <div className="relative z-10 px-4 sm:px-6 py-14 md:px-10 md:py-20 max-w-4xl">
          {eyebrow}
          <div className="mt-4">
            <MegaTitle>{title}</MegaTitle>
          </div>
          <div
            className="mt-6 max-w-2xl text-text-secondary"
            style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
          >
            {description}
          </div>
          {proofPoints ? <div className="mt-8">{proofPoints}</div> : null}
          {children ? <div className="mt-10 flex flex-wrap gap-3">{children}</div> : null}
        </div>

        {showMetricStrip ? (
          <div className="relative z-10 mt-8 md:mt-12">
            <HeroMetricStrip />
          </div>
        ) : null}
      </section>
    );
  }

  return (
    <section className={`pt-28 pb-16 md:pt-36 md:pb-20 ${className}`}>
      <div className="max-w-4xl">
        {eyebrow}
        <div className="mt-4">
          <MegaTitle>{title}</MegaTitle>
        </div>
        <div
          className="mt-6 text-text-secondary max-w-2xl"
          style={{ fontSize: 'var(--type-body-lg)', lineHeight: 'var(--leading-body)' }}
        >
          {description}
        </div>
        {proofPoints ? <div className="mt-8">{proofPoints}</div> : null}
        {children ? (
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3">{children}</div>
        ) : null}
      </div>

      {showMetricStrip ? (
        <div className="mt-10 md:mt-12">
          <HeroMetricStrip />
        </div>
      ) : null}

      <div className="relative mt-10 md:mt-12 -mx-4 sm:-mx-6 overflow-hidden">
        <HeroImageFrame
          src={imageSrc}
          fallbackSrc={imageFallbackSrc}
          alt={imageAlt}
          aspect="3/2"
          priority
          highContrast={highContrastImage}
          frameClassName="rounded-none"
        />
      </div>
    </section>
  );
}
