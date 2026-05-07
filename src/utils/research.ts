import { getCollection, type CollectionEntry } from 'astro:content';

export type Paper = CollectionEntry<'research'>;

const isProd = import.meta.env.PROD;

export async function getAllPapers(): Promise<Paper[]> {
  const papers = await getCollection('research', ({ data }) =>
    isProd ? !data.draft : true,
  );
  return papers.sort((a, b) => b.data.year - a.data.year);
}

export function groupPapersByYear(papers: Paper[]): Array<{ year: number; papers: Paper[] }> {
  const map = new Map<number, Paper[]>();
  for (const p of papers) {
    const arr = map.get(p.data.year) ?? [];
    arr.push(p);
    map.set(p.data.year, arr);
  }
  return [...map.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, papers]) => ({ year, papers }));
}

export function countByCCF(papers: Paper[]): Record<string, number> {
  const counts: Record<string, number> = { A: 0, B: 0, C: 0, SCI: 0, None: 0 };
  for (const p of papers) counts[p.data.ccf]++;
  return counts;
}
