import { useEffect, useState, lazy, Suspense } from 'react';
import { X, Star, ExternalLink, BookOpen, Zap, Code2, Copy, Check, Sparkles, Loader2 } from 'lucide-react';
import type { Agent, Category } from '../types';

const ReactMarkdown = lazy(() =>
  import('react-markdown').then(async (m) => {
    const remarkGfm = (await import('remark-gfm')).default;
    return {
      default: (props: any) => (
        <m.default remarkPlugins={[remarkGfm]} {...props} />
      ),
    };
  })
);

// 一键启动指令的统一后缀：要求 Agent 在指令不清时先与用户确认
const ONE_CLICK_SUFFIX = '如果我的指令不够清晰，则跟我确定之后再执行。';

interface AgentDetailModalProps {
  agent: Agent;
  category?: Category;
  onClose: () => void;
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export default function AgentDetailModal({ agent, category, onClose }: AgentDetailModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const hasDetail = agent.detailZh || agent.descriptionZh;
  const hasUsage = !!agent.usageGuide;
  const hasOneClick = !!agent.oneClickPrompt;
  const hasMirror = !!agent.giteeMirror;
  const hasDemo = !!agent.demoUrl;

  // 显示与复制时统一追加确认后缀
  const oneClickFull = agent.oneClickPrompt
    ? `${agent.oneClickPrompt} ${ONE_CLICK_SUFFIX}`
    : '';

  const handleCopy = async () => {
    if (!oneClickFull) return;
    try {
      await navigator.clipboard.writeText(oneClickFull);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = oneClickFull;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line p-6">
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              {agent.fullApp && (
                <span
                  className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                  title="完整程序·调用API即可"
                />
              )}
              <h2 className="text-xl font-medium text-ink">{agent.name}</h2>
            </div>
            <p className="mt-1 font-mono text-xs text-ink3">{agent.fullName}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-ink2">{category?.nameZh} · {agent.subcategory}</span>
              <span className="text-line2">|</span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-accent text-accent" />
                <span className="font-mono text-ink tnum">{formatStars(agent.stars)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink3 transition-colors hover:bg-white/50 hover:text-ink"
            aria-label="关闭"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {hasDetail && (
            <section className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-medium text-ink">项目介绍</h3>
              </div>
              <div className="rounded-xl border border-line bg-white/50 p-4">
                <p className="text-sm leading-relaxed text-ink2 whitespace-pre-wrap">
                  {agent.detailZh || agent.descriptionZh}
                </p>
              </div>
            </section>
          )}

          {hasOneClick && (
            <section className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-medium text-ink">一键启动</h3>
              </div>
              <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
                <p className="text-sm leading-relaxed text-ink2">
                  {oneClickFull}
                </p>
                <button
                  onClick={handleCopy}
                  className="mt-3 flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent/80"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      复制指令
                    </>
                  )}
                </button>
              </div>
            </section>
          )}

          {hasUsage && (
            <section className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-medium text-ink">使用指南</h3>
              </div>
              <div className="rounded-xl border border-line bg-white/50 p-4">
                <div className="prose prose-sm max-w-none text-ink2
                  prose-headings:text-ink prose-headings:font-medium
                  prose-code:text-accent prose-code:bg-white/60 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:text-xs
                  prose-pre:bg-ink prose-pre:text-paper">
                  <Suspense
                    fallback={
                      <div className="flex items-center gap-2 py-4 text-ink3">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-xs">加载中...</span>
                      </div>
                    }
                  >
                    <ReactMarkdown>{agent.usageGuide!}</ReactMarkdown>
                  </Suspense>
                </div>
              </div>
            </section>
          )}

          <section>
            <div className="mb-3 flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-medium text-ink">快速访问</h3>
            </div>
            <div className="space-y-2">
              <a
                href={agent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-line bg-white/50 p-3 transition-colors hover:border-accent/30 hover:bg-white"
              >
                <Code2 className="h-5 w-5 text-ink3" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-ink">GitHub 仓库</div>
                  <div className="text-xs text-ink3">{agent.fullName}</div>
                </div>
                <ExternalLink className="h-4 w-4 text-ink3" />
              </a>

              {hasMirror && (
                <a
                  href={agent.giteeMirror}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-line bg-white/50 p-3 transition-colors hover:border-accent/30 hover:bg-white"
                >
                  <span className="flex h-5 w-5 items-center justify-center text-xs font-bold text-ink3">G</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-ink">Gitee / 极狐镜像</div>
                    <div className="text-xs text-ink3">国内访问更快</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-ink3" />
                </a>
              )}

              {hasDemo && (
                <a
                  href={agent.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-line bg-white/50 p-3 transition-colors hover:border-accent/30 hover:bg-white"
                >
                  <Zap className="h-5 w-5 text-emerald-500" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-ink">在线演示 / Demo</div>
                    <div className="text-xs text-ink3">无需安装，直接体验</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-ink3" />
                </a>
              )}
            </div>
          </section>

          {agent.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {agent.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-white/50 px-2 py-1 text-xs text-ink3 border border-line"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-line p-4 text-center text-xs text-ink3">
          按 ESC 或点击空白处关闭
        </div>
      </div>
    </div>
  );
}
