# 进度日志（progress）

## 2026-08-03 宝塔服务器安全加固清单（已定稿，待用户手动执行）

用户部署上线（宝塔面板，路径 `/www/wwwroot/ai-agents_hub`，服务器 `124.221.116.181`），宝塔安全扫描 63 分 / 20 风险。用户要求：不一键修复，整理逐项操作清单（HTML），先写文档再执行。

### 已确认前提
- 执行方式：**手动**（用户在宝塔面板逐项操作，不暴露服务器凭证给我）
- Web 服务：**Nginx**
- 架构：**纯静态，无 PHP / 无数据库**（PHP 危险函数、MySQL 远程限制等项不适用，已从清单剔除）

### 已落盘
- 新建 `docs/security-remediation.html`：Part 1 = 按「Nginx + 纯静态」预生成的推荐加固基线（20 项，真实有效）；Part 2 = 用户宝塔「实际 20 项」核对表（空模板，待填）
- 状态标记：**草稿 / 待核对**——因本环境无法读取截图，Part 1 非用户扫描的确切 20 条

### 阻塞点（已解除）
- 用户已贴出全部 20 项风险（实际服务器装了 PHP 8.2 + MySQL，与「纯静态」前提不符，属系统级服务）；用户手动解决 1 项，其余 19 项已定稿写入 `docs/security-remediation.html`。

### 下一步
1. 用户按定稿 HTML（`docs/security-remediation.html`）在宝塔 / SSH **手动逐项执行**（高危项 #2 防火墙、#14 sudoers 务必先看「执行前必读」）
2. 执行后用户回传新的宝塔扫描分数，我记录闭环并同步 `TASK_PLAN.md`（新增 Phase 12，标记 in_progress → complete）

### 2026-08-07 补充：手把手教程版（`docs/security-tutorial/index.html`）
- 用户反馈 `security-remediation.html` 步骤不够直观，要求做成更详细的手把手教程 + 截图占位符 + 可讨论编辑
- 新建 `docs/security-tutorial/` 目录 + `index.html`：**19 项全覆盖**，每项含：
  - 宝塔左侧菜单导航路径（带 CSS 模拟的深色侧栏示意图，高亮「安全」入口）
  - 分步编号操作说明
  - 可复制命令块（深色代码框 + 「复制整行」提示）
  - **截图占位符**（虚线框 + 图标 + 说明需截取的界面内容）
  - 验证方法（绿色 ✅ 框）+ 注意事项（黄色 ⚠️ 框）
  - 按 **5 组推荐执行顺序**排列：① SSH 加固（练手）→ ② 面板端口+防火墙（高危核心）→ ③ 特权文件+密码策略 → ④ 服务清理 → ⑤ 超时会话
- 含完整 TOC 目录（可点击跳转）+ 执行前必读警示 + 宝塔界面导航参考
- 关于图片标注：已告知用户我不能直接在图片上画红框；用 CSS UI 模拟图替代 + 截图占位框写清每步要求，用户后续补图
- **待用户**：执行时按占位符补截图 → 反馈最终扫描结果 → 我记录闭环

### 进度（截至 2026-08-03 23:47 · 已定稿）
- 全部 **20 项**已收齐：用户手动解决 1 项（#20，未提供详情），其余 **19 项已写入 `docs/security-remediation.html` 定稿版**（含等级 / 解决步骤 / 注意事项 / 执行顺序 / 关键警示）。
- 清单结构：执行前必读警示 → 执行顺序（10 步分阶段）→ 19 项操作表 → 已解决项 → 补充加固建议（HTTPS / 响应头 / 目录浏览 / 暴露文件）。
- **发现偏差（待用户确认）**：扫描显示服务器实装 **PHP 8.2 + MySQL(3306)**，与「纯静态无 PHP/DB」前提不符，属系统级服务。#3（MySQL 3306）、#7（PHP display_errors）是否真需处理，取决于业务是否使用；若仅宝塔自带、站点未用，可标记「忽略」或卸载。
- `vercel.json` 仍存在但与当前宝塔静态部署方式不一致，可后续清理。

