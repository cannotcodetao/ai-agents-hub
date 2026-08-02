# AI Agents & Skills Hub

> 收录 GitHub 高星 AI Agent 与 Skill 项目，按类别整理 · A curated collection of high-star AI agents and skills from GitHub
>
> 📋 **内部规划文档** 见 [`docs/README.md`](docs/README.md)（任务计划 / 进度日志 / 调研发现 / SOP / 历史归档）

## 项目简介 / Overview

本项目整理 GitHub 上 stars > 1000 的 AI Agent 框架与 AI 助手 Skills 生态项目，按功能分类展示，每个条目包含：

- 项目名称与仓库地址
- 中英双语功能介绍（1-2 句话）
- 实时 stars 数量
- 分类标签与关键词

## 分类体系 / Categories

| 分类 | 英文 | 说明 |
|------|------|------|
| 编程代码 | Coding | 代码助手、IDE 插件、自动化编程、代码审查 |
| 框架平台 | Framework | Agent 框架、多 Agent 系统、Agent 平台 |
| 视频剪辑 | Video | 视频生成、字幕处理、视频编辑、动画制作 |
| 文档撰写 | Document | 文档生成、知识管理、笔记、写作助手 |
| PPT 制作 | Presentation | 幻灯片生成、演示文稿、Markdown 演示 |
| 账号内容 | Content Creation | LLM 前端、角色对话、内容生成 |
| 办公效率 | Productivity | 工作流自动化、可视化 LLM 工作流 |
| 多模态 Agent | Multimodal | 图像生成 UI、语音识别、文本转语音 |
| Skills 生态 | Skills Ecosystem | Claude Skills、Cursor Rules、MCP Servers、Agent 集合 |
| 浏览器自动化 | Browser Automation | 浏览器 Agent、网页抓取、桌面自动化 |
| 创业顾问 | Entrepreneurship | YC Office Hours、AI 联合创始人、独立开发资源 |
| 去AI味道 | AI Humanizer | 去除 AI 生成痕迹、文本人性化、反 AI 检测 |
| 虚拟形象 | Virtual Avatar | AI 数字人、VTuber、Live2D、换脸、唇形同步 |
| 学术科研 | Academic Research | 论文写作、论文阅读、文献检索、科研自动化 |

## 技术栈 / Tech Stack

- **框架**: Vite 6 + React 19 + TypeScript
- **样式**: Tailwind CSS 3
- **图标**: lucide-react
- **数据**: 静态 JSON 文件，通过脚本定期更新 stars

## 本地运行 / Getting Started

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

开发服务器默认运行在 http://localhost:5173

## 数据更新 / Updating Stars

stars 数据会随时间变化，可通过脚本定期从 GitHub API 拉取最新数据：

```bash
# 匿名访问（限额 60 次/小时）
npm run update:stars

# 使用 GitHub Token（限额 5000 次/小时，推荐）
# Windows PowerShell
$env:GITHUB_TOKEN="ghp_your_token_here"; npm run update:stars

# Linux/macOS
GITHUB_TOKEN=ghp_your_token_here npm run update:stars
```

Token 获取方式：访问 https://github.com/settings/tokens 创建 Personal Access Token（无需勾选任何权限，public repo 读取只需基础权限）。

## 项目结构 / Project Structure

```
ai-agents-hub/
├── public/
│   └── data/
│       └── agents.json      # 项目数据（分类 + 条目）
├── scripts/
│   └── update-stars.mjs     # GitHub API stars 更新脚本
├── src/
│   ├── components/
│   │   ├── Header.tsx       # 顶部标题栏
│   │   ├── CategoryNav.tsx  # 分类导航
│   │   ├── SearchBar.tsx    # 搜索与排序
│   │   └── AgentCard.tsx    # 项目卡片
│   ├── App.tsx              # 主应用
│   ├── main.tsx             # 入口
│   ├── types.ts             # 类型定义
│   └── index.css            # 全局样式
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## 数据来源 / Data Sources

- GitHub 仓库官方页面
- [star-history.com](https://star-history.com)
- [awesome.ecosyste.ms](https://awesome.ecosyste.ms)
- 项目官方网站与文档

stars 数据为采集时点的近似值，可通过 `npm run update:stars` 获取最新数据。

## 部署 / Deployment

构建产物为纯静态文件，可部署到任意静态托管服务：

```bash
npm run build
# dist/ 目录即可部署到 GitHub Pages / Vercel / Netlify 等
```

## License

MIT
