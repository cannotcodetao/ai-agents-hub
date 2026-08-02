import { ArrowUpRight, TrendingUp } from 'lucide-react';
import type { Agent } from '../types';

interface TrendingProps {
  agents: Agent[];
  onAgentClick?: (agent: Agent) => void;
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

function formatGrowth(n: number): string {
  if (n >= 1000) return `+${(n / 1000).toFixed(1)}k`;
  return `+${n}`;
}

export default function Trending({ agents, onAgentClick }: TrendingProps) {
  const top = [...agents]
    .filter((a) => a.weekGrowth && a.weekGrowth > 0)
    .sort((a, b) => (b.weekGrowth || 0) - (a.weekGrowth || 0))
    .slice(0, 10);

  const hasGrowthData = top.length > 0;

  const fallbackTop = [...agents].sort((a, b) => b.stars - a.stars).slice(0, 10);
  const displayList = hasGrowthData ? top : fallbackTop;

  return (
    <section id="trending" className="border-b border-line bg-white/40 scroll-mt-4">
      <div className="container-x py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="section-label mb-2">趋势榜</div>
            <h2 className="heading-display text-3xl text-ink lg:text-4xl">
              趋势榜
              <br />
              <span className="text-ink3">
                {hasGrowthData ? '本周涨幅 Top 10' : 'Top 10'}
              </span>
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink3">
              {hasGrowthData
                ? '近一周 Stars 增长最快的项目'
                : '按 Stars 排序的前十项目'}
            </p>
          </div>

          <div className="divide-y divide-line border-t border-line">
            {displayList.map((agent, idx) => (
              <button
                key={agent.fullName}
                onClick={() => onAgentClick?.(agent)}
                className="group flex w-full items-center gap-6 py-5 text-left transition-colors hover:bg-white"
              >
                <span className="heading-display w-10 shrink-0 text-2xl text-ink3 tnum">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <h3 className="truncate text-lg font-medium text-ink group-hover:text-accent transition-colors">
                      {agent.name}
                    </h3>
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm text-ink2">
                    {agent.descriptionZh}
                  </p>
                </div>
                <div className="hidden shrink-0 items-center gap-1 text-ink2 sm:flex">
                  {hasGrowthData ? (
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600">
                        <TrendingUp className="h-3 w-3" />
                        {formatGrowth(agent.weekGrowth || 0)}
                      </span>
                      <span className="font-mono text-sm tnum text-ink3">
                        {formatStars(agent.stars)}
                      </span>
                    </div>
                  ) : (
                    <>
                      <span className="font-mono text-sm tnum">{formatStars(agent.stars)}</span>
                      <span className="text-xs text-ink3">星标</span>
                    </>
                  )}
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-ink3 transition-all group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
