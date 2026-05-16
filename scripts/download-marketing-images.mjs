#!/usr/bin/env node
/**
 * Downloads hero and project placeholder images into public/images/.
 * Run: node scripts/download-marketing-images.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');

const ASSETS = [
  {
    url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600',
    out: 'images/heroes/business-home.jpg',
  },
  {
    url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200',
    out: 'images/heroes/services.jpg',
  },
  {
    url: 'https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=1200',
    out: 'images/heroes/app-development-cost.jpg',
  },
];

async function downloadOne({ url, out }) {
  const dest = path.join(publicDir, out);
  await mkdir(path.dirname(dest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed ${url}: ${res.status} ${res.statusText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`Saved ${out} (${Math.round(buf.length / 1024)} KB)`);
}

async function main() {
  for (const asset of ASSETS) {
    await downloadOne(asset);
  }
  console.log('Done. Hero images are in public/images/heroes/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
