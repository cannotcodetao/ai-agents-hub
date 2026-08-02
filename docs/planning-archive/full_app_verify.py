import urllib.request
import json
import time
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

# 知名的完整 LLM 应用项目候选（有 Web/桌面 UI，可调用 API，无需写代码）
candidates = [
    # Chatbot UI 类
    "open-webui/open-webui",
    "mckaywrigley/chatbot-ui",
    "chatbot-ui/chatbot-ui",
    "C12SV/cherry-studio",
    "kangfenghua/openchatui",
    "Yidadaa/ChatGPT-Next-Web",
    "songquanpeng/one-api",
    
    # AI 写作/内容
    "EllieLiu001/tldrawai",
    "nicepkg/aide",
    "steven-tey/novel",
    "vercel-labs/gemini-chatbot",
    
    # RAG / 知识库
    "aidenybai/llmreport",
    "Mixcore-Solutions/Mixcore",
    "awslabs/mlspace",
    "infiniflow/ragflow",
    "zilliztech/GPTCache",
    
    # AI Agent 平台
    "dify/dify",
    "coze-dev/coze-web",
    "bytebase/bytebase",
    
    # 桌面 AI 助手
    "m1guelpf/chatbox-ai",
    "Bin-Huang/chatbox",
    "nolanlawson/ai-desktop",
    
    # AI IDE / 工作台
    "continuedev/continue",
    "getcursor/cursor",
    "trae-ai/trae",
    
    # AI 视频/多媒体
    "SanjayDevTech/ai-video-generator",
    "harry0703/MoneyPrinterTurbo",
    
    # 工作流/自动化
    "n8n-io/n8n",
    "activepieces/activepieces",
    "automatisch/automatisch",
    "huginn/huginn",
    
    # AI 笔记/知识管理
    "logseq/logseq",
    "laurent22/joplin",
    "AppFlowy-IO/AppFlowy",
    "Outline/Outline",
    
    # AI 开发工具
    "stitionai/devika",
    "agentsea/agentdesk",
    "e2b-dev/code-interpreter",
    "google-gemini/gemini-cookbook",
    
    # 其他 AI 应用
    "transitive-bullshit/agentic",
    "lencx/ChatGPT",
    "chathub-dev/chathub",
    "ai-short/ChatGPT-Shortcut",
]

# 已存在的
existing = set()
with open('data/agents.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    for a in data['agents']:
        existing.add(a['fullName'])

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'application/vnd.github.v3+json',
}

results = []
count = 0

for repo in candidates:
    if repo in existing:
        print(f"[已存在] {repo}")
        continue
    
    print(f"验证: {repo} ...", end=' ')
    url = f"https://api.github.com/repos/{repo}"
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            stars = data['stargazers_count']
            print(f"{stars:,}⭐")
            if stars >= 1000:
                results.append({
                    'name': data['name'],
                    'fullName': data['full_name'],
                    'url': data['html_url'],
                    'description': data.get('description', '') or '',
                    'stars': stars,
                    'language': data.get('language', '') or '',
                    'topics': data.get('topics', []) or [],
                })
                count += 1
    except Exception as e:
        print(f"错误: {e}")
        if '403' in str(e) or 'rate limit' in str(e).lower():
            print("触发限流，等待 30s...")
            time.sleep(30)
            continue
    
    time.sleep(0.5)

print(f"\n\n=== 新增验证通过（≥1K stars）: {len(results)} 个 ===")
for i, r in enumerate(results, 1):
    desc = (r['description'] or '')[:70].replace('\n', ' ')
    print(f"  {i}. {r['fullName']} - {r['stars']:,}⭐ - {desc}")

with open('.planning/full_app_verified.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"\n已保存到 .planning/full_app_verified.json")
