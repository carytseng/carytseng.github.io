# CaryTseng Blog

基于 Hexo 的个人博客，使用 hexo-theme-shiro 主题。

## 环境要求

- Node.js >= 16
- Git

## 快速开始

```bash
# 安装依赖
npm install

# 本地预览
hexo server

# 生成静态文件
hexo generate

# 部署到 GitHub Pages
hexo deploy
```

## 项目结构

```
├── source/              # 博客内容源码
│   ├── _posts/          # 博文 (Markdown)
│   ├── blog_img/        # 博文图片
│   ├── about/           # 关于页面
│   ├── categories/      # 分类页面
│   └── tags/            # 标签页面
├── themes/
│   └── hexo-theme-shiro/ # 博客主题
├── _config.yml          # Hexo 配置
└── package.json
```

## 写作指南

### 新建文章

```bash
hexo new "文章标题"
```

文章会创建在 `source/_posts/` 目录下，使用 Markdown 编写。

### 添加图片

将图片放入 `source/blog_img/` 目录，引用方式：

```markdown
![](/blog_img/图片文件名.png)
```

### 摘要设置

在文章中使用 `<!-- more -->` 标记来设置摘要位置。

```markdown
这是摘要内容...

<!-- more -->

这是正文内容...
```

## 部署说明

博客通过 GitHub Actions 自动部署到 GitHub Pages：

- `source` 分支：博客源码
- `master` 分支：生成的静态文件（自动部署）

## 主题配置

主题配置位于 `themes/hexo-theme-shiro/_config.yml`，可修改：

- 网站标题、副标题
- 导航菜单
- 社交链接
- 深色模式切换
- 评论系统等