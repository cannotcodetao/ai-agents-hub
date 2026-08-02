import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="border-b border-line">
      <div className="container-x py-20 lg:py-28">
        <div className="flex flex-col gap-12">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="section-label">AI 工具 · 精选收录</span>
          </div>

          <div className="max-w-5xl">
            <h1 className="heading-display text-5xl text-ink sm:text-6xl lg:text-7xl">
              收录 GitHub 上
              <br />
              <span className="text-accent">值得关注</span>的
              <br />
              AI工具，不止Agent与Skill
            </h1>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-2xl text-lg leading-relaxed text-ink2">
                按功能分类，附中文介绍与 Stars 数量，帮你快速发现好工具。
              </p>
              <a
                href="#explore"
                className="group flex shrink-0 items-center gap-2 border-b-2 border-accent pb-1 text-sm font-medium text-accent transition-colors"
              >
                <span>开始探索</span>
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
