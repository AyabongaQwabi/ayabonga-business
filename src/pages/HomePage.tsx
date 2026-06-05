import { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { BuildCostsTeaser } from '../components/home/BuildCostsTeaser';
import { CtaSection } from '../components/home/CtaSection';
import { HeroSection } from '../components/home/HeroSection';
import { PricingSection } from '../components/home/PricingSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { WorkSection } from '../components/home/WorkSection';
import { PageShell } from '../components/layout/PageShell';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_ORIGIN,
  TWITTER_HANDLE,
} from '../lib/site-config';
import {
  authorGraphNode,
  buildJsonLdGraph,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from '../lib/entity-schema';

const HOME_TITLE =
  'Software Development Company South Africa | Qwabi Engineering';
const HOME_DESCRIPTION =
  'Qwabi Engineering is a South African software development company for mobile apps, web platforms, custom business systems, and AI automation. National and remote delivery; Eastern Cape based.';

export default function HomePage() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 88;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Helmet>
        <title>{HOME_TITLE}</title>
        <meta name="description" content={HOME_DESCRIPTION} />
        <meta
          name="keywords"
          content="app development company, mobile app development, custom software development, web development south africa, software development company south africa, ecommerce app development, business systems software"
        />
        <link rel="canonical" href={absoluteUrl('/')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl('/')} />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESCRIPTION} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:locale" content="en_ZA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={HOME_TITLE} />
        <meta name="twitter:description" content={HOME_DESCRIPTION} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify(
            buildJsonLdGraph([
              buildOrganizationSchema(),
              authorGraphNode(),
              buildWebSiteSchema(),
              {
                '@type': 'ProfessionalService',
                '@id': `${SITE_ORIGIN}/#professional-service`,
                name: 'Qwabi Engineering, Software Development South Africa',
                url: absoluteUrl('/'),
                areaServed: { '@type': 'Country', name: 'South Africa' },
                description: HOME_DESCRIPTION,
                provider: { '@id': `${SITE_ORIGIN}/#person` },
                serviceType: [
                  'Mobile app development',
                  'Web development',
                  'Custom software development',
                  'Ecommerce development',
                ],
              },
            ]),
          )}
        </script>
      </Helmet>

      <PageShell onNavigateSection={scrollTo} mainClassName="flex-1">
        <HeroSection />
        <ServicesSection />
        <WorkSection />
        <TestimonialsSection />
        <BuildCostsTeaser />
        <PricingSection />
        <CtaSection />
      </PageShell>

      <SpeedInsights />
      <Analytics />
    </>
  );
}
