import { Code2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getTechLogoBySlug, resolveTechLogo } from '../../data/tech-logos';

export type TechLogoSize = 'sm' | 'md';

export type TechLogoProps = {
  /** Display label used to resolve the logo (e.g. "React", "Node.js"). */
  name?: string;
  /** Explicit slug when you already know it (e.g. "nextjs"). */
  slug?: string;
  /** Accessible name; defaults to resolved tech label. */
  title?: string;
  /** sm = 14px pills (TechTag); md = 32px case study rows. */
  size?: TechLogoSize;
  className?: string;
  imageClassName?: string;
};

/**
 * Round white-backed tech mark from `public/images/logos/`.
 *
 * Usage:
 * - Resolve labels via `src/data/tech-logos.ts` (aliases like "Node.js" → nodejs).
 * - Add missing assets: `node scripts/lookup-logo.mjs react` (writes to public/images/logos).
 * - Case studies: pair with `CaseStudyTechStack` or `<TechLogo name="React" size="md" />`.
 */
const sizeShell: Record<TechLogoSize, string> = {
  sm: 'h-3.5 w-3.5 p-0.5',
  md: 'h-8 w-8 p-1',
};

const sizeFallbackText: Record<TechLogoSize, string> = {
  sm: 'text-[0.5rem]',
  md: 'text-[0.65rem]',
};

export function TechLogo({
  name,
  slug,
  title,
  size = 'sm',
  className,
  imageClassName,
}: TechLogoProps) {
  const entry =
    (slug ? getTechLogoBySlug(slug) : null) ??
    (name ? resolveTechLogo(name) : null);

  const accessibleName = title ?? entry?.label ?? name ?? slug ?? 'Technology';

  if (!entry) {
    if (process.env.NODE_ENV === 'development' && (name || slug)) {
      console.log('[TechLogo] No logo for', { name, slug });
    }

    const fallbackLetter = (name ?? slug ?? '?').trim().charAt(0).toUpperCase() || '?';

    return (
      <span
        className={cn(
          'inline-flex shrink-0 items-center justify-center rounded-full border border-surface-border bg-white',
          sizeShell[size],
          className,
        )}
        title={accessibleName}
        aria-hidden={title ? undefined : true}
      >
        {title ? <span className="sr-only">{accessibleName}</span> : null}
        <span
          className={cn(
            'flex h-full w-full items-center justify-center rounded-full font-semibold leading-none text-text-muted',
            sizeFallbackText[size],
          )}
          aria-hidden
        >
          {fallbackLetter}
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full border border-surface-border bg-white',
        sizeShell[size],
        className,
      )}
      title={accessibleName}
    >
      <img
        src={entry.src}
        alt=""
        width={14}
        height={14}
        className={cn('h-full w-full object-contain', imageClassName)}
        loading="lazy"
        decoding="async"
      />
      <span className="sr-only">{accessibleName}</span>
    </span>
  );
}

/** Fallback icon when no asset exists and letter fallback is not desired. */
export function TechLogoPlaceholder({
  title,
  className,
  size = 'sm',
}: {
  title?: string;
  className?: string;
  size?: TechLogoSize;
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full border border-surface-border bg-white',
        sizeShell[size],
        className,
      )}
      title={title}
    >
      <Code2 className="h-2.5 w-2.5 text-text-muted" aria-hidden />
      {title ? <span className="sr-only">{title}</span> : null}
    </span>
  );
}
