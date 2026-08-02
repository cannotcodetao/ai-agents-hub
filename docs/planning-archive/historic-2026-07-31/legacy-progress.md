# 进度日志

## Session 2026-07-14

### 14:00 - 项目上下文恢复
- 读取 `docs/TASK_HANDOFF.md` 完整内容
- 项目当前状态：功能完整，3 轮迭代已完成，11 个分类，约 105 个 agent
- 技术栈：Vite 6 + React 19 + TS + Tailwind 3

### 14:05 - 数据现状评估
- `data/agents.json` 当前 11 个分类，无创业顾问相关分类

### 14:10-14:40 - Phase 2 创业顾问 Agent 检索
- GitHub API 直接调用被限流（未认证）
- 通过 WebFetch `api.github.com/repos/{owner}/{repo}` 验证 stars：
  - garrytan/gstack：121,788 ✅
  - simstudioai/sim：29,095 ✅
  - AntonOsika/gpt-engineer：54,426 ✅
  - stackblitz-labs/bolt.diy：9,580 ✅
  - paperclipai/paperclip：API 限流，基于 sotaaz.com 2026-04 文章数据 ~43K（待 Phase 9 验证）

### 14:45 - Phase 3-4 数据录入 + 构建验证
- 新增 `entrepreneur` 分类（icon: Rocket）
- 新增 5 个 agent 条目：gstack / Paperclip / Sim Studio / bolt.diy / GPT Engineer
- 同步更新 `src/components/CategoryGrid.tsx` iconMap
- `npm run build` ✅ 成功

### 14:55 - Phase 4 浏览器预览验证
- `npm run dev` 启动于 http://localhost:5173/
- 浏览器子代理截图验证 6 项全部 PASS：
  1. 首页加载 ✅
  2. 「按分类浏览」区显示"创业顾问"卡片（Rocket 图标）✅
  3. 点击跳转探索区 ✅
  4. 探索区显示 5 个新项目 ✅
  5. 底部统计区"分类数"已从 11 → 12 ✅
  6. 无视觉异常 ✅

### 15:10 - Phase 5-6 用户提问 + 项目审查
- 用户答复：定位=社区参考站点，目标用户=4 类并存，保留 entrepreneur 分类
- 用户追加需求：补充 MVP 相关项目 → 录入 bolt.diy + GPT Engineer
- 审查结论：
  1. 最没把握：stars 数据非实时
  2. 最大遗漏：未 git init、未部署
  3. 未意识到：4 类用户知识深度差异大，单一卡片信号不足

### 15:30 - 用户追加新方向
- 用户指示：用 agent-reach skill 搜索"去 AI 味道"agent/skill + "必装 skill"推荐
- 用户指示：把任务写进规划文档，给出执行 prompt，新窗口执行
- 已更新 `.gitignore`：排除根目录 `task_plan.md` / `progress.md` / `findings.md` / `.planning/`
- 已更新 `task_plan.md`：新增 Phase 7/8/9
- 已生成新窗口执行 prompt（见对话回复）

### 16:00 - Phase 7 执行 · "去 AI 味道" + 必装 skill 检索

#### Step 1 · 信息源发现
- 用 GitHub Search API 查询 8 组关键词：awesome-claude-skills / awesome-agent-skills / awesome-ai-skills / humanize ai text / undetectable ai / ai content detector / bypass ai detection / ai humanizer
- 返回 51 个去重候选仓库
- 未爬取 Reddit/V2EX/Twitter/小红书：GitHub 搜索已返回充足高 stars 候选，社交媒体推荐项目最终仍需落回 GitHub 验证

#### Step 2 · 候选清单提取
- 从 51 个候选中筛选 stars ≥ 1000 且未已在 agents.json 中的项目，得 13 个
- 已存在的近似项目跳过：hesreallyhim/awesome-claude-code、travisvn/awesome-claude-skills、BehiSecc/awesome-claude-skills、VoltAgent/awesome-claude-code-subagents、jo-inc/camofox-browser

#### Step 3 · stars 验证
- 用 GitHub Repos API（`api.github.com/repos/{owner}/{repo}`）逐个验证 13 个候选的 `stargazers_count`
- 验证日期 2026-07-14，全部 ≥ 1000
- 结果写入 `findings.md` 的"stars 验证结果"章节

#### Step 4 · 分类决策与数据录入
- **新增 `humanize` 分类**（icon: Sparkles）—— 3 个去 AI 味道项目独立成分类（满足 ≥ 3 个的规则）
- **必装 skill 推荐**类项目归入现有 `skills` 分类 —— 补充 5 个高质量 awesome 列表
- 录入 8 个新项目到 `data/agents.json`（项目总数 112 → 120，分类总数 12 → 13）
- 同步更新 `src/components/CategoryGrid.tsx` iconMap（添加 Sparkles，已确认 lucide-react 导出存在）

