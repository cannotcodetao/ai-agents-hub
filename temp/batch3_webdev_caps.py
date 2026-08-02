#!/usr/bin/env python3
"""第三批：webdev 分类 18 个项目核心能力定制。"""
import json

webdev_caps = {
    'React': ['声明式组件化库', '现代前端生态基石', 'Web + 原生跨端'],
    'Bootstrap': ['响应式移动优先框架', '50+ 现成组件', '快速原型利器'],
    'Next.js': ['React 全栈框架', 'SSR/SSG/ISR/Edge', 'App Router 文件路由'],
    'shadcn/ui': ['可复制组件集(非 npm)', '源码归你所有', 'Tailwind + Radix 无障碍'],
    'Angular': ['Google 企业级 TS 平台', '路由表单 HTTP DI 全套', '内置测试与动画'],
    'Ant Design': ['蚂蚁企业级 UI 库', '60+ 高质量组件', '中后台首选'],
    'MUI': ['Material Design 完整实现', 'MUI X 高阶数据组件', 'React 组件库'],
    'Tailwind CSS': ['原子化实用优先', 'HTML 内直接写样式', '极少 CSS 体积'],
    'Svelte': ['编译时框架', '无虚拟 DOM', '极小 bundle 高性能'],
    'Storybook': ['UI 组件孤立开发台', '文档化 + 可视化测试', '设计协作标准'],
    'Vite': ['下一代构建工具', '原生 ESM 秒级 HMR', 'Rolldown 打包优化'],
    'webpack': ['静态模块打包器', '插件生态最成熟', '微前端 Module Federation'],
    'Nuxt': ['Vue 全栈框架', '自动 SSR/SSG', '组合式函数自动导入'],
    'Vue': ['渐进式 JS 框架', '单文件组件', '组合式 API'],
    'Docusaurus': ['Meta 文档站生成器', 'MDX + 版本化 + 国际化', '暗黑模式全文搜索'],
    'Chakra UI': ['简单模块化无障碍库', 'WAI-ARIA 合规', '暗黑模式响应式'],
    'Element Plus': ['Vue 3 企业级组件库', 'Element UI 官方升级', '国内中后台主流'],
    'Radix UI Primitives': ['无头无样式 React 原语', '仅交互 + ARIA 语义', '样式完全自由'],
}

for path in ['data/agents.json', 'public/data/agents.json']:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    changed = 0
    for agent in data['agents']:
        if agent['name'] in webdev_caps:
            new = webdev_caps[agent['name']]
            if agent.get('coreCapabilities') != new:
                agent['coreCapabilities'] = new
                changed += 1
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'[OK] {path}: {changed}/18')

print('--- webdev 改后预览 ---')
with open('data/agents.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
for a in data['agents']:
    if a['category'] == 'webdev':
        print(f"  {a['name']:22} -> {a['coreCapabilities']}")