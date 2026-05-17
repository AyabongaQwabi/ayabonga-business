import type { ReactNode } from 'react';
import { SupportingPageShell } from './SupportingPageShell';

type TrustPageLayoutProps = {
  title: string;
  description: string;
  canonicalPath: string;
  children: ReactNode;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

/** Trust and legal pages on Accessible Dark Authority tokens. */
export function TrustPageLayout({
  title,
  description,
  canonicalPath,
  children,
  jsonLd,
}: TrustPageLayoutProps) {
  return (
    <SupportingPageShell
      title={title}
      description={description}
      canonicalPath={canonicalPath}
      jsonLd={jsonLd}
      contentWidth="narrow"
    >
      <div className="trust-prose">{children}</div>
    </SupportingPageShell>
  );
}
