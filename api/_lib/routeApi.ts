import type { VercelRequest } from '@vercel/node';
import { apiLog, apiLogError, hasBearerAuth } from './apiLog';
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
  if (!secret) {
    apiLog('cron/auth', 'CRON_SECRET not set — only allowed in development', {
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
    });
    return process.env.NODE_ENV === 'development';
  }
  const authorized = req.headers.authorization === `Bearer ${secret}`;
  apiLog('cron/auth', authorized ? 'authorized' : 'rejected', {
    hasBearerHeader: hasBearerAuth(req),
    cronSecretConfigured: true,
  });
  return authorized;
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
    apiLog('cron/outreach-daily', 'hit', { method });
    if (method !== 'GET' && method !== 'POST') {
      apiLog('cron/outreach-daily', 'method not allowed', { method });
      return { status: 405, body: { error: 'Method not allowed' } };
    }
    if (!authorizeCron(req)) {
      return { status: 401, body: { error: 'Unauthorized' } };
    }
    try {
      apiLog('cron/outreach-daily', 'starting worker');
      const report = await runDailyOutreachWorker();
      apiLog('cron/outreach-daily', 'worker finished', {
        sent: report.sent,
        attempted: report.attempted,
        skipped: report.skipped,
        discovered: report.discovered,
        enrichedExisting: report.enrichedExisting,
        errorCount: report.errors.length,
        enabled: report.enabled,
      });
      if (report.errors.length > 0) {
        apiLog('cron/outreach-daily', 'worker warnings', { errors: report.errors });
      }
      return { status: 200, body: report as unknown as Record<string, unknown> };
    } catch (error) {
      apiLogError('cron/outreach-daily', 'worker failed', error);
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
