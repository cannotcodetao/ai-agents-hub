# 任务计划：AI 工具策展 · 4 大功能迭代 + 上线

## 目标
完成 4 项功能迭代并上线到 https://cannotcode.cn：
1. 221 个项目核心能力逐个定制（消除通用文案复用）
2. 新增使用教程页面（工具下载 + 安装图示 + 免费 Token/API 配置）
3. 搜索栏下方加 3 个导航（GitHub 今日趋势 / 趋势榜 / 入门教程）
4. 页眉加备案号横条

保持品牌「AI 工具策展」，并先把项目完整提交到 GitHub。

## 关键决策（已与用户确认）
- 任务 1 风格：**风格 A（极简标签 5-12 字）**
- 任务 1 节奏：分批推进，用户已确认风格 A，后续批次连续做，**全部完成再上传 dist**
- 任务 2 教程页：**完整图文步骤**
- 任务 2 安装图示：**官网搜集 / 公开教程优先**，实在没有用户再给图示
- 任务 2 **不需要** Claude Code / Cursor 等通用 IDE 插件安装
- 任务 2 免费 Token：先给**官网链接**让用户验证（或我验证）
- 任务 3/4：第一批已完成（Sidebar 导航 + Hero 备案横条），最终统一 build
- 上传策略：**所有任务完成后再一次性上传 dist/**

## 已掌握的关键信息
- 项目路径：`D:\AI\project\IdeaCreate\ai-agents-hub`
- 数据源：`data/agents.json` 与 `public/data/agents.json`（Vite 静态站点，必须两处同步改）
- Git remote：`git@github.com:cannotcodetao/ai-agents-hub.git`（SSH 已连通）
- 备份：`data/agents.json.bak` / `public/data/agents.json.bak`（改数据前已建，不提交）
- 备案号：粤ICP备2026107109号（页眉 + footer 双处）
- 邀请链接：Trae `https://www.trae.cn/work-fission/9T3B33XAYPG2`；WorkBuddy `https://www.workbuddy.cn/events/invite?inviteCode=aqhmnej070o8`

## 阶段（Phases）
| Phase | 描述 | 状态 |
|-------|------|------|
| 0 | 提交项目到 GitHub | complete（d598aa2，2026-07-31 已 push origin/main） |
| 1 | 任务 1 - 编程代码 25 个核心能力定制 | complete |
| 2 | 任务 1 - 后续 12 分类 196 个项目 | complete（220/221 差异化，0 通用残留） |
| 3 | 任务 3 - Sidebar 搜索栏下方导航（GitHub今日趋势/趋势榜/入门教程） | complete |
| 4 | 任务 4 - Hero 上方备案横条 | complete（页眉 + footer 双处） |
| 5 | 任务 2 - 教程页：工具下载(邀请链接) + 安装图示(官网搜集) + 免费Token/API配置(官网验证) | complete（Tutorials.tsx 已建，已接入 Sidebar/App 视图切换，build 通过） |
| 6 | 最终 build + 准备上传 dist/ 到服务器 | build 通过（dist 已生成）；上传待用户确认后执行 |
| 7 | **本轮 · 文档整理** - 根目录三份活跃 md → `docs/`，README 顶部加导航条，旧 docs/ 副本归档 | complete（commit `4e5368f`） |
| 8 | **本轮 · 搜索栏 UX** - searchQuery 变化时自动 scrollIntoView('#explore')；可选叠加 Header 状态条 | complete（commit `44011df`） |
| 9 | **本轮 · 新项目入库** - `Hao0321/video-autopilot-kit` 入 `video` 分类 + `docs/CONTRIBUTING.md` SOP + `scripts/check_caps_dup.py` + `scripts/check_data_sync.py` + 修 6 条历史撞车 | complete（commit `3095291`） |
| 10 | **本轮 · 国内镜像源** - 等用户发参考图后选定 `mirrors: {label,url}[]` 建模 / gitee + 第三方代理混合 / 前端 Modal 暴露 | blocked（等待用户发图） |
| 11 | **教程页 6 任务（新窗口执行）** - A 侧栏锚点修复 / B 删营销话术 / B-4 Trae·WorkBuddy 特征化介绍 / C Download 图标+官网链接 / D 按钮文案 / E Token 平台改介绍 / F-2 回写文档 | complete（2026-08-02 新窗口执行；caps/sync 校验 PASS，`npm run build` 通过；已随 `c3776a9` 推送 origin/main） |
| 11-1 | **教程页补刀** - ① 删除 Token 卡片「已验证」badge / ② 进入教程页自动滚到顶部 / ③ 教程页侧栏分类按钮可跨视图跳转 | complete（2026-08-02 同一会话修复；build 通过；见 commit） |

## 数据现状（任务 1 依据）
- 221 个项目，原仅 33 种 coreCapabilities 组合（重复率 85%）
- 已全量重写为 220/221 差异化组合（最大重复 2x），0 通用残留文案，0 缺失
- 批量脚本留存于 temp/batch1~10_*.py 以便复跑

## 待用户确认/补充
- 任务 2 安装图示：已是「官网安装图示 · 用户后续提供」占位框，待用户补真实截图
- 任务 2 免费 Token 官网链接已在页面给出（9 家），部份标注「待验证/控制台确认」，待用户核验或我补核验
- 公安备案号：主体审核中，拿到后补 footer（页眉条已用 ICP 号占位）
- 上传服务器：4 任务已全部完成，待用户确认是否现在上传 dist/（存在占位图与待验证 Token 两项待办）
- **本轮 Phase 8 叠加选项**：B-1 自动滚动之外是否还要 Header 状态条（用户没表态默认不上）
- **本轮 Phase 10 等待**：镜像源方案等用户发参考图，先不动数据与 UI
- **git 事故（2026-08-02，已解决但历史被重置）**：`.git` 先 ACL 锁死、后整个目录消失；用户就地 `git init` 重建并以单条 `Initial commit`（`c3776a9`）推送 HTTPS remote，Phase 11 全部改动已入库。**代价：`d273c6b` 之前的提交历史不在 main 上了**，仓库现为单提交。待办：① 决定是否尝试从 GitHub 悬空对象找回旧历史；② 根目录未跟踪文件 `git-push-guide.html` 入库或删除
