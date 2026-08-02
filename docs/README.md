# AI Agents Hub · 内部文档索引

> 本目录是项目内部规划文档的入口。**对外**的项目介绍在仓库根目录 [`README.md`](../README.md)；**对内**（任务、进度、调研、规范、归档）都从这里找。

## 📌 当前活跃文档

| 文件 | 用途 | 状态 |
|------|------|------|
| [`PLANNING.md`](PLANNING.md) | 本轮（2026-08-01）规划方案与决策点入口 | 🟢 草稿待审/执行中 |
| [`TASK_PLAN.md`](TASK_PLAN.md) | 长期任务计划（阶段 0~10） | 🟢 活跃 |
| [`PROGRESS.md`](PROGRESS.md) | 工作进度日志（按会话时间倒序追加） | 🟢 活跃 |
| [`FINDINGS.md`](FINDINGS.md) | 调研发现（Token 平台、安装图示、风格决策等） | 🟢 活跃 |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | 添加新 Agent 项目的标准流程（SOP） | 🟢 活跃 |
| [`TASK_HANDOFF.md`](TASK_HANDOFF.md) | 历史项目交接背景（2026-07-16 起草，仅备查） | ⚪ 静态 |

## 🗂 本轮专题（按需展开）

| 文件 | 用途 |
|------|------|
| [`PLANNING_2026-08-01.md`](PLANNING_2026-08-01.md) | 本轮四任务（文档整理 / 搜索 UX / 新项目入库 / 镜像源）的方案原始稿 |

## 📦 历史归档

[`planning-archive/`](planning-archive/) 下放不在主线但有保留价值的资产：

- `historic-2026-07-31/` —— 上一轮（4 大功能迭代）闭合时的 task_plan / progress / findings 三份历史版本，作为"已闭环"快照
- `*.py` —— 历史数据爬取/校验脚本（add_full_apps / avatar_search / full_app_search 等），仅供复跑数据时参考

## 使用约定

- **新任务** ⇒ 在 `TASK_PLAN.md` 顶部 "Phases" 表加一行阶段编号
- **新进度** ⇒ 在 `PROGRESS.md` 顶部追加 `## YYYY-MM-DD 会话 N` 章节
- **新调研** ⇒ 在 `FINDINGS.md` 顶部加章节
- **本轮讨论草案** ⇒ 写到 `PLANNING_YYYY-MM-DD.md`，决策落地后合并进 `TASK_PLAN.md`
- **SOP / 规范** ⇒ 写到对应专题 doc（如 `CONTRIBUTING.md`）
