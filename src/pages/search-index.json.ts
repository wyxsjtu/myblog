import type { APIRoute } from 'astro';
import { getAllPosts, normalizeCategory } from '../utils/posts';
import { getAllPapers } from '../utils/research';

export interface SearchDoc {
  id: string;
  type: 'post' | 'paper';
  title: string;
  excerpt: string;
  url: string;
  // 用于匹配的额外字段（不展示，只参与 includes）
  haystack: string;
  // 显示用 meta
  meta: string;
}

const stripMd = (md: string) =>
  md
    .replace(/```[\s\S]*?```/g, ' ')          // 去代码块
    .replace(/`[^`]*`/g, ' ')                  // 去内联代码
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')     // 去图片
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // 链接保留文字
    .replace(/[#>*_~\-]+/g, ' ')               // 去常见 md 标记
    .replace(/\s+/g, ' ')                      // 折叠空白
    .trim();

export const GET: APIRoute = async () => {
  const [posts, papers] = await Promise.all([getAllPosts(), getAllPapers()]);

  const docs: SearchDoc[] = [];

  for (const post of posts) {
    const cat = normalizeCategory(post.data.category);
    const body = stripMd(post.body ?? '');
    const excerpt = (post.data.description ?? body).slice(0, 160);
    docs.push({
      id: `post:${post.id}`,
      type: 'post',
      title: post.data.title,
      excerpt,
      url: `/posts/${post.id}/`,
      haystack: [
        post.data.title,
        post.data.description ?? '',
        cat,
        post.data.tags.join(' '),
        body.slice(0, 2000),
      ].join(' ').toLowerCase(),
      meta: `${cat} · ${post.data.pubDate.toISOString().slice(0, 10)}`,
    });
  }

  for (const paper of papers) {
    const body = stripMd(paper.body ?? '');
    const excerpt = (paper.data.abstract ?? body).slice(0, 160);
    const ccfTag =
      paper.data.ccf === 'None' ? '' : ` · CCF-${paper.data.ccf}`;
    docs.push({
      id: `paper:${paper.id}`,
      type: 'paper',
      title: paper.data.title,
      excerpt,
      url: '/research/',
      haystack: [
        paper.data.title,
        paper.data.authors,
        paper.data.venue,
        paper.data.abstract ?? '',
        body.slice(0, 1000),
      ].join(' ').toLowerCase(),
      meta: `${paper.data.venue} · ${paper.data.year}${ccfTag}`,
    });
  }

  return new Response(JSON.stringify(docs), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
