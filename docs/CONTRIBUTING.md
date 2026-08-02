# AI Agents Hub · 添加项目 SOP（Standard Operating Procedure）

> 目标：任何新项目入库"按 5 步走"，不再重新摸索。
> 位置：`docs/CONTRIBUTING.md`
> 最后更新：2026-08-01

---

## 流程总览

```
Step 1 信息采集       Step 2 归类差异化      Step 3 双处同步写
───────             ─────────             ───────
GitHub 主页 +       选 category 与        data/agents.json +
README 收集 8 个     subcategory；          public/data/agents.json
基础字段            coreCapabilities       两处必须完全一致
                   必须与现有的差异化
       │                  │                       │
       ▼                  ▼                       ▼
                       Step 4 跑校验            Step 5 commit + push
                       ────────                ────────
                       scripts/check_caps_dup.py      git commit "feat(...): 新增 ..."
                       scripts/check_data_sync.py     git push origin main
                       （两脚本均需通过）
```

---

## Step 1 · 信息采集

从 GitHub 主页 + README 拿以下字段（用 5~10 分钟）：

| # | 字段 | 来源 | 备注 |
|---|------|------|------|
| 1 | `name` | 仓库展示名 | 中文 + 英文名 |
| 2 | `fullName` | `owner/repo` | 例：`Harleysheng/awesome-llm-apps` |
| 3 | `url` | GitHub URL | 例：`https://github.com/Harleysheng/awesome-llm-apps` |
| 4 | `descriptionEn` | GitHub 简介（一行英文） | 直接抄 |
| 5 | `descriptionZh` | 中文一句话翻译 | 用口语化中文，不要机翻 |
| 6 | `detailZh` | 2~3 句中文详细介绍 | 用 Gemini / DeepSeek 等 LLM 翻译「核心能力 + 关键场景」 |
| 7 | `stars` | 仓库 stars 数 | 整数，写入时使用当时快照值；定期跑 `npm run update:stars` 更新 |
| 8 | `category` | 从 15 个分类挑 1 个 | 见 `categories.id` 列表（`data/agents.json` 顶部） |
| 9 | `subcategory` / `subcategoryEn` | 二级分类 | 不能与同 `category` 下现有任何项目撞 |
| 10 | `tags` | 3~5 个关键词 | 全小写、空格分隔的英文短语优先 |
| 11 | `coreCapabilities` | 3~5 条极简标签 | **必须差异化（见 Step 2）** |
| 12 | `giteeMirror` | `https://gitee.com/mirrors/<fullName>` 试一下 | 没有就留空（不要瞎填） |
| 13 | `oneClickPrompt` | 给 WorkBuddy 的中文指令 | 见下方 § oneClickPrompt 规范 |
| 14 | `demoUrl` | 在线 demo 链接（可选） | HuggingFace Spaces / Vercel Demo 等 |
| 15 | `language` | README 顶部语言徽章 | 例：Python / TypeScript / Rust |
| 16 | `license` | LICENSE 文件 | MIT / Apache-2.0 / GPL-3.0 ... |

---

## Step 2 · 归类与差异化

### Category 选择

当前 15 个分类（以 `data/agents.json.categories` 为准，不要硬编码）：

```
coding / framework / video / document / presentation / content /
productivity / multimodal / skills / browser / entrepreneur /
humanize / avatar / academic / webdev
```

### coreCapabilities 差异化（⚠️ 上次出过 85% 重复率，必须做这步）

5~12 字极简标签 + **与该 category 下所有现存项目都不撞**。

跑这个命令验证（脚本见 `scripts/check_caps_dup.py`）：

```bash
python scripts/check_caps_dup.py data/agents.json
# 输出越界（> 2x 同组合）或撞车项目名时，编辑器内修订后再跑
```

> **风格基线**：Style A（极简标签 5-12 字），上一轮已敲定。同 category 不同 subcategory 才能撞名，否则视为撞车。

---

## Step 3 · 双处同步写数据

**必须**同步改两份 JSON，缺一不可：

1. `data/agents.json`（**编辑源**）
2. `public/data/agents.json`（Vite 静态站点从这个拉数据）

插入到 `agents` 数组中合适的位置（按 `category` 与现有顺序）。**注意**：JSON 末尾逗号、引号转义保持一致。

---

## oneClickPrompt 规范（Phase 10 决策落地）

`oneClickPrompt` 是项目详情 Modal「一键启动」框里的中文指令文本，决定用户点开项目后怎么"一键启动"它。

**两种合法格式**（二选一）：

### 格式 A · 克隆型（适用于开源项目可一键 git clone）

```
帮我克隆项目 <name>（镜像源：<giteeMirror>），并教会我如何使用这个项目。
```

- 适用于：CLI 工具、Web 框架、Agent 平台等本地部署类项目
- 文本中**必须显式含「镜像源：」**（即使 giteeMirror 字段未填）
- 同一句话尾部要补一句「如果我的指令不够清晰，则跟我确定之后再执行。」（由组件自动追加，不要写在数据里）

### 格式 B · 教学型（适用于教程型 / 框架搭骨架）

```
帮我用 <framework> 搭建一个 <场景>，包含 <要素1>、<要素2>、<要素3>。
```

- 适用于：React / Bootstrap / Next.js / Tailwind 等框架类项目
- 不强制要求「镜像源：」字样（因为不是克隆场景）
- 不需要 giteeMirror

### 强制规则（脚本兜底）

`scripts/check_caps_dup.py` 的「oneClickPrompt ↔ giteeMirror 一致性」校验：
- 存在 `oneClickPrompt` 且文本含「镜像源：」→ 视为格式 A，**OK**
- 存在 `oneClickPrompt` 且**有 `giteeMirror` 字段** → 视为格式 A，**OK**
- 存在 `oneClickPrompt` 但**既无镜像源字样又无 giteeMirror 字段** → 视为格式 B（教学型），**OK**
- 都不满足 → **WARNING**（不阻断 commit，但提示补 `giteeMirror` 或在 prompt 加「镜像源：」）

