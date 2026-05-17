import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type MarketingSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

/** Homepage / marketing block with consistent horizontal padding via `.container`. */
export function MarketingSection({
  id,
  children,
  className,
  containerClassName,
}: MarketingSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-24 border-t border-surface-border scroll-mt-24',
        className,
      )}
    >
      <div className={cn('container', containerClassName)}>{children}</div>
    </section>
  );
}
