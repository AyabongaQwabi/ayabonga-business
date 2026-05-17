import type { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageShell } from './layout/PageShell';
import { absoluteUrl, TWITTER_HANDLE } from '../lib/site-config';

export type SupportingPageShellProps = {
  title: string;
  description: string;
  canonicalPath: string;
  children: ReactNode;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  contentWidth?: 'narrow' | 'wide';
  ogImage?: string;
  showWhatsApp?: boolean;
  whatsappLabel?: string;
};

export function SupportingPageShell({
  title,
  description,
  canonicalPath,
  children,
  jsonLd,
  contentWidth = 'narrow',
  ogImage,
  showWhatsApp = true,
  whatsappLabel,
}: SupportingPageShellProps) {
  const canonical = absoluteUrl(canonicalPath);
  const maxClass = contentWidth === 'wide' ? 'max-w-4xl' : 'max-w-3xl';
  const mainClassName = `flex-1 w-full ${maxClass} mx-auto px-6 pt-[4.5rem] pb-12 md:pb-16`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content="en_ZA" />
        {ogImage ? <meta property="og:image" content={ogImage} /> : null}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="robots" content="index, follow" />
        {jsonLd ? (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        ) : null}
      </Helmet>

      <PageShell
        mainClassName={mainClassName}
        showWhatsApp={showWhatsApp}
        whatsappLabel={whatsappLabel}
      >
        {children}
      </PageShell>
    </>
  );
}
