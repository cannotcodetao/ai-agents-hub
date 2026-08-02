import type { MouseEvent } from 'react';
import { Search, X, ArrowDownUp } from 'lucide-react';
import type { Category } from '../types';

interface SidebarProps {
  search: string;
  onSearch: (v: string) => void;
  sort: 'stars' | 'name';
  onSortChange: (s: 'stars' | 'name') => void;
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  categories: Category[];
  agentCounts: Record<string, number>;
  totalCount: number;
  resultCount: number;
  totalStars: number;
  isOpen: boolean;
  onClose: () => void;
  onTutorials: () => void;
  /** 当前视图，用于判断快捷导航是否需要先切回首页 */
  currentView?: 'home' | 'tutorials';
  /** 切回首页并滚动到指定锚点（锚点 ID 只存在于首页组件中） */
  onNavigateHome?: (anchor: string) => void;
  /** 在教程页点击分类时，先切回首页再执行分类筛选与滚动（不传递则退回原 onCategoryChange） */
  onNavigateHomeCategory?: (id: string) => void;
}

// 分类色点 · 参考 skills-report.html 的多色谱系，每类一个识别色
const CAT_COLORS: Record<string, string> = {
  coding: '#C8462C',        // accent · 编程代码
  framework: '#6FA8C9',     // sky · 框架平台
  video: '#4AC0A8',          // teal · 视频剪辑
  document: '#B08FC7',       // violet · 文档撰写
  presentation: '#E8A838',   // amber · PPT制作
  content: '#D97A7A',        // rose · 账号内容
  productivity: '#7FB685',   // sage · 办公效率
  multimodal: '#C97A4A',     // copper · 多模态Agent
  skills: '#A8A84A',         // olive · Skills生态
  browser: '#6FA8C9',        // sky · 浏览器自动化
  entrepreneur: '#E8A838',   // amber · 创业顾问
  humanize: '#7FB685',       // sage · 去AI味道
  avatar: '#9B6FB6',          // violet-2 · 虚拟形象
};

function formatStars(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}

export default function Sidebar({
  search, onSearch, sort, onSortChange,
  activeCategory, onCategoryChange, categories, agentCounts,
  totalCount, resultCount, totalStars, isOpen, onClose, onTutorials,
  currentView = 'home', onNavigateHome, onNavigateHomeCategory,
}: SidebarProps) {
  // 快捷导航：锚点区块只渲染在首页，教程页点击需先切回首页再滚动
  const goAnchor = (e: MouseEvent<HTMLAnchorElement>, anchor: string) => {
    if (!onNavigateHome) return; // 未接入回调时退回原生 href 行为
    e.preventDefault();
    onClose();
    onNavigateHome(anchor);
  };

  // 分类 TOC：教程页点击需先切回首页，再执行筛选 + 滚动到 #explore
  const handleCategoryClick = (id: string) => {
    if (currentView === 'tutorials' && onNavigateHomeCategory) {
      onClose();
      onNavigateHomeCategory(id);
    } else {
      onCategoryChange(id);
    }
  };

  return (
    <>
      {/* 移动端遮罩 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[300px] flex-col border-r border-line bg-paper transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="侧边导航"
      >
        {/* 顶部站点标题 */}
        <div className="border-b border-line px-6 py-6">
          <h1 className="heading-display text-xl text-ink">
            AI 工具<span className="text-accent">策展</span>
          </h1>
          <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink3">
            AGENTS HUB · {new Date().toISOString().slice(0, 7)}
          </div>
        </div>

        {/* 搜索框 */}
        <div className="px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink3" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="搜索项目名、描述、标签…"
              className="w-full rounded-md border border-line2 bg-white/60 py-2 pl-9 pr-8 text-sm text-ink placeholder-ink3 focus:border-accent focus:bg-white focus:outline-none"
            />
            {search && (
              <button
                onClick={() => onSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-ink3 hover:text-ink"
                aria-label="清空"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* 快捷导航：搜索栏下方的核心入口 */}
        <div className="px-4 pb-3">
          <a
            href="#trending-github"
            onClick={(e) => goAnchor(e, '#trending-github')}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-ink3 transition-colors hover:bg-white hover:text-accent"
            title={currentView === 'tutorials' ? '返回首页并跳转到 GitHub 今日趋势' : '今日 GitHub 趋势热点'}
          >
            <span className="text-accent">↗</span>
            <span>GitHub 今日趋势</span>
          </a>
          <a
            href="#trending"
            onClick={(e) => goAnchor(e, '#trending')}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-ink3 transition-colors hover:bg-white hover:text-accent"
            title={currentView === 'tutorials' ? '返回首页并跳转到趋势榜' : '项目趋势榜（按 Stars）'}
          >
            <span className="text-accent">★</span>
            <span>趋势榜</span>
          </a>
          <button
            onClick={() => onTutorials()}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-ink3 transition-colors hover:bg-white hover:text-accent"
            title="工具下载 + 安装 + 免费 Token 配置教程"
          >
            <span className="text-accent">▣</span>
            <span>入门教程</span>
          </button>
        </div>

        {/* 排序切换 */}
        <div className="flex items-center gap-2 px-6 pb-3">
          <ArrowDownUp className="h-3.5 w-3.5 text-ink3" />
          <span className="text-xs text-ink3">排序</span>
          <div className="ml-auto flex text-sm">
            <button
              onClick={() => onSortChange('stars')}
              className={`px-2 py-1 font-medium transition-colors ${
                sort === 'stars' ? 'text-accent' : 'text-ink3 hover:text-ink'
              }`}
            >
              Stars
            </button>
            <span className="text-line2">/</span>
            <button
              onClick={() => onSortChange('name')}
              className={`px-2 py-1 font-medium transition-colors ${
                sort === 'name' ? 'text-accent' : 'text-ink3 hover:text-ink'
              }`}
            >
              名称
            </button>
          </div>
        </div>

        {/* 分类 TOC */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          <button
            onClick={() => handleCategoryClick('all')}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-accent/10 text-accent'
                : 'text-ink2 hover:bg-white hover:text-ink'
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${activeCategory === 'all' ? 'bg-accent' : 'bg-ink3'}`} />
            <span>全部</span>
            <span className="ml-auto font-mono text-xs text-ink3 tnum">{totalCount}</span>
          </button>
          {categories.map((c) => {
            const color = CAT_COLORS[c.id] || '#8A8A8A';
            const count = agentCounts[c.id] || 0;
            const active = activeCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => handleCategoryClick(c.id)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-accent/10 text-accent'
                    : 'text-ink2 hover:bg-white hover:text-ink'
                }`}
              >
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                <span className="truncate">{c.nameZh}</span>
                <span className="ml-auto font-mono text-xs text-ink3 tnum">{count}</span>
              </button>
            );
          })}
        </nav>

        {/* 底部统计 */}
        <div className="border-t border-line px-6 py-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="heading-display text-xl text-ink tnum">{totalCount}</div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-ink3">项目</div>
            </div>
            <div>
              <div className="heading-display text-xl text-accent tnum">{formatStars(totalStars)}</div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-ink3">总星</div>
            </div>
            <div>
              <div className="heading-display text-xl text-ink tnum">{categories.length}</div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-ink3">分类</div>
            </div>
          </div>
          <div className="mt-3 text-center font-mono text-[10px] text-ink3">
            当前显示 {resultCount} / {totalCount}
          </div>
        </div>
      </aside>
    </>
  );
}
