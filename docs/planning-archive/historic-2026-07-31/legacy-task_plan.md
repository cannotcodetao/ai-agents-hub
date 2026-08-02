# 任务计划 · AI Agents Hub 持续演进

> 创建时间：2026-07-14
> 最后更新：2026-07-20
> 当前阶段：Phase 18 进行中（新增项目 + README 扩充 + Gitee 镜像扩充），项目总数 190，README 覆盖 47，Gitee 镜像覆盖 19

---

## 总目标

构建一个**策展型社区参考站点**，覆盖 AI Agent 与 Skill 生态，目标用户：开发者、创业者、产品经理/投资人、AI 学习者。

数据录入原则：**stars ≥ 1000 才录入，stars 以检索时 GitHub 上的数据为准**。

---

## 已完成阶段（本会话）

### Phase 1-6 · 创业顾问 Agent & Skill 检索录入 [completed]

**结果**：
- 新增 `entrepreneur` 分类（icon: Rocket）→ 分类总数 11 → 12
- 录入 5 个项目（均 stars ≥ 1K，已通过 GitHub API / WebFetch 验证）：

| 项目 | Stars | 子分类 |
|---|---|---|
| garrytan/gstack | 121,788 | YC Office Hours |
| paperclipai/paperclip | ~43,000 | AI 公司编排 |
| simstudioai/sim | 29,095 | AI Workforce 平台 |
| AntonOsika/gpt-engineer | 54,426 | MVP 快速构建 |
| stackblitz-labs/bolt.diy | 9,580 | MVP 快速构建 |

**改动文件**：
- `data/agents.json`（新增 entrepreneur 分类 + 5 个 agent 条目）
- `src/components/CategoryGrid.tsx`（iconMap 添加 Rocket）
- `.gitignore`（排除根目录规划文件）

**验证**：
- `npm run build` ✅ 通过
- 浏览器预览 6 项全部 PASS（首页 / 分类区 / 探索区 / 统计区 / 视觉无异常）

**用户已确认的方向**：
- 项目定位：社区参考站点
- 目标用户：开发者 + 创业者 + 产品/投资人 + AI 爱好者（四类并存）
- 保留独立 `entrepreneur` 分类，继续扩充
- 下一优先级：提交 git + 部署上线

---

## 用户提问与项目审查结果（Phase 5-6）

**核心审查结论**：
1. **最没把握的事**：stars 数据非实时，Paperclip 43K 来自 2026-04 文章估算，未直接 API 验证
2. **最大遗漏**：项目至今未 git init、未部署，没有任何备份和外部访问
3. **未意识到的问题**：4 类目标用户知识深度差异巨大，单一卡片信号不足以同时服务他们

---

## 新阶段（待新窗口执行）

### Phase 7 · "去 AI 味道" Agent & Skill 检索 [completed]

**用户原话**：
> "stars 数据以你搜索开源工具来源时作为基准。还可以加上去 AI 味道的 agent、skill。我建议先搜索有哪些好用的 skill 或者有哪些必装的 agent、skill 等这些信息，然后爬取到这些推荐的 skill 和 agent，最后整理这些工具。"

**任务拆解**：

#### Step 1 · 信息源发现（用 agent-reach）
- 搜索社交媒体（Reddit / V2EX / Twitter / 小红书）关键词：
  - `"must-have" Claude skills` / `必装 Claude skill` / `best agent skills 2026`
  - `"去 AI 味"` / `"AI content detector"` / `"humanize AI text"` / `"bypass AI detection"`
  - `awesome claude skills` / `awesome agent skills`
- 搜索 GitHub：`awesome-claude-skills` / `awesome-agent-skills` / `awesome-ai-skills`
- 用 Exa 网页搜索：`best agent skills list 2026`

#### Step 2 · 候选清单爬取（用 agent-reach）
- 对每个推荐文章/帖子，用 `r.jina.ai/URL` 提取内容
- 从中提取被推荐的项目 URL（GitHub 仓库）
- 去重，写入 `docs/findings.md`（仅原始数据）

#### Step 3 · stars 验证（用 GitHub API）
- 对每个候选仓库用 `https://api.github.com/repos/{owner}/{repo}` 验证 stars
- 筛选 stars ≥ 1000 的项目
- 被限流时用 WebFetch 访问仓库页面提取 stars

