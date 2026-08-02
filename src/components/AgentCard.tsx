import { Star, ArrowUpRight, ChevronRight } from 'lucide-react';
import type { Agent, Category } from '../types';

interface AgentCardProps {
  agent: Agent;
  category?: Category;
  onClick?: () => void;
  searchQuery?: string;
}

function formatStars(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

// 分类主题色映射：标题文字色（按分类区分）
const categoryAccentMap: Record<string, { title: string; label: string; chip: string }> = {
  coding:        { title: 'text-emerald-700', label: 'bg-emerald-50 text-emerald-700', chip: 'text-emerald-700' },
  framework:     { title: 'text-indigo-700',  label: 'bg-indigo-50 text-indigo-700',  chip: 'text-indigo-700' },
  video:         { title: 'text-rose-700',    label: 'bg-rose-50 text-rose-700',    chip: 'text-rose-700' },
  document:      { title: 'text-amber-700',   label: 'bg-amber-50 text-amber-700',   chip: 'text-amber-700' },
  presentation:  { title: 'text-fuchsia-700', label: 'bg-fuchsia-50 text-fuchsia-700',chip: 'text-fuchsia-700' },
  content:       { title: 'text-pink-700',    label: 'bg-pink-50 text-pink-700',    chip: 'text-pink-700' },
  productivity:  { title: 'text-orange-700',  label: 'bg-orange-50 text-orange-700', chip: 'text-orange-700' },
  multimodal:    { title: 'text-violet-700',  label: 'bg-violet-50 text-violet-700', chip: 'text-violet-700' },
  skills:        { title: 'text-cyan-700',    label: 'bg-cyan-50 text-cyan-700',    chip: 'text-cyan-700' },
  browser:       { title: 'text-sky-700',     label: 'bg-sky-50 text-sky-700',      chip: 'text-sky-700' },
  entrepreneur:  { title: 'text-teal-700',    label: 'bg-teal-50 text-teal-700',    chip: 'text-teal-700' },
  humanize:      { title: 'text-lime-700',    label: 'bg-lime-50 text-lime-700',    chip: 'text-lime-700' },
  avatar:        { title: 'text-purple-700',  label: 'bg-purple-50 text-purple-700', chip: 'text-purple-700' },
  academic:      { title: 'text-blue-700',    label: 'bg-blue-50 text-blue-700',    chip: 'text-blue-700' },
  webdev:        { title: 'text-accent',      label: 'bg-accent/5 text-accent',     chip: 'text-accent' },
};

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightText(text: string, query: string): { text: string; match: boolean }[] {
  const q = query.trim();
  if (!q) return [{ text, match: false }];
  const escaped = escapeRegExp(q);
  const re = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(re);
  return parts
    .filter((p) => p.length > 0)
    .map((p) => ({ text: p, match: re.test(p) && p.toLowerCase() === q.toLowerCase() }));
}

export default function AgentCard({ agent, category, onClick, searchQuery = '' }: AgentCardProps) {
  const isSearching = searchQuery.trim().length > 0;
  const accent = categoryAccentMap[agent.category] || { title: 'text-accent', label: 'bg-accent/5 text-accent', chip: 'text-accent' };

  // 有搜索时优先展示 detailZh（弹窗里的详细介绍），否则展示 descriptionZh
  const displayDesc = isSearching && agent.detailZh ? agent.detailZh : agent.descriptionZh;
  const descParts = isSearching ? highlightText(displayDesc, searchQuery) : [{ text: displayDesc, match: false }];
  const nameParts = isSearching ? highlightText(agent.name, searchQuery) : [{ text: agent.name, match: false }];

  const coreCaps = agent.coreCapabilities && agent.coreCapabilities.length > 0
    ? agent.coreCapabilities
    : ['快速落地与高扩展性', '开源免费/社区活跃', '与主流生态深度集成'];

  return (
    <button
      onClick={onClick}
      className="group w-full flex h-full flex-col gap-5 rounded-2xl border border-line bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-line2 hover:shadow-md"
    >
      {/* 顶部：标题 + Stars */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {agent.fullApp && (
              <span className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" title="完整程序·调用API即可" />
            )}
            <h3 className={`truncate text-lg font-semibold transition-colors group-hover:opacity-90 ${accent.title}`}>
              {nameParts.map((p, i) =>
                p.match ? (
                  <mark key={i} className="bg-accent/20 text-accent rounded px-0.5">{p.text}</mark>
                ) : (
                  <span key={i}>{p.text}</span>
                )
              )}
            </h3>
          </div>
          <div className="mt-1 truncate font-mono text-xs text-ink3">{agent.fullName}</div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex items-center gap-1 rounded-md bg-paper px-2 py-1">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="font-mono text-sm text-ink tnum">{formatStars(agent.stars)}</span>
          </div>
          <ArrowUpRight className="h-4 w-4 text-ink3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-accent" />
        </div>
      </div>

      {/* 分类 + 子分类 标签 */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className={`inline-flex items-center rounded-md px-2 py-0.5 font-medium ${accent.label}`}>
          {category?.nameZh}
        </span>
        <span className="text-ink2">{agent.subcategory}</span>
      </div>

      {/* 项目介绍 */}
      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-ink2">
        {descParts.map((p, i) =>
          p.match ? (
            <mark key={i} className="bg-accent/20 text-accent rounded px-0.5">{p.text}</mark>
          ) : (
            <span key={i}>{p.text}</span>
          )
        )}
      </p>

      {/* 核心能力 */}
      <div className="border-t border-line pt-4">
        <div className={`mb-2 text-xs font-semibold uppercase tracking-wider ${accent.chip}`}>核心能力</div>
        <ul className="space-y-1.5">
          {coreCaps.slice(0, 3).map((cap, idx) => {
            const parts = isSearching ? highlightText(cap, searchQuery) : [{ text: cap, match: false }];
            return (
              <li key={idx} className="flex items-start gap-1.5 text-sm text-ink2">
                <ChevronRight className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${accent.chip}`} />
                <span className="line-clamp-1">
                  {parts.map((p, i) =>
                    p.match ? (
                      <mark key={i} className="bg-accent/20 text-accent rounded px-0.5">{p.text}</mark>
                    ) : (
                      <span key={i}>{p.text}</span>
                    )
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 底部：标签 */}
      {agent.tags && agent.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          {agent.tags.slice(0, 3).map((tag) => {
            const parts = isSearching ? highlightText(tag, searchQuery) : [{ text: tag, match: false }];
            return (
              <span key={tag} className="rounded-md bg-paper px-1.5 py-0.5 text-ink3">
                {parts.map((p, i) =>
                  p.match ? (
                    <mark key={i} className="bg-accent/20 text-accent rounded px-0.5">{p.text}</mark>
                  ) : (
                    <span key={i}>{p.text}</span>
                  )
                )}
              </span>
            );
          })}
        </div>
      )}
    </button>
  );
}
