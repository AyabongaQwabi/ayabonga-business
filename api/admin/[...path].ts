import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleAdminRoute } from '../lib/leads/adminHandlers';
import {
  getApiPath,
  handleOptions,
  jsonResponse,
  parseJsonBody,
} from '../lib/http';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;

  const fullPath = getApiPath(req);
  const segments = fullPath.replace(/^admin\/?/, '').split('/').filter(Boolean);

  const parsed = parseJsonBody(req);
  if (parsed === null && req.body && req.method !== 'GET') {
    jsonResponse(res, 400, { error: 'Invalid JSON body' });
    return;
  }

  const result = await handleAdminRoute(req, segments, parsed);
  jsonResponse(res, result.status, result.body);
}
