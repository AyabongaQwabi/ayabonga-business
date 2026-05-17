import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Home } from 'lucide-react';
import { PageShell } from '../components/layout/PageShell';
import { absoluteUrl, SITE_NAME } from '../lib/site-config';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>{`Page not found | ${SITE_NAME}`}</title>
        <meta name="description" content="This page does not exist on qwabi.co.za." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={absoluteUrl('/')} />
      </Helmet>
      <PageShell mainClassName="flex flex-1 items-center justify-center px-6 pt-[4.5rem] pb-24">
        <div className="max-w-md text-center">
          <p className="text-6xl font-bold text-primary/80 mb-4">404</p>
          <h1 className="text-2xl font-semibold text-foreground mb-3">Page not found</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The URL may be outdated or mistyped. Try the homepage or services overview.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
            >
              <Home className="w-4 h-4" aria-hidden />
              Home
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground hover:bg-card transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden />
              Services
            </Link>
          </div>
        </div>
      </PageShell>
    </>
  );
}
