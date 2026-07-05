import type { IncomingMessage, ServerResponse } from 'node:http';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export type ApiResponse = VercelResponse | ServerResponse;

function isVercelResponse(res: ApiResponse): res is VercelResponse {
  return typeof (res as VercelResponse).status === 'function';
}

export function jsonResponse(
  res: ApiResponse,
  status: number,
  body: Record<string, unknown>,
): void {
  if (isVercelResponse(res)) {
    res.status(status).json(body);
    return;
  }
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function parseQueryFromUrl(url: string): Record<string, string | string[]> {
  const qs = url.includes('?') ? url.split('?')[1] : '';
  const query: Record<string, string> = {};
  if (!qs) return query;
  for (const part of qs.split('&')) {
    const [k, v] = part.split('=');
    if (k) query[decodeURIComponent(k)] = decodeURIComponent(v ?? '');
  }
  return query;
}

/** Build Output API passes raw Node req/res; @vercel/node pre-parses body and query. */
export async function normalizeIncomingRequest(
  raw: IncomingMessage | VercelRequest,
): Promise<VercelRequest> {
  if ('query' in raw && raw.query !== undefined) {
    return raw as VercelRequest;
  }

  const url = raw.url ?? '/';
  const method = raw.method ?? 'GET';
  const rawBody =
    method === 'GET' || method === 'HEAD' ? '' : await readRequestBody(raw as IncomingMessage);

  let body: unknown = undefined;
  if (rawBody) {
    try {
      body = JSON.parse(rawBody);
    } catch {
      body = rawBody;
    }
  }

  return {
    method,
    url,
    query: parseQueryFromUrl(url),
    body,
    headers: raw.headers,
    socket: (raw as IncomingMessage).socket,
  } as VercelRequest;
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
  const fromRewrite = getQueryParam(req, '__path');
  if (fromRewrite) return fromRewrite;

  const url = req.url ?? '';
  const path = url.split('?')[0];
  const match = path.match(/\/api\/(.*)$/);
  return match?.[1] ?? '';
}

export function corsPreflight(_res: ApiResponse): boolean {
  return false;
}

export function handleOptions(req: VercelRequest, res: ApiResponse): boolean {
  if (req.method === 'OPTIONS') {
    if (isVercelResponse(res)) {
      res.status(204).end();
    } else {
      res.statusCode = 204;
      res.end();
    }
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
