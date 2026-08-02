import type { TrendingItem } from '../types';

interface TrendingGitHubProps {
  items: TrendingItem[];
  onItemClick?: (item: TrendingItem) => void;
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export default function TrendingGitHub({ items, onItemClick }: TrendingGitHubProps) {
  if (items.length === 0) return null;

  return (
    <section id="trending-github" className="border-b border-line scroll-mt-4">
      <div className="container-x py-16 lg:py-20">
        <div className="mb-10 flex items-baseline justify-between border-b border-line pb-4">
          <div>
            <div className="section-label mb-2">GitHub 热点</div>
            <h2 className="heading-display text-3xl text-ink lg:text-4xl">
              GitHub 今日趋势
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-ink3 sm:block">
            AI/Agent 领域热门项目
          </p>
        </div>

        <div className="border-t border-line">
          {items.map((item) => (
            <button
              key={item.fullName}
              onClick={() => onItemClick?.(item)}
              className="group flex w-full items-center gap-4 border-b border-line px-4 py-5 text-left transition-colors hover:bg-white sm:gap-6 sm:px-6"
            >
              {/* 排名 */}
              <span className="w-6 flex-shrink-0 font-mono text-sm text-ink3 tabular-nums">
                {String(item.rank).padStart(2, '0')}
              </span>

              {/* 仓库信息 */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-base font-semibold text-ink group-hover:text-accent transition-colors">
                    <span className="font-normal text-ink2">{item.fullName.split('/')[0]}</span>
                    <span className="text-ink2"> / </span>
                    <span>{item.fullName.split('/')[1]}</span>
                  </h3>
                </div>

                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink2">
                  {item.description || '暂无描述'}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink3">
                  {/* 语言 */}
                  {item.language && (
                    <span className="inline-flex items-center gap-1">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: item.languageColor }}
                      />
                      {item.language}
                    </span>
                  )}

                  {/* 总 Stars */}
                  <span className="inline-flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                    </svg>
                    {formatStars(item.stars)}
                  </span>

                  {/* 今日新增 */}
                  {item.starsToday > 0 && (
                    <span className="inline-flex items-center gap-1 text-emerald-600">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M8 1a.75.75 0 0 1 .75.75v6.75H14a.75.75 0 0 1 0 1.5H8.75v5.25a.75.75 0 0 1-1.5 0V10H1.25a.75.75 0 0 1 0-1.5h6V1.75A.75.75 0 0 1 8 1Z" />
                      </svg>
                      {formatStars(item.starsToday)} today
                    </span>
                  )}
                </div>
              </div>

              {/* 右侧箭头 */}
              <svg
                className="h-4 w-4 flex-shrink-0 text-ink3 transition-all group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>
          ))}
        </div>

        {/* 底部来源说明 */}
        <p className="mt-4 text-right text-xs text-ink3">
          数据来源：GitHub Trending · 每小时更新
        </p>
      </div>
    </section>
  );
}