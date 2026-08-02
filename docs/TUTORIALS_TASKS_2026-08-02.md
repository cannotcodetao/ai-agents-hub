# 教程页改造执行 Prompt（直接复制到新窗口）

> 用途：把下面 `<EXECUTION_PROMPT>` 标签里的内容**完整复制**到新窗口，让 AI 按步骤执行。
> 决策（2026-08-02 修订）：A ✅ B ✅ C ✅ D ✅ E ✅ F 取消 badge 改造，改为 **F-2 · 更新执行 prompt 与项目进度文件** ✅；另新增 **B-4 · Trae IDE / WorkBuddy 介绍改特征化 1-2 句** ✅。
> **执行状态（2026-08-02 新窗口）：A / B / B-4 / C / D / E / F-2 均「已执行」**；校验脚本 PASS、`npm run build` 通过；`git commit + push` 因本地 `.git` 目录缺失阻塞，待仓库恢复后补。
> 当前会话**仅交付 prompt**，不执行。

---

## 项目上下文

- 项目路径：`D:\AI\project\IdeaCreate\ai-agents-hub`
- 技术栈：Vite + React 18 + TypeScript SPA，Tailwind CSS 自定义主题
- 相关文件：
  - `src/components/Tutorials.tsx`（教程页主体）
  - `src/components/Sidebar.tsx`（左侧栏，含快捷导航）
  - `src/App.tsx`（view 状态：`'home' | 'tutorials'`）
- 关联规划：`docs/PLANNING_2026-08-02.md`
- 进度跟踪：`docs/PROGRESS.md` / `docs/TASK_PLAN.md`
- 校验脚本：
  - `scripts/check_caps_dup.py`
  - `scripts/check_data_sync.py`

---

## <EXECUTION_PROMPT>

### 你的任务

在项目 `D:\AI\project\IdeaCreate\ai-agents-hub` 中完成 6 项教程页 + 侧栏导航改造。具体任务见下方"6 项任务"。

### 工作原则

- **先调研，后动手**：每个文件先 Read，再 Edit
- **不引入新依赖**：用现有 lucide-react + Tailwind 类
- **不破坏构建**：每个 Edit 后跑 `npm run build` 确认
- **不破坏数据双写**：本轮不动 agents.json
- **commit 信息清晰**：每个 Phase 一个 commit，最后一次性 push

### 6 项任务

#### 任务 A · Sidebar 快捷导航修复

**问题**：在 `view === 'tutorials'` 状态下，左侧栏「GitHub 今日趋势」和「趋势榜」两个 `<a href="#trending-github">` / `<a href="#trending">` 按钮无效——锚点 ID 只存在于首页的 `TrendingGitHub` / `Trending` 组件中。

**修改文件**：
- `src/components/Sidebar.tsx`
- `src/App.tsx`

**步骤**：
1. Read `src/components/Sidebar.tsx` 完整内容，确认 Props 接口（line 1~15 附近）
2. 给 SidebarProps 加两个新字段：
   ```ts
   currentView?: 'home' | 'tutorials';
   onNavigateHome?: (anchor: string) => void;
   ```
3. 修改 line 101-116 的两个 `<a>` 标签为：
   - `href` 保留（保底首屏点击工作）
   - 加 `onClick={(e) => { e.preventDefault(); onNavigateHome?.('#trending-github'); }}`
   - 调用方负责 view 切换 + 滚动
4. Read `src/App.tsx` line 178-200 附近的 Sidebar 调用点
5. 把 `currentView={view}` 和 `onNavigateHome={(anchor) => { setView('home'); requestAnimationFrame(() => requestAnimationFrame(() => { setTimeout(() => { const el = document.querySelector(anchor); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 80); })); }}` 传给 Sidebar
6. 双 `requestAnimationFrame` + 80ms setTimeout 是为了让 React 完成视图切换 + DOM 渲染

#### 任务 B · 删除教程页无关用户话语

**修改文件**：`src/components/Tutorials.tsx`

**步骤**：
1. line 88 H2 文案「用邀请链接，双方得奖励」→ 改为「下载工具」
2. line 89 整段删除（保留 section-label「工具下载」，删 H2 下方说明段落）
3. line 160 H2「注册即拿免费额度」→ 改为「免费 Token 与 API 配置」（与 section-label 对齐）
4. line 161 段落「以下平台支持「邀请新用户送奖励」，注册即可获得免费 Tokens。」→ 改为「下面 9 个平台提供免费 API 额度，注册即可使用」

#### 任务 B-4 · Trae IDE / WorkBuddy 介绍改特征化 1-2 句

**修改文件**：`src/components/Tutorials.tsx`

**问题**：TOOLS 数组里 Trae IDE / WorkBuddy 的 `desc` 偏短、像标签，未突出产品特点。教程页要让用户快速判断「这是什么、适不适合我」。