#### Step 4 · 分类决策与数据录入
- 评估是否新增分类（如 `humanize` / `anti-ai-detection`），或并入现有分类
- 更新 `data/agents.json`：新增分类（若决策为新增）+ 新增 agent 条目
- 必要时更新 `src/components/CategoryGrid.tsx` iconMap

#### Step 5 · 构建与预览
- `npm run build` 验证
- `npm run dev` 启动预览
- 浏览器截图验证

**✅ Phase 7 完成结果**：

- **新增分类**：`humanize`（去AI味道，icon: Sparkles）→ 分类总数 12 → 13
- **新增项目**：8 个（均 stars ≥ 1K，已通过 GitHub API 验证）

| 项目 | Stars | 分类 | 子分类 |
|---|---|---|---|
| blader/humanizer | 29,159 | humanize | 文本人性化 |
| op7418/Humanizer-zh | 13,172 | humanize | 中文人性化 |
| lynote-ai/humanize-text | 1,471 | humanize | 反AI检测 |
| ComposioHQ/awesome-claude-skills | 67,711 | skills | Skill 精选列表 |
| sickn33/agentic-awesome-skills | 43,190 | skills | 可安装技能库 |
| VoltAgent/awesome-agent-skills | 28,077 | skills | Skill 精选列表 |
| heilcheng/awesome-agent-skills | 5,978 | skills | 教程与指南 |
| libukai/awesome-agent-skills | 4,838 | skills | 中文指南 |

**改动文件**：
- `data/agents.json`（新增 humanize 分类 + 8 个 agent 条目，项目总数 112 → 120）
- `src/components/CategoryGrid.tsx`（iconMap 添加 Sparkles）
- `docs/findings.md`（填充待爬取信息源 / 候选项目清单 / stars 验证结果三章节）

**验证**：
- `npm run build` ✅ 通过（1793 modules，24.80s，0 error）
- 浏览器预览 6 项全部 PASS（首页加载 / 去AI味道分类卡 Sparkles 图标 / 点击跳转 / humanize 3 项目 + skills 新项目 / 底部分类数 13 / 无视觉异常）

**stars 验证方式**：GitHub Repos API（`api.github.com/repos/{owner}/{repo}`），读取 `stargazers_count`，验证日期 2026-07-14

**未达 1K 被拒绝的项目**（部分）：LearnPrompt/humanize-ppt（747）、Raymondhou0917/speak-human-tw（499，繁中去AI味）、AIScientists-Dev/academic-humanizer（456）、harshaneel/humanize（233）、brandonwise/humanizer（100）

---

### Phase 8 · Git 提交与部署上线 [completed]

**结果**：
- GitHub 仓库：https://github.com/cannotcodetao/ai-agents-hub
- Vercel 部署成功，线上地址见 Vercel 仪表盘
- 29 个文件首次提交，12 个分类，146 个项目
- 进度文档等无关文件已通过 .gitignore 排除
- 认证方式：SSH Key

**改动文件**：
- 代码仓库：首次提交 `d132fe2`
- `data/agents.json`（146 个项目）
- 本地配置：`git config --global user.name/email`

---

### Phase 9 · 论文撰写 Agent & Skill 检索扩充 [pending]

**用户需求**：文档撰写分类中加入论文撰写相关的 skill 和 agent。

**当前 document 分类现状**：
- 17 个项目，子分类：文档生成 / 知识管理 / 写作助手 / 笔记 / 知识库平台 / 科研写作 / AI写作 / RAG系统
- 已有科研写作项目 2 个：FAROS（1981）、medical-research-skills（1418）

**任务拆解**：

#### Step 1 · 信息源发现（用 agent-reach / GitHub Search）
- GitHub Search 关键词组合：
  - `research paper writing` / `academic writing` / `scientific paper`
  - `literature review` / `survey generation`
  - `latex assistant` / `paper translation`
  - `paper polishing` / `essay writing ai`
  - `scholar search` / `academic search`
  - `reference manager` / `citation tool`
  - `thesis writing` / `dissertation`
- 检索方向：论文写作助手、文献综述、学术搜索、LaTeX 助手、论文润色、文献管理、论文翻译、开题报告等