## 2026-08-02 补刀（3 项 UI 修复）

针对用户截图与反馈，在 Phase 11 已推送的基础上再做 3 处修改：

### 1. 删除 Token 卡片右上角「已验证」badge ✅
- `src/components/Tutorials.tsx`
  - 移除 Token 卡片 JSX 里的 badge `<span>` 渲染
  - 移除不再使用的 `toneClasses` 常量
  - 保留 `TOKEN_PLATFORMS` 数据里的 `badge` / `tone` 字段，以备后续需要

### 2. 进入教程页自动滚动到「下载工具」区 ✅
- `src/components/Tutorials.tsx`
  - 顶部新增 `import { useEffect } from 'react'`
  - `Tutorials` 组件内加 `useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [])`
  - 根因：App.tsx 用条件渲染切换 `home` / `tutorials` 视图，浏览器会保留之前的 `window.scrollY`；之前点「入门教程」时如果首页滚动到下方，进入教程页就会直接落在「免费 Token 与 API 配置」区域

### 3. 教程页侧栏分类按钮可跨视图跳转 ✅
- `src/components/Sidebar.tsx`
  - SidebarProps 加 `onNavigateHomeCategory?: (id: string) => void`
  - 组件内新增 `handleCategoryClick(id)`：在教程页且传入回调时，先 `onClose()` 再调用跨视图回调；否则保持原 `onCategoryChange` 行为
  - 「全部」与每个分类 `<button>` 的 `onClick` 都改为 `handleCategoryClick`
- `src/App.tsx`
  - 新增 `handleNavigateHomeCategory(id)`：`setView('home')` + `setActiveCategory(id)` + `setSearchQuery('')` + 双 `rAF` + 80ms `setTimeout` → `scrollIntoView('#explore')`
  - Sidebar 调用点传入 `onNavigateHomeCategory={handleNavigateHomeCategory}`

### 校验与构建
- `check_caps_dup.py` → PASS w/ warnings（222/222 差异化，0 撞车）
- `check_data_sync.py` → PASS（data/ == public/data/）
- `npm run build` → 通过

### 提交
- `0f93377` 之后的 commit 已 push origin/main（commit 信息见下）

## 2026-08-02 新窗口执行（教程页 6 任务 · Phase 11）

按 `docs/TUTORIALS_TASKS_2026-08-02.md` 的执行 prompt 完成 A / B / B-4 / C / D / E / F-2，全部落地代码并通过构建。

### 任务 A · Sidebar 快捷导航跨视图修复 ✅
- `src/components/Sidebar.tsx`
  - line 1 新增 `import type { MouseEvent } from 'react'`
  - SidebarProps 加 `currentView?: 'home' | 'tutorials'`、`onNavigateHome?: (anchor: string) => void`
  - 组件内新增 `goAnchor(e, anchor)`：未接入回调时退回原生 href；接入后 `preventDefault` + `onClose()` + `onNavigateHome(anchor)`
  - 两个快捷导航 `<a>` 保留 href 兜底，加 `onClick`；`title` 按 `currentView` 区分文案
- `src/App.tsx`
  - 新增 `handleNavigateHome(anchor)`：`setView('home')` + `setSidebarOpen(false)` + 双 `requestAnimationFrame` + 80ms `setTimeout` 后 `querySelector(anchor).scrollIntoView({behavior:'smooth',block:'start'})`
  - Sidebar 调用点补 `currentView={view}` / `onNavigateHome={handleNavigateHome}`

### 任务 B · 删除教程页营销话术 ✅
- `Tutorials.tsx` 工具下载区 H2「用邀请链接，双方得奖励」→「下载工具」，其下说明段整段删除（section-label「工具下载」保留）
- Token 区 H2「注册即拿免费额度」→「免费 Token 与 API 配置」（与 section-label 对齐）
- Token 区段落改为「下面 9 个平台提供免费 API 额度，注册即可使用。」

