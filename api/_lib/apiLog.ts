/** Structured logs for Vercel Functions (visible in project → Logs). */
export function apiLog(
  scope: string,
  message: string,
  data?: Record<string, unknown>,
): void {
  if (data && Object.keys(data).length > 0) {
    console.log(`[${scope}] ${message}`, data);
  } else {
    console.log(`[${scope}] ${message}`);
  }
}

export function apiLogError(
  scope: string,
  message: string,
  error: unknown,
  data?: Record<string, unknown>,
): void {
  console.error(`[${scope}] ${message}`, {
    ...data,
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  });
}

/** True when Authorization: Bearer … header is present (value never logged). */
export function hasBearerAuth(req: { headers: Record<string, string | string[] | undefined> }): boolean {
  const auth = req.headers.authorization ?? req.headers.Authorization;
  const value = Array.isArray(auth) ? auth[0] : auth;
  return typeof value === 'string' && value.startsWith('Bearer ');
}
