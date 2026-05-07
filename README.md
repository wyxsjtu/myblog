# myblog

基于 [Astro](https://astro.build/) 构建的个人博客，部署在 [Cloudflare Pages](https://pages.cloudflare.com/)。

## 特性

- Markdown 写作，前端使用 Astro Content Collections 强类型校验
- 深色模式（跟随系统 / 手动切换 / localStorage 持久化，无 FOUC）
- 标签分类、按标签浏览、文章列表分页
- Shiki 代码高亮，浅色/深色主题双套配色
- RSS 订阅（`/rss.xml`）+ Sitemap（`/sitemap-index.xml`）
- 完整 SEO meta：canonical、Open Graph、Twitter Card

## 本地开发

```bash
# 安装依赖（任选其一）
npm install
# 或
pnpm install

# 启动开发服务器（默认 http://localhost:4321）
npm run dev

# 构建生产版本到 ./dist
npm run build

# 预览构建产物
npm run preview
```

## 写文章

在 `src/content/posts/` 下新建 `.md` 文件，文件名即 URL slug。例如 `src/content/posts/my-post.md` 对应 `/posts/my-post/`。

frontmatter 字段：

```yaml
---
title: 文章标题（必填）
description: 一句话摘要（可选，影响首页/SEO）
pubDate: 2026-05-07          # 必填
updatedDate: 2026-05-08      # 可选
tags: [标签一, 标签二]         # 可选
draft: false                 # 可选，true 则仅在 dev 显示
cover: /images/cover.jpg     # 可选，封面图
---
```

## 自定义站点信息

编辑 [src/consts.ts](src/consts.ts)：标题、描述、作者、社交链接、导航、每页文章数。

修改站点 URL：编辑 [astro.config.mjs](astro.config.mjs) 的 `site` 字段，并同步更新 [public/robots.txt](public/robots.txt) 中的 sitemap 地址。

## 部署到 Cloudflare Pages

### 方式一：Git 集成（推荐）

1. 把仓库推送到 GitHub / GitLab
2. 登录 Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. 选中本仓库，构建配置：
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: 设置环境变量 `NODE_VERSION=20`（或更高）
4. 点击 **Save and Deploy**，每次 push 到主分支会自动构建发布

### 方式二：Wrangler CLI 直接部署

```bash
# 安装 wrangler（一次性）
npm install -g wrangler

# 登录
wrangler login

# 构建
npm run build

# 部署
wrangler pages deploy dist --project-name=myblog
```

### 自定义域名

在 Cloudflare Pages 项目页面 → **Custom domains** → **Set up a custom domain**，添加你的域名后按指引配置 DNS（如果域名已托管在 Cloudflare，会自动配置）。

部署后记得把 [astro.config.mjs](astro.config.mjs) 的 `site` 改为你的真实域名，否则 sitemap 和 RSS 中的链接会指向占位符。

## 项目结构

```
myblog/
├── astro.config.mjs        # Astro 配置（含站点 URL、sitemap、shiki 主题）
├── package.json
├── tsconfig.json
├── public/                 # 静态资源（直接拷贝到根）
│   ├── favicon.svg
│   └── robots.txt
└── src/
    ├── consts.ts           # 站点配置（标题、导航、社交链接等）
    ├── content.config.ts   # Content Collections schema
    ├── env.d.ts
    ├── components/         # 可复用组件
    ├── layouts/            # 布局
    │   ├── BaseLayout.astro
    │   └── PostLayout.astro
    ├── pages/              # 路由
    │   ├── index.astro             # 首页
    │   ├── about.astro             # 关于
    │   ├── 404.astro
    │   ├── rss.xml.ts              # RSS
    │   ├── posts/
    │   │   ├── index.astro         # 文章列表第 1 页
    │   │   ├── [...slug].astro     # 文章详情
    │   │   └── page/[page].astro   # 分页 2..N
    │   └── tags/
    │       ├── index.astro         # 标签云
    │       └── [tag].astro         # 单个标签
    ├── content/posts/      # 博文 Markdown
    ├── styles/global.css   # 全局样式 + 主题变量
    └── utils/posts.ts      # 文章/标签工具
```

## 许可

MIT
