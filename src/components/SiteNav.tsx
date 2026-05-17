import { useEffect, useState, type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavHamburger } from './NavHamburger';
import {
  APP_DEVELOPMENT_COST_PAGE,
  PARTNERSHIP_CTA_LABEL,
  PRICING_STRATEGY_PAGE,
  QUOTE_PAGE,
  QUOTE_TOOL_LABEL,
} from '../lib/site-config';

const SCROLL_BLUR_THRESHOLD = 60;
const MOBILE_MENU_ID = 'site-mobile-menu';

type NavItem =
  | { label: string; sectionId: string }
  | { label: string; to: string };

const navItems: NavItem[] = [
  { label: 'Services', sectionId: 'services' },
  { label: 'Partnership', sectionId: 'partnership' },
  { label: 'App costs', to: APP_DEVELOPMENT_COST_PAGE },
  { label: 'Retainers', to: PRICING_STRATEGY_PAGE },
  { label: 'Work', sectionId: 'work' },
];

type SiteNavProps = {
  /** Homepage in-page section scroll with offset (optional). */
  onNavigateSection?: (id: string) => void;
};

function isRouteItem(item: NavItem): item is { label: string; to: string } {
  return 'to' in item;
}

export function SiteNav({ onNavigateSection }: SiteNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_BLUR_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const goSection = (sectionId: string) => {
    if (isHome && onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      window.location.href = `/#${sectionId}`;
    }
    setMobileOpen(false);
  };

  const renderNavItem = (item: NavItem, className: string) => {
    if (isRouteItem(item)) {
      const active = location.pathname === item.to;
      return (
        <Link
          key={item.label}
          to={item.to}
          className={className}
          aria-current={active ? 'page' : undefined}
          onClick={() => setMobileOpen(false)}
        >
          {item.label}
        </Link>
      );
    }

    if (isHome) {
      return (
        <button
          key={item.label}
          type="button"
          className={`${className} border-0 bg-transparent p-0`}
          onClick={() => goSection(item.sectionId)}
        >
          {item.label}
        </button>
      );
    }

    return (
      <Link
        key={item.label}
        to={`/#${item.sectionId}`}
        className={className}
        onClick={() => setMobileOpen(false)}
      >
        {item.label}
      </Link>
    );
  };

  const closeMobileBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setMobileOpen(false);
    }
  };

  return (
    <header
      className={`site-nav fixed inset-x-0 top-0 z-[100] transition-[background-color,border-color,backdrop-filter] duration-300 motion-reduce:transition-none ${
        isScrolled
          ? 'border-b border-surface-border bg-[rgba(10,25,47,0.88)] backdrop-blur-[12px]'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-tight text-accent-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent-gold"
          onClick={() => setMobileOpen(false)}
        >
          Qwabi Engineering
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => renderNavItem(item, 'nav-link'))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to={QUOTE_PAGE} className="btn-outline px-4 py-2 text-xs">
            {QUOTE_TOOL_LABEL}
          </Link>
          <Link to={PRICING_STRATEGY_PAGE} className="btn-primary px-4 py-2 text-xs">
            {PARTNERSHIP_CTA_LABEL}
          </Link>
        </div>

        <NavHamburger
          open={mobileOpen}
          onToggle={() => setMobileOpen((open) => !open)}
          controlsId={MOBILE_MENU_ID}
        />
      </div>

      {mobileOpen ? (
        <div
          id={MOBILE_MENU_ID}
          className="fixed inset-0 z-[110] flex flex-col bg-[rgba(10,25,47,0.96)] backdrop-blur-md lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          onClick={closeMobileBackdrop}
        >
          <div className="container flex flex-1 flex-col pb-8 pt-24">
            <div className="absolute right-6 top-4">
              <NavHamburger
                open
                onToggle={() => setMobileOpen(false)}
                controlsId={MOBILE_MENU_ID}
              />
            </div>
            <nav
              className="flex flex-col gap-5"
              aria-label="Mobile navigation"
              onClick={(event) => event.stopPropagation()}
            >
              {navItems.map((item) =>
                renderNavItem(
                  item,
                  'nav-link flex min-h-11 items-center text-left text-base',
                ),
              )}
              <div className="mt-4 flex flex-col gap-3 border-t border-surface-border pt-6">
                <Link
                  to={QUOTE_PAGE}
                  className="btn-outline text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  {QUOTE_TOOL_LABEL}
                </Link>
                <Link
                  to={PRICING_STRATEGY_PAGE}
                  className="btn-primary text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  {PARTNERSHIP_CTA_LABEL}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
