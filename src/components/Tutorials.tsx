import { useEffect } from 'react';
import { ArrowLeft, Download, ExternalLink, Terminal, BookOpen } from 'lucide-react';

interface TutorialsProps {
  onBack: () => void;
}

// 工具下载：用你的邀请链接直接下载（按钮显示为「下载链接」）
const TOOLS = [
  {
    name: 'Trae IDE',
    desc: '字节跳动推出的 AI 原生集成开发环境（IDE），内置可自主完成编码、重构与调试的 SOLO 智能体，支持在「传统 IDE 模式」与「自然语言对话模式」之间切换，让 AI 直接替你写代码。',
    invite: 'https://www.trae.cn/work-fission/9T3B33XAYPG2',
    official: 'https://www.trae.cn/',
    os: 'Windows / macOS / Linux',
  },
  {
    name: 'WorkBuddy',
    desc: 'WorkBuddy 是一款覆盖桌面端 / 网页版 / 移动端的 AI Agent 办公助手，用自然语言即可驱动它交付研究报告、编写代码、自动化日常任务，并支持接入你自己的大模型 API Key 解锁更强能力。',
    invite: 'https://www.workbuddy.cn/events/invite?inviteCode=aqhmnej070o8',
    official: 'https://www.workbuddy.cn/',
    os: '桌面端 / 网页版 / 移动端',
  },
];

// 免费 Token / API 配置：提供免费额度的大模型平台（note 为平台定位介绍，链接 2026-07-31 官网核验）
const TOKEN_PLATFORMS = [
  { name: '硅基流动', link: 'https://cloud.siliconflow.cn/i/kqBmwIyZ', note: '国产开源模型 API 聚合。满血 DeepSeek-V3 / Qwen3 / GLM-4.6 高速推理，按 token 计费，新用户有试用额度。', badge: '已验证', tone: 'ok' },
  { name: '七牛云 AI 推理', link: 'https://developer.qiniu.com/aitokenapi/13082/ai-reasoning-invitation-event-rules2', note: '云厂商级 SLA，开箱即用的多模型 API 接入。适合需要稳定生产环境的企业用户，按调用量阶梯价。', badge: '已验证', tone: 'ok' },
  { name: '智谱 AI', link: 'https://docs.bigmodel.cn/cn/update/promotion', note: '清华 GLM 系列出品，国产顶配大模型 API。GLM-4.6 / 4.5 / Z1 推理，覆盖长文本、多模态与代码场景。', badge: '已验证', tone: 'ok' },
  { name: 'DeepSeek', link: 'https://platform.deepseek.com/', note: '国产推理模型性价比之王。DeepSeek-V3 / R1 长上下文强项，API 简洁透明，新账户有免费额度可领。', badge: '已验证', tone: 'ok' },
  { name: 'MiniMax', link: 'https://platform.minimax.io/docs/token-plan/promotion', note: '多模态 AI 平台旗舰，Hailuo 视频生成 + 语音克隆 + 图像创作一站式。适合短视频 / 内容创作工作流。', badge: '已验证·临期', tone: 'warn' },
  { name: 'PPIO 派欧云', link: 'https://ppio.cn/', note: '分布式 GPU 推理与模型托管。DeepSeek / Qwen / Llama 高速 API，私有化部署友好，按需弹性。', badge: '已验证', tone: 'ok' },
  { name: '科大讯飞星火', link: 'https://xinghuo.xfyun.cn/', note: '中文 NLP 老牌大厂，语音识别 / TTS / 翻译业内顶级。星火 Lite 永久免费 + Spark Pro 月度高额度。', badge: '已验证', tone: 'ok' },
  { name: '快手 StreamLake', link: 'https://www.streamlake.com/product/kat-coder', note: '快手系多模态模型平台。KAT-Coder 代码专用 + 视频理解 + 文生图，AI 内容创作链路完整。', badge: '已验证', tone: 'ok' },
  { name: '天翼 AI（中国电信）', link: 'https://www.ctyun.cn/', note: '国资云大模型服务，安全合规 + 等保三级。DeepSeek / 通义 / 智谱 API 聚合，政企首选。', badge: '已验证·有条件', tone: 'warn' },
];

