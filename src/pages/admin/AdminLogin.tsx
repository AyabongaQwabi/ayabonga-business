import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { adminLogin, getAdminToken } from '../../lib/admin-api';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (getAdminToken()) {
    return <Navigate to="/admin/leads" replace />;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await adminLogin(password);
      navigate('/admin/leads', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin sign in</title>
      </Helmet>

      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm p-8 rounded-2xl border border-border bg-card space-y-4"
      >
        <h1 className="text-xl font-bold">Leads admin</h1>
        <p className="text-sm text-muted-foreground">Password required.</p>

        <div className="space-y-2">
          <Label htmlFor="admin-password">Password</Label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin motion-reduce:animate-none" aria-hidden />
              Signing in
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
    </div>
  );
}
