import type { IncomingMessage, ServerResponse } from "node:http";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { apiLog, apiLogError } from "./_lib/apiLog";
import { dispatchApiRequest } from "./_lib/routeApi";
import {
  getApiPath,
  handleOptions,
  jsonResponse,
  normalizeIncomingRequest,
} from "./_lib/http";

/** Bundled to .vercel/output/functions/api.func for production. */
export default async function handler(
  req: IncomingMessage | VercelRequest,
  res: ServerResponse | VercelResponse,
) {
  const started = Date.now();
  try {
    const normalized = await normalizeIncomingRequest(req);
    const apiPath = getApiPath(normalized);
    const method = normalized.method ?? "GET";

    apiLog("api", "request", {
      method,
      url: normalized.url,
      apiPath: apiPath || "(root)",
    });

    if (handleOptions(normalized, res)) {
      apiLog("api", "OPTIONS preflight", { apiPath });
      return;
    }

    const result = await dispatchApiRequest(normalized);
    apiLog("api", "response", {
      apiPath: apiPath || "(root)",
      status: result.status,
      durationMs: Date.now() - started,
    });
    jsonResponse(res, result.status, result.body);
  } catch (error) {
    apiLogError("api", "unhandled error", error, {
      durationMs: Date.now() - started,
    });
    jsonResponse(res, 500, {
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : String(error),
    });
  }
}
