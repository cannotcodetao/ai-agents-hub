# 国内镜像源补充候选清单（待审）

> 生成时间：2026-08-01
> 来源：data/agents.json 排序 top 50（按 stars 降序，过滤已有 giteeMirror）

## 使用说明

1. 下方每行的 `候选 URL` 是 `https://gitee.com/mirrors/<repo>` 格式（gitee 官方镜像）
2. **本机网络环境无法直接验证 gitee.com**（curl 拿到 405，反爬屏蔽），所以无法批量探测
3. 请你**用浏览器逐个打开候选 URL**，命中 200 内容的标 ✅、404 或私有仓库标 ❌、不确定的留空
4. 命中后从「候选」列移到 data/agents.json 的 `giteeMirror` 字段，并 commit
5. 也可以用 `scripts/check_mirror.py data/agents.json` 自行探测（如有可访问 gitee 的环境）

## 现状（2026-08-01）

- 总项目: **222**
- 已有 giteeMirror: **19**（8.6%）
- 待补候选: **203**（本清单列前 50）

## 候选清单（top 50）

| # | 状态 | fullName | stars | 分类 | 候选 URL | 备注 |
|---|------|----------|------:|------|----------|------|
| 1 | ⬜ | `react/react` | 246,700 | webdev | https://gitee.com/mirrors/react | React |
| 2 | ⬜ | `twbs/bootstrap` | 174,500 | webdev | https://gitee.com/mirrors/bootstrap | Bootstrap |
| 3 | ⬜ | `anthropics/skills` | 161,625 | skills | https://gitee.com/mirrors/skills | anthropics/skills |
| 4 | ⬜ | `vercel/next.js` | 140,000 | webdev | https://gitee.com/mirrors/next.js | Next.js |
| 5 | ⬜ | `garrytan/gstack` | 122,244 | entrepreneur | https://gitee.com/mirrors/gstack | gstack |
| 6 | ⬜ | `shadcn-ui/ui` | 110,000 | webdev | https://gitee.com/mirrors/ui | shadcn/ui |
| 7 | ⬜ | `angular/angular` | 100,600 | webdev | https://gitee.com/mirrors/angular | Angular |
| 8 | ⬜ | `ant-design/ant-design` | 97,800 | webdev | https://gitee.com/mirrors/ant-design | Ant Design |
| 9 | ⬜ | `mui/material-ui` | 96,500 | webdev | https://gitee.com/mirrors/material-ui | MUI (Material UI) |
| 10 | ⬜ | `tailwindlabs/tailwindcss` | 96,100 | webdev | https://gitee.com/mirrors/tailwindcss | Tailwind CSS |
| 11 | ⬜ | `hacksider/Deep-Live-Cam` | 94,943 | avatar | https://gitee.com/mirrors/Deep-Live-Cam | Deep-Live-Cam |
| 12 | ⬜ | `microsoft/playwright` | 93,486 | browser | https://gitee.com/mirrors/playwright | playwright |
| 13 | ⬜ | `modelcontextprotocol/servers` | 88,548 | skills | https://gitee.com/mirrors/servers | MCP Servers |
| 14 | ⬜ | `sveltejs/svelte` | 86,600 | webdev | https://gitee.com/mirrors/svelte | Svelte |
| 15 | ⬜ | `ChatGPTNextWeb/ChatGPTNextWeb` | 82,914 | content | https://gitee.com/mirrors/ChatGPTNextWeb | ChatGPT-Next-Web |
| 16 | ⬜ | `storybookjs/storybook` | 82,000 | webdev | https://gitee.com/mirrors/storybook | Storybook |
| 17 | ⬜ | `vitejs/vite` | 81,000 | webdev | https://gitee.com/mirrors/vite | Vite |
| 18 | ⬜ | `unclecode/crawl4ai` | 75,059 | browser | https://gitee.com/mirrors/crawl4ai | crawl4ai |
| 19 | ⬜ | `paperclipai/paperclip` | 73,900 | entrepreneur | https://gitee.com/mirrors/paperclip | Paperclip |
| 20 | ⬜ | `hakimel/reveal.js` | 71,946 | presentation | https://gitee.com/mirrors/reveal.js | reveal.js |
| 21 | ⬜ | `binary-husky/gpt_academic` | 71,091 | academic | https://gitee.com/mirrors/gpt_academic | GPT Academic |
| 22 | ⬜ | `ComposioHQ/awesome-claude-skills` | 67,867 | skills | https://gitee.com/mirrors/awesome-claude-skills | awesome-claude-skills |
| 23 | ⬜ | `webpack/webpack` | 66,000 | webdev | https://gitee.com/mirrors/webpack | webpack |
| 24 | ⬜ | `cline/cline` | 64,722 | coding | https://gitee.com/mirrors/cline | Cline |
| 25 | ⬜ | `mintplex-labs/anything-llm` | 63,393 | document | https://gitee.com/mirrors/anything-llm | AnythingLLM |
| 26 | ⬜ | `Fission-AI/OpenSpec` | 61,196 | coding | https://gitee.com/mirrors/OpenSpec | OpenSpec |
| 27 | ⬜ | `nuxt/nuxt` | 60,000 | webdev | https://gitee.com/mirrors/nuxt | Nuxt |
| 28 | ⬜ | `1c7/chinese-independent-developer` | 59,776 | entrepreneur | https://gitee.com/mirrors/chinese-independent-developer | chinese-independent-developer |
| 29 | ⬜ | `microsoft/autogen` | 59,773 | framework | https://gitee.com/mirrors/autogen | AutoGen |
| 30 | ⬜ | `zylon-ai/private-gpt` | 57,335 | document | https://gitee.com/mirrors/private-gpt | PrivateGPT |
| 31 | ⬜ | `crewAIInc/crewAI` | 55,628 | framework | https://gitee.com/mirrors/crewAI | CrewAI |
| 32 | ⬜ | `deepfakes/faceswap` | 55,348 | avatar | https://gitee.com/mirrors/faceswap | faceswap |
| 33 | ⬜ | `AntonOsika/gpt-engineer` | 55,185 | entrepreneur | https://gitee.com/mirrors/gpt-engineer | GPT Engineer |
| 34 | ⬜ | `FlowiseAI/Flowise` | 54,676 | productivity | https://gitee.com/mirrors/Flowise | Flowise |
| 35 | ⬜ | `vuejs/core` | 54,000 | webdev | https://gitee.com/mirrors/core | Vue |
| 36 | ⬜ | `facebook/docusaurus` | 54,000 | webdev | https://gitee.com/mirrors/docusaurus | Docusaurus |
| 37 | ⬜ | `remotion-dev/remotion` | 53,399 | video | https://gitee.com/mirrors/remotion | Remotion |
| 38 | ⬜ | `lllyasviel/Fooocus` | 51,130 | multimodal | https://gitee.com/mirrors/Fooocus | Fooocus |
| 39 | ⬜ | `run-llama/llama_index` | 50,884 | framework | https://gitee.com/mirrors/llama_index | LlamaIndex |
| 40 | ⬜ | `hesreallyhim/awesome-claude-code` | 50,151 | skills | https://gitee.com/mirrors/awesome-claude-code | awesome-claude-code |
| 41 | ⬜ | `huginn/huginn` | 49,625 | productivity | https://gitee.com/mirrors/huginn | Huginn |
| 42 | ⬜ | `slidevjs/slidev` | 47,691 | presentation | https://gitee.com/mirrors/slidev | Slidev |
| 43 | ⬜ | `Aider-AI/aider` | 47,432 | coding | https://gitee.com/mirrors/aider | Aider |
| 44 | ⬜ | `HKUDS/CLI-Anything` | 46,100 | skills | https://gitee.com/mirrors/CLI-Anything | cli-anything |
| 45 | ⬜ | `logseq/logseq` | 43,911 | document | https://gitee.com/mirrors/logseq | Logseq |
| 46 | ⬜ | `sickn33/agentic-awesome-skills` | 43,395 | skills | https://gitee.com/mirrors/agentic-awesome-skills | agentic-awesome-skills |
| 47 | ⬜ | `moeru-ai/airi` | 42,761 | avatar | https://gitee.com/mirrors/airi | Airis |
| 48 | ⬜ | `chatboxai/chatbox` | 41,031 | content | https://gitee.com/mirrors/chatbox | Chatbox |
| 49 | ⬜ | `PatrickJS/awesome-cursorrules` | 40,332 | skills | https://gitee.com/mirrors/awesome-cursorrules | awesome-cursorrules |
| 50 | ⬜ | `chakra-ui/chakra-ui` | 40,200 | webdev | https://gitee.com/mirrors/chakra-ui | Chakra UI |

