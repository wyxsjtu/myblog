---
title: Astro 5 内容层 API 体验
description: 从 Content Collections 升级到 Content Layer 之后的几个真实变化。
pubDate: 2026-04-10
category: 技术
tags:
  - Astro
  - 前端
---

Astro 5 把原本写在 `src/content/config.ts` 的 schema 拆成了 loader + schema 两个职责。看起来像在折腾，但用过一阵后会发现：**它把"内容来自哪里"这件事抽象出来了**。

## 旧写法

```ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',  // 必须是文件
  schema: z.object({ ... }),
});
```

`type: 'content'` 隐含"内容必须来自 src/content/posts 下的 md 文件"。换数据源（CMS、数据库、API）就要换框架。

## 新写法

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({ ... }),
});
```

`loader` 可以是 `glob`、`file`，也可以是任意 async 函数。换成 Notion / Sanity / 自己写的 fetch，集合定义不变，下游所有页面代码也不变。

## 实际带来的好处

最直接的：草稿期可以先写本地 md 文件，正式发布后切到 CMS，路由和组件零改动。

## 一个小坑

升级时记得把 `src/content/config.ts` 改名为 `src/content.config.ts`（在 src 根目录，不在 content 下）。这是 5.0 的位置变化，文档没强调。
