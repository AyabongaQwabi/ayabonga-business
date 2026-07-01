import { loadEnv } from 'vite';

function readRequestBody(req) {
  return new Promise((resolveBody, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolveBody(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function hydrateProcessEnv(mode, root) {
  const fromVite = loadEnv(mode, root, '');
  for (const [key, value] of Object.entries(fromVite)) {
    if (value !== undefined && value !== '') {
      process.env[key] = value;
    }
  }

  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
  }
}

function mockVercelRequest(req, pathname, rawBody) {
  const url = req.url ?? pathname;
  const query = {};
  const qs = url.includes('?') ? url.split('?')[1] : '';
  if (qs) {
    for (const part of qs.split('&')) {
      const [k, v] = part.split('=');
      if (k) query[decodeURIComponent(k)] = decodeURIComponent(v ?? '');
    }
  }

  let body = null;
  if (rawBody) {
    try {
      body = JSON.parse(rawBody);
    } catch {
      body = rawBody;
    }
  }

  return {
    method: req.method,
    url,
    query,
    body,
    headers: req.headers,
    socket: req.socket,
  };
}

async function dispatchApi(server, pathname, req, res) {
  hydrateProcessEnv(server.config.mode, server.config.root);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  const raw = req.method === 'GET' || req.method === 'HEAD' ? '' : await readRequestBody(req);
  const vercelReq = mockVercelRequest(req, pathname, raw);

  const json = (status, body) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body));
  };

  try {
    const { dispatchApiRequest } = await server.ssrLoadModule('/api/lib/routeApi.ts');
    const result = await dispatchApiRequest(vercelReq);
    json(result.status, result.body);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(`[local-api] ${pathname} failed:`, err);
    }
    json(500, {
      error: `API failed in dev (${pathname}). Check terminal and .env.local.`,
    });
  }
}

/** Serves /api/* during `npm run dev` (Vite has no serverless runtime). */
export function localApiPlugin() {
  let envChecked = false;

  return {
    name: 'local-api',
    configureServer(server) {
      hydrateProcessEnv(server.config.mode, server.config.root);

      if (!envChecked) {
        envChecked = true;
        const hints = [];
        if (!process.env.RESEND_API_KEY?.trim()) hints.push('RESEND_API_KEY');
        if (!process.env.BLOB_READ_WRITE_TOKEN?.trim()) hints.push('BLOB_READ_WRITE_TOKEN');
        if (hints.length) {
          console.warn(
            `\n[local-api] Missing: ${hints.join(', ')}. Add to .env.local and restart.\n`,
          );
        } else if (process.env.NODE_ENV === 'development') {
          console.log('[local-api] /api/* ready (send, leads, admin, cron)\n');
        }
      }

      server.middlewares.use(async (req, res, next) => {
        const pathname = req.url?.split('?')[0];
        if (!pathname?.startsWith('/api/')) {
          return next();
        }

        await dispatchApi(server, pathname, req, res);
      });
    },
  };
}
