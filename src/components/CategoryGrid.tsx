import {
  Code2, Boxes, Video, FileText, Presentation,
  PenTool, Zap, Image as ImageIcon, Puzzle, LayoutGrid, Globe, Rocket, Sparkles, User, GraduationCap,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import type { Category } from '../types';

const iconMap: Record<string, LucideIcon> = {
  Code2, Boxes, Video, FileText, Presentation,
  PenTool, Zap, Image: ImageIcon, Puzzle, LayoutGrid, Globe, Rocket, Sparkles, User, GraduationCap,
};

interface CategoryGridProps {
  categories: Category[];
  agentCounts: Record<string, number>;
  onSelect: (id: string) => void;
}

export default function CategoryGrid({ categories, agentCounts, onSelect }: CategoryGridProps) {
  return (
    <section className="border-b border-line">
      <div className="container-x py-16 lg:py-20">
        <div className="mb-10 border-b border-line pb-4">
          <div className="section-label mb-2">分类浏览</div>
          <h2 className="heading-display text-3xl text-ink lg:text-4xl">
            按分类浏览
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || LayoutGrid;
            const count = agentCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className="group flex flex-col bg-paper p-6 text-left transition-colors hover:bg-white"
              >
                <div className="mb-4 flex items-center justify-between">
                  <Icon className="h-5 w-5 text-ink2 group-hover:text-accent transition-colors" />
                  <ArrowRight className="h-4 w-4 text-ink3 opacity-0 transition-all group-hover:opacity-100 group-hover:text-accent" />
                </div>
                <h3 className="text-base font-medium text-ink">{cat.nameZh}</h3>
                <p className="mt-0.5 font-mono text-xs text-ink3">{cat.nameEn}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink3">
                  {cat.descZh}
                </p>
                <div className="mt-4 font-mono text-xs text-ink2 tnum">
                  {count} 个项目
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