#### Step 2 · 候选清单筛选
- 从搜索结果中提取 GitHub 仓库
- 去重，排除已在 agents.json 中的项目
- 写入 `docs/findings.md` 候选清单章节

#### Step 3 · stars 验证（GitHub API / WebFetch）
- 对每个候选仓库验证 stars（`api.github.com/repos/{owner}/{repo}`）
- 筛选 stars ≥ 1000 的项目
- 被限流时用 WebFetch 访问仓库页面提取 stars

#### Step 4 · 分类决策与数据录入
- 评估是否需要新增子分类（如「论文写作」「学术工具」等）
- 归入 `document`（文档撰写）分类下，新增对应子分类
- 更新 `data/agents.json`：新增 agent 条目
- 若新增分类，更新 `src/components/CategoryGrid.tsx` iconMap（本例为子分类，无需）
- 标注 `fullApp` 字段（有完整界面、填 API Key 即用的标 true）

#### Step 5 · 构建与预览验证
- `npm run build` 验证构建通过
- `npm run dev` 启动预览
- 浏览器截图验证：首页 / 文档撰写分类 / 新项目存在 / 搜索正常 / 无视觉异常

---

### Phase 10 · 数据可信度修复 [pending]

- 配置 `GITHUB_TOKEN` 后跑 `npm run update:stars` 全量更新 stars
- 重点验证 Paperclip 的 43K 估算值
- 增加数据更新时间戳显示

---

### Phase 11 · 编辑精选改版 + 底部推荐 + 趋势榜验证 [completed]

- Spotlight 从 3 列改为 4 列（4×3 = 12 个精选）
- 底部新增「硅基流动16元代金券领取」推荐位
- 趋势榜切换为「本周涨幅 Top 10」模式
- 总项目数：182

---

### Phase 12 · 详情弹窗 + 全站中文化 + 独立开发资源 [completed]

**用户需求**：
- 点击项目卡片先不跳转，弹出项目中文版详情窗口
- 网站改成全中文（保留双语默认中文）
- 新增 grok build + 10 个独立开发相关仓库
- 降低国内用户使用 GitHub 的门槛

**实现内容**：
1. **详情弹窗组件** `AgentDetailModal.tsx`
   - 点击卡片弹出模态窗口，不再直接跳转 GitHub
   - 支持 ESC 关闭、点击外部空白处关闭
   - 包含：项目名、stars、分类、中文详细介绍、使用指南、快速访问链接
   - 快速访问：GitHub 仓库 / Gitee镜像 / 在线Demo
   - Agent 类型扩展：新增 `detailZh`、`usageGuide`、`giteeMirror`、`demoUrl` 字段

2. **交互统一**
   - 编辑精选（Spotlight）、趋势榜（Trending）、项目列表（AgentCard）三处全部改为点击弹窗

3. **全站中文化**
   - 删除卡片中三处英文：仓库英文名（fullName）、英文描述行（descriptionEn）、子分类英文样式（uppercase）
   - 所有 section-label 改为中文
   - 数据统计区改为中文
   - 搜索空状态提示改为中文

4. **新增 5 个高星项目**（均 ≥ 1k stars）

| 项目 | Stars | 分类 | 说明 |
|---|---|---|---|
| Grok Build | 13.7k | coding | xAI 开源 Rust 编码代理工具 |
| 中国独立开发者项目列表 | 27.0k | entrepreneur | 国内独立开发者真实案例 |
| Awesome Indie | 11.6k | entrepreneur | 全球 Indie Hacker 经典资源库 |
| 独立开发者出海工具集 | 7.9k | entrepreneur | 面向国内开发者的出海工具箱 |
| Open SaaS | 9.3k | entrepreneur | 开源 SaaS 启动模板 |

5. **跳过项目**：awesome-one-person-company（184 stars，低于 1000 标准）

**改动文件**：
- `src/types.ts`（Agent 接口新增 4 个字段）
- `src/components/AgentDetailModal.tsx`（新增）
- `src/components/AgentCard.tsx`（改为点击弹窗 + 删除英文）
- `src/components/Spotlight.tsx`（改为点击弹窗 + 删除英文）
- `src/components/Trending.tsx`（改为点击弹窗 + 删除英文）
- `src/components/Hero.tsx`、`App.tsx`（中文化）
- `data/agents.json`（新增 5 个项目，182 → 187）

