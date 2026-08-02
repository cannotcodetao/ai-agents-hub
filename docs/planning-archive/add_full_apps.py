import json

with open('data/agents.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 检查 ChatGPT-Next-Web 是否已存在（可能改名了）
existing_names = {a['fullName'] for a in data['agents']}
print("现有 ChatGPT 相关项目:")
for a in data['agents']:
    if 'chatgpt' in a['fullName'].lower() or 'nextchat' in a['fullName'].lower():
        print(f"  {a['fullName']} - {a['name']}")

new_agents = [
    {
        "name": "Open WebUI",
        "fullName": "open-webui/open-webui",
        "url": "https://github.com/open-webui/open-webui",
        "descriptionEn": "User-friendly AI Interface supporting Ollama, OpenAI API, Anthropic, Google Gemini, and more.",
        "descriptionZh": "用户友好的AI界面，支持Ollama、OpenAI API、Anthropic、Google Gemini等多种大模型。",
        "stars": 145450,
        "category": "content",
        "subcategory": "LLM前端",
        "subcategoryEn": "LLM Frontend",
        "tags": ["llm", "chatbot", "web-ui", "openai", "ollama", "self-hosted"],
        "fullApp": True
    },
    {
        "name": "Chatbot UI",
        "fullName": "mckaywrigley/chatbot-ui",
        "url": "https://github.com/mckaywrigley/chatbot-ui",
        "descriptionEn": "AI chat interface for any model. Open-source alternative to ChatGPT.",
        "descriptionZh": "支持任意模型的AI聊天界面，ChatGPT的开源替代品，支持多种LLM提供商。",
        "stars": 33293,
        "category": "content",
        "subcategory": "LLM前端",
        "subcategoryEn": "LLM Frontend",
        "tags": ["llm", "chatbot", "chatgpt", "openai", "react", "self-hosted"],
        "fullApp": True
    },
    {
        "name": "One API",
        "fullName": "songquanpeng/one-api",
        "url": "https://github.com/songquanpeng/one-api",
        "descriptionEn": "LLM API management & distribution system supporting OpenAI, Azure, Anthropic, Google Gemini, DeepSeek, and more.",
        "descriptionZh": "LLM API管理与分发系统，支持OpenAI、Azure、Anthropic、Google Gemini、DeepSeek等多种模型渠道。",
        "stars": 35716,
        "category": "productivity",
        "subcategory": "API管理",
        "subcategoryEn": "API Management",
        "tags": ["llm", "api", "gateway", "openai", "management", "self-hosted"],
        "fullApp": True
    },
    {
        "name": "Novel",
        "fullName": "steven-tey/novel",
        "url": "https://github.com/steven-tey/novel",
        "descriptionEn": "Notion-style WYSIWYG editor with AI-powered autocompletion and text generation.",
        "descriptionZh": "Notion风格的所见即所得编辑器，内置AI自动补全和文本生成功能。",
        "stars": 16364,
        "category": "document",
        "subcategory": "AI写作",
        "subcategoryEn": "AI Writing",
        "tags": ["ai-writing", "editor", "notion", "wysiwyg", "openai", "react"],
        "fullApp": True
    },
    {
        "name": "RAGFlow",
        "fullName": "infiniflow/ragflow",
        "url": "https://github.com/infiniflow/ragflow",
        "descriptionEn": "Open-source Retrieval-Augmented Generation (RAG) engine with deep document understanding.",
        "descriptionZh": "开源的检索增强生成（RAG）引擎，具备深度文档理解能力，支持多种格式文档的知识库构建。",
        "stars": 85058,
        "category": "document",
        "subcategory": "RAG系统",
        "subcategoryEn": "RAG System",
        "tags": ["rag", "llm", "knowledge-base", "document-understanding", "self-hosted", "open-source"],
        "fullApp": True
    },
    {
        "name": "Chatbox",
        "fullName": "chatboxai/chatbox",
        "url": "https://github.com/Bin-Huang/chatbox",
        "descriptionEn": "Powerful AI client desktop app supporting multiple LLM providers with local data storage.",
        "descriptionZh": "功能强大的AI客户端桌面应用，支持多种LLM提供商，数据本地存储，保护隐私。",
        "stars": 41000,
        "category": "content",
        "subcategory": "桌面客户端",
        "subcategoryEn": "Desktop Client",
        "tags": ["llm", "desktop", "chatbot", "openai", "privacy", "cross-platform"],
        "fullApp": True
    },
    {
        "name": "Automatisch",
        "fullName": "automatisch/automatisch",
        "url": "https://github.com/automatisch/automatisch",
        "descriptionEn": "Open source Zapier alternative. Build workflow automation without coding.",
        "descriptionZh": "开源的Zapier替代品，无需代码即可构建工作流自动化，支持数百种应用集成。",
        "stars": 13888,
        "category": "productivity",
        "subcategory": "工作流自动化",
        "subcategoryEn": "Workflow Automation",
        "tags": ["automation", "workflow", "zapier-alternative", "self-hosted", "no-code", "integrations"],
        "fullApp": True
    },
    {
        "name": "Huginn",
        "fullName": "huginn/huginn",
        "url": "https://github.com/huginn/huginn",
        "descriptionEn": "Create agents that monitor and act on your behalf. Self-hosted IFTTT/Zapier alternative.",
        "descriptionZh": "创建代理来为你监控和执行任务，自托管的IFTTT/Zapier替代品，可构建自动化工作流。",
        "stars": 49616,
        "category": "productivity",
        "subcategory": "自动化代理",
        "subcategoryEn": "Automation Agents",
        "tags": ["automation", "agents", "self-hosted", "workflow", "ifttt-alternative", "ruby"],
        "fullApp": True
    },
]

added = 0
for agent in new_agents:
    if agent['fullName'] not in existing_names:
        data['agents'].append(agent)
        added += 1
        print(f"新增: {agent['fullName']} ({agent['stars']:,}⭐)")
    else:
        print(f"已存在: {agent['fullName']}")

with open('data/agents.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"\n共新增 {added} 个项目")
print(f"总项目数: {len(data['agents'])}")
