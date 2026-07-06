import type { VercelRequest } from '@vercel/node';
import { apiLog, apiLogError, hasBearerAuth } from './apiLog';
import { handleQuoteSend, parseQuoteSendBody } from './handleQuoteSend';
import { handleLeadCapture, parseCaptureBody } from './leads/captureLead';
import { handleAdminRoute } from './leads/adminHandlers';
import { runOutreachWorker } from './leads/outreachWorker';
import type { OutreachCampaign } from './leads/campaigns';
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

async function handleOutreachCron(
  req: VercelRequest,
  method: string,
  campaign: OutreachCampaign,
  logTag: string,
): Promise<ApiRouteResult> {
  apiLog(logTag, 'hit', { method, campaign });
  if (method !== 'GET' && method !== 'POST') {
    return { status: 405, body: { error: 'Method not allowed' } };
  }
  if (!authorizeCron(req)) {
    return { status: 401, body: { error: 'Unauthorized' } };
  }
  try {
    apiLog(logTag, 'starting worker', { campaign });
    const report = await runOutreachWorker(campaign);
    apiLog(logTag, 'worker finished', {
      campaign: report.campaign,
      sent: report.sent,
      attempted: report.attempted,
      discovered: report.discovered,
      skippedNoEmail: report.skippedNoEmail,
      discoveryRounds: report.discoveryRounds,
      queries: report.discoveryQueries,
      errorCount: report.errors.length,
    });
    if (report.errors.length > 0) {
      apiLog(logTag, 'worker warnings', { errors: report.errors });
    }
    return { status: 200, body: report as unknown as Record<string, unknown> };
  } catch (error) {
    apiLogError(logTag, 'worker failed', error, { campaign });
    return {
      status: 500,
      body: { error: error instanceof Error ? error.message : 'Worker failed' },
    };
  }
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

  if (apiPath === 'cron/outreach-daily' || apiPath === 'cron/outreach-cofounder-daily') {
    return handleOutreachCron(req, method, 'cofounder', 'cron/outreach-cofounder-daily');
  }

  if (apiPath === 'cron/outreach-cold-daily') {
    return handleOutreachCron(req, method, 'cold', 'cron/outreach-cold-daily');
  }

  if (apiPath === 'cron/outreach-all-daily') {
    apiLog('cron/outreach-all-daily', 'hit', { method });
    if (method !== 'GET' && method !== 'POST') {
      return { status: 405, body: { error: 'Method not allowed' } };
    }
    if (!authorizeCron(req)) {
      return { status: 401, body: { error: 'Unauthorized' } };
    }
    const startedAt = Date.now();
    const maxMs = 280_000;
    try {
      const cold = await runOutreachWorker('cold');
      const reports: Record<string, unknown> = { cold };
      if (Date.now() - startedAt < maxMs) {
        reports.cofounder = await runOutreachWorker('cofounder');
      } else {
        reports.cofounderSkipped = 'Time budget exhausted after cold run';
      }
      return { status: 200, body: reports };
    } catch (error) {
      apiLogError('cron/outreach-all-daily', 'worker failed', error);
      return {
        status: 500,
        body: { error: error instanceof Error ? error.message : 'Worker failed' },
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