**步骤**：
1. Read `src/components/Tutorials.tsx` line 8-23 的 TOOLS 数组
2. 把 `desc` 替换为 1~2 句、突出特点的介绍（允许按语气微调，但必须 1~2 句且体现「谁出的 / 干什么 / 适合谁」）：
   - `Trae IDE`：`字节跳动推出的 AI 原生集成开发环境（IDE），内置可自主完成编码、重构与调试的 SOLO 智能体，支持在「传统 IDE 模式」与「自然语言对话模式」之间切换，让 AI 直接替你写代码。`
   - `WorkBuddy`：`WorkBuddy 是一款覆盖桌面端 / 网页版 / 移动端的 AI Agent 办公助手，用自然语言即可驱动它交付研究报告、编写代码、自动化日常任务，并支持接入你自己的大模型 API Key 解锁更强能力。`
3. 不动 `name` / `invite` / `official` / `os` 字段

#### 任务 C · 卡片右上角 Download 图标 + 官网链接

**修改文件**：`src/components/Tutorials.tsx`

**步骤**：
1. line 99 删除孤立 `<Download />` 图标（`<Download className="h-5 w-5 shrink-0 text-accent" />`），调整外层 div 去掉 `justify-between` 改为 `gap-3` 让标题与描述靠左
2. line 109 把按钮内的 `<Gift className="h-4 w-4" />` 改为 `<Download className="h-4 w-4" />`
3. line 112-120 整段删除（`<a href={t.official}>官网 ↗</a>` 链接）

#### 任务 D · 按钮文案重命名

**修改文件**：`src/components/Tutorials.tsx`

**步骤**：
1. line 110 按钮文本「用我的邀请链接」→「下载链接」
2. line 7 注释「工具下载：用你的邀请链接（双方得奖励）」→「工具下载：用你的邀请链接直接下载（按钮显示为「下载链接」）」
3. TOOLS 数据数组可保留 `invite` 字段不变（href 还是你的邀请链接，按钮文案只是给用户看的）

#### 任务 E · Token 平台卡片文案改为平台介绍

**修改文件**：`src/components/Tutorials.tsx`

**修改策略**：每张卡片的 `note` 字段从「邀请新用户奖励政策」改为「平台定位 + 模型特色 + 适合谁」，2~3 行，60 字以内。

**新内容方向**（按 name 字段对应）：
- `硅基流动`：「国产开源模型 API 聚合。满血 DeepSeek-V3 / Qwen3 / GLM-4.6 高速推理，按 token 计费，新用户有试用额度。」
- `七牛云 AI 推理`：「云厂商级 SLA，开箱即用的多模型 API 接入。适合需要稳定生产环境的企业用户，按调用量阶梯价。」
- `智谱 AI`：「清华 GLM 系列出品，国产顶配大模型 API。GLM-4.6 / 4.5 / Z1 推理，覆盖长文本、多模态与代码场景。」
- `DeepSeek`：「国产推理模型性价比之王。DeepSeek-V3 / R1 长上下文强项，API 简洁透明，新账户有免费额度可领。」
- `MiniMax`：「多模态 AI 平台旗舰，Hailuo 视频生成 + 语音克隆 + 图像创作一站式。适合短视频 / 内容创作工作流。」
- `PPIO 派欧云`：「分布式 GPU 推理与模型托管。DeepSeek / Qwen / Llama 高速 API，私有化部署友好，按需弹性。」
- `科大讯飞星火`：「中文 NLP 老牌大厂，语音识别 / TTS / 翻译业内顶级。星火 Lite 永久免费 + Spark Pro 月度高额度。」
- `快手 StreamLake`：「快手系多模态模型平台。KAT-Coder 代码专用 + 视频理解 + 文生图，AI 内容创作链路完整。」
- `天翼 AI（中国电信）`：「国资云大模型服务，安全合规 + 等保三级。DeepSeek / 通义 / 智谱 API 聚合，政企首选。」

**步骤**：
1. Read `src/components/Tutorials.tsx` line 26-36 TOKEN_PLATFORMS 数组
2. 用上述新文案逐条替换 `note` 字段
3. 不动 `name` / `link` / `tone` 字段

#### 任务 F-2 · 更新执行 prompt 与项目进度文件

**说明**：原任务 F（badge 简化）已取消，不再改造 badge。本任务改为收尾时回写文档，保持规划 / 进度 / prompt 三者一致。

**修改文件**：`docs/PROGRESS.md`、`docs/TASK_PLAN.md`、`docs/PLANNING_2026-08-02.md`、本文件

