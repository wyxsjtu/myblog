---
title: 在 Astro 中使用代码高亮
description: 演示 Markdown 中的代码块如何渲染，以及深色模式适配。
pubDate: 2026-05-06
tags:
  - Astro
  - 前端
---

Astro 内置了 [Shiki](https://shiki.style/) 代码高亮，无需额外配置即可获得 VS Code 级别的语法着色。

## TypeScript 示例

```ts
type User = {
  id: number;
  name: string;
};

async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error('请求失败');
  return res.json();
}
```

## Python 示例

```python
def fibonacci(n: int) -> int:
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print([fibonacci(i) for i in range(10)])
```

## Shell 示例

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

切换右上角的主题按钮，可以看到代码块在深色/浅色模式下使用不同的配色。

## 行内代码

像 `const x = 1` 这样的行内代码也有样式区分。
