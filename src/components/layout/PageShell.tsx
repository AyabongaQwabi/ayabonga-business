import type { ReactNode } from 'react';
import { SiteNav } from '../SiteNav';
import { SiteFooter } from '../SiteFooter';
import { FloatingWhatsApp } from '../FloatingWhatsApp';

export const PAGE_SHELL_MAIN_OFFSET = 'flex-1 pt-[4.5rem]';

type PageShellProps = {
  children: ReactNode;
  className?: string;
  mainClassName?: string;
  showWhatsApp?: boolean;
  whatsappLabel?: string;
  onNavigateSection?: (id: string) => void;
};

export function PageShell({
  children,
  className = '',
  mainClassName = PAGE_SHELL_MAIN_OFFSET,
  showWhatsApp = true,
  whatsappLabel,
  onNavigateSection,
}: PageShellProps) {
  return (
    <div className={`min-h-screen bg-background text-foreground flex flex-col font-sans ${className}`}>
      <SiteNav onNavigateSection={onNavigateSection} />
      <main id="main-content" className={mainClassName}>
        {children}
      </main>
      <SiteFooter />
      {showWhatsApp ? <FloatingWhatsApp label={whatsappLabel} /> : null}
    </div>
  );
}