**验证**：
- `npm run build` ✅ 通过（0 error）
- 浏览器 10 项功能全部 PASS

---

## 后续待办任务

### Phase 13 · README 中文详情（动态获取 + AI 翻译）[completed]

**实现方案**：纯静态预生成
- 前端用 fetch 加载 `public/readme_zh/{owner}__{repo}.md` 静态文件
- 用 react-markdown + remark-gfm 渲染 Markdown
- 用 @tailwindcss/typography 提供 prose 样式
- README 不存在时回退显示 detailZh

**已处理 20 个项目**（5 个新增 + 15 个高星）：
| 类型 | 数量 | 说明 |
|---|---|---|
| 原生中文 README | 4 | dify、MoneyPrinterTurbo、chinese-independent-developer、indie-hacker-tools |
| AI 翻译 | 16 | AutoGPT、n8n、langchain、ComfyUI 等 |
| 超长截断 | 8 | README > 5000 字，翻译前 3000 字 + 完整文档链接 |

**改动文件**：
- `src/components/AgentDetailModal.tsx`（增加 README 加载和 Markdown 渲染）
- `public/readme_zh/*.md`（20 个中文 README 文件）
- `package.json`（新增 react-markdown、remark-gfm、@tailwindcss/typography）
- `tailwind.config.js`（添加 typography 插件）

### Phase 14 · 批量补充使用指南 [pending]

- 当前 5 个新增项目已有 usageGuide
- 后续基于 README 的 Quick Start 章节批量生成

### Phase 15 · Gitee 镜像链接收集 [completed]

**收集结果**：14 个项目找到 Gitee 镜像
| 类型 | 数量 | 示例 |
|---|---|---|
| Gitee 官方镜像 | 12 | n8n、langchain、ComfyUI、open-webui 等 |
| Gitee 官方仓库（GVP） | 2 | dify、ragflow |

**未找到镜像**：AutoGPT、anthropics/skills、garrytan/gstack、openai/whisper、Deep-Live-Cam、ChatGPTNextWeb（6 个）

**改动文件**：`data/agents.json`（14 个项目新增 giteeMirror 字段）

### Phase 16 · 更多独立开发项目补充 [completed]

**验证结果**：6 个 awesome 仓库全部 stars 不足 1000，不符合收录标准
| 仓库 | Stars | 是否收录 |
|---|---|---|
| johackim/awesome-indiehackers | 642 | ❌ |
| Micro-SaaS-Examples/Best-Micro-SaaS-Tools | 218 | ❌ |
| princepal9120/awesome-solo-founder-oss | 49 | ❌ |
| Alex0x47/awesome-indie-hackers-tools | 62 | ❌ |
| DirectorySurf/awesome-launch-platforms | 244 | ❌ |
| mahseema/awesome-saas-directories | 235 | ❌ |

### Phase 17 · 部署优化 [pending]

- 解决 Vercel 国内访问不稳定问题
- EdgeOne Pages 已配置，待验证
- 考虑 Cloudflare Pages 备选

---

### Phase 18 · 新增项目 + README 扩充 + Gitee 镜像扩充 [in_progress]

**用户需求**：
1. 搜索并验证一批开源工具（Taipy、x-mentor-skill、6 个 awesome 类仓库、Open SaaS、chinese-independent-developer、Best-Micro-SaaS-Tools 等）
2. 验证用户提供的 7 个新项目地址（ian-xiaohai-illustrations、awesome-personal-skills、UZI-Skill、personality-receipt、book-to-webpage、talk-a-little-bit-more）
3. Phase 13 README 中文详情需要所有项目都有
4. Phase 15 Gitee 镜像链接需要扩充

**Step 1 · stars 验证结果**（2026-07-20，GitHub API）：

✅ 符合 stars ≥ 1000 可新增的项目（3 个）：
| 项目 | Stars | 分类 | 子分类 |
|---|---|---|---|
| Avaiga/taipy | 19,313 | coding | 低代码平台 |
| alchaincyf/x-mentor-skill | 1,073 | skills | 内容创作 Skill |
| wbh604/UZI-Skill | 5,603 | skills | 投资分析 Skill |

