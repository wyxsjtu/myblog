import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { getAllPosts } from '../utils/posts';

export async function GET(context: APIContext) {
  const posts = await getAllPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? '',
      pubDate: post.data.pubDate,
      categories: post.data.tags,
      link: `/posts/${post.id}/`,
    })),
    customData: `<language>${SITE.locale}</language>`,
  });
}
