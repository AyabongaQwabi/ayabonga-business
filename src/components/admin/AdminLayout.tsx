import { Helmet } from 'react-helmet-async';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { clearAdminToken, getAdminToken } from '../../lib/admin-api';
import { Button } from '../ui/button';

export function AdminLayout() {
  const navigate = useNavigate();
  const token = getAdminToken();

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  function logout() {
    clearAdminToken();
    navigate('/admin', { replace: true });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Leads admin</title>
      </Helmet>

      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <Link to="/admin/leads" className="hover:text-primary transition-colors">
              Leads
            </Link>
            <Link to="/admin/templates" className="hover:text-primary transition-colors">
              Templates
            </Link>
          </nav>
          <Button type="button" variant="outline" size="sm" onClick={logout}>
            Sign out
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