❌ 未达 1000 stars 门槛被拒绝（10 个）：
| 项目 | Stars | 备注 |
|---|---|---|
| johackim/awesome-indiehackers | 642 | Phase 16 已拒绝 |
| Micro-SaaS-Examples/Best-Micro-SaaS-Tools | 218 | Phase 16 已拒绝 |
| princepal9120/awesome-solo-founder-oss | 49 | Phase 16 已拒绝 |
| Alex0x47/awesome-indie-hackers-tools | 62 | Phase 16 已拒绝 |
| DirectorySurf/awesome-launch-platforms | 244 | Phase 16 已拒绝 |
| mahseema/awesome-saas-directories | 235 | Phase 16 已拒绝 |
| chen103226/awesome-one-person-company | 204 | Phase 16 已拒绝 |
| hiyeshu/personality-receipt | 2 | 人格小票 Skill |
| caibucaiAI/talk-a-little-bit-more | 17 | Talk a Little Bit More |

❓ 项目地址 404 / 仓库不存在（4 个）：
| 项目 | 状态 |
|---|---|
| helloianne0/ian-xiaohai-illustrations | GitHub API 404 |
| tmstack/awesome-personal-skills | GitHub API 404 |
| crayon-al/book-to-webpage | GitHub API 404 |
| 「把现实装进老游戏」 | 无地址 + 搜索无对应仓库 |

🔄 stars 数据已更新（2 个，偏差较大）：
| 项目 | 旧 stars | 最新 stars |
|---|---|---|
| 1c7/chinese-independent-developer | 27,045 | 59,001 |
| wasp-lang/open-saas | 9,302 | 14,954 |

**Step 2 · 数据录入**：
- 新增 3 个项目到 `data/agents.json`（项目总数 187 → 190）
- 更新 2 个项目的 stars 数据

**Step 3 · Phase 13 README 中文详情扩充**：
- 原有 README：20 个
- 本会话新增 README：27 个（Batch A: 9 + Batch B: 10 + Batch C: 8）
- 当前 README 总数：47 个（覆盖率 24.7%）
- 待补：143 个项目

新增的 27 个 README 文件：
| Batch | 项目数 | 示例 |
|---|---|---|
| A (Top 1-13) | 9 | modelcontextprotocol/servers、ChatGPTNextWeb、lobe-chat、paperclip、reveal.js、gpt_academic、MetaGPT、awesome-claude-skills、cline |
| B (Top 11-20) | 10 | anything-llm、OpenSpec、autogen、private-gpt、crewAI、joplin、faceswap、gpt-engineer、Flowise、remotion |
| C (Top 21-30 + 新增) | 8 | Fooocus、llama_index、awesome-claude-code、huginn、slidev、Taipy、x-mentor-skill、UZI-Skill |

**Step 4 · Phase 15 Gitee 镜像扩充**：
- 原有 Gitee 镜像：14 个
- 本会话新增 Gitee 镜像：5 个
- 当前 Gitee 镜像总数：19 个

新增的 5 个 Gitee 镜像：
| 项目 | Gitee 镜像 |
|---|---|
| Significant-Gravitas/AutoGPT | https://gitee.com/mirrors/Auto-GPT |
| openai/whisper | https://gitee.com/mirrors/openai-whisper |
| lobehub/lobe-chat | https://gitee.com/mirrors/lobe-chat |
| FoundationAgents/MetaGPT | https://gitee.com/mirrors/MetaGPT |
| laurent22/joplin | https://gitee.com/mirrors/joplin |

**验证**：
- `npm run build` ✅ 通过（2046 modules，18.86s，0 error）
- JSON 校验 ✅ 通过（190 项目，19 个有 giteeMirror）

**待后续会话处理**：Phase 19 替代原 README 方案，见下方。

---

### Phase 19 · detailZh + oneClickPrompt 批量补全 [pending]

**决策背景**：放弃拉取完整 README 的方案（太重太慢），改为两步走：
1. **detailZh**：3-4 句中文项目介绍（阅读 GitHub 仓库简介后提炼）
2. **oneClickPrompt**：一句话 AI 操作指令，用户复制后发给 AI 即可完成项目克隆/安装

