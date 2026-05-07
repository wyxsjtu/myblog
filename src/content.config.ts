import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    title: z.string(),
    // authors 用字符串方便排版（可在自己名字加上 **）
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    // CCF 评级：A / B / C；非 CCF 收录可填 SCI / 其它
    ccf: z.enum(['A', 'B', 'C', 'SCI', 'None']).default('None'),
    // 类型：会议 / 期刊 / 预印本 / 专利 / 其他
    type: z.enum(['conference', 'journal', 'preprint', 'patent', 'other']).default('conference'),
    abstract: z.string().optional(),
    // 各类下载/外链
    links: z
      .object({
        pdf: z.string().optional(),
        code: z.string().optional(),
        slides: z.string().optional(),
        video: z.string().optional(),
        arxiv: z.string().optional(),
        doi: z.string().optional(),
        bibtex: z.string().optional(),
        project: z.string().optional(),
      })
      .default({}),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, research };
