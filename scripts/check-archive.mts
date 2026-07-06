import { readFileSync } from 'node:fs';
for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=["']?([^"']*)["']?$/);
  if (m) process.env[m[1]] = m[2];
}
const { listSentEmails } = await import('../api/_lib/leads/sentEmailArchive');
const emails = await listSentEmails();
for (const e of emails.slice(0, 12)) {
  console.log(e.sentAt, '|', e.templateSlug, '|', (e.subject ?? '').slice(0, 55));
}
console.log('TOTAL:', emails.length);
