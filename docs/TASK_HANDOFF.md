# AI Agents Hub · 任务交接文档

> **用途**：供新会话窗口快速了解项目背景、当前状态与后续改进方向
> **最后更新**：2026-07-16
> **项目路径**：`d:\AI\project\IdeaCreate\ai-agents-hub`

---

## 1. 项目概述

### 目标
整理 GitHub 上高 stars（>1000）的 AI Agent 与 Skill 项目，构建一个**策展型导航网站**：
- 按功能分类（编程代码、视频剪辑、文档撰写、PPT 制作、浏览器自动化等）
- 每个条目含：原 URL、中英双语介绍（1-2 句）、stars 数、标签
- 风格简洁清晰，**Vogue 式编辑策展 + ai-bot.cn 式导航实用性**的混合型

### 定位
- **不是**工具导航站（工具大全式罗列）
- **是**编辑策展型首页（Spotlight + Trending + 分类网格 + 完整列表 + 数据一览）

### 交付路径
1. 本地完成 ✅
2. GitHub 仓库 ✅（cannotcodetao/ai-agents-hub）
3. Vercel 部署 ✅（但国内访问不稳定）

---

## 2. 技术栈

| 层 | 技术 | 版本 | 备注 |
|---|---|---|---|
| 构建 | Vite | **6.x**（非 8） | Vite 8 有 native binding bug，降级到 6 |
| 框架 | React | 19 | |
| 语言 | TypeScript | 5.x | 严格模式 |
| 样式 | Tailwind CSS | 3.x | 自定义 paper/ink/accent 色板 |
| 图标 | lucide-react | latest | 注意 `Github` 图标不存在，用 `ExternalLink` |
| 数据 | 静态 JSON | - | 通过 `scripts/update-stars.mjs` 定期更新 |

---

## 3. 设计系统

### 色板（tailwind.config.js）
| 名称 | 色值 | 用途 |
|---|---|---|
| `paper` | `#FAFAF7` | 暖白底色（主背景） |
| `ink` | `#1A1A1A` | 深灰文字（主标题） |
| `ink2` | `#4A4A4A` | 次级文字 |
| `ink3` | `#8A8A8A` | 辅助文字 |
| `line` | `#E5E5E0` | 主分隔线 |
| `line2` | `#D5D5D0` | 次分隔线 |
| `accent` | `#C8462C` | **朱红强调色（Vogue 标志色）** |

### 排版规则
- **标题**：`heading-display` 类（Georgia 衬线字体）
- **数字**：`tnum` 类（tabular-nums，等宽数字）
- **技术数据**：`font-mono`
- **Section 标签**：`section-label` 类（小号大写字母）

### 布局
- 容器：`container-x`（左右内边距响应式）
- 网格分隔：用 `gap-px bg-line` 实现 1px 分隔线效果
- 卡片悬停：`hover:bg-white` + `group-hover:text-accent`

---

## 4. 项目结构

