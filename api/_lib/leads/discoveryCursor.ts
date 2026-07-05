import { readJson, writeJson } from './blobStore';
import { queriesForCampaign, type OutreachCampaign } from './campaigns';

type CursorState = {
  index: number;
  lastQuery?: string;
  updatedAt: string;
};

function cursorPath(campaign: OutreachCampaign): string {
  return `meta/discovery-cursor/${campaign}.json`;
}

/** Returns the next search query for this campaign and advances the cursor (every run = new query). */
export async function nextDiscoveryQuery(campaign: OutreachCampaign): Promise<string> {
  const queries = queriesForCampaign(campaign);
  const existing = await readJson<CursorState>(cursorPath(campaign));
  const index = existing?.index ?? 0;
  const query = queries[index % queries.length];
  await writeJson(cursorPath(campaign), {
    index: index + 1,
    lastQuery: query,
    updatedAt: new Date().toISOString(),
  });
  return query;
}
