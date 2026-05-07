export const SITE = {
  title: '我的博客',
  description: '记录技术、思考与生活',
  author: '你的名字',
  bio: '一句话介绍自己。可以是身份、兴趣，或者正在做的事。',
  url: 'https://example.com',
  locale: 'zh-CN',
  // 建站日期（保留：将来可能在「关于」页用到）
  launchDate: '2026-05-07',
  // 简历 PDF 路径（放在 public/ 下）
  resumePdf: '/resume.pdf',
  // 简历图片备用：当 PDF 无法内嵌显示时回退展示
  // 可使用 PDF 第一页的截图（建议宽度 1200-1600px）
  resumeImage: '/resume.png',
  // 顶栏导航（标签页面仍然存在，从侧边栏的「热门标签」进入）
  nav: [
    { label: '首页', href: '/' },
    { label: '文章', href: '/posts/' },
    { label: '研究', href: '/research/' },
    { label: '简介', href: '/profile/' },
    { label: '关于', href: '/about/' },
  ],
  // 文章分类：按此顺序在文章列表页显示分类筛选
  // 文章 frontmatter 中 category 不在此列表中的会归入「其他」
  categories: ['技术', '生活', '思考'] as readonly string[],
  // 社交链接（留空则不显示）
  social: {
    github: 'https://github.com/yourname',
    email: '[REDACTED_EMAIL]',
    twitter: '',
  },
  // 每页文章数
  postsPerPage: 10,
  // 侧边栏 widgets 控制（可单独关闭某项）
  sidebar: {
    profile: true,
    recentPosts: true,
    popularTags: true,
    stats: true,
    // 是否启用「不蒜子」匿名访问统计（无需注册，加载其 JS 即可）
    busuanzi: true,
  },
} as const;
