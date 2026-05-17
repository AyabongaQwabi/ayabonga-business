import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
  as?: 'p' | 'span';
};

export function SectionLabel({ children, className, as: Tag = 'p' }: SectionLabelProps) {
  return (
    <Tag className={cn('section-label', className)}>
      {children}
    </Tag>
  );
}
