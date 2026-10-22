# AI 工具策展 · AI Agents & Skills Hub

> 一个把 GitHub 上高星 AI Agent 与 Skill 项目**按功能分类、中文可读、随时可查**的策展站点。

## 项目介绍

AI 工具策展是一个面向「想快速找到好用的 AI 工具」的人的精选目录。它从 GitHub 采集 stars > 1000 的 AI Agent 框架、AI 助手 Skills、MCP 生态与多模态工具项目，按功能领域归类后统一呈现，每个条目都配有：

- 中英双语一句话简介（知道它到底是干嘛的）
- 实时 Stars 数量与「完整程序 / 调用 API 即可」标识
- 分类、子分类、标签与关键词，便于检索
- 一键启动指令（含「指令不清先与你确认」的安全后缀）、使用指南、Gitee 镜像、在线 Demo 入口

## 功能定位

| 维度 | 定位 |
|------|------|
| **为谁做** | 研究者、独立开发者、AI 爱好者 —— 想少踩坑、快速发现经过筛选的高质 AI 工具 |
| **解决什么** | GitHub 项目海量且杂乱、英文为主、更新快；本站做「筛选 + 中文化 + 结构化」 |
| **核心能力** | ① 侧栏常驻分类导航（分类固定钉住） ② 全局搜索 + Stars/名称排序 ③ GitHub 今日趋势与编辑精选 ④ 完整项目列表（可过滤）⑤ 入门教程（工具下载 + 免费 Token 配置）⑥ 项目详情弹窗（介绍/启动/指南/镜像/Demo） |
| **不做** | 不重复造工具、不主观打分排名、不收录低星或无法验证的项目 |
| **设计语言** | Editorial Ink 编辑风（纸感浅底 + 暖琥珀强调色 + Fraunces/Manrope/JetBrains Mono），禁 emoji 图标、结构清晰 |

## 首页板块

1. **Hero** — 一句话定位 + 开始探索入口
2. **完整项目列表** — 首屏主板块：搜索 / 排序 / 分类筛选后的全部项目（默认全部分类）
3. **GitHub 今日趋势** — 实时热门仓库（优先展示，无数据回退编辑精选）
4. **编辑精选** — 每个分类的代表性项目
5. **数据一览** — 项目数 / 总星数 / 分类数统计
6. **入门教程** — 工具下载、三步安装、9 个免费 Token 平台配置指引

> 分类导航固定在左侧栏（常驻列表版），首页不再单独设「分类浏览」网格，避免入口重复。

## 技术栈

- **框架**：Vite 6 + React 19 + TypeScript
- **样式**：Tailwind CSS 3（Editorial Ink 令牌层，仅改令牌即可换肤）
- **图标**：lucide-react
- **数据**：静态 JSON（`public/data/`），脚本定期更新 Stars

## 本地运行

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # 生产构建到 dist/
npm run preview    # 预览构建产物
```

## 数据更新

```bash
npm run update:stars            # 匿名（60 次/小时）
GITHUB_TOKEN=xxx npm run update:stars   # 带 Token（5000 次/小时）
```

Stars 为采集时点近似值，详见 [`docs/README.md`](docs/README.md)（内部规划文档）。

## 部署

`dist/` 为纯静态产物，可部署到 GitHub Pages / Vercel / Netlify / 宝塔 + Nginx 等任意静态托管。

## License

MIT
