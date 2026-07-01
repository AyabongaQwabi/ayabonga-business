import type { BlobAccessType } from '@vercel/blob';

/** Must match the store type in Vercel (Storage → your Blob store → Public vs Private). */
export function getBlobAccess(): BlobAccessType {
  const raw = process.env.BLOB_ACCESS?.trim().toLowerCase();
  if (raw === 'public' || raw === 'private') return raw;
  return 'private';
}
