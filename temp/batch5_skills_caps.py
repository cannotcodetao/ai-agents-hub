#!/usr/bin/env python3
"""第五批：skills 分类 27 个项目核心能力定制。"""
import json

skills_caps = {
    'superpowers': ['Claude Code agentic skills 框架', 'TDD 驱动开发方法论', '头脑风暴 + 规划 + 代码审查'],
    'anthropics/skills': ['Anthropic 官方 skills 仓库', 'SKILL.md 渐进式披露', '官方 agent skills'],
    'awesome-mcp-servers': ['MCP 服务器社区精选列表', '工具 + 集成汇总', 'awesome-list'],
    'MCP Servers': ['MCP 官方服务器仓库', '参考实现', '官方集成'],
    'awesome-claude-skills': ['Claude Skills 精选列表', '必装技能首选入口', 'Composio 维护'],
    'awesome-claude-code': ['Claude Code 精选资源集', 'skills + agents + hooks + 状态栏', '编排器'],
    'cli-anything': ['软件变 Agent-Native CLI', '港大 HKUDS 开发', '40+ 预构建 CLI'],
    'agentic-awesome-skills': ['1900+ 可安装技能库', '兼容 Claude/Cursor/Codex/Gemini', '含安装器'],
    'awesome-cursorrules': ['Cursor Rules 精选集合', '.mdc 文件', '前端后端移动端框架'],
    'awesome-ai-agents': ['AI agents 精选列表', '自主代理 + AI 应用框架', '构建工具'],
    'awesome-agent-skills': ['1000+ Agent 技能合集', '官方 + 社区', '兼容主流 Agent 工具'],
    '12-factor-agents': ['生产就绪 LLM agents 方法论', '12 项设计原则', '类似 12-factor apps'],
    'baoyu-skills': ['自媒体视觉工具箱', '图文卡片 + 信息图 + 封面', '演示幻灯片生成'],
    'awesome-claude-code-subagents': ['Claude Code 子代理精选', '专业化任务代理', '扩展能力'],
    'claude-skills (alirezarezvani)': ['社区驱动 skills 集合', '多种开发工作流', '任务覆盖'],
    'awesome-claude-skills (travisvn)': ['Claude Code skills + agents 精选', '社区资源列表', 'awesome-list'],
    'awesome-claude-skills (BehiSecc)': ['社区聚合 Claude Code skills', '按类别组织', '易发现'],
    'awesome-agent-skills-guide': ['Agent Skills 入门教程', '指南 + 技能目录', '快速上手'],
    'UZI Skill': ['投资大佬看盘技能', '22维数据 × 180条量化规则', '17种买卖点(仅供参考)'],
    'qiaomu-anything-to-notebooklm': ['NotebookLM 多源处理', '微信/网页/YouTube/PDF 输入', '一键播客/PPT/脑图'],
    'guizang-social-card-skill': ['小红书图文卡生成', '28版式 + 10主题', '公众号封面'],
    'awesome-agent-skills-zh': ['Agent Skills 中文终极指南', '快速入门 + 资源推荐', '中文社区最全'],
    'awesome-claude-code-toolkit': ['Claude Code 综合工具包', '实用程序 + 脚本 + 配置助手', '提升生产力'],
    'xiaohongshu-ops-skill': ['Openclaw 变小红书运营助手', '推荐流分析 + 自动发布', '爆款复刻 + 评论'],
    'awesome-gpts': ['Custom GPTs 精选列表', 'OpenAI GPT 集合', 'prompt 工程资源'],
    'X导师 Skill': ['X/Twitter 创作方法论', '选题-写作-增长手册', '蒸馏 6 位顶级创作者'],
    'trae-skills': ['Trae IDE 社区 skills', '早期生态', '开创 Trae skills 开发'],
}

for path in ['data/agents.json', 'public/data/agents.json']:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    changed = 0
    for agent in data['agents']:
        if agent['name'] in skills_caps:
            new = skills_caps[agent['name']]
            if agent.get('coreCapabilities') != new:
                agent['coreCapabilities'] = new
                changed += 1
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'[OK] {path}: {changed}/27')

print('--- skills 改后预览 ---')
with open('data/agents.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
for a in data['agents']:
    if a['category'] == 'skills':
        print(f"  {a['name'][:30]:30} -> {a['coreCapabilities']}")