**决策记录**（2026-07-20）：
- 新字段命名：`oneClickPrompt`（已加入 `src/types.ts` Agent 接口）
- 已有 47 个 README 文件保留不动，不再新增
- detailZh 生成方式：阅读 GitHub 仓库简介（description + topics + README 首段）后提炼 3-4 句中文
- 不需要拉取 README 原文，不需要翻译

**当前缺口**：
| 数据项 | 已有 | 缺失 | 总数 |
|---|---|---|---|
| detailZh | 8 | 182 | 190 |
| oneClickPrompt | 0 | 190 | 190 |

**oneClickPrompt 生成规则**（写入 `data/agents.json`）：

```
如果项目有 giteeMirror：
  → "帮我克隆项目 {name}（镜像源：{giteeMirror}），并教会我如何使用这个项目。"

如果项目 fullApp = true：
  → "帮我下载 {name}，并教会我如何使用这个程序。"

其他情况（普通代码仓库，无 giteeMirror）：
  → "帮我克隆项目 {name}（GitHub地址：{url}），并教会我如何使用这个项目。"
```

**detailZh 生成规则**：

1. 用 WebFetch 访问 `https://github.com/{owner}/{repo}` 或 `https://api.github.com/repos/{owner}/{repo}`
2. 提取：description、topics、README 首段（前 500 字）
3. 提炼成 3-4 句连贯中文介绍，包含：
   - 项目是什么（一句话）
   - 核心功能/特点（1-2 句）
   - 适用场景/目标用户（1 句）
4. 不写列表、不写代码块，纯叙述段落
5. 参考已有范例（如 Taipy 的 detailZh）

**已有 detailZh 范例**（Taipy）：
> Taipy 是面向数据科学家和 AI 工程师的开源低代码框架，专注于把 Python 数据脚本和 AI 模型快速转化为可交互的 Web 应用。核心特点包括纯 Python 编写无需前端知识、内置数据可视化与场景管理、支持 RAG 和机器学习流水线。适合需要快速交付数据科学 Demo、搭建 AI 模型内部工具或构建业务运营 Dashboard 的团队。

**执行策略**：按 stars 降序分批，每批 30 个项目，预计 6-7 个会话完成。

**改动文件**：
- `src/types.ts`（新增 `oneClickPrompt` 字段）✅ 已完成
- `data/agents.json`（新增 detailZh + oneClickPrompt，分批进行）
- 必要时更新 `src/components/AgentDetailModal.tsx`（展示 oneClickPrompt）

**验证**：每批完成后 `npm run build` 验证。

---

#### 执行 Prompt（复制到新任务窗口）