### 任务 B-4 · Trae IDE / WorkBuddy 特征化介绍 ✅
- TOOLS 数组 `desc` 换成 1~2 句、体现「谁出的 / 干什么 / 适合谁」的介绍；`name` / `invite` / `official` / `os` 未动

### 任务 C · 卡片图标清理 ✅
- 删卡片右上角孤立 `<Download className="h-5 w-5 …" />`，外层 `flex items-start justify-between gap-3` → `flex items-start gap-3`
- 主按钮图标 `Gift` → `Download`
- 删「官网 ↗」链接（`<a href={t.official}>`）
- 顶部 import 移除已不再使用的 `Gift`（`ExternalLink` 仍被 Token 卡片使用，保留）

### 任务 D · 按钮文案重命名 ✅
- 按钮文本「用我的邀请链接」→「下载链接」
- 顶部注释改为「工具下载：用你的邀请链接直接下载（按钮显示为「下载链接」）」
- `invite` 字段值保持不变（仍是邀请链接）

### 任务 E · Token 平台卡片改平台介绍 ✅
- 9 条 `note` 全量替换为「平台定位 + 模型特色 + 适合谁」，`name` / `link` / `tone` 未动
- 数组顶部注释同步改为「note 为平台定位介绍」

### 任务 F-2 · 回写文档 ✅
- 本文件追加本条目；`docs/TASK_PLAN.md` Phase 11 标 complete；`docs/PLANNING_2026-08-02.md` 状态改「已执行」；`docs/TUTORIALS_TASKS_2026-08-02.md` 顶部补执行状态行

### 校验与构建
- `check_caps_dup.py data/agents.json` → `[PASS w/ warnings]`：222 项目 / 222 差异化组合 / 最大重复 1 / 同类撞车 0 / 缺失 0 / 通用残留 0；info 项为长度告警 261 与 202 条「有 prompt 无镜像源」（历史信息项，本轮未动数据）
- `check_data_sync.py` → `[PASS]` data/ 与 public/data/ 一致（222 项目 / 15 分类）
- `npm run build` → 通过（2048 modules，dist 产物正常）

### 本轮发现的偏差（已按 prompt 边界保守处理，待用户裁决）
- **badge 与 note 语义脱钩**：MiniMax 的 `badge='已验证·临期'`、天翼 AI 的 `badge='已验证·有条件'` 原本描述的是「邀请活动时效 / 领取条件」。任务 E 已把 note 改成平台介绍，两个 badge 现在失去上下文指向。因任务 E 明确要求「不动 tone 字段」、任务 F（badge 改造）已取消，本轮**未改 badge/tone**，保持原值。建议下一轮统一处理（方案：全部收敛为「已验证」，或把 badge 语义改为「链接已核验」）。
- **`official` 字段变为未引用数据**：任务 C 删掉「官网 ↗」后，TOOLS 里的 `official` 不再被 JSX 使用。按「不动 name/invite/official/os」的要求予以保留，未清理。
- **`#trending-github` 条件渲染**：该区块仅在 `trendingData.items.length > 0` 时渲染，否则回退 `Spotlight`（无此 id）。此时点击侧栏「GitHub 今日趋势」会切回首页但不滚动（静默降级，不报错）。如需兜底可在找不到锚点时回落到 `#trending`。

