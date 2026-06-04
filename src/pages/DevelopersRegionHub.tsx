import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageShell } from '../components/layout/PageShell';
import { ChevronRight, MapPin, MessageCircle } from 'lucide-react';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  TWITTER_HANDLE,
  WHATSAPP_URL,
} from '../lib/site-config';
import {
  buildHubSchema,
  buildLocalPageTitle,
  cityDisplayName,
  easternCapeHubPath,
  getAllRoles,
  getCitiesByRegion,
  getRegion,
  localPagePath,
  regionHubPath,
  southAfricaHubPath,
  type CityHubRegionSlug,
  type LocalCity,
  type LocalRole,
  type RegionSlug,
  type RoleSlug,
} from '../lib/local-developers';

function CityRoleLinks({
  city,
  roles,
  regionSlug,
}: {
  city: LocalCity;
  roles: LocalRole[];
  regionSlug: CityHubRegionSlug;
}) {
  return (
    <article className="rounded-xl border border-border bg-card/40 p-5 hover:border-primary/40 transition-colors">
      <h3 className="text-lg font-semibold text-foreground mb-1">{cityDisplayName(city)}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{city.localIntro}</p>
      <ul className="flex flex-wrap gap-2">
        {roles.map((role) => (
          <li key={role.slug}>
            <Link
              to={localPagePath(city.slug, role.slug, regionSlug)}
              className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {role.label}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

type DevelopersRegionHubProps = {
  regionSlug: RegionSlug;
};

const POPULAR_SEARCHES: Record<
  CityHubRegionSlug,
  { city: string; role: RoleSlug; label: string }[]
> = {
  'eastern-cape': [
    { city: 'port-alfred', role: 'web-designer', label: 'Web designer Port Alfred' },
    { city: 'gqeberha', role: 'web-developer', label: 'Web developer Gqeberha' },
    { city: 'qonce', role: 'web-developer', label: 'Web developer Qonce' },
    { city: 'east-london', role: 'web-developer', label: 'Web developer East London' },
    { city: 'gqeberha', role: 'web-designer', label: 'Web designer Gqeberha' },
    { city: 'queenstown', role: 'software-engineer', label: 'Software engineer Queenstown' },
    { city: 'mthatha', role: 'software-developer', label: 'Software developer Mthatha' },
  ],
  gauteng: [
    { city: 'johannesburg', role: 'software-developer', label: 'Software developer Johannesburg' },
    { city: 'sandton', role: 'cloud-architect', label: 'Cloud architect Sandton' },
    { city: 'pretoria', role: 'web-developer', label: 'Web developer Pretoria' },
    { city: 'johannesburg', role: 'software-engineer', label: 'Software engineer Joburg' },
  ],
  'kwazulu-natal': [
    { city: 'durban', role: 'software-developer', label: 'Software developer Durban' },
    { city: 'durban', role: 'web-developer', label: 'Web developer eThekwini' },
    { city: 'durban', role: 'web-designer', label: 'Web designer Durban' },
    { city: 'durban', role: 'cloud-architect', label: 'Cloud architect KZN' },
  ],
};

export default function DevelopersRegionHub({ regionSlug }: DevelopersRegionHubProps) {
  const region = getRegion(regionSlug);

  if (!region) {
    return <Navigate to={easternCapeHubPath()} replace />;
  }

  const isCityHub = regionSlug === 'eastern-cape' || regionSlug === 'gauteng' || regionSlug === 'kwazulu-natal';
  const canonicalPath = regionHubPath(regionSlug);
  const canonical = absoluteUrl(canonicalPath);
  const ogTitle = `${region.title} | ${SITE_NAME}`;
  const cities = isCityHub ? getCitiesByRegion(regionSlug) : [];
  const roles = getAllRoles();

  return (
    <>
      <Helmet>
        <title>{ogTitle}</title>
        <meta name="description" content={region.description} />
        <meta name="keywords" content={region.hubKeywords.join(', ')} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={region.description} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:locale" content="en_ZA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">{JSON.stringify(buildHubSchema(region, canonical))}</script>
      </Helmet>

      <PageShell mainClassName="max-w-6xl mx-auto flex-1 px-6 pt-[4.5rem] pb-12 md:pb-20">

        <header className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
            <MapPin className="w-3.5 h-3.5" aria-hidden />
            <span>{region.name}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
            {region.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{region.description}</p>
        </header>

        {!isCityHub && (
          <>
            <section className="mb-12 p-6 rounded-xl border border-primary/20 bg-primary/5">
              <p className="text-foreground mb-4">
                Based in Queenstown, Eastern Cape. I work with founders and SMMEs across South Africa
                remotely on MVPs, web apps, cloud architecture, and AI integrations.
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  to={easternCapeHubPath()}
                  className="inline-flex items-center gap-1 text-primary font-medium hover:underline underline-offset-4"
                >
                  Eastern Cape city pages
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to={regionHubPath('gauteng')}
                  className="inline-flex items-center gap-1 text-primary font-medium hover:underline underline-offset-4"
                >
                  Gauteng city pages
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  to={regionHubPath('kwazulu-natal')}
                  className="inline-flex items-center gap-1 text-primary font-medium hover:underline underline-offset-4"
                >
                  KwaZulu-Natal city pages
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
            <section className="mb-14">
              <h2 className="text-2xl font-bold mb-4">What I build nationally</h2>
              <ul className="grid sm:grid-cols-2 gap-3 text-muted-foreground">
                {roles.map((role) => (
                  <li key={role.slug} className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                    <span>
                      <span className="text-foreground font-medium">{role.label}</span>
                      {': '}
                      {role.shortFocus}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {isCityHub && (
          <>
            <section className="mb-10">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Hire by role (all {region.name} cities)
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Roles available in every city:{' '}
                {roles.map((r) => r.label).join(', ')}. Pick your city below for local context, FAQs,
                and contact.
              </p>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl font-bold mb-6">Cities and towns</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {cities.map((city) => (
                  <CityRoleLinks
                    key={city.slug}
                    city={city}
                    roles={roles}
                    regionSlug={regionSlug as CityHubRegionSlug}
                  />
                ))}
              </div>
            </section>

            <section className="mb-14 border-t border-border pt-10">
              <h2 className="text-2xl font-bold mb-4">Popular searches</h2>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                {POPULAR_SEARCHES[regionSlug as CityHubRegionSlug].map((item) => {
                  const city = cities.find((c) => c.slug === item.city)!;
                  const role = roles.find((r) => r.slug === item.role)!;
                  return (
                    <li key={`${regionSlug}-${item.label}`}>
                      <Link
                        to={localPagePath(item.city, item.role, regionSlug)}
                        className="text-primary hover:underline underline-offset-4"
                      >
                        {item.label}
                      </Link>
                      <span className="text-muted-foreground ml-1 hidden sm:inline">
                        · {buildLocalPageTitle(role, city).replace(role.label + ' in ', '')}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          </>
        )}

        {isCityHub && (
          <section className="mb-14">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Other regions
            </h2>
            <ul className="flex flex-col gap-2 text-sm">
              {regionSlug !== 'eastern-cape' && (
                <li>
                  <Link
                    to={easternCapeHubPath()}
                    className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-4"
                  >
                    Software developers in the Eastern Cape
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </li>
              )}
              {regionSlug !== 'gauteng' && (
                <li>
                  <Link
                    to={regionHubPath('gauteng')}
                    className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-4"
                  >
                    Software developers in Gauteng
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </li>
              )}
              {regionSlug !== 'kwazulu-natal' && (
                <li>
                  <Link
                    to={regionHubPath('kwazulu-natal')}
                    className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-4"
                  >
                    Software developers in KwaZulu-Natal
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to={southAfricaHubPath()}
                  className="inline-flex items-center gap-1 text-primary hover:underline underline-offset-4"
                >
                  Software developers South Africa
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </li>
            </ul>
          </section>
        )}

        <section className="flex flex-col sm:flex-row gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-lg transition-colors"
          >
            <MessageCircle className="w-5 h-5" aria-hidden />
            Message on WhatsApp
          </a>
          <Link
            to="/get-a-quote"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border hover:border-primary/50 font-semibold rounded-lg transition-colors"
          >
            Get a quote
          </Link>
        </section>
      </PageShell>
    </>
  );
}
