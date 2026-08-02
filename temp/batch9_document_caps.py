#!/usr/bin/env python3
"""第九批：document 分类 15 个项目核心能力定制。"""
import json

document_caps = {
    'RAGFlow': ['开源 RAG 引擎', '深度文档理解', '多格式知识库构建'],
    'AnythingLLM': ['全栈 AI 应用', '私有本地文档对话', 'RAG + Agent'],
    'PrivateGPT': ['生产级隐私 AI 框架', '文档问答不泄露数据', '完全数据隐私'],
    'Joplin': ['开源笔记 + 待办', 'Markdown + 加密 + 同步', '跨平台'],
    'Logseq': ['隐私优先知识管理', '本地文件大纲笔记', '网络化思考'],
    'Quivr': ['开源 RAG 框架', 'AI 第二大脑', '智能文档问答'],
    'Langchain-Chatchat': ['本地知识库 RAG + Agent', '基于 ChatGLM/Qwen/Llama', '原 ChatGLM'],
    'Khoj': ['个人 AI 助手', '文档问答 + 深度研究', '对话个人知识库'],
    'FastGPT': ['基于 LLM 知识库平台', '数据处理 + RAG 检索', '可视化工作流'],
    'Novel': ['Notion 风格所见即所得', 'AI 自动补全', '文本生成'],
    'Yuxi-Knowledge': ['知识库 + 知识图谱平台', '多租户 Agent Harness', 'LangChain + Vue'],
    '53AIHub': ['开源 AI 门户 + 知识库', '管理企业知识 + Agent', '集成 Coze/Dify/FastGPT'],
    'llm-wiki-agent': ['自动构建维护知识库', 'Claude/Codex/Gemini 读源', '持久化互链 wiki'],
    'AntSK': ['.NET 9 AI 知识库', 'Semantic Kernel + 离线运行', '本地离线'],
    'Awesome-AI-Memory': ['大模型记忆知识库', '前沿研究 + 工程框架', '系统设计与评测'],
}

for path in ['data/agents.json', 'public/data/agents.json']:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    changed = 0
    for agent in data['agents']:
        if agent['name'] in document_caps:
            new = document_caps[agent['name']]
            if agent.get('coreCapabilities') != new:
                agent['coreCapabilities'] = new
                changed += 1
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'[OK] {path}: {changed}/15')

print('--- document 改后预览 ---')
with open('data/agents.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
for a in data['agents']:
    if a['category'] == 'document':
        print(f"  {a['name'][:20]:20} -> {a['coreCapabilities']}")