```
【任务】ai-agents-hub Phase 19 · detailZh + oneClickPrompt 批量补全

## 背景
项目 d:\AI\project\IdeaCreate\ai-agents-hub 是一个策展型 AI Agent/Skill 社区参考站点。
当前 190 个项目，只有 8 个有 detailZh（中文详细介绍），0 个有 oneClickPrompt（一键操作指令）。

## 你的任务（Batch N，处理第 X 到 Y 个项目）

### Step 1 · 读取待处理项目列表
运行以下命令获取本批次待处理项目：
node -e "const d=require('./data/agents.json'); d.agents.filter(a=>!a.detailZh||a.detailZh.length===0).sort((a,b)=>b.stars-a.stars).slice(0,30).forEach((a,i)=>console.log((i+1)+'. '+a.fullName+' | stars='+a.stars+' | fullApp='+(a.fullApp||false)+' | giteeMirror='+(a.giteeMirror||'none')))"

### Step 2 · 为每个项目生成 detailZh
对每个项目：
1. 用 WebFetch 访问 https://github.com/{owner}/{repo} 获取仓库简介
2. 提炼成 3-4 句中文介绍（纯叙述段落，不写列表/代码块）
3. 格式参考：
   "AutoGPT 是构建自主 AI Agent 的开源框架，让用户只需输入目标即可自动完成复杂任务。它支持多步骤推理、工具调用、记忆管理和浏览器交互，可接入多种 LLM 作为底层引擎。适合想快速搭建 AI 工作流自动化、创建个人 AI 助手的开发者和创业者。"

### Step 3 · 为每个项目生成 oneClickPrompt
按规则生成：
- 有 giteeMirror → "帮我克隆项目 {name}（镜像源：{giteeMirror}），并教会我如何使用这个项目。"
- fullApp=true → "帮我下载 {name}，并教会我如何使用这个程序。"
- 其他 → "帮我克隆项目 {name}（GitHub地址：{url}），并教会我如何使用这个项目。"

### Step 4 · 写入 agents.json
用 Edit 工具逐个为项目添加 detailZh 和 oneClickPrompt 字段。注意：
- 每个项目的字段顺序：在 demoUrl 之后（如无 demoUrl 则在 fullApp 之后）添加
- 保持 JSON 格式正确，不要破坏现有结构
- 也生成已有 detailZh 的 8 个项目的 oneClickPrompt

### Step 5 · 验证
- node -e "const d=require('./data/agents.json'); console.log('Has detailZh:',d.agents.filter(a=>a.detailZh&&a.detailZh.length>0).length); console.log('Has oneClickPrompt:',d.agents.filter(a=>a.oneClickPrompt&&a.oneClickPrompt.length>0).length)"
- npm run build 必须通过

## 关键约束
- 不要修改 agents.json 以外的文件（types.ts 已更新）
- 不要创建新文件
- 不要修改已有项目的 fields（只新增 detailZh/oneClickPrompt）
- 每批 30 个项目完成后，更新 task_plan.md 的 Phase 19 进度
- 每批处理完必须 npm run build 验证
```

---

**批次进度追踪**：

| 批次 | stars 范围 | 项目数 | 状态 | 会话 |
|---|---|---|---|---|
| Batch 1 | Top 1-30 | 30 | **done** | 2026-07-22 |
| Batch 2 | Top 31-60 | 30 | **done** | 2026-07-22 |
| Batch 3 | Top 61-90 | 30 | **done** | 2026-07-22 |
| Batch 4 | Top 91-120 | 30 | **done** | 2026-07-22 |
| Batch 5 | Top 121-150 | 30 | **done** | 2026-07-22 |
| Batch 6 | Top 151-180 | 30 | **done** | 2026-07-22 |
| Batch 7 | Top 181-190 + 已有 detailZh 的 8 个 | 18 | **done** | 2026-07-22 |

---

### Phase 20 · 新建 academic 分类 + 迁移 + 新增 [done]

**决策记录**（2026-07-25）：
- 用户确认新建 `academic` 独立分类，覆盖科研全流程（选题→检索→阅读→管理→实验→写作→投稿→评审）
- document 下 15 个学术项目全部迁移到 academic
- stars 维持 ≥ 1K 不变（学术工具也按此标准）
- **阻塞条件**：必须先完成 Phase 19（detailZh + oneClickPrompt 补全），再执行本阶段

**执行结果**（2026-07-25 完成）：
- categories 数组新增 academic 分类（icon: GraduationCap）
- CategoryGrid.tsx iconMap 添加 GraduationCap 图标映射
- 迁移 15 个学术项目（含 3 个子分类调整：AI-Scientist→科研自动化、claude-scholar→文献检索、paper-search-mcp→文献检索）
- 新增 8 个项目（均填 detailZh + oneClickPrompt）
- npm run build 通过（20.49s）
- 浏览器验证全部通过：14 个分类 / academic 23 项目 / document 剩 15 个 / 4 个子分类分布正确 / ARS 详情弹窗正常

**调研结果**（已写入 `docs/findings.md`）：
- 新增候选 8 个项目通过 stars ≥ 1K 验证
- 7 个项目因 stars 不足被拒绝
- 5 个论文评审类项目均 < 1K 被拒绝
- academic 分类设计 4 个子分类：论文写作 / 论文阅读 / 文献检索 / 科研自动化
- 迁移后 academic 项目数：23（15 迁移 + 8 新增）
- 迁移后 document 项目数：30 → 15
- 分类总数：13 → 14