function InstallSteps({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <ol className="mt-4 space-y-2.5">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3 text-sm text-ink2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">
              {i + 1}
            </span>
            <span className="leading-relaxed">{s}</span>
          </li>
        ))}
      </ol>
      {/* 图示占位：官网安装图示优先，暂无则用户后续提供 */}
      <div className="mt-5 flex h-32 items-center justify-center rounded-lg border border-dashed border-line2 bg-paper text-xs text-ink3">
        示意图待补充（官网安装图示 · 用户后续提供）
      </div>
    </div>
  );
}

export default function Tutorials({ onBack }: TutorialsProps) {
  // 切到教程页时回到顶部，避免继承首页滚动位置导致直接落在 Token 区
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="container-x py-10">
      {/* 头部 + 返回 */}
      <div className="mb-10 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex h-10 items-center gap-1.5 rounded-md border border-line2 bg-paper px-3 text-sm text-ink transition-colors hover:border-accent/30 hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          返回首页
        </button>
        <div>
          <div className="section-label mb-1">新手指南</div>
          <h1 className="heading-display text-3xl text-ink lg:text-4xl">使用教程</h1>
        </div>
      </div>

      {/* 区块 1：工具下载 */}
      <section className="mb-14">
        <div className="mb-6 border-b border-line pb-4">
          <div className="section-label mb-2">工具下载</div>
          <h2 className="heading-display text-2xl text-ink lg:text-3xl">下载工具</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {TOOLS.map((t) => (
            <div key={t.name} className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-ink">{t.name}</h3>
                  <p className="mt-1 text-xs text-ink3">支持：{t.os}</p>
                </div>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink2">{t.desc}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={t.invite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/80"
                >
                  <Download className="h-4 w-4" />
                  下载链接
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 区块 2：安装教程 */}
      <section className="mb-14">
        <div className="mb-6 border-b border-line pb-4">
          <div className="section-label mb-2">安装教程</div>
          <h2 className="heading-display text-2xl text-ink lg:text-3xl">三步装好，开箱即用</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <InstallSteps
            title="Trae IDE 安装"
            steps={[
              '访问 Trae 官网下载页，选择你的系统（Windows / macOS / Linux）下载安装包',
              '双击安装包，按向导完成安装',
              '首次启动用手机号 / 第三方账号登录',
              '选择开发模式：IDE 模式（保留原流程）或 SOLO 模式（AI 主导任务）',
              '（可选）在设置里配置 API Key 或选择内置模型',
            ]}
          />
          <InstallSteps
            title="WorkBuddy 安装"
            steps={[
              '访问 WorkBuddy 官网，选择桌面端 / 网页版 / 移动端',
              '桌面端：下载安装包并安装；网页版：直接登录使用',
              '首次启动登录账号',
              '（可选）填入你的大模型 API Key 解锁高级能力',
            ]}
          />
        </div>
      </section>

      {/* 区块 3：免费 Token + API 配置 */}
      <section className="mb-14">
        <div className="mb-6 border-b border-line pb-4">
          <div className="section-label mb-2">免费 Token 与 API 配置</div>
          <h2 className="heading-display text-2xl text-ink lg:text-3xl">免费 Token 与 API 配置</h2>
          <p className="mt-2 text-sm text-ink3">下面 9 个平台提供免费 API 额度，注册即可使用。</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOKEN_PLATFORMS.map((p) => (
            <div key={p.name} className="flex flex-col rounded-xl border border-line bg-white p-4 shadow-sm">
              <h3 className="font-medium text-ink">{p.name}</h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-ink2">{p.note}</p>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              >
                前往 {p.name}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>

        {/* 通用配置步骤 */}
        <div className="mt-6 rounded-2xl border border-line bg-paper p-6">
          <div className="mb-4 flex items-center gap-2">
            <Terminal className="h-4 w-4 text-accent" />
            <h3 className="text-base font-medium text-ink">通用配置：如何在 Trae / WorkBuddy 填入 API Key</h3>
          </div>
          <ol className="space-y-2.5">
            {[
              '在上面任意平台注册，部分需要完成实名认证',
              '进入「API Key 管理」创建 Key，复制并妥善保存',
              '打开 Trae / WorkBuddy 的设置 → 模型 / API 配置',
              '粘贴 Key，并选择对应模型（如 DeepSeek-V4、GLM-5.2、Qwen 等）',
              '发一条测试消息，确认模型调用成功',
            ].map((s, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{s}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 flex items-center gap-1.5 text-xs text-ink3">
            <BookOpen className="h-3.5 w-3.5" />
            具体免费额度以各平台官网控制台实时政策为准，本页仅作指引。
          </p>
        </div>
      </section>
    </div>
  );
}
