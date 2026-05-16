import type { VercelRequest, VercelResponse } from '@vercel/node';

export function jsonResponse(
  res: VercelResponse,
  status: number,
  body: Record<string, unknown>,
): void {
  res.status(status).json(body);
}

export function parseJsonBody(req: VercelRequest): Record<string, unknown> | null {
  const raw = req.body;
  if (!raw) return null;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
  if (typeof raw === 'object') return raw as Record<string, unknown>;
  return null;
}

export function getQueryParam(
  req: VercelRequest,
  key: string,
): string | undefined {
  const q = req.query[key];
  if (typeof q === 'string') return q;
  if (Array.isArray(q)) return q[0];
  return undefined;
}

/** Path after /api/ e.g. admin/leads/abc/send */
export function getApiPath(req: VercelRequest): string {
  const url = req.url ?? '';
  const path = url.split('?')[0];
  const match = path.match(/\/api\/(.*)$/);
  return match?.[1] ?? '';
}

export function corsPreflight(res: VercelResponse): boolean {
  return false;
}

export function handleOptions(req: VercelRequest, res: VercelResponse): boolean {
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}

export function getClientIp(req: VercelRequest): string | undefined {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0]?.trim();
  if (Array.isArray(forwarded)) return forwarded[0];
  return req.socket?.remoteAddress;
}
