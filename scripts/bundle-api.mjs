#!/usr/bin/env node
/**
 * Bundle api/_entry.ts + api/_lib into api/index.js for Vercel.
 * Underscore paths under api/ are not deployed as files; Node ESM also needs
 * explicit extensions. A single bundled function avoids both issues.
 */
import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const entry = path.join(root, 'api/_entry.ts');
const outfile = path.join(root, 'api/index.js');

if (!fs.existsSync(entry)) {
  console.error('[bundle-api] Missing api/_entry.ts');
  process.exit(1);
}

await esbuild.build({
  entryPoints: [entry],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  outfile,
  logLevel: 'info',
});

console.log('[bundle-api] Wrote', path.relative(root, outfile));