**子分类结构**：
| 子分类 | 项目数 | 代表项目 |
|---|---|---|
| 论文写作 | 13 | gpt_academic(71K)、ARS(38K)、Overleaf(18K) |
| 论文阅读 | 4 | PDFMathTranslate(36K)、paper-qa(8.9K)、arxiv-mcp(3K) |
| 文献检索 | 4 | claude-scholar(4.6K)、zotero-mcp(4.4K) |
| 科研自动化 | 2 | AI-Scientist(14K)、ARIS(14K) |

**执行步骤**：
1. 在 `data/agents.json` categories 数组新增 academic 分类（icon: GraduationCap）
2. 在 `src/components/CategoryGrid.tsx` iconMap 添加 GraduationCap
3. 迁移 document 下 15 个项目的 category 字段为 academic
4. 新增 8 个项目（必须同时填 detailZh + oneClickPrompt）
5. `npm run build` 验证
6. 浏览器验证：14 个分类 / academic 23 项目 / document 剩 15 个

**关键项目简介**：
- **ARS (academic-research-skills)** 38K stars：Claude Code 学术研究 skill，10 阶段 32 Agent，含 Semantic Scholar 引用验证，Nature 7 类 AI 科研失败模式阻断检查
- **ARIS (Auto-claude-code-research-in-sleep)** 14K stars：自主 ML 研究，跨模型评审循环，idea discovery + experiment automation
- **Overleaf** 18K stars：官方协作 LaTeX 编辑器，AGPL-3.0 自托管版本
- **zotero-mcp (54yyyu)** 4.4K stars：Zotero MCP 主版本，连接 Claude/ChatGPT，语义搜索 + 引用分析

---

### Phase 21 · 新增5个高质量项目 [done]

**背景**（2026-07-26）：用户指定搜索并评估 Playwright、OpenWorker、CLI-Anything、Chinese-Independent-Developer、Crawl4AI 五个项目，决定是否加入网站。

**评估结果**：5 个项目均满足 stars ≥ 1K 标准，且与网站定位契合，全部加入。

**新增项目**：

| 项目 | Stars | 分类 | 子分类 | 理由 |
|---|---|---|---|---|
| microsoft/playwright | 93,486 | browser | 测试自动化 | Playwright MCP + CLI 是 AI Agent 浏览器自动化核心基础设施 |
| unclecode/crawl4ai | 75,059 | browser | 网页抓取 | LLM 友好的网页爬虫，MCP 集成，Agent 数据采集基础设施 |
| 1c7/chinese-independent-developer | 59,776 | entrepreneur | 独立开发资源 | 中国独立开发者项目列表，社区驱动，创业灵感来源 |
| HKUDS/CLI-Anything | 46,100 | skills | 可安装技能库 | 让任何软件 Agent-Native 的 CLI 生态，支持 Claude Plugin/Codex Skill |
| andrewyng/openworker | 6,031 | productivity | 自动化代理 | 吴恩达开源桌面 AI coworker，本地运行，交付成品而非聊天 |

**执行结果**（2026-07-26 完成）：
- 新增 5 个项目（均填 detailZh + oneClickPrompt + 完整字段）
- 总项目数：198 → 203
- detailZh 覆盖率：203 / 203
- oneClickPrompt 覆盖率：203 / 203
- npm run build 通过（52.71s）

---

## 关键约束

- stars 必须 ≥ 1000 才录入
- stars 数据基准：以检索时 GitHub 上的数据为准（不依赖过时文章）
- 录入前必须验证项目存在性
- 不创建多余临时文件
- 改动后必须 `npm run build` 验证
- 中文沟通
- 项目文件与规划文件分离（已通过 .gitignore 排除 `docs/`、`task_plan.md`、`progress.md`、`docs/findings.md`、`.planning/`）
- 外部爬取内容只写入 `docs/findings.md`，不写入 `task_plan.md`

---

## Errors Encountered

| Error | Attempt | Resolution |
|-------|---------|------------|
| GitHub API 限流（未认证） | 1 | 改用 WebFetch `api.github.com/repos/...` 验证 stars |
| SearchReplace 工具不可用 | 1 | 改用 Edit 工具完成 JSON 编辑 |
| `.gitignore` 未排除根目录规划文件 | 1 | 已添加 `task_plan.md`、`progress.md`、`docs/findings.md`、`.planning/` |
| lucide-react 无 Github 图标 | 1 | 改用 Code2 图标替代 |