## 按分类看缺失分布

| 分类 | 缺失数 |
|------|------:|
| skills | 25/27 |
| coding | 24/25 |
| academic | 23/23 |
| browser | 20/21 |
| webdev | 18/18 |
| avatar | 18/18 |
| document | 13/15 |
| framework | 12/16 |
| productivity | 12/14 |
| entrepreneur | 9/9 |
| presentation | 8/8 |
| video | 8/10 |
| content | 6/8 |
| humanize | 4/4 |
| multimodal | 3/6 |

## 现有 giteeMirror 列表（参考已用 URL 模式）

| fullName | giteeMirror |
|----------|-------------|
| `obra/superpowers` | https://gitee.com/mirrors/superpowers |
| `n8n-io/n8n` | https://gitee.com/mirrors/n8n |
| `Significant-Gravitas/AutoGPT` | https://gitee.com/mirrors/Auto-GPT |
| `AUTOMATIC1111/stable-diffusion-webui` | https://gitee.com/mirrors/stable-diffusion-webui |
| `langflow-ai/langflow` | https://gitee.com/mirrors/langflow |
| `langgenius/dify` | https://gitee.com/dify_ai/dify |
| `open-webui/open-webui` | https://gitee.com/mirrors/open-webui |
| `langchain-ai/langchain` | https://gitee.com/mirrors/LangChain |
| `comfyanonymous/ComfyUI` | https://gitee.com/mirrors/comfyui |
| `browser-use/browser-use` | https://gitee.com/mirrors/browser-use |
| `openai/whisper` | https://gitee.com/mirrors/openai-whisper |
| `harry0703/MoneyPrinterTurbo` | https://gitee.com/mirrors/moneyprinterturbo |
| `punkpeye/awesome-mcp-servers` | https://gitee.com/mirrors/awesome-mcp-servers |
| `3b1b/manim` | https://gitee.com/mirrors/manim |
| `infiniflow/ragflow` | https://gitee.com/infiniflow/ragflow |
| `All-Hands-AI/OpenHands` | https://gitee.com/mirrors/openhands |
| `lobehub/lobe-chat` | https://gitee.com/mirrors/lobe-chat |
| `FoundationAgents/MetaGPT` | https://gitee.com/mirrors/MetaGPT |
| `laurent22/joplin` | https://gitee.com/mirrors/joplin |

## URL 模式观察

已用的 19 个 URL，模式：
- 17/19: `https://gitee.com/mirrors/<repo>`（gitee 官方极速下载组织下的镜像）
- 1/19: `https://gitee.com/infiniflow/ragflow`（用户自有账号下的真实仓库）
- 1/19: 其他变体

> 推测规则：gitee.com/mirrors 是 Gitee 官方维护的 GitHub 项目镜像站，但**只对热门项目**收录，
> 小众项目大概率没有。所以本清单命中率取决于 stars 排名：top 50 中预计 10~20 个能命中。

## 下一步

1. 用户审完上方候选清单
2. 标 ✅ 的项目 → 填入 data/agents.json 的 `giteeMirror` 字段（双处同步）
3. commit + push
4. Phase 10 关闭，进入最终 build + 上传 dist/