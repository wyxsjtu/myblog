---
title: 为什么我选 Cloudflare Pages 而不是 Vercel
description: 个人博客部署平台对比，记录选择 Cloudflare Pages 的几个理由。
pubDate: 2026-04-28
category: 技术
tags:
  - Cloudflare
  - 部署
  - 工具链
---

迁博客时在 Vercel 和 Cloudflare Pages 之间犹豫了一阵，最后选了后者。理由如下：

## 免费额度更宽裕

Vercel 商业用途要付费，免费版还有 100GB 带宽 / 月的限制。Cloudflare Pages 的带宽**没有上限**，只是构建次数有限制（500 次 / 月，对个人博客绰绰有余）。

## 国内访问体验

Cloudflare 在国内有不少节点，平均延迟比 Vercel 更稳定。代价是偶尔会被某些 ISP 限速，但总体好于 Vercel。

## 与 Workers 无缝集成

如果将来需要加评论、订阅、API 之类的动态功能，Cloudflare Workers 是天然的搭档：

```ts
export default {
  async fetch(request, env) {
    return new Response('Hello from Workers!');
  },
};
```

部署到同一个域名下，无需 CORS 处理。

## 缺点

- 构建日志不如 Vercel 直观
- 自定义构建环境的灵活度稍差
- 不支持 ISR（增量静态再生成），但对纯静态博客无影响

总体而言，对个人博客这种"写完就基本不动"的场景，Cloudflare Pages 是更划算的选择。
