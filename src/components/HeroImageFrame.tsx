import { useState } from 'react';

type HeroImageFrameProps = {
  src: string;
  alt: string;
  fallbackSrc?: string;
  /** Match common hero downloads: 3:2 (Pexels 1200×800) or 4:3 */
  aspect?: '3/2' | '4/3';
  priority?: boolean;
  decorative?: boolean;
  className?: string;
  frameClassName?: string;
  /** Fill parent (background heroes); skips fixed aspect ratio */
  fill?: boolean;
};

const aspectClass = {
  '3/2': 'aspect-[3/2]',
  '4/3': 'aspect-[4/3]',
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
  className = '',
  frameClassName = '',
  fill = false,
}: HeroImageFrameProps) {
  const [resolvedSrc, setResolvedSrc] = useState(src);

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
        className={`absolute inset-0 h-full w-full object-cover object-center ${className}`.trim()}
        onError={() => {
          if (fallbackSrc && resolvedSrc !== fallbackSrc) {
            setResolvedSrc(fallbackSrc);
          }
        }}
      />
    </div>
  );
}
