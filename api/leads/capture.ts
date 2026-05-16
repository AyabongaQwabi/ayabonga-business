import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleLeadCapture, parseCaptureBody } from '../lib/leads/captureLead';
import {
  getClientIp,
  handleOptions,
  jsonResponse,
  parseJsonBody,
} from '../lib/http';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleOptions(req, res)) return;

  if (req.method !== 'POST') {
    jsonResponse(res, 405, { error: 'Method not allowed' });
    return;
  }

  const parsed = parseJsonBody(req);
  if (parsed === null && req.body) {
    jsonResponse(res, 400, { error: 'Invalid JSON body' });
    return;
  }

  const body = parseCaptureBody(parsed);
  const result = await handleLeadCapture(body, { ip: getClientIp(req) });
  jsonResponse(res, result.status, result.body);
}