```
ai-agents-hub/
├── data/
│   └── agents.json              # ★ 项目数据（分类 + 条目）
├── scripts/
│   └── update-stars.mjs         # GitHub API stars 更新脚本
├── src/
│   ├── assets/                  # 静态资源
│   ├── components/
│   │   ├── Hero.tsx             # 顶部 Hero（标题+描述+探索按钮）
│   │   ├── Spotlight.tsx        # 编辑精选（6个featured项目）
│   │   ├── Trending.tsx         # Top 10 by stars 列表
│   │   ├── CategoryGrid.tsx     # 分类网格（11个分类卡片）
│   │   ├── ExploreToolbar.tsx   # 探索工具栏（搜索+排序+分类tab）
│   │   └── AgentCard.tsx        # 项目卡片（列表式）
│   ├── App.tsx                  # ★ 主应用（含底部统计区块）
│   ├── main.tsx                 # 入口
│   ├── types.ts                 # 类型定义
│   └── index.css                # 全局样式 + Tailwind layers
├── docs/
│   └── TASK_HANDOFF.md          # 本文档（不入 git）
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 5. 数据模型（data/agents.json）

### 顶层结构
```json
{
  "curation": {
    "featured": ["cline/cline", "langchain-ai/langchain", ...],  // 6个精选
    "editorNote": "...",
    "updatedAt": "2026-07-13"
  },
  "categories": [ /* 11 个分类 */ ],
  "agents": [ /* ~105 个项目 */ ]
}
```

### 11 个分类（当前）
| id | 中文名 | 英文名 | 图标 |
|---|---|---|---|
| `coding` | 编程代码 | Coding | Code2 |
| `framework` | 框架平台 | Framework | Boxes |
| `video` | 视频剪辑 | Video | Video |
| `document` | 文档撰写 | Document | FileText |
| `presentation` | PPT 制作 | Presentation | Presentation |
| `content` | 账号内容 | Content Creation | PenTool |
| `productivity` | 办公效率 | Productivity | Zap |
| `multimodal` | 多模态 Agent | Multimodal | Image |
| `skills` | Skills 生态 | Skills Ecosystem | Puzzle |
| `browser` | **浏览器自动化** | Browser Automation | **Globe**（新增） |
| `other` | 其他 | Other | LayoutGrid |

### Agent 条目结构
```typescript
interface Agent {
  name: string;              // 短名
  fullName: string;          // owner/repo
  url: string;               // GitHub URL
  descriptionEn: string;     // 英文介绍
  descriptionZh: string;     // 中文介绍
  stars: number;             // star 数
  category: string;          // 分类 id
  subcategory: string;       // 中文子分类
  subcategoryEn: string;     // 英文子分类
  tags: string[];            // 标签数组
}
```

---

## 6. 三轮迭代历史

### 第 1 轮：项目初始化
- 创建 Vite + React + TS 项目
- 基础组件骨架（Hero, CategoryGrid, AgentCard）
- 初版 agents.json（约 75 个项目）

### 第 2 轮：视觉重设计（参考 Vogue + ai-bot.cn）
- **分析 Vogue**：杂志式编辑感、大图 + 编辑区块、黑白极简、Georgia 衬线
- **分析 ai-bot.cn**：工具导航站实用主义、15+ 分类、紧凑卡片、多 tab
- **设计决策**：策展优先（首页）+ 导航实用（探索区）的混合型
- 新增 `Spotlight`（编辑精选）、`Trending`（Top 10）组件
- 建立色板（paper/ink/accent）与排版系统

### 第 3 轮：数据扩展 + 布局优化（本次会话）
- **数据扩展**：通过 GitHub Search API（PowerShell `Invoke-RestMethod`）搜索新增 30+ 项目
  - 浏览器自动化 16 个（Agent Browser, Nanobrowser, CamoFox 等）
  - 桌面控制 3 个（CUA, Open Computer Use, BitFun）
  - 数据分析 3 个（LobsterAI, Data-Analysis-Agent, DATAGEN）
  - DevOps 2 个（Woodpecker CI, create-pull-request）
  - 知识库平台 7 个（Langchain-Chatchat, FastGPT 等）
  - 研究写作 2 个（FAROS, medical-research-skills）
- **新增 `browser` 分类**（icon: Globe）
- **Hero 布局调整**：移除底部 stats，"开始探索"按钮移到描述文字旁
- **分类 tab 加粗**：`font-semibold` + `px-3 py-2` + hover 边框
- **底部统计区块**：在 footer 前新增"数据一览"（项目数 / 总 Stars / 分类数）

---

## 7. 已完成改动清单（第 3 轮）

| 文件 | 改动 | 状态 |
|---|---|---|
| `data/agents.json` | 新增 browser 分类 + 30+ 项目 | ✅ |
| `src/components/Hero.tsx` | 移除 stats 块和 props，按钮移到描述旁 | ✅ |
| `src/components/ExploreToolbar.tsx` | tab 改为 `font-semibold`、padding 加大、hover 效果 | ✅ |
| `src/components/CategoryGrid.tsx` | 添加 `Globe` 图标到 iconMap | ✅ |
| `src/App.tsx` | 添加底部统计区块（三栏：项目/Stars/分类） | ✅ |
| `.gitignore` | 排除 `docs/` 目录 | ✅ |

### 构建状态
- `npm run build` ✅ 成功（tsc + vite build，1793 modules，23.65s）
- 浏览器验证 ✅ 7 项全部 PASS

---

## 8. 错误与解决方案（历史）

| 错误 | 原因 | 解决 |
|---|---|---|
| Vite 8 native binding error | rolldown 可选依赖 bug | 降级 `vite@6 @vitejs/plugin-react@4` |
| `lucide-react` 无 `Github` 导出 | 命名问题 | 改用 `ExternalLink` |
| TS6133 未使用变量 | strict mode | 移除或在显示中使用 |
| `gh` CLI 未安装 | 环境缺失 | 改用 PowerShell `Invoke-RestMethod` 调 GitHub REST API |
| Git heredoc 在 PowerShell 失败 | 多行解析问题 | 改用单行 commit message |
| Git commit 无 user identity | 未配置 | **需用户配置** `git config user.name/user.email` |
| `index.html` 双击打开空白 | Vite SPA 的 `<script type="module">` 不支持 `file://` | 必须用 `npm run dev` 或 `npm run preview`，或配置 `base: './'` |