### git 事故收尾（已解决，但历史被重置）
- 执行本轮任务时 `.git` 目录已彻底消失（`git status` → `fatal: not a git repository`），是 2026-08-02 上一轮 ACL 锁死事故的恶化状态；远端经 SSH 探测可达，彼时 `origin/main = d273c6b`
- **用户自行修复**：就地 `git init` 重建仓库，以单条 `Initial commit: ai-agents-hub project`（`c3776a9`）提交全量工作区；remote 改为 HTTPS `https://github.com/cannotcodetao/ai-agents-hub.git` 并已推送，本地 `main` 与 `origin/main` 同为 `c3776a9`
- 本轮 7 个文件（`src/App.tsx`、`src/components/Sidebar.tsx`、`src/components/Tutorials.tsx`、`docs/PROGRESS.md`、`docs/TASK_PLAN.md`、`docs/PLANNING_2026-08-02.md`、`docs/TUTORIALS_TASKS_2026-08-02.md`）的改动已逐一核对，全部包含在该提交中
- 入库范围复核：72 个跟踪文件，未误入 `dist/` / `node_modules/` / `*.bak`；`data/agents.json` 与 `public/data/agents.json` 双份均在
- ⚠️ **历史丢失**：`d273c6b` 及此前的 `4e5368f` / `44011df` / `3095291` / `d598aa2` 等提交已不在 main 分支上，仓库变成单提交历史。GitHub 侧通常还会保留一段时间的悬空对象，若要找回旧历史需尽快通过 GitHub Events API 或联系支持处理
- 遗留：根目录有未跟踪文件 `git-push-guide.html`（非本轮产物），待决定入库或删除

## 2026-08-02 会话（规划修订 + git 事故）
- 用户要求：① 尝试按推荐顺序修复 git 仓库事故；② Trae IDE / WorkBuddy 介绍改为特征化 1-2 句；③ 原任务 F（badge 简化）改为 F-2（更新执行 prompt 与项目进度文件）
- 完成：修订 `docs/PLANNING_2026-08-02.md` 与 `docs/TUTORIALS_TASKS_2026-08-02.md`（加 B-4、F→F-2、Trae/WorkBuddy 建议文案），并更新本文件与 TASK_PLAN.md（F-2 的「进度文件」部分）
- **git 事故（未解决，待用户配合）**：`.git` 目录 Windows ACL 锁死，`git status` 报 not a git repository；`icacls /reset`、`takeown`、`mv .git` 均拒绝访问（当前非提权令牌无权改 ACL）。已给出提权修复命令，待用户在「以管理员身份运行」的 PowerShell 执行后继续 push
- 待办：用户修复 ACL → `git status` 验证 → commit（本会话文档修订）+ push origin main

## 2026-08-01 会话 3
- 用户提出本轮 3 任务：① 整理进度文件到 docs/、② 搜索栏 UX 修复、③ 加入 video-autopilot-kit + 后续添加项目的 SOP + 国内镜像源
- 用户明确要求"先把这些任务写进项目进度等相关文档，给我审阅解决办法后再执行"
- 写入 `docs/PLANNING_2026-08-01.md`，列出 11 个决策点
- 4 轮 AskUserQuestion 收齐决策：A 全部三项；B 仅 B-1 自动滚动；C SOP + 校验脚本 + 立刻入库；D 待用户发图

### Phase 7 文档整理（commit 4e5368f） ✅
- `git mv task_plan.md → docs/TASK_PLAN.md`
- `git mv progress.md  → docs/PROGRESS.md`
- `mv findings.md      → docs/FINDINGS.md`
- 旧 docs/{task_plan,progress,findings}.md 移到 `docs/planning-archive/historic-2026-07-31/legacy-*.md`（之前未跟踪，git 看不到重命名）
- 新建 `docs/README.md`（内部文档索引）
- README.md 顶部加导航条 `📋 内部规划文档见 docs/README.md`
- TASK_PLAN.md 追加 Phase 7/8/9/10
- `.gitignore` 调整：去掉 docs/ 整体 ignore / 仅过滤 planning-archive/**/*.json 与根 /findings.md

### Phase 8 搜索栏 UX（commit 44011df） ✅
- `src/App.tsx` import useRef + 新增 effect
- 监听 searchQuery 从「无」→「有」的转变，仅首次触发，自动 scrollIntoView('#explore')
- 用 useRef 记 wasSearching 避免逐字输入反复跳动
- `npm run build` 通过

