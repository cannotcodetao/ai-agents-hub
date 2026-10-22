# 任务计划 · ai-agents-hub 改版（二阶段）

> 工作流：planning-with-files。计划先行 → 执行 → 更新进度 → 删除已完成且不重要任务。
> 决策门：指令不清已与用户确认后再执行。

## 目标
1. 侧栏分类「固定」做**两版**供对比：`sticky`（常驻 sticky 列表）与 `minimal`（精简顶部快捷导航，分类成唯一常驻导航）。
2. 删除「趋势榜」板块（Trending 组件 + 侧栏「趋势榜」导航项 + App 引用）。
3. **更新技能模板文件** `skills-catalog-report`（SKILL.md + html-template.md），补「浅色 Editorial Ink 变体」令牌，使技能与本站已应用样式同步。
4. 新建 `README.md`：项目介绍 + 功能定位。
5. 内容/结构文案尽量不动；仅删趋势榜相关可见文案。

## 关键决策（已确认）
- 同步修改技能 = **更新技能模板文件**（非仅站内同步）。
- 固定方式 = **两版都做**（`?nav=sticky` 默认 / `?nav=minimal`），让用户看效果再选。

## 阶段
- [x] **Phase 1** 写计划/进度文件（task_plan / findings / progress）
- [x] **Phase 2** 侧栏两版实现（Sidebar 接受 `variant` prop；App 从 URL 读取 `nav` 参数；sticky 版加分类 sticky 子标题；minimal 版移除快捷导航块）
- [x] **Phase 3** 删除趋势榜（删 Trending.tsx + App 引用/用法 + 侧栏「趋势榜」导航项 + 清理 `#trending` 锚点相关）
- [x] **Phase 4** 更新技能模板（SKILL.md 加浅色变体说明；html-template.md 加 §8 浅色令牌块）
- [x] **Phase 5** README.md 重写为项目定位导向（同步当前状态：趋势榜已删、组件已更新）
- [x] **Phase 6** 构建验证（`npm run build` 通过）+ 预览两版 + 更新进度文件

## 已决策（2026-09-08 晚·二轮确认）
- **侧栏定稿**：采用常驻列表版（sticky）。`?nav=minimal` 分支代码用户选择**暂不删除**（保留作对照，后续需要再清）。
- **重复项删除**（用户多选确认，仅勾选一项）：删除首页「分类浏览」网格区（CategoryGrid 组件 + App 引用），分类入口统一收敛到侧栏。「数据一览」统计区保留。

## 阶段（二轮追加）
- [x] **Phase 7** 删除首页「分类浏览」网格区（删 CategoryGrid.tsx + App import/JSX；README 同步：首页板块重编号 + 功能定位措辞更新）
- [x] **Phase 8** 构建验证（`npm run build` 通过）+ 预览 + 更新进度文件

## 遗留（不影响交付）
- `Sidebar.tsx` 的 `variant` prop 与 minimal 分支仍在（用户暂留），若日后要清，删 `variant` 相关条件渲染并把 sticky 行为固化即可。

## 待澄清/风险
- 两版通过 `?nav=minimal` 切换；默认 `sticky`。用户看完选一版后，再删除另一版的代码分支（避免长期冗余）。
- 删趋势榜后，侧栏「趋势榜」快捷导航项必须同步移除（指向 #trending 的锚点失效）。
- 技能模板为独立目录，修改属「跨项目写文件」，已获用户明确授权。

## 错误记录
| 错误 | 尝试 | 解决 |
|------|------|------|
| （暂无） | | |

## 阶段（三轮追加 · 2026-09-08 22:20）
- [x] **Phase 9** 侧栏快捷导航两项（GitHub 今日趋势 / 入门教程）与分类项同尺寸（px-3 py-2、text-sm font-medium、同宽度 px-3 容器）+ 文字 ink3→ink2 加深（用户选「同尺寸+加深文字」）
- [x] **Phase 10** 首屏调整：GitHub 今日趋势/编辑精选下移至完整项目列表之后；首页最前直接显示完整项目列表（默认全部分类，不预选代码编程）；README 首页板块顺序同步
- 构建验证通过；错误：无。
