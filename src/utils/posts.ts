import { getCollection, type CollectionEntry } from 'astro:content';

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
