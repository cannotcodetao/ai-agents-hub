#!/usr/bin/env python3
"""第四批：productivity 分类 14 个项目核心能力定制。"""
import json

productivity_caps = {
    'n8n': ['工作流可视化编排', '400+ 应用集成', '开源 Zapier 替代 + 原生 AI Agent'],
    'langflow': ['可视化 LLM 工作流', '兼容 LangChain 生态', '多 Agent + RAG 拖拽构建'],
    'Flowise': ['拖拽式 LLM 应用', '基于 LangChain', '向量库 + Agent 集成'],
    'Huginn': ['自托管自动化代理', '监控 + 执行任务', 'IFTTT/Zapier 自托管替代'],
    'One API': ['LLM API 管理分发', '多模型渠道统一', 'OpenAI/Azure/DeepSeek 等'],
    'node-red': ['低代码事件驱动', '连接硬件 + API + 在线服务', 'IoT 自动化老牌'],
    'activepieces': ['开源无代码业务自动化', '200+ 连接器', 'Zapier 替代 + AI Agent'],
    'Automatisch': ['开源 Zapier 替代', '无需代码建工作流', '数百应用集成'],
    'Woodpecker CI': ['简洁强大 CI/CD 引擎', '出色可扩展性', '开源持续集成'],
    'openworker': ['吴恩达桌面 AI coworker', '本地运行交付成品', '25+ 连接器任意 LLM'],
    'LobsterAI': ['网易有道桌面 AI Agent', '数据分析 + 幻灯片 + 文档', '基于 OpenClaw'],
    'create-pull-request': ['GitHub Action 自动建 PR', '为仓库变更自动创建 PR', 'CI/CD 自动化'],
    'Data-Analysis-Agent': ['对话式数据分析助手', '自动生成可视化报表', '商业洞察'],
    'DATAGEN': ['多 Agent 研究助手', '假设生成 + 数据分析 + 报告', 'AI 驱动'],
}

for path in ['data/agents.json', 'public/data/agents.json']:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    changed = 0
    for agent in data['agents']:
        if agent['name'] in productivity_caps:
            new = productivity_caps[agent['name']]
            if agent.get('coreCapabilities') != new:
                agent['coreCapabilities'] = new
                changed += 1
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'[OK] {path}: {changed}/14')

print('--- productivity 改后预览 ---')
with open('data/agents.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
for a in data['agents']:
    if a['category'] == 'productivity':
        print(f"  {a['name']:22} -> {a['coreCapabilities']}")