#### Step 5 · 构建验证
- `npm run build` ✅ 成功（1793 modules，24.80s，0 error）

#### Step 6 · 浏览器预览验证
- `npm run dev` 启动于 http://localhost:5173/
- 浏览器子代理截图验证 6 项全部 PASS：
  1. 首页加载 ✅
  2. 「按分类浏览」区显示"去AI味道"卡片（Sparkles 图标，3 projects）✅
  3. 点击跳转探索区，tab 高亮 ✅
  4. 探索区显示 humanize 3 个项目 + skills 新项目 ✅
  5. 底部统计区"分类数"已从 12 → 13 ✅
  6. 无视觉异常 ✅

### 16:30 - Phase 7.5 · 滚动条 + 虚拟形象分类 + 删除 other

#### 用户追加需求
- 在分类 tab 下方添加可拖动的横向滑动条
- 删除"其他"分类（无项目）
- 增加直播虚拟形象/AI数字人相关项目

#### 信息检索
- GitHub Search API 查询 14 组关键词：vtuber / live2d / vrm / digital human / ai avatar / virtual youtuber / talking head / face swap / deepfake / lip sync / sad talker / wav2lip / vseeface / 3d avatar
- 返回 68 个去重候选，43 个 stars ≥ 1000
- stars 验证方式：GitHub Repos API（`api.github.com/repos/{owner}/{repo}`），验证日期 2026-07-15

#### UI 改动
- `src/components/ExploreToolbar.tsx`：分类 tab 下方新增自定义横向滚动条
  - 支持鼠标拖动滑块（thumb drag）
  - 支持点击轨道跳转（track click）
  - 滚动时滑块位置实时同步
  - 宽度不足时自动显示，宽度足够时自动隐藏
  - 样式：h-1.5 灰色轨道 + ink3/40 滑块 + hover 加深

#### 分类调整
- **删除** `other` 分类（0 个项目，空分类）
- **新增** `avatar` 分类（icon: User）—— 18 个虚拟形象项目
- 分类总数：13 → 12（删 other + 增 avatar，净减少 1）

#### 数据录入
- 新增 18 个虚拟形象项目，覆盖 8 个子方向：
  - 实时换脸：Deep-Live-Cam（94.9K）、DeepFaceLive（31.0K）
  - AI换脸：faceswap（55.3K）、FaceFusion（29.3K）、DeepFaceLab（19.3K）、SimSwap（5.2K）
  - AI数字人：Duix Avatar（14.0K）、Linly-Talker（3.4K）
  - AI VTuber：Open-LLM-VTuber（12.6K）
  - Live2D：live2d-widget（10.8K）
  - 实时数字人：LiveTalking（8.4K）、Duix Mobile（8.1K）
  - 唇形同步：VideoReTalking（7.3K）、LatentSync（5.9K）
  - 动作捕捉：kalidokit（5.7K）
  - 说话头生成：V-Express（2.4K）、DreamTalk（1.8K）
  - AI虚拟伴侣：Airis（42.3K）
- 项目总数：120 → 138

#### 构建验证
- `npm run build` ✅ 成功（1793 modules，21.20s，0 error）

#### 浏览器预览验证
- 8 项检查全部 PASS：
  1. 首页加载 ✅
  2. 分类网格 12 个卡片，含虚拟形象 + 去AI味道 ✅
  3. 探索区自定义滚动条可见 ✅
  4. 滚动条滑块可拖动 ✅
  5. 虚拟形象分类显示 18 个项目 ✅
  6. 底部分类数 12、项目数约 138 ✅
  7. other 分类已删除 ✅
  8. 无视觉异常 ✅

### 2026-07-15 · Phase 8 · 完整程序标注 + 新增 LLM 应用 + Dify 分类调整

#### 用户需求
- Dify 从 document → framework（框架平台）分类
- 范围扩大至调用大模型的开源工具、完整程序
- 标注"完整程序·调用API即可"：名字前绿色小圆点 + 列表标题右侧注释
- 现有项目也要标注

#### 判定标准
- 有可直接使用的完整界面（Web / 桌面客户端 / Docker 一键部署）
- 用户只需填入 API Key 即可使用核心功能
- 无需写代码

#### 类型定义
- `src/types.ts`：`Agent` 接口新增 `fullApp?: boolean` 字段

