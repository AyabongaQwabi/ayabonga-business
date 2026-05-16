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
              className="hover:text-foreground underline-offset-4 hover:underline"
            >
              Personal site
            </a>
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <Link
              to="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              to={APP_DEVELOPMENT_COST_PAGE}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              App development cost
            </Link>
            <Link
              to={PRICING_STRATEGY_PAGE}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Retainer pricing
            </Link>
            <Link
              to="/services"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link
              to="/mobile-app-development-south-africa"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Mobile apps
            </Link>
            <Link
              to="/custom-software-development-south-africa"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Custom software
            </Link>
            <Link
              to="/technical-cofounder"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Technical co-founder
            </Link>
            <Link
              to={QUOTE_PAGE}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {QUOTE_TOOL_LABEL}
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground border-t border-border pt-4">
          <Link to="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <a
            href="https://github.com/ayabongaqwabi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ayabongaqwabi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
