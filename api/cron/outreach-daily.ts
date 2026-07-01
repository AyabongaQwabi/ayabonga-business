import type { VercelRequest, VercelResponse } from '@vercel/node';
import { runDailyOutreachWorker } from '../lib/leads/outreachWorker';
import { handleOptions, jsonResponse } from '../lib/http';

function authorizeCron(req: VercelRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return process.env.NODE_ENV === 'development';
  const auth = req.headers.authorization;
  return auth === `Bearer ${secret}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;

  if (req.method !== 'GET' && req.method !== 'POST') {
    jsonResponse(res, 405, { error: 'Method not allowed' });
    return;
  }

  if (!authorizeCron(req)) {
    jsonResponse(res, 401, { error: 'Unauthorized' });
    return;
  }

  try {
    const report = await runDailyOutreachWorker();
    jsonResponse(res, 200, report);
  } catch (error) {
    console.error('[cron/outreach-daily]', error);
    jsonResponse(res, 500, {
      error: error instanceof Error ? error.message : 'Worker failed',
    });
  }
}