---

## 9. 关键约束（来自 project_memory）

- **项目文件与规划文件分离**：规划文件不入 git（已通过 .gitignore 排除 `docs/`）
- **不创建临时规划文件**：避免过度文件创建
- **HTML 文件需完整读取**：不能只读前 2KB，确保 JS 控制器正常
- **用户沟通语言**：中文
- **代码风格**：最小改动优于完全重写
- **指令不清时**：先与用户确认再执行

---

## 10. 待办与改进建议

### 🔴 高优先级（用户已提及或必要）

1. **部署优化（国内访问）
   - Vercel 在国内网络访问不稳定
   - 备选方案：GitHub Pages / Cloudflare Pages / 国内静态托管

2. **趋势榜数据准确性**
   - weekGrowth 首次对比数据偏差较大（prevStars 基准较旧）
   - 需配置 GITHUB_TOKEN 后跑完整一轮 update:stars 并 update:stars:weekly 重置基准
   - 命令：`$env:GITHUB_TOKEN="ghp_xxx"; npm run update:stars`

3. **TASK_HANDOFF.md 内容更新**
   - 文档内容仍停留在第3轮迭代状态，需同步到当前13个分类、182个项目的最新状态

### 🟡 中优先级（改进优化）

3. **搜索体验优化**
   - 当前搜索仅支持文本匹配，可加：分类筛选 + tags 多选 + stars 范围
   - 加搜索结果高亮

4. **移动端适配审查**
   - 当前用了响应式类，但需实际测试移动端体验
   - 分类 tab 横向滚动在移动端可能不够顺滑

5. **数据维护流程**
   - `scripts/update-stars.mjs` 已就绪
   - 建议每月跑一次更新 stars
   - 命令：`$env:GITHUB_TOKEN="ghp_xxx"; npm run update:stars`

6. **项目条目质量审查**
   - 部分新加项目 stars 可能已变化
   - 描述可进一步精炼
   - subcategory 可统一规范

### 🟢 低优先级（锦上添花）

7. **暗色模式**（dark mode）
8. **项目详情页**（点击卡片展开更多信息）
9. **对比视图**（多个项目并排比较）
10. **Star 历史图表**（用 star-history.com 数据）
11. **PWA 支持**（离线访问）
12. **i18n 完整国际化**（中英切换）

---

## 11. 命令速查

```bash
# 开发
npm run dev          # http://localhost:5173
npm run build        # 生产构建到 dist/
npm run preview      # 预览构建产物 http://localhost:4173

# 数据更新
npm run update:stars
# Windows PowerShell 带 Token:
$env:GITHUB_TOKEN="ghp_your_token"; npm run update:stars

# Git（需先配置 user.name 和 user.email）
git init
git add .
git commit -m "Initial commit: AI Agents Hub"
git remote add origin https://github.com/你的用户名/ai-agents-hub.git
git push -u origin main
```

---

## 12. 给新窗口 AI 的指引

### 快速上下文恢复
1. 读本文档了解项目全貌
2. 读 `data/agents.json` 了解数据结构
3. 读 `src/App.tsx` 了解组件组合
4. 读 `tailwind.config.js` 了解设计系统

### 当前状态
- 项目**功能完整**，构建通过，浏览器验证通过
- **等待用户**：配置 git 身份并提交到远程仓库

### 如果用户要求继续改进
- 优先确认改进方向（参考第 10 节待办清单）
- 任何改动后必须 `npm run build` 验证
- 涉及数据新增时，确保 `category` 字段匹配 `categories` 数组中的 id
- 涉及图标时，先确认 `lucide-react` 是否导出该图标

### 如果用户要求新功能
- 先在本文档第 10 节添加待办项
- 实现后更新本文档第 7 节（已完成改动清单）

### 沟通规则
- **语言**：中文
- **风格**：简洁直接，不啰嗦
- **不确定时**：先问用户，不要猜测
- **代码注释**：中文为主，技术术语保留英文

---

## 13. 参考资源

- **Vogue 中国**：https://www.vogue.com.cn/ （视觉语言参考）
- **ai-bot.cn**：https://ai-bot.cn/ （导航实用性参考）
- **GitHub Search API**：`https://api.github.com/search/repositories?q=QUERY&sort=stars&order=desc`
- **star-history.com**：https://star-history.com （star 历史图表）
- **lucide-react 图标库**：https://lucide.dev/icons/

---

**文档结束** · 如需更新本文档，请保持高密度、结构化、可操作性原则。