> 2026-08-01 实测：当前 222 项目中 20 个有 `giteeMirror`，202 个有 `oneClickPrompt` 但无镜像源（多为教学型 prompt，不影响）

---

## giteeMirror 补充流程

1. 看 `docs/MIRROR_PROPOSAL.md` 候选清单（按 stars 排序的 top 50 缺镜像项目）
2. 浏览器逐个打开候选 URL，命中 → 填入 `data/agents.json` 的 `giteeMirror` 字段
3. **双处同步**（`data/agents.json` 与 `public/data/agents.json` 都要改）
4. 跑 `scripts/check_data_sync.py` 确认一致
5. 跑 `scripts/check_mirror.py data/agents.json`（如有可访问 gitee 的环境）核对链接

> 注意：本机 `curl https://gitee.com/mirrors/*` 会拿到 405（IP 段反爬），所以**自动化探测在这台机器不可用**。
> WebFetch 工具可以读但只适合单次核对，不适合批量。
> 最佳实践 = 浏览器逐个验证 + 手动 commit。

---

## Step 4 · 跑校验（不可跳过）

写完两份后，**两脚本都必须通过**才能 commit：

```bash
# 1) 检查 coreCapabilities 重复
"C:/Users/24237/.workbuddy/binaries/python/versions/3.13.12/python.exe" scripts/check_caps_dup.py data/agents.json
# 期望输出：`max_dup ≤ 2` 且 `legacy_keywords_found = 0`

# 2) 检查 data/ 与 public/data/ 一致
"C:/Users/24237/.workbuddy/binaries/python/versions/3.13.12/python.exe" scripts/check_data_sync.py
# 期望输出：`data == public/data` ✓
```

如果任意一个脚本红色退出，回到 Step 3 修复。

---

## Step 5 · Commit + Push

```bash
# 明确 add，不要 add .
# 已经 .gitignore 过滤过 *.bak 与 temp/trending.html，但还是建议 explicit
git add data/agents.json public/data/agents.json

git status -s   # 必须看到两个 A 状态，无意外 .bak / temp
git commit -m "feat(<category>): 新增 <fullName>"
git push origin main
```

### Commit 信息模板

| 类型 | 适用 |
|------|------|
| `feat(<cat>): 新增 <fullName>` | 添加一个项目 |
| `fix(<cat>): 修正 <fullName> 的 <字段>` | 修订已有项目某字段 |
| `remove(<cat>): 移除 <fullName>` | 项目下线 / 关仓 |
| `chore(data): 同步刷新 stars` | `npm run update:stars` 后 |

---

## 附录 · 校验脚本

两份脚本位置：

- `scripts/check_caps_dup.py` —— coreCapabilities 重复/撞车检查 + oneClickPrompt ↔ giteeMirror 一致性
- `scripts/check_data_sync.py` —— data/ 与 public/data/ 一致性
- `scripts/check_mirror.py` —— gitee 镜像 URL 可达性（本机受限，仅作参考）

两者打包成 npm scripts（建议但可选）：

```json
{
  "scripts": {
    "check:caps": "python scripts/check_caps_dup.py data/agents.json",
    "check:sync": "python scripts/check_data_sync.py"
  }
}
```

---

## 附录 · 已知约束

1. **数据双写**：data/ 与 public/data/ 必须完全一致。任何 commit 这两个文件都成对出现。
2. **核心能力差异化**：220/221 差异化是上次大半夜抠出来的，别再让它回到 33 组合。
3. **giteeMirror 不要瞎填**：填了但前端没暴露，比不填还误导。
4. **不要破坏 JSON 格式**：JSON 文件必须是合法 UTF-8，不要插中文 BOM、不要用单引号逗号等。
5. **完成定义**：上述 5 步都通过 + build 通过 `npm run build` + 推送到 origin。

---

## 附录 · 提交示例（实测：2026-08-01 加入 video-autopilot-kit）

> 已按本 SOP 实做一遍，下面是 sample diff（实际数据见 git log commit `d598aa2+` 之后的 video-autopilot-kit 入库 commit）：
>
> ```diff
> --- a/data/agents.json
> +++ b/data/agents.json
>   ...
> +  {
> +    "name": "video-autopilot-kit",
> +    "fullName": "Hao0321/video-autopilot-kit",
> +    "url": "https://github.com/Hao0321/video-autopilot-kit",
> +    "descriptionEn": "Fill-in-your-own-data framework for YouTube / short-form video automation: CapCut JSON + ffmpeg tooling + an onboarding questionnaire.",
> +    "descriptionZh": "YouTube/短视频自动化套件:CapCut JSON + ffmpeg 直接改剪映草稿,填空式 profiles 配置,零私人数据、纯空白骨架。",
> +    "stars": 1500,
> +    "category": "video",
> +    "subcategory": "短视频自动化",
> +    "subcategoryEn": "Shorts Automation",
> +    "tags": ["capcut", "video-automation", "ffmpeg", "youtube-shorts", "creator-tools"],
> +    "detailZh": "底层直接修改剪映草稿 JSON,搭配 ffmpeg 渲染输出,实现全自动批量出片。用户只需填空式配置,套入自己素材就能跑;所有模板为空白骨架,适合二次开发。",
> +    "coreCapabilities": [
> +      "CapCut JSON 直改",
> +      "ffmpeg 套模板渲染",
> +      "填空式 profiles 配置",
> +      "零私有数据二次开发友好"
> +    ],
> +    "language": "Python",
> +    "license": "MIT"
> +  }
> ```
