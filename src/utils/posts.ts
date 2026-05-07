import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '../consts';

export type Post = CollectionEntry<'posts'>;

const isProd = import.meta.env.PROD;

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) =>
    isProd ? !data.draft : true,
  );
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export async function getAllTags(): Promise<Map<string, Post[]>> {
  const posts = await getAllPosts();
  const tags = new Map<string, Post[]>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const existing = tags.get(tag) ?? [];
      existing.push(post);
      tags.set(tag, existing);
    }
  }
  return tags;
}

export function slugifyTag(tag: string): string {
  return encodeURIComponent(tag.toLowerCase().trim().replace(/\s+/g, '-'));
}

// ---------- 分类 ----------

const OTHER_CATEGORY = '其他';

/**
 * 把文章实际分类规整为「在 SITE.categories 中」或「其他」
 */
export function normalizeCategory(category: string): string {
  return SITE.categories.includes(category) ? category : OTHER_CATEGORY;
}

/**
 * 返回所有分类（按 SITE.categories 顺序，加上「其他」如果存在）
 * 每项包含分类名和文章数
 */
export async function getAllCategories(): Promise<
  Array<{ name: string; count: number }>
> {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();
  for (const p of posts) {
    const cat = normalizeCategory(p.data.category);
    counts.set(cat, (counts.get(cat) ?? 0) + 1);
  }
  const result: Array<{ name: string; count: number }> = [];
  for (const cat of SITE.categories) {
    if (counts.has(cat)) result.push({ name: cat, count: counts.get(cat)! });
  }
  if (counts.has(OTHER_CATEGORY)) {
    result.push({ name: OTHER_CATEGORY, count: counts.get(OTHER_CATEGORY)! });
  }
  return result;
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => normalizeCategory(p.data.category) === category);
}

export function slugifyCategory(category: string): string {
  return encodeURIComponent(category.toLowerCase().trim().replace(/\s+/g, '-'));
}
