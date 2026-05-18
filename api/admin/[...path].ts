import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleAdminRoute } from '../lib/leads/adminHandlers';
import {
  getApiPath,
  handleOptions,
  jsonResponse,
  parseJsonBody,
} from '../lib/http';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (handleOptions(req, res)) return;

    const fullPath = getApiPath(req);
    console.log(`[admin API] Request method: ${req.method}, url: ${req.url}, fullPath: ${fullPath}`);

    const segments = fullPath.replace(/^admin\/?/, '').split('/').filter(Boolean);
    console.log(`[admin API] Segments:`, segments);

    const parsed = parseJsonBody(req);
    if (parsed === null && req.body && req.method !== 'GET') {
      console.log(`[admin API] Invalid JSON body`);
      jsonResponse(res, 400, { error: 'Invalid JSON body' });
      return;
    }

    const result = await handleAdminRoute(req, segments, parsed);
    console.log(`[admin API] Result status: ${result.status}`);
    jsonResponse(res, result.status, result.body);
  } catch (error: any) {
    console.error(`[admin API] Critical handler error:`, error);
    jsonResponse(res, 500, {
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
}
