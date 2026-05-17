import { Link } from 'react-router-dom';
import {
  ABOUT_PAGE,
  APP_DEVELOPMENT_COST_PAGE,
  FOUNDER_PAGE_LABEL,
  PRICING_STRATEGY_PAGE,
  QUOTE_PAGE,
  QUOTE_TOOL_LABEL,
  SITE_NAME,
} from '../lib/site-config';
import { AUTHOR_JOB_TITLE } from '../lib/author-profile';

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const FOOTER_GROUPS: Record<string, FooterLink[]> = {
  Services: [
    { label: 'Services', href: '/services' },
    { label: 'Mobile apps', href: '/mobile-app-development-south-africa' },
    { label: 'Custom software', href: '/custom-software-development-south-africa' },
    { label: 'Technical co-founder', href: '/technical-cofounder' },
  ],
  Resources: [
    { label: 'App development cost', href: APP_DEVELOPMENT_COST_PAGE },
    { label: 'Retainer pricing', href: PRICING_STRATEGY_PAGE },
    { label: QUOTE_TOOL_LABEL, href: QUOTE_PAGE },
  ],
  Company: [
    { label: FOUNDER_PAGE_LABEL, href: ABOUT_PAGE },
    { label: 'Privacy', href: '/privacy' },
    {
      label: 'Personal site',
      href: 'https://www.qwabi.co.za',
      external: true,
    },
    {
      label: 'GitHub',
      href: 'https://github.com/ayabongaqwabi',
      external: true,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ayabongaqwabi',
      external: true,
    },
  ],
};

const linkClassName =
  'text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold rounded-sm';

function FooterLinkItem({ label, href, external }: FooterLink) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {label}
      </a>
    );
  }

  return (
    <Link to={href} className={linkClassName}>
      {label}
    </Link>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-surface-border bg-surface-raised">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-bold text-accent-gold">
              Qwabi Engineering
            </p>
            <p className="mt-3 max-w-[240px] text-sm leading-relaxed text-text-secondary">
              Technical software partnerships for South African founders and SMME
              operators. Senior engineering without agency overhead.
            </p>
          </div>

          {Object.entries(FOOTER_GROUPS).map(([group, links]) => (
            <div key={group}>
              <p className="section-label mb-4">{group}</p>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <FooterLinkItem {...link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-surface-border pt-8 md:flex-row md:items-center">
          <p className="text-xs text-text-muted">
            {year} {SITE_NAME}. {AUTHOR_JOB_TITLE}.
          </p>
          <p className="text-xs text-text-muted">
            Based in South Africa. Working with teams across the continent.
          </p>
        </div>
      </div>
    </footer>
  );
}
