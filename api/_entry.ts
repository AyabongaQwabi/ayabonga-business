import type { IncomingMessage, ServerResponse } from 'node:http';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { dispatchApiRequest } from './_lib/routeApi';
import { handleOptions, jsonResponse, normalizeIncomingRequest } from './_lib/http';

/** Bundled to .vercel/output/functions/api.func for production. */
export default async function handler(
  req: IncomingMessage | VercelRequest,
  res: ServerResponse | VercelResponse,
) {
  try {
    const normalized = await normalizeIncomingRequest(req);
    if (handleOptions(normalized, res)) return;

    const result = await dispatchApiRequest(normalized);
    jsonResponse(res, result.status, result.body);
  } catch (error) {
    console.error('[api] Unhandled error:', error);
    jsonResponse(res, 500, {
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
