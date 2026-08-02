#!/usr/bin/env python3
"""第二批：framework 分类 16 个项目核心能力定制。"""
import json

framework_caps = {
    'AutoGPT': ['构建自主 Agent 工具集', '可视化编排 + 市场', '让 AI 人人可用'],
    'Dify': ['可视化 LLM 应用平台', 'RAG + 工作流编排', '开源 LLMOps'],
    'LangChain': ['LLM 应用开发框架', '链 + 工具 + Agent', 'RAG 生态完善'],
    'MetaGPT': ['多 Agent 角色扮演协作', '模拟软件公司分工', '需求自然语言转代码'],
    'AutoGen': ['多 Agent 对话协作框架', '微软出品', '可对话式任务分解'],
    'CrewAI': ['角色扮演 Agent 编排', '团队式协作', '轻量易上手'],
    'LlamaIndex': ['面向 LLM 的数据框架', '私有数据摄取 + 检索', 'RAG 专用'],
    'AgentGPT': ['浏览器内部署自主 Agent', '免代码配置目标', '网页端即用'],
    'ChatDev': ['对话式软件开发框架', '自然语言建软件', '多 Agent 虚拟公司'],
    'Semantic Kernel': ['微软 AI 集成 SDK', '传统代码 + AI 融合', '多语言 C#/Python/Java'],
    'OpenAI Agents SDK': ['轻量多 Agent 工作流', '移交 + 护栏 + 追踪', 'OpenAI 官方'],
    'Haystack': ['生产级 LLM 应用框架', '可组合管道 Pipeline', 'RAG + 搜索'],
    'BabyAGI': ['任务驱动自主 Agent', '任务创建 + 优先级排序', '自主执行循环'],
    'Pydantic AI': ['类型安全 LLM 框架', '结构化输出', '生产级'],
    'SuperAGI': ['开发者优先自主框架', '构建 + 管理 + 运行 Agent', '开源'],
    'Atomic Agents': ['模块化可组合 Agent', '基于 Pydantic 类型安全', '轻量'],
}

for path in ['data/agents.json', 'public/data/agents.json']:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    changed = 0
    for agent in data['agents']:
        if agent['name'] in framework_caps:
            new = framework_caps[agent['name']]
            if agent.get('coreCapabilities') != new:
                agent['coreCapabilities'] = new
                changed += 1
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'[OK] {path}: {changed}/16')

print('--- framework 改后预览 ---')
with open('data/agents.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
for a in data['agents']:
    if a['category'] == 'framework':
        print(f"  {a['name']:20} -> {a['coreCapabilities']}")