import { Link } from 'react-router-dom';
import {
  APP_DEVELOPMENT_COST_PAGE,
  PRICING_STRATEGY_PAGE,
  QUOTE_PAGE,
  QUOTE_TOOL_LABEL,
} from '../lib/site-config';
import { AUTHOR_JOB_TITLE } from '../lib/author-profile';
import { SITE_NAME } from '../lib/site-config';

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8 mt-auto">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} {SITE_NAME}. {AUTHOR_JOB_TITLE}.{' '}
            <a
              href="https://www.qwabi.co.za"
              className="interactive-link hover:underline underline-offset-4"
            >
              Personal site
            </a>
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <Link
              to="/about"
              className="interactive-link text-muted-foreground"
            >
              About
            </Link>
            <Link
              to={APP_DEVELOPMENT_COST_PAGE}
              className="interactive-link text-muted-foreground"
            >
              App development cost
            </Link>
            <Link
              to={PRICING_STRATEGY_PAGE}
              className="interactive-link text-muted-foreground"
            >
              Retainer pricing
            </Link>
            <Link
              to="/services"
              className="interactive-link text-muted-foreground"
            >
              Services
            </Link>
            <Link
              to="/mobile-app-development-south-africa"
              className="interactive-link text-muted-foreground"
            >
              Mobile apps
            </Link>
            <Link
              to="/custom-software-development-south-africa"
              className="interactive-link text-muted-foreground"
            >
              Custom software
            </Link>
            <Link
              to="/technical-cofounder"
              className="interactive-link text-muted-foreground"
            >
              Technical co-founder
            </Link>
            <Link
              to={QUOTE_PAGE}
              className="interactive-link text-muted-foreground"
            >
              {QUOTE_TOOL_LABEL}
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground border-t border-border pt-4">
          <Link to="/privacy" className="interactive-link text-muted-foreground">
            Privacy
          </Link>
          <a
            href="https://github.com/ayabongaqwabi"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-link text-muted-foreground"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ayabongaqwabi"
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-link text-muted-foreground"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
