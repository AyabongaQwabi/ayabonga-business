import { cn } from '../../lib/utils';
import { resolveTechLogo } from '../../data/tech-logos';
import { TechLogo } from './TechLogo';

export type TechTagProps = {
  label: string;
  className?: string;
  /** Pill size variant */
  size?: 'sm' | 'md';
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs gap-1.5',
  md: 'px-2.5 py-1 text-xs gap-2',
};

/**
 * Tech pill: 14px circular logo (when known) + label.
 * Falls back to text-only pill when no logo mapping exists.
 */
export function TechTag({ label, className, size = 'sm' }: TechTagProps) {
  const entry = resolveTechLogo(label);
  const hasLogo = Boolean(entry);

  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center rounded font-mono bg-secondary text-muted-foreground',
        sizeClasses[size],
        className,
      )}
    >
      {hasLogo ? <TechLogo name={label} title={label} /> : null}
      <span className="truncate">{label}</span>
    </span>
  );
}
