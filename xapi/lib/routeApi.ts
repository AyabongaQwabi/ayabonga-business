import type { VercelRequest } from '@vercel/node';
import { handleQuoteSend, parseQuoteSendBody } from './handleQuoteSend';
import { handleLeadCapture, parseCaptureBody } from './leads/captureLead';
import { handleAdminRoute } from './leads/adminHandlers';
import { runDailyOutreachWorker } from './leads/outreachWorker';
import { getApiPath, getClientIp, parseJsonBody } from './http';

export type ApiRouteResult = {
  status: number;
  body: Record<string, unknown>;
};

function authorizeCron(req: VercelRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return process.env.NODE_ENV === 'development';
  return req.headers.authorization === `Bearer ${secret}`;
}

function isDevLogEnv(): boolean {
  return (
    process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview'
  );
}

/** Single router for all /api/* serverless traffic (Hobby plan function limit). */
export async function dispatchApiRequest(req: VercelRequest): Promise<ApiRouteResult> {
  const apiPath = getApiPath(req);
  const method = req.method ?? 'GET';

  if (apiPath === 'send') {
    if (method !== 'POST') {
      return { status: 405, body: { error: 'Method not allowed' } };
    }
    const parsed = parseJsonBody(req);
    if (parsed === null && req.body) {
      return { status: 400, body: { error: 'Invalid JSON body' } };
    }
    const body = parseQuoteSendBody(parsed);
    const result = await handleQuoteSend(body);
    if (result.status !== 200 && 'error' in result.body && isDevLogEnv()) {
      console.error('[api/send] Request failed', {
        status: result.status,
        error: result.body.error,
      });
    }
    return result;
  }

  if (apiPath === 'leads/capture') {
    if (method !== 'POST') {
      return { status: 405, body: { error: 'Method not allowed' } };
    }
    const parsed = parseJsonBody(req);
    if (parsed === null && req.body) {
      return { status: 400, body: { error: 'Invalid JSON body' } };
    }
    const body = parseCaptureBody(parsed);
    return handleLeadCapture(body, { ip: getClientIp(req) });
  }

  if (apiPath === 'cron/outreach-daily') {
    if (method !== 'GET' && method !== 'POST') {
      return { status: 405, body: { error: 'Method not allowed' } };
    }
    if (!authorizeCron(req)) {
      return { status: 401, body: { error: 'Unauthorized' } };
    }
    try {
      const report = await runDailyOutreachWorker();
      return { status: 200, body: report as unknown as Record<string, unknown> };
    } catch (error) {
      console.error('[cron/outreach-daily]', error);
      return {
        status: 500,
        body: {
          error: error instanceof Error ? error.message : 'Worker failed',
        },
      };
    }
  }

  if (apiPath === 'admin' || apiPath.startsWith('admin/')) {
    const segments = apiPath.replace(/^admin\/?/, '').split('/').filter(Boolean);
    const parsed = parseJsonBody(req);
    if (parsed === null && req.body && method !== 'GET') {
      return { status: 400, body: { error: 'Invalid JSON body' } };
    }
    return handleAdminRoute(req, segments, parsed);
  }

  return { status: 404, body: { error: 'Not found' } };
}
