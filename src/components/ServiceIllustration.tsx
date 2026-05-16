import { useState } from 'react';
import { SERVICE_ILLUSTRATIONS } from '../lib/marketing-images';

/** Brand palette for inline fallbacks */
const NAVY = '#0A192F';
const GOLD = '#FFD700';
const EMERALD = '#059669';

export type ServiceIllustrationVariant =
  | 'mobile'
  | 'web'
  | 'business'
  | 'ecommerce'
  | 'ai'
  | 'bespoke';

function illustrationSrc(variant: ServiceIllustrationVariant): string {
  return SERVICE_ILLUSTRATIONS[variant];
}

function InlinePlaceholder({ variant }: { variant: ServiceIllustrationVariant }) {
  return (
    <svg
      viewBox="0 0 200 160"
      className="w-full h-full"
      role="img"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="200" height="160" fill={NAVY} rx="12" />
      <circle cx="100" cy="52" r="28" fill={GOLD} opacity="0.9" />
      <rect x="40" y="95" width="120" height="12" rx="6" fill={EMERALD} opacity="0.85" />
      <rect x="56" y="118" width="88" height="8" rx="4" fill="white" opacity="0.25" />
      <rect x="70" y="132" width="60" height="6" rx="3" fill={GOLD} opacity="0.4" />
    </svg>
  );
}

export interface ServiceIllustrationProps {
  variant: ServiceIllustrationVariant;
  alt: string;
  className?: string;
}

export function ServiceIllustration({
  variant,
  alt,
  className = '',
}: ServiceIllustrationProps) {
  const [useFallback, setUseFallback] = useState(false);

  if (useFallback) {
    return (
      <div
        className={`overflow-hidden rounded-xl border border-border/60 bg-card aspect-[5/4] ${className}`}
        role="img"
        aria-label={alt}
      >
        <InlinePlaceholder variant={variant} />
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-[5/4] overflow-hidden rounded-xl border border-border/60 bg-card/50 ${className}`}
    >
      <img
        src={illustrationSrc(variant)}
        alt={alt}
        width={400}
        height={320}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-contain p-3 motion-reduce:transition-none"
        onError={() => {
          if (process.env.NODE_ENV === 'development') {
            console.error('[ServiceIllustration] Failed to load', {
              variant,
              src: illustrationSrc(variant),
            });
          }
          setUseFallback(true);
        }}
      />
    </div>
  );
}
