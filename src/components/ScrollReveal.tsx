import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../lib/utils';
import { useScrollReveal, type UseScrollRevealOptions } from '../hooks/useScrollReveal';

type ScrollRevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** Stagger children via CSS --reveal-index on each child */
  stagger?: boolean;
  observerOptions?: UseScrollRevealOptions;
};

export function ScrollReveal({
  children,
  className,
  stagger = false,
  observerOptions,
  ...props
}: ScrollRevealProps) {
  const ref = useScrollReveal<HTMLDivElement>(observerOptions);

  return (
    <div
      ref={ref}
      className={cn(stagger ? 'reveal-stagger' : 'reveal', className)}
      {...props}
    >
      {children}
    </div>
  );
}
