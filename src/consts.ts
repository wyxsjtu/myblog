export const SITE = {
  title: '我的博客',
  description: '记录技术、思考与生活',
  author: '你的名字',
  bio: '一句话介绍自己。可以是身份、兴趣，或者正在做的事。',
  // 学术 / 工作所属机构
  school: '上海交通大学',
  // 所在城市/地区（多个用 · 分隔即可）
  location: '北京 · 上海',
  // 侧边栏头像图片路径（留空则显示「姓名首字母」渐变占位）
  // 推荐使用 5:7 证件照比例的图片，放在 public/ 下
  avatarImage: '',
  url: 'https://example.com',
  locale: 'zh-CN',
  // 建站日期（保留：将来可能在「关于」页用到）
  launchDate: '2026-05-07',
  // 内容许可：会显示在底栏
  license: {
    name: 'CC BY-NC-SA 4.0',
    href: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh',
  },
  // 简历 PDF 路径（放在 public/ 下）
  resumePdf: '/resume.pdf',
  // 简历图片备用：当 PDF 无法内嵌显示时回退展示
  resumeImage: '/resume.png',
  // 顶栏导航
  nav: [
    { label: '首页', href: '/' },
    { label: '文章', href: '/posts/' },
    { label: '研究', href: '/research/' },
    { label: '个人简介', href: '/profile/' },
    { label: '关于', href: '/about/' },
  ],
  // 文章分类
  categories: ['技术', '生活', '思考'] as readonly string[],
  // 社交联系方式（留空则不显示）
  social: {
    github: 'https://github.com/yourname',
    email: '18588297218@sjtu.edu.cn',
    // 微信号：将在侧边栏图标点击时复制到剪贴板
    wechat: '18801354216',
    twitter: '',
  },
  // 每页文章数
  postsPerPage: 10,
  // 侧边栏 widgets 控制
  sidebar: {
    profile: true,
    recentPosts: true,
    popularTags: true,
    stats: true,
    busuanzi: true,
  },
} as const;
