import json

with open('data/agents.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

full_apps = [
    # framework
    'langgenius/dify',
    'reworkd/AgentGPT',
    'TransformerOptimus/SuperAGI',
    'Significant-Gravitas/AutoGPT',
    # document
    'mintplex-labs/anything-llm',
    'QuivrHQ/quivr',
    'khoj-ai/khoj',
    'zylon-ai/private-gpt',
    'chatchat-space/Langchain-Chatchat',
    'labring/FastGPT',
    'shuyu-labs/AntSK',
    # content
    'SillyTavern/SillyTavern',
    'lobehub/lobe-chat',
    'ChatGPTNextWeb/ChatGPTNextWeb',
    # productivity
    'n8n-io/n8n',
    'activepieces/activepieces',
    'FlowiseAI/Flowise',
    'langflow-ai/langflow',
    'node-red/node-red',
    'netease-youdao/LobsterAI',
    # multimodal
    'comfyanonymous/ComfyUI',
    'AUTOMATIC1111/stable-diffusion-webui',
    'lllyasviel/Fooocus',
    'invoke-ai/InvokeAI',
    # coding
    'All-Hands-AI/OpenHands',
    'TabbyML/tabby',
    # entrepreneur
    'stackblitz-labs/bolt.diy',
    # video
    'harry0703/MoneyPrinterTurbo',
    'Huanshere/VideoLingo',
]

count = 0
for agent in data['agents']:
    if agent['fullName'] in full_apps:
        agent['fullApp'] = True
        count += 1
    elif 'fullApp' not in agent:
        agent['fullApp'] = False

with open('data/agents.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"已标注 {count} 个完整程序项目")
