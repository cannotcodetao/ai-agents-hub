import { useState, useMemo, useEffect, useRef } from 'react';
import { SearchX, Menu, Loader2 } from 'lucide-react';
import type { Agent, Category, AgentsData, TrendingData } from './types';
import Hero from './components/Hero';
import Spotlight from './components/Spotlight';
import TrendingGitHub from './components/TrendingGitHub';
import Trending from './components/Trending';
import CategoryGrid from './components/CategoryGrid';
import Sidebar from './components/Sidebar';
import AgentCard from './components/AgentCard';
import AgentDetailModal from './components/AgentDetailModal';
import Tutorials from './components/Tutorials';

function formatStars(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}

export default function App() {
  const [data, setData] = useState<AgentsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [trendingData, setTrendingData] = useState<TrendingData | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState<'stars' | 'name'>('stars');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<'home' | 'tutorials'>('home');

  // 搜索栏 UX：searchQuery 从「无」到「有」时自动滚动到结果区（仅首次触发，避免逐字输入时反复跳动）
  const wasSearchingRef = useRef(false);
  useEffect(() => {
    const isSearching = searchQuery.trim().length > 0;
    if (isSearching && !wasSearchingRef.current) {
      document
        .getElementById('explore')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    wasSearchingRef.current = isSearching;
  }, [searchQuery]);

  useEffect(() => {
    let cancelled = false;
    fetch('/data/agents.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: AgentsData) => {
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setLoadError(err.message || String(err));
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // 加载 GitHub Trending 数据
  useEffect(() => {
    fetch('/data/trending.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json: TrendingData) => {
        setTrendingData(json);
      })
      .catch(() => {
        // trending 数据加载失败时静默降级，使用编辑精选兜底
        setTrendingData(null);
      });
  }, []);

  const curation = data?.curation;
  const categories = data?.categories ?? [];
  const agents = data?.agents ?? [];

  const categoryMap = useMemo(() => {
    const m: Record<string, Category> = {};
    categories.forEach((c) => (m[c.id] = c));
    return m;
  }, [categories]);

  const agentCounts = useMemo(() => {
    const c: Record<string, number> = {};
    agents.forEach((a) => (c[a.category] = (c[a.category] || 0) + 1));
    return c;
  }, [agents]);

  const totalStars = useMemo(
    () => agents.reduce((s, a) => s + a.stars, 0),
    [agents]
  );

  const featuredAgents = useMemo(() => {
    if (!curation) return [];
    return curation.featured
      .map((fn) => agents.find((a) => a.fullName === fn))
      .filter((a): a is Agent => a !== undefined);
  }, [curation, agents]);

  const filteredAgents = useMemo(() => {
    let r = agents;
    if (activeCategory !== 'all') {
      r = r.filter((a) => a.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      r = r.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.fullName.toLowerCase().includes(q) ||
          a.descriptionZh.toLowerCase().includes(q) ||
          a.descriptionEn.toLowerCase().includes(q) ||
          (a.detailZh && a.detailZh.toLowerCase().includes(q)) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.subcategory.toLowerCase().includes(q) ||
          a.subcategoryEn.toLowerCase().includes(q) ||
          (a.coreCapabilities && a.coreCapabilities.some((c) => c.toLowerCase().includes(q)))
      );
    }
    const sorted = [...r];
    if (sort === 'stars') sorted.sort((a, b) => b.stars - a.stars);
    else sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [agents, activeCategory, searchQuery, sort]);

  // 侧栏快捷导航：#trending-github / #trending 只存在于首页组件，
  // 在教程页点击需要先切回 home，等 React 完成视图切换 + DOM 挂载后再滚动。
  // 双 requestAnimationFrame 保证跨过一次完整的 commit + paint，
  // 再叠加 80ms setTimeout 兜住图片/懒加载导致的布局位移。
  const handleNavigateHome = (anchor: string) => {
    setView('home');
    setSidebarOpen(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.querySelector(anchor);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      });
    });
  };

  const handleSidebarCategoryChange = (id: string) => {
    setActiveCategory(id);
    setSearchQuery('');
    setSidebarOpen(false);
    requestAnimationFrame(() => {
      document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  // 教程页点击侧栏分类：切回首页 + 应用分类筛选 + 滚动到 #explore
  const handleNavigateHomeCategory = (id: string) => {
    setView('home');
    setActiveCategory(id);
    setSearchQuery('');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      });
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-ink3">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm">加载中...</p>
        </div>
      </div>
    );
  }

  if (loadError || !data) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink mb-2">数据加载失败</p>
          <p className="text-xs text-ink3 font-mono">{loadError || '未知错误'}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-accent px-4 py-2 text-sm text-white hover:bg-accent/80 transition-colors"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* 左侧固定侧边栏 */}
      <Sidebar
        search={searchQuery}
        onSearch={setSearchQuery}
        sort={sort}
        onSortChange={setSort}
        activeCategory={activeCategory}
        onCategoryChange={handleSidebarCategoryChange}
        categories={categories}
        agentCounts={agentCounts}
        totalCount={agents.length}
        resultCount={filteredAgents.length}
        totalStars={totalStars}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onTutorials={() => setView('tutorials')}
        currentView={view}
        onNavigateHome={handleNavigateHome}
        onNavigateHomeCategory={handleNavigateHomeCategory}
      />

      {/* 移动端汉堡按钮 */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-md border border-line2 bg-paper text-ink shadow-sm lg:hidden"
        aria-label="打开侧边栏"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* 主内容区 · 偏移左侧栏宽度 */}
      <div className="lg:pl-[300px]">
        {/* 备案信息横条：工信部要求首页底部显示备案号，此处提升到首屏顶部提高可信度 */}
        <div className="border-b border-line bg-paper/60">
          <div className="container-x flex items-center justify-center gap-3 py-2 text-xs text-ink3">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>已通过 ICP 备案</span>
            <span className="text-line2">·</span>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono tracking-wider hover:text-accent transition-colors"
              title="工信部 ICP 备案查询"
            >
              粤ICP备2026107109号
            </a>
          </div>
        </div>

        {view === 'home' && (
        <>
          <Hero />

        <CategoryGrid
          categories={categories}
          agentCounts={agentCounts}
          onSelect={handleSidebarCategoryChange}
        />

        {/* GitHub Trending 热点区块（优先），无数据时回退编辑精选 */}
        {trendingData && trendingData.items.length > 0 ? (
          <TrendingGitHub
            items={trendingData.items}
            onItemClick={(item) => window.open(item.url, '_blank', 'noopener')}
          />
        ) : (
          <Spotlight agents={featuredAgents} categoryMap={categoryMap} onAgentClick={setSelectedAgent} />
        )}

        <Trending agents={agents} onAgentClick={setSelectedAgent} />

        <section id="explore" className="border-b border-line">
          <div className="container-x py-10">
            <div className="mb-6 flex items-baseline justify-between">
              <div>
                <div className="section-label mb-1">全部项目</div>
                <h2 className="heading-display text-2xl text-ink lg:text-3xl">
                  {activeCategory === 'all' ? '完整项目列表' : categoryMap[activeCategory]?.nameZh ?? '完整项目列表'}
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-ink2">完整程序·调用API即可</span>
                </div>
                <span className="font-mono text-sm text-ink3 tnum">
                  {filteredAgents.length} / {agents.length}
                </span>
              </div>
            </div>

            {filteredAgents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-ink3">
                <SearchX className="mb-3 h-10 w-10" />
                <p className="text-base">未找到匹配的项目</p>
                <p className="text-sm">试试其他关键词吧</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredAgents.map((agent) => (
                  <AgentCard
                    key={agent.fullName}
                    agent={agent}
                    category={categoryMap[agent.category]}
                    onClick={() => setSelectedAgent(agent)}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 底部统计区块 · Bottom Stats */}
        <section className="border-b border-line bg-paper">
          <div className="container-x py-20 lg:py-24">
            <div className="mb-10 border-b border-line pb-4">
              <div className="section-label mb-2">数据一览</div>
              <h2 className="heading-display text-3xl text-ink lg:text-4xl">
                数据一览
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-3">
              <div className="bg-paper p-8 lg:p-10">
                <div className="section-label mb-3">项目数</div>
                <div className="heading-display text-5xl text-ink tnum lg:text-6xl">
                  {agents.length}
                </div>
                <p className="mt-3 text-sm text-ink2">个项目 · 收录高星 AI Agent 与 Skill</p>
                <p className="mt-1 font-mono text-xs text-ink3">精选开源项目</p>
              </div>
              <div className="bg-paper p-8 lg:p-10">
                <div className="section-label mb-3">总星数</div>
                <div className="heading-display text-5xl text-accent tnum lg:text-6xl">
                  {formatStars(totalStars)}
                </div>
                <p className="mt-3 text-sm text-ink2">总 Stars · 累计 GitHub 星标</p>
                <p className="mt-1 font-mono text-xs text-ink3">GitHub 星标总数</p>
              </div>
              <div className="bg-paper p-8 lg:p-10">
                <div className="section-label mb-3">分类数</div>
                <div className="heading-display text-5xl text-ink tnum lg:text-6xl">
                  {categories.length}
                </div>
                <p className="mt-3 text-sm text-ink2">个分类 · 按功能领域划分</p>
                <p className="mt-1 font-mono text-xs text-ink3">功能分类</p>
              </div>
            </div>
          </div>
        </section>

        {/* 赞助推荐 · Sponsor */}
        <section className="border-b border-line bg-white/40">
          <div className="container-x py-10">
            <a
              href="https://cloud.siliconflow.cn/i/kqBmwIyZ"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-between gap-4 rounded-lg border border-line bg-paper p-6 transition-colors hover:border-accent/30 hover:bg-white sm:flex-row"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-accent/20 to-accent/5">
                  <span className="text-lg">🎁</span>
                </div>
                <div>
                  <div className="font-medium text-ink group-hover:text-accent transition-colors">
                    硅基流动16元代金券领取
                  </div>
                  <p className="mt-1 text-sm text-ink3">
                    新用户注册免费领取 API 代金券，支持多种大模型调用
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-accent">
                <span>立即领取</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </a>
          </div>
        </section>

        <footer className="bg-paper">
          <div className="container-x py-12">
            <div className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="heading-display text-2xl text-ink">
                  AI 工具策展
                </div>
                <p className="mt-2 text-sm text-ink3">
                  收录 {agents.length} 个高星项目 · {categories.length} 个分类
                </p>
              </div>
              <div className="text-sm text-ink3">
                <p>Stars 数据为采集时点近似值</p>
                <p className="mt-1">
                  可通过 <code className="font-mono text-xs text-ink2">npm run update:stars</code> 更新
                </p>
                <p className="mt-3 font-mono text-xs text-line2">
                  Updated {curation?.updatedAt}
                </p>
              </div>
            </div>

            {/* 备案信息：工信部要求悬挂 ICP 备案号并链至 beian.miit.gov.cn */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-line pt-6 text-sm text-ink3">
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                粤ICP备2026107109号
              </a>
            </div>
          </div>
        </footer>
        </>
        )}

        {view === 'tutorials' && <Tutorials onBack={() => setView('home')} />}
      </div>

      {selectedAgent && (
        <AgentDetailModal
          agent={selectedAgent}
          category={categoryMap[selectedAgent.category]}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </div>
  );
}
