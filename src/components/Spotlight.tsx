import { ArrowUpRight, Star } from 'lucide-react';
import type { Agent, Category } from '../types';

interface SpotlightProps {
  agents: Agent[];
  categoryMap: Record<string, Category>;
  onAgentClick?: (agent: Agent) => void;
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export default function Spotlight({ agents, categoryMap, onAgentClick }: SpotlightProps) {
  if (agents.length === 0) return null;

  return (
    <section className="border-b border-line">
      <div className="container-x py-16 lg:py-20">
        <div className="mb-10 flex items-baseline justify-between border-b border-line pb-4">
          <div>
            <div className="section-label mb-2">编辑精选</div>
            <h2 className="heading-display text-3xl text-ink lg:text-4xl">
              编辑精选
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-ink3 sm:block">
            每个分类的代表性项目
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent, idx) => {
            const cat = categoryMap[agent.category];
            return (
              <button
                key={agent.fullName}
                onClick={() => onAgentClick?.(agent)}
                className="group relative flex flex-col bg-paper p-8 text-left transition-colors hover:bg-white"
              >
                <div className="mb-6 flex items-start justify-between">
                  <span className="font-mono text-xs text-ink3">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-1 text-ink2">
                    <Star className="h-3.5 w-3.5 fill-current text-accent" />
                    <span className="font-mono text-sm tnum">{formatStars(agent.stars)}</span>
                  </div>
                </div>

                <h3 className="heading-display text-2xl text-ink lg:text-3xl">
                  {agent.name}
                </h3>

                <p className="mt-5 line-clamp-3 text-sm leading-relaxed text-ink2">
                  {agent.descriptionZh}
                </p>

                <div className="mt-auto flex items-center justify-between pt-8">
                  <span className="text-xs text-ink3">
                    {cat?.nameZh} · {agent.subcategory}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-ink3 transition-all group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
