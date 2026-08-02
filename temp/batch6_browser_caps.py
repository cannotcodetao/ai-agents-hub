#!/usr/bin/env python3
"""第六批：browser 分类 21 个项目核心能力定制。"""
import json

browser_caps = {
    'browser-use': ['LLM 自主控制浏览器', 'Browser Use 赛道标杆', '真实世界任务'],
    'playwright': ['Web 测试自动化框架', '三引擎统一 API', '含 MCP + CLI for agents'],
    'crawl4ai': ['LLM 优化网页爬虫', '干净 Markdown/JSON', '深度爬取 + MCP'],
    'Agent Browser': ['AI Agent 浏览器 CLI', 'Vercel Labs 出品', '浏览器自动化'],
    'CUA': ['Computer-Use Agent 基础设施', '沙箱 + SDK + 基准', '控制完整桌面'],
    'Nanobrowser': ['开源 Chrome 扩展', '多 Agent 工作流', 'OpenAI Operator 替代'],
    'OpenBrowser': ['AI 浏览网页工具包', '面向浏览器型 Agent', '自主浏览'],
    'CamoFox Browser': ['隐身无头浏览器', '绕过 Cloudflare + 反 bot', 'Puppeteer 替代'],
    'browser-act/skills': ['浏览器自动化 CLI', '突破反 bot 墙', '多任务并行隔离'],
    'Magnitude': ['视觉优先浏览器 Agent', '视觉理解驱动', '开源'],
    'Oxylabs AI Studio': ['AI 驱动爬虫 + 抓取器', '自然语言提示', '结构化数据'],
    'Open Computer Use': ['E2B 沙箱驱动', '开源 LLM 计算机操控', 'computer-use'],
    'Notte': ['Web Agent 构建框架', '无服务器网页自动化', '可靠浏览器基础设施'],
    'AgentQL': ['AI 与 Web 连接套件', '查询语言 + Playwright', '元素交互提取'],
    'BrowserWing': ['浏览器操作转 MCP/Claude Skill', 'AI 高效控制浏览器', 'agent-control'],
    'BitFun': ['桌面级 Agent 运行时', '代码 + 协作 Agent', '记忆个性进化'],
    'AIPex': ['隐私优先浏览器自动化', 'Manus/Claude Chrome 替代', 'AI 助手'],
    'Browserable': ['开源可自托管浏览器库', 'AI Agent 浏览器自动化', '开源'],
    'Skales': ['跨平台个人桌面 Agent', 'Win/Mac/Linux/Android', '多 Agent 协作'],
    'TestZeus Hercules': ['首个开源测试 Agent', 'UI+API+安全+视觉验证', '零代码免维护'],
    'Autotab': ['构建浏览器 Agent 启动包', '面向真实世界任务', 'starter kit'],
}

for path in ['data/agents.json', 'public/data/agents.json']:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    changed = 0
    for agent in data['agents']:
        if agent['name'] in browser_caps:
            new = browser_caps[agent['name']]
            if agent.get('coreCapabilities') != new:
                agent['coreCapabilities'] = new
                changed += 1
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'[OK] {path}: {changed}/21')

print('--- browser 改后预览 ---')
with open('data/agents.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
for a in data['agents']:
    if a['category'] == 'browser':
        print(f"  {a['name'][:22]:22} -> {a['coreCapabilities']}")