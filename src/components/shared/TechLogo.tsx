import { Code2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getTechLogoBySlug, resolveTechLogo } from '../../data/tech-logos';

export type TechLogoProps = {
  /** Display label used to resolve the logo (e.g. "React", "Node.js"). */
  name?: string;
  /** Explicit slug when you already know it (e.g. "nextjs"). */
  slug?: string;
  /** Accessible name; defaults to resolved tech label. */
  title?: string;
  className?: string;
  imageClassName?: string;
};

const shellClassName =
  'inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-surface-border bg-white p-0.5';

export function TechLogo({ name, slug, title, className, imageClassName }: TechLogoProps) {
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
        className={cn(shellClassName, className)}
        title={accessibleName}
        aria-hidden={title ? undefined : true}
      >
        {title ? <span className="sr-only">{accessibleName}</span> : null}
        <span
          className="flex h-full w-full items-center justify-center rounded-full text-[0.5rem] font-semibold leading-none text-text-muted"
          aria-hidden
        >
          {fallbackLetter}
        </span>
      </span>
    );
  }

  return (
    <span className={cn(shellClassName, className)} title={accessibleName}>
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
export function TechLogoPlaceholder({ title, className }: { title?: string; className?: string }) {
  return (
    <span className={cn(shellClassName, className)} title={title}>
      <Code2 className="h-2.5 w-2.5 text-text-muted" aria-hidden />
      {title ? <span className="sr-only">{title}</span> : null}
    </span>
  );
}