#### UI 改动
- `src/components/AgentCard.tsx`：项目名前新增绿色小圆点（emerald-500，h-2 w-2，rounded-full），hover 显示 tooltip
- `src/App.tsx`：列表标题右侧新增「🟢 完整程序·调用API即可」注释说明，与计数同行

#### 分类调整
- **Dify**：document（文档撰写）→ framework（框架平台），子分类改为「Agent框架」

#### 现有项目标注（29 个）
- framework：Dify、AgentGPT、SuperAGI、AutoGPT
- document：AnythingLLM、Quivr、Khoj、PrivateGPT、Langchain-Chatchat、FastGPT、AntSK
- content：SillyTavern、lobe-chat、ChatGPT-Next-Web
- productivity：n8n、activepieces、Flowise、langflow、node-red、LobsterAI
- multimodal：ComfyUI、stable-diffusion-webui、Fooocus、InvokeAI
- coding：OpenHands、Tabby
- entrepreneur：bolt.diy
- video：MoneyPrinterTurbo、VideoLingo

#### 新增项目（8 个）
| 项目 | Stars | 分类 | 子分类 |
|---|---|---|---|
| open-webui/open-webui | 145,450 | content | LLM前端 |
| infiniflow/ragflow | 85,058 | document | RAG系统 |
| chatboxai/chatbox | 41,000 | content | 桌面客户端 |
| songquanpeng/one-api | 35,716 | productivity | API管理 |
| mckaywrigley/chatbot-ui | 33,293 | content | LLM前端 |
| huginn/huginn | 49,616 | productivity | 自动化代理 |
| steven-tey/novel | 16,364 | document | AI写作 |
| automatisch/automatisch | 13,888 | productivity | 工作流自动化 |

#### 数据统计
- 总项目数：138 → 146
- fullApp: true 项目数：37（29 现有 + 8 新增）

#### 构建验证
- `npm run build` ✅ 成功（1793 modules，21.43s，0 error）

#### 浏览器预览验证
- 8 项检查全部 PASS：
  1. 列表标题右侧注释 ✅
  2. 绿色小圆点显示 ✅
  3. Dify 分类正确（框架平台）✅
  4. Dify 绿色圆点 ✅
  5. 新项目存在且带绿点 ✅
  6. 悬浮 tooltip 提示 ✅
  7. 搜索功能正常 ✅
  8. 无视觉异常 ✅

### 2026-07-15 · Phase 8.5 · Git 提交 + Vercel 部署上线

#### 执行过程
- 配置 git 全局身份：`cannotcodetao` / `892452605@qq.com`
- `git init` + `git add .` + `git commit`（29 个文件，7383 insertions）
- 测试 SSH Key：✅ 已配置，连接 GitHub 成功
- 切换远程地址为 SSH 格式并推送：`git push -u origin main`
- 创建 Vercel 账号（Hobby 免费版），授权 GitHub 仓库访问
- Vercel 部署：自动识别 Vite 框架，一键部署成功

#### 部署结果
- GitHub 仓库：https://github.com/cannotcodetao/ai-agents-hub
- Vercel 线上地址：见 Vercel 项目仪表盘
- 部署方式：GitHub → Vercel 自动部署（push 到 main 自动重新部署）
- 构建：Vite + React + TS + Tailwind，29 个源文件
- 排除文件：task_plan.md / progress.md / findings.md / docs/ / node_modules / dist

### 2026-07-16 · Phase 11 · 编辑精选改版 + 底部推荐 + 趋势榜验证

#### 用户需求
- 编辑精选布局从 3 列改为 4 列（4×3 = 12 个精选）
- 数据一览下方添加硅基流动16元代金券推荐链接
- 趋势榜 weekGrowth 数据验证
- Vercel 国内访问问题调研

#### UI 改动
- `src/components/Spotlight.tsx`：`lg:grid-cols-3` → `lg:grid-cols-4`
- `src/App.tsx`：数据一览区块下方新增「赞助推荐」section，硅基流动代金券链接

#### 趋势榜验证
- 运行 `npm run update:stars`（匿名模式）
- 更新 56 个项目后触发 API 限额（60 次/小时）
- weekGrowth 数据已生成，趋势榜切换为「本周涨幅 Top 10」模式
- 周涨幅 Top 3：superpowers（+86K）、n8n（+73K）、paperclip（+31K）
- 注意：首次对比数据偏差较大（prevStars 为旧基准），下次更新后数据将趋于准确

#### 部署问题
- Vercel 域名在国内网络无法访问
- 备选方案：GitHub Pages、Cloudflare Pages、国内静态托管

#### 数据统计
- 总项目数：182
- 总分类数：13
- 编辑精选：12 个（4列×3行）

