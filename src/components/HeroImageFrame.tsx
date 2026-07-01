import { useState } from 'react';

export type HeroImageOverlay = 'none' | 'fade' | 'duotone';

type HeroImageFrameProps = {
  src: string;
  alt: string;
  fallbackSrc?: string;
  /** Match common hero downloads: 3:2 (Pexels 1200×800) or 4:3 */
  aspect?: '3/2' | '4/3' | '4/5' | '16/9';
  priority?: boolean;
  decorative?: boolean;
  /** @deprecated Use overlay="duotone" */
  highContrast?: boolean;
  overlay?: HeroImageOverlay;
  objectPosition?: string;
  className?: string;
  frameClassName?: string;
  /** Fill parent (background heroes); skips fixed aspect ratio */
  fill?: boolean;
};

const aspectClass = {
  '3/2': 'aspect-[3/2]',
  '4/3': 'aspect-[4/3]',
  '4/5': 'aspect-[4/5]',
  '16/9': 'aspect-video',
} as const;

/**
 * Fixed-ratio frame so hero photos never stretch when the grid resizes.
 */
export function HeroImageFrame({
  src,
  alt,
  fallbackSrc,
  aspect = '3/2',
  priority = false,
  decorative = false,
  highContrast = false,
  overlay = 'none',
  objectPosition = 'center',
  className = '',
  frameClassName = '',
  fill = false,
}: HeroImageFrameProps) {
  const [resolvedSrc, setResolvedSrc] = useState(src);
  const resolvedOverlay: HeroImageOverlay =
    overlay !== 'none' ? overlay : highContrast ? 'duotone' : 'none';

  const frameClasses = fill
    ? `absolute inset-0 overflow-hidden ${frameClassName}`.trim()
    : `relative w-full overflow-hidden ${aspectClass[aspect]} ${frameClassName}`.trim();

  return (
    <div className={frameClasses}>
      <img
        src={resolvedSrc}
        alt={decorative ? '' : alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        style={{ objectPosition }}
        className={`absolute inset-0 h-full w-full object-cover ${
          resolvedOverlay === 'duotone' ? 'saturate-[1.35] contrast-[1.15]' : ''
        } ${className}`.trim()}
        onError={() => {
          if (fallbackSrc && resolvedSrc !== fallbackSrc) {
            setResolvedSrc(fallbackSrc);
          }
        }}
      />
      {resolvedOverlay === 'fade' ? (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/25 to-transparent"
          aria-hidden
        />
      ) : null}
      {resolvedOverlay === 'duotone' ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-[#0a192f] mix-blend-multiply opacity-[0.72]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[#ffd700]/25 mix-blend-color opacity-90"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-[#0a192f]/40"
            aria-hidden
          />
        </>
      ) : null}
    </div>
  );
}