### Phase 9 入库 video-autopilot-kit + SOP + 校验脚本（commit 3095291） ✅
- 写 `docs/CONTRIBUTING.md`（5 步 SOP）
- 写 `scripts/check_caps_dup.py`（cap 重复/撞车分级校验）
- 写 `scripts/check_data_sync.py`（data/ vs public/data/ 字节级同步）
- 入库 `Hao0321/video-autopilot-kit`（video 分类，subcategory=短视频自动化，4 条差异化 cap）
- 跑 check_caps_dup 暴露 6 条历史撞车（与新增无关），全部修差异化文案
- `npm run build` 通过；最终：222 项目 / 222 差异化 / 0 撞车 / 0 残留文案 / 双处同步

### Phase 10 镜像源（blocked）
- D 数据建模 + D 前端 待用户发图决定
- 已有思路：字段改名 `mirrors: {label,url}[]` / 数据混合 gitee.com/mirrors + 第三方代理 ghfast.top / 前端 AgentDetailModal 显示

### 错误记录（本轮新增）
| 错误 | 尝试 | 解决 |
|------|------|------|
| docs/ 整体被 .gitignore 忽略 | 移除该规则 + 改成 `docs/planning-archive/**/*.json` | docs/* 现在可入库 |
| 根 /findings.md 仍被忽略（匹配 docs/FINDINGS.md） | 加 `^` 前缀：`/findings.md` | 只忽略根 |
| Write 工具路径用了 Linux 风格 `/Users/24237/AI/...` | 改用 Windows 风格 `D:\AI\...` | 写到正确位置 |
| fix_legacy_dupes.py 误读 touched count（src + pub 算两次 early-return） | 改为分别修两边 + 修 src 不变则忽略 | 正确写入 |
| 修脚本只走了 src 没写 pub | 改用 src_map/pub_map dict 双向写 | 双处同步 |

### 后续阶段
- [ ] Phase 10 · 镜像源方案（待用户图）
- [ ] 最终 build + 上传 dist/ 到 cannotcode.cn

## 2026-08-01 会话 1
- 加载 planning-with-files 技能，创建 task_plan.md / findings.md / progress.md
- 检查 GitHub SSH 连通：成功（cannotcodetao 已认证）
- Git 当前状态：main 分支，10 个 modified + 6 个 untracked（含 public/data/、TrendingGitHub.tsx 等）
- 已确认决策：风格 A / 完整图文 / 官网搜集图 / 全部完成再上传

### 待执行
- [ ] Phase 0: git add 明确文件（exclude .bak / temp/）→ commit → push origin main
- [ ] Phase 2: 任务 1 后续 12 分类 196 个项目核心能力定制
- [ ] Phase 5: 任务 2 教程页
- [ ] Phase 6: 最终 build + 上传准备

### 错误记录
| 错误 | 尝试 | 解决 |
|------|------|------|
| App.tsx 被 linter 修改导致 Edit 失败 | 1 | 重新 Read 后 Edit 成功 |
| App.tsx JSX 条件渲染报「must have one parent element」 | 1 | 用 `<>...</>` fragment 包裹 home 内容后 build 通过 |

## 2026-07-31 会话 2（续）
- App.tsx 接入 Tutorials 视图切换：`view` state + `{view==='home' && <>...</>}` + `{view==='tutorials' && <Tutorials/>}`；页眉备案条保留在两种视图
- `npm run build` 通过（2048 modules，dist 生成）
- 数据校验：221 agents / 220 差异化组合 / 0 通用残留 / 0 缺失
- 更新 .gitignore：忽略 `*.bak` 与 `temp/trending.html`（备份与抓取产物不入库）
- Git commit `d598aa2` 并 push origin/main（18 files，+1996/-1180）
  - 含：data/public agents.json、App/Sidebar/Tutorials、task_plan/progress、temp 批量脚本
  - 不含：*.bak、trending.html、dist（已 ignore）
- 四项任务代码层面全部完成；上传服务器按用户「全部完成后上传」原则，待确认两项待办（安装图示占位、部份 Token 待验证）后执行