**步骤**：
1. 执行完 A~E 后，在 `docs/PROGRESS.md` 追加 2026-08-02 新窗口执行子条目，标记 6 任务完成
2. 在 `docs/TASK_PLAN.md` 加 Phase 11（教程页 6 任务）并标记 complete
3. 把 `docs/PLANNING_2026-08-02.md` 顶部状态从「已修订 2026-08-02」改为「已执行」
4. 把本文件顶部决策行的 F-2 标记「已执行」
5. 若执行中发现偏差（如某平台介绍需改），同步更新对应 prompt 内容

### 验收标准

执行完所有任务后，依次跑：

```bash
cd /d/AI/project/IdeaCreate/ai-agents-hub

# 1. 校验脚本（应 PASS）
"C:/Users/24237/.workbuddy/binaries/python/versions/3.13.12/python.exe" scripts/check_caps_dup.py data/agents.json
"C:/Users/24237/.workbuddy/binaries/python/versions/3.13.12/python.exe" scripts/check_data_sync.py

# 2. 构建（应成功）
npm run build

# 3. 更新规划 + 进度文档
# 在 docs/PROGRESS.md 追加 2026-08-02 Phase 11 子条目
# 在 docs/TASK_PLAN.md 把 Phase 11 标记 complete

# 4. Commit + Push
git add src/components/Tutorials.tsx src/components/Sidebar.tsx src/App.tsx docs/PROGRESS.md docs/TASK_PLAN.md
git commit -m "refactor(tutorials): 删营销话术+改按钮文本+Token 卡片改平台介绍+Sidebar 锚点修复"
git push origin main
```

### 验证清单（用户视角）

- [ ] 教程页 H2 区不再有「邀请奖励 / 平台返利」字样
- [ ] Trae IDE / WorkBuddy 卡片右上角没有孤立 Download 图标
- [ ] 卡片只有「下载链接」按钮，没有「官网 ↗」链接
- [ ] 9 个 Token 卡片每张描述平台定位 + 模型特色，不再只讲邀请奖励
- [ ] Trae IDE / WorkBuddy 卡片 `desc` 为 1~2 句特征化介绍，不再是短标签
- [ ] 在教程页点侧栏「GitHub 今日趋势」/「趋势榜」，自动切回首页 + 平滑滚动到对应区块
- [ ] 收尾：回写 docs/PROGRESS.md、docs/TASK_PLAN.md、本文档顶部 F-2 决策行标记已完成
- [ ] npm run build 通过，git push 成功

### 边界提醒

- 不要动 data/agents.json（本轮不涉及新项目入库）
- 不要动 docs/MIRROR_PROPOSAL.md（候选清单与本任务无关）
- 不要替换 lucide-react 图标组件（只换 className 和图标名）
- 不要动 Header 备案横条（line 17~31 的 ICP 备案区）
- 遇到 Edit 失败（"File has been modified"）→ 重新 Read 再 Edit

### 完成定义

- 6 个任务全部完成
- npm run build 通过
- git push origin main 成功
- 给我一段最终汇报，包含：
  1. 每个任务的具体修改行号 / 改动点
  2. build / sync / caps 三个脚本的输出
  3. commit hash + push 状态
  4. 你视角看到教程页的最终样子（用文字描述 H2 + 卡片 + 按钮文案）

---

## </EXECUTION_PROMPT>

---

## 用户视角的最终状态（执行完成后应该是这样）

**工具下载卡片**：
- 标题：Trae IDE
- 副标题：支持：Windows / macOS / Linux
- 描述：字节跳动推出的 AI 原生集成开发环境（IDE），内置可自主完成编码、重构与调试的 SOLO 智能体，支持在「传统 IDE 模式」与「自然语言对话模式」之间切换，让 AI 直接替你写代码。
- 主按钮：⬇ 下载链接（点击跳转 `https://www.trae.cn/work-fission/9T3B33XAYPG2`）
- **不再有**：右上角孤立下载图标、「官网 ↗」链接

**Token 卡片**（以硅基流动为例）：
- 标题：硅基流动 + 角标「开源友好」
- 描述：「国产开源模型 API 聚合。满血 DeepSeek-V3 / Qwen3 / GLM-4.6 高速推理，按 token 计费，新用户有试用额度。」
- 链接：前往 硅基流动 →

**侧栏**：
- 在首页：点「GitHub 今日趋势」/「趋势榜」 → 平滑滚动
- 在教程页：点同样按钮 → 自动切回首页 + 平滑滚动

---

## 注意事项

- 本 prompt 是给**新窗口**的，本会话不执行
- 执行期间任何不确定的点，先写 `docs/PROGRESS.md` 标注，再决定继续还是暂停问用户
- F 已取消 badge 改造；改为 **F-2 · 更新执行 prompt 与项目进度文件**——prompt 已写明
- 新增 **B-4 · Trae IDE / WorkBuddy 介绍改特征化 1-2 句**——prompt 已写明