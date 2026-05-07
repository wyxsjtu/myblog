export const SITE = {
  title: '我的博客',
  description: '记录技术、思考与生活',
  author: '你的名字',
  url: 'https://example.com',
  locale: 'zh-CN',
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
    email: 'you@example.com',
    twitter: '',
  },
  // 每页文章数
  postsPerPage: 10,
} as const;
