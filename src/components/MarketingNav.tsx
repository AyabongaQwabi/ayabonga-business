import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {
  APP_DEVELOPMENT_COST_PAGE,
  PARTNERSHIP_CTA_LABEL,
  PRICING_STRATEGY_PAGE,
  QUOTE_PAGE,
  QUOTE_TOOL_LABEL,
} from '../lib/site-config';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Partnership', href: '#partnership' },
  { label: 'App costs', to: APP_DEVELOPMENT_COST_PAGE },
  { label: 'Retainers', to: PRICING_STRATEGY_PAGE },
  { label: 'Work', href: '#work' },
] as const;

type MarketingNavProps = {
  onNavigateSection?: (id: string) => void;
};

export function MarketingNav({ onNavigateSection }: MarketingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goSection = (id: string) => {
    onNavigateSection?.(id);
    setOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 motion-reduce:transition-none ${
        scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="w-2 h-2 rounded-full bg-primary group-hover:scale-110 transition-transform" />
          <span className="font-bold text-foreground tracking-tight">Qwabi Engineering</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm" aria-label="Primary">
          {navLinks.map((item) =>
            'to' in item ? (
              <Link
                key={item.label}
                to={item.to}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                onClick={() => goSection(item.href.replace('#', ''))}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ),
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to={QUOTE_PAGE}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {QUOTE_TOOL_LABEL}
          </Link>
          <Link
            to={PRICING_STRATEGY_PAGE}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {PARTNERSHIP_CTA_LABEL}
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open ? (
        <nav
          className="lg:hidden border-t border-border bg-background/98 backdrop-blur-md px-6 py-4 flex flex-col gap-3"
          aria-label="Mobile"
        >
          {navLinks.map((item) =>
            'to' in item ? (
              <Link
                key={item.label}
                to={item.to}
                className="text-left text-sm text-muted-foreground hover:text-foreground py-1"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                onClick={() => goSection(item.href.replace('#', ''))}
                className="text-left text-sm text-muted-foreground hover:text-foreground py-1"
              >
                {item.label}
              </button>
            ),
          )}
          <Link
            to={QUOTE_PAGE}
            className="text-left text-sm text-muted-foreground hover:text-foreground py-1"
            onClick={() => setOpen(false)}
          >
            {QUOTE_TOOL_LABEL}
          </Link>
          <Link
            to={PRICING_STRATEGY_PAGE}
            className="mt-2 inline-flex items-center justify-center px-4 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
            onClick={() => setOpen(false)}
          >
            {PARTNERSHIP_CTA_LABEL}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