### 当前状态
- ✅ Phase 1-6 完成（创业顾问分类 + 5 个项目录入 + 预览验证）
- ✅ Phase 7 完成（去AI味道分类 + 3 项目 / skills 补充 5 项目 + 预览验证）
- ✅ Phase 7.5 完成（滚动条 + 虚拟形象分类 + 18 项目 + 删除 other）
- ✅ Phase 8 完成（完整程序标注 + 新增 LLM 应用 + Dify 分类调整）
- ✅ Phase 8.5 完成（Git 提交 + GitHub 仓库 + Vercel 部署上线）
- ✅ Phase 9 完成（论文撰写 Agent & Skill 检索扩充，13 个项目）
- ✅ Phase 10 完成（编程代码分类扩充，15 个项目 + 自媒体运营 Skills 8 个项目）
- ✅ Phase 11 完成（编辑精选4列改版 + 底部推荐 + 趋势榜验证）
- ✅ Phase 12 完成（详情弹窗 + 全站中文化 + 新增 5 个独立开发项目）
- ✅ Phase 13 完成（README 中文详情：20 个项目中文 README + Markdown 渲染）
- ✅ Phase 15 完成（Gitee 镜像：14 个项目找到国内镜像链接）
- ✅ Phase 16 完成（awesome 仓库验证：6 个全部 stars 不足，不录入）
- ⏳ Phase 14 待办（批量补充使用指南）
- ⏳ Phase 17 待办（部署优化）
- ⏳ 部署优化：Vercel 国内访问问题待解决

---

## Phase 12 · 详情弹窗 + 全站中文化 + 独立开发资源

### 用户需求
- 点击项目卡片先不跳转，弹出项目中文版详情窗口
- 网站改成全中文（保留双语默认中文）
- 新增 grok build + 10 个独立开发相关仓库
- 降低国内用户使用 GitHub 的门槛

### 实现内容
1. **详情弹窗组件** `AgentDetailModal.tsx`
   - 点击卡片弹出模态窗口，不再直接跳转 GitHub
   - 支持 ESC 关闭、点击外部空白处关闭
   - 包含：项目名、stars、分类、中文详细介绍、使用指南、快速访问链接
   - 快速访问：GitHub 仓库 / Gitee镜像 / 在线Demo
   - 已扩展 Agent 类型：新增 `detailZh`、`usageGuide`、`giteeMirror`、`demoUrl` 字段

2. **交互统一**
   - 编辑精选（Spotlight）、趋势榜（Trending）、项目列表（AgentCard）三处全部改为点击弹窗
   - 三处行为保持一致

3. **全站中文化**
   - 删除卡片中三处英文：仓库英文名、英文描述行、子分类英文样式
   - 所有 section-label 改为中文
   - 数据统计区（项目数/总星数/分类数）改为中文
   - 搜索空状态提示改为中文

4. **新增 5 个高星项目**
   | 项目 | Stars | 分类 | 说明 |
   |---|---|---|---|
   | Grok Build | 13.7k | 编程代码 | xAI 开源的 Rust 编码代理工具 |
   | 中国独立开发者项目列表 | 27.0k | 创业顾问 | 国内独立开发者真实案例 |
   | Awesome Indie | 11.6k | 创业顾问 | 全球 Indie Hacker 经典资源库 |
   | 独立开发者出海工具集 | 7.9k | 创业顾问 | 面向国内开发者的出海工具箱 |
   | Open SaaS | 9.3k | 创业顾问 | 开源 SaaS 启动模板 |

5. **跳过项目（stars 不足）**
   - awesome-one-person-company：184 stars，低于 1000 标准

### 数据统计
- 总项目数：182 → 187
- 总分类数：13

### 构建验证
- `npm run build` ✅ 成功

### 浏览器验证
- 10 项检查全部 PASS：首页加载、中文界面、点击弹窗、详情内容、编辑精选弹窗、趋势榜弹窗、ESC关闭、点击外部关闭、搜索、分类切换

### 后续待办（Phase 13+）
- [ ] **README 中文详情**：弹窗详情以 README 为基础，源项目有中文 README 直接显示，没有则 AI 翻译成中文（类似浏览器右键翻译）
- [ ] **弹窗缺少使用指南**：当前大多数项目没有 usageGuide 字段，需批量补充
- [ ] **Gitee 镜像链接收集**：为热门项目收集国内镜像地址（Gitee / 极狐 / GitCode 等）
- [ ] **更多独立开发项目补充**：剩余 5 个 awesome 系列仓库待验证 stars 后录入
- [ ] **部署优化**：解决 Vercel 国内访问问题（EdgeOne Pages 已配置）