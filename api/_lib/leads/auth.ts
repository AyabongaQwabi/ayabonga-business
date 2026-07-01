import { createHmac, timingSafeEqual } from 'node:crypto';
import type { AdminSessionPayload } from './types';

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

function getSecret(): string | null {
  const secret = process.env.ADMIN_TOKEN_SECRET?.trim();
  return secret || null;
}

function base64UrlEncode(data: string): string {
  return Buffer.from(data, 'utf8')
    .toString('base64url');
}

function base64UrlDecode(data: string): string {
  return Buffer.from(data, 'base64url').toString('utf8');
}

export function createAdminToken(): { token: string; expiresAt: string } | null {
  const secret = getSecret();
  if (!secret) return null;

  const iat = Date.now();
  const exp = iat + TOKEN_TTL_MS;
  const payload: AdminSessionPayload = { sub: 'admin', iat, exp };
  const body = base64UrlEncode(JSON.stringify(payload));
  const sig = createHmac('sha256', secret).update(body).digest('base64url');
  const token = `${body}.${sig}`;
  return { token, expiresAt: new Date(exp).toISOString() };
}

export function verifyAdminToken(
  authHeader: string | undefined,
): AdminSessionPayload | null {
  const secret = getSecret();
  if (!secret || !authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.slice(7).trim();
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;

  const expected = createHmac('sha256', secret).update(body).digest('base64url');
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }

  let payload: AdminSessionPayload;
  try {
    payload = JSON.parse(base64UrlDecode(body)) as AdminSessionPayload;
  } catch {
    return null;
  }

  if (payload.sub !== 'admin' || Date.now() > payload.exp) return null;
  return payload;
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD?.trim();
  if (!expected) return false;
  try {
    const a = Buffer.from(password);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function bearerFromHeaders(
  headers: Record<string, string | string[] | undefined>,
): string | undefined {
  const raw = headers.authorization ?? headers.Authorization;
  if (Array.isArray(raw)) return raw[0];
  return raw;
}
