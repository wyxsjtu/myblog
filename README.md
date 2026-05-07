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
category: 技术                # 可选，默认「技术」；可选值见 src/consts.ts 的 SITE.categories
tags: [标签一, 标签二]         # 可选
draft: false                 # 可选，true 则仅在 dev 显示
cover: /images/cover.jpg     # 可选，封面图
---
```

文章分类决定文章列表页（`/posts/`）顶部的筛选条目。可在 [src/consts.ts](src/consts.ts) 的 `SITE.categories` 中调整顺序、增删分类。category 不在该列表中的文章会归入「其他」。

## 添加研究成果

在 `src/content/research/` 下新建 `.md` 文件（文件名仅作标识，不会出现在 URL）。所有论文统一展示在 `/research/` 页面，按年份分组、显示 CCF 评级。

frontmatter 字段：

```yaml
---
title: 论文标题（必填）
authors: "Zhang San, **本人**, Li Si"   # 用 **xxx** 加粗自己的名字
venue: ICML 2026                       # 会议/期刊全称
year: 2026                             # 必填
ccf: A                                 # A | B | C | SCI | None
type: conference                       # conference | journal | preprint | patent | other
abstract: 一段简短摘要（2-4 句）         # 可选
links:                                 # 全部可选，按需填写
  pdf: /papers/xxx.pdf                 # 放在 public/papers/ 下
  arxiv: https://arxiv.org/abs/xxx
  doi: https://doi.org/xxx
  code: https://github.com/...
  project: https://example.com/project
  slides: /papers/xxx-slides.pdf
  video: https://youtu.be/xxx
  bibtex: /papers/xxx.bib
featured: true                         # 可选，true 时论文卡片高亮显示「代表作」
draft: false                           # 可选，true 则仅在 dev 显示
---
```

PDF、Slides、BibTeX 等本地文件统一放在 `public/papers/` 目录下，前端通过相对路径 `/papers/xxx.pdf` 访问。

## 简历

简介页 `/profile/` 的展示策略：

1. 优先用 `<object>` 内嵌 [public/resume.pdf](public/) 的 PDF
2. 浏览器无法内嵌（手机、未安装 PDF 插件等）时，自动 fallback 显示 [public/resume.png](public/) 简历图片（建议是 PDF 第一页的截图，宽度 1200-1600px）
3. 图片也加载失败时，再降级为下载链接提示

无论展示状态如何，「下载 PDF 简历」按钮始终可用。

修改路径：编辑 [src/consts.ts](src/consts.ts) 的 `SITE.resumePdf` / `SITE.resumeImage`。

## 搜索

顶栏的搜索按钮（或快捷键 `/` / `Cmd+K` / `Ctrl+K`）打开搜索框，可同时搜索文章和研究成果。

实现细节：
- 构建时生成 [public/search-index.json](http://localhost/search-index.json)，包含所有文章和论文的标题、摘要、内容片段、分类、标签等
- 客户端首次打开搜索框时拉取索引，做大小写不敏感的多关键词匹配，标题命中权重高于内容
- ↑/↓ 选中、Enter 打开、Esc 关闭

## 自定义站点信息

编辑 [src/consts.ts](src/consts.ts)：标题、描述、作者、社交链接、导航、简历路径、侧边栏 widgets 开关。

修改站点 URL：编辑 [astro.config.mjs](astro.config.mjs) 的 `site` 字段，并同步更新 [public/robots.txt](public/robots.txt) 中的 sitemap 地址。

## 访问统计（不蒜子）

侧边栏「站点」卡片的「浏览」「访客」依赖第三方匿名统计服务 [busuanzi](https://busuanzi.ibruce.info/)，无需注册。

如需关闭，将 [src/consts.ts](src/consts.ts) 中 `SITE.sidebar.busuanzi` 改为 `false`。

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
    ├── content/
    │   ├── posts/          # 博文 Markdown
    │   └── research/       # 研究成果元数据 Markdown
    ├── styles/global.css   # 全局样式 + 主题变量
    └── utils/
        ├── posts.ts        # 文章/标签工具
        └── research.ts     # 论文/分组工具
```

## 许可

MIT
