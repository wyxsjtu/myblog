export const SITE = {
  title: '我的博客',
  description: '记录技术、思考与生活',
  author: '你的名字',
  bio: '一句话介绍自己。可以是身份、兴趣，或者正在做的事。',
  url: 'https://example.com',
  locale: 'zh-CN',
  // 建站日期，用于站点统计
  launchDate: '2026-05-07',
  // 导航
  nav: [
    { label: '首页', href: '/' },
    { label: '文章', href: '/posts/' },
    { label: '标签', href: '/tags/' },
    { label: '关于', href: '/about/' },
  ],
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
    // 关闭则只显示文章数/标签数/建站天数
    busuanzi: false,
  },
} as const;
