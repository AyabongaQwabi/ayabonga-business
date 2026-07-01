import type { VercelRequest, VercelResponse } from '@vercel/node';
import { dispatchApiRequest } from './_lib/routeApi';
import { handleOptions, jsonResponse } from './_lib/http';

/** Single /api entry — vercel.json rewrites /api/* here (multi-segment paths). */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (handleOptions(req, res)) return;

    const result = await dispatchApiRequest(req);
    jsonResponse(res, result.status, result.body);
  } catch (error) {
    console.error('[api] Unhandled error:', error);
    jsonResponse(res, 500, {
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
