#!/usr/bin/env python3
"""第十批：video/content/entrepreneur/presentation/multimodal/humanize 6 个分类共 44 个项目。"""
import json

caps = {
    # video (9)
    'MoneyPrinterTurbo': ['短视频全自动生成', '主题或关键词一键生成', 'AI 驱动'],
    'Manim': ['3Blue1Brown 数学动画引擎', 'Python 程序化动画', '解释性教学视频'],
    'Remotion': ['React 程序化创建视频', '代码构建视频体验', 'TypeScript'],
    'Manim Community Edition': ['社区维护数学动画框架', '3b1b 分支', '改进 API + 文档'],
    'Open-Sora': ['开源视频生成模型', 'DiT 架构 11B 参数', '文生视频 + 图生视频'],
    'VideoLingo': ['Netflix 级字幕翻译配音', '自动化视频本地化', '语音克隆'],
    'Wav2Lip': ['语音音频生成精确唇形', '深度学习 GAN', '任意语音匹配'],
    'AnimateDiff': ['文本到动画即插即用', 'SD 运动模块', '个性化动画内容'],
    'sd-webui-deforum': ['SD WebUI 的 Deforum 扩展', '关键帧插值动画', 'AI 驱动视频动画'],
    # content (8)
    'Open WebUI': ['用户友好 AI 界面', '支持 Ollama+OpenAI+Gemini', '多模型'],
    'ChatGPT-Next-Web': ['跨平台 ChatGPT Web UI', '一键部署 + 面具预设', '最早火的前端'],
    'lobe-chat': ['现代设计 LLM UI 框架', '插件生态 + 语音 + 多模态', '高颜值代表'],
    'Chatbox': ['AI 客户端桌面应用', '多 LLM 提供商', '数据本地隐私'],
    'Chatbot UI': ['支持任意模型聊天界面', 'ChatGPT 开源替代', '多 LLM 提供商'],
    'SillyTavern': ['本地 LLM 交互前端', '角色扮演 + 角色卡片', '角色对话社区最流行'],
    'koboldcpp': ['轻量本地 LLM 推理引擎', '基于 llama.cpp', '内置 KoboldAI Web UI'],
    'KoboldAI-Client': ['浏览器 AI 文本生成前端', '故事写作 + 文字冒险', 'KoboldCpp 前身'],
    # entrepreneur (9)
    'gstack': ['YC Garry Tan 的 Claude Code 工具集', '模拟 YC Office Hours', 'CEO 视角产品评审'],
    'Paperclip': ['AI Agent 团队编排平台', '组织架构图 + 预算控制', '可治理 AI 公司'],
    'chinese-independent-developer': ['中国独立开发者项目列表', '国内产品 + 故事', '效率设计 AI'],
    'GPT Engineer': ['经典 AI 代码生成 CLI', '描述应用 AI 生成完整代码库', 'Lovable 前身'],
    'Sim Studio': ['YC W25 开源 Agent 编排平台', 'Figma 式画布 + 100+ 集成', 'SOC2/HIPAA 合规'],
    'bolt.diy': ['提示词即刻运行全栈应用', '任意 LLM', 'MVP 原型验证'],
    'Open SaaS': ['最火开源 SaaS 模板', '登录 + Stripe + 邮件 + 后台', 'Landing + 权限'],
    'Awesome Indie': ['全球 Indie Hacker 资源库', '创业灵感 + SaaS + 增长', '邮件营销 + 支付'],
    '独立开发者出海工具集': ['独立开发者出海技术栈', 'Web模板 + Chrome插件 + 部署', '支付方案'],
    # presentation (8)
    'reveal.js': ['HTML 演示文稿框架', 'HTML/CSS/JS 浏览器演示', '精美幻灯片'],
    'Slidev': ['面向开发者演示框架', 'Markdown 幻灯片 + 实时编程', 'Vue 组件 + 主题'],
    'guizang-ppt-skill': ['归藏高品质 PPT 生成 Skill', '杂志风 + 瑞士风格', '导出 HTML/PDF/PPTX'],
    'Marp': ['Markdown 演示文稿工具', 'Markdown 转幻灯片', '多输出格式 + 主题'],
    'PptxGenJS': ['程序化生成 PPT 的 JS 库', '文本 + 图表 + 图像 + 多媒体', 'PowerPoint'],
    'dashi-ppt-skill': ['大师 PPT 生成 Skill', '多视觉主题浏览器可编辑', '导出 HTML/PDF/PPTX'],
    'ppt-image-first': ['图像优先 PPT 生成 Skill', '视觉图为核心', 'Codex/Claude Code'],
    'gpt-image2-ppt-skills': ['PPT 模板仿版 Skill', 'gpt-image-2 仿版式', '10 套精选风格'],
    # multimodal (6)
    'stable-diffusion-webui': ['SD Web UI（A1111）', '大量扩展 + 图生图 + ControlNet', 'SD 社区最广泛'],
    'ComfyUI': ['基于节点图 SD 模块化 UI', '自定义节点 + 工作流', 'AI 绘图事实标准'],
    'whisper': ['OpenAI 语音识别模型', '68万小时多语言训练', 'ASR 标杆'],
    'Fooocus': ['Gradio 图像生成 UI', '简洁 + 画质 + 提示词增强', 'SDXL 简化客户端'],
    'bark': ['Suno 文本转音频模型', '语音 + 音乐 + 音效', '多语言 + 非语言声音'],
    'InvokeAI': ['SD 专业创作引擎', '统一画布 + 模型管理', '专业艺术家设计师'],
    # humanize (4)
    'Humanizer': ['去 AI 味道标杆 Skill', '识别消除 AI 痕迹', '自然人写感'],
    'Humanizer-zh': ['Humanizer 中文汉化版', '中文消除 AI 痕迹', '中文创作者'],
    'no-ai-slop': ['AI 套路检测编辑 Skill', '移除 20+ AI 写作套路', '保留个人风格'],
    'humanize-text': ['开源免费文本人性化工具', 'AI 转人写文字', '绕过主流检测器'],
}

for path in ['data/agents.json', 'public/data/agents.json']:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    changed = 0
    for agent in data['agents']:
        if agent['name'] in caps:
            new = caps[agent['name']]
            if agent.get('coreCapabilities') != new:
                agent['coreCapabilities'] = new
                changed += 1
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'[OK] {path}: {changed} 个项目')

# 校验：全站是否还有重复组合？
with open('data/agents.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
from collections import Counter
all_caps = [' | '.join(a.get('coreCapabilities', [])) for a in data['agents']]
c = Counter(all_caps)
print(f'\n全站 {len(data["agents"])} 个项目，不同组合 {len(c)} 种')
top = c.most_common(3)
print(f'最高重复: {top[0][1]}x（之前是 27x）')
# 列出仍未改的（fallback 项）
remaining = [a['name'] for a in data['agents'] if a.get('coreCapabilities') in [
    ['自动化编程补全', 'IDE集成/插件化', '多模型与多语言支持'],
    ['Claude/Cursor技能封装', 'MCP协议集成', '技能分发与一键安装'],
    ['论文写作/润色/排版', '论文阅读与语义检索', '科研实验与选题自动化'],
    ['浏览器自主智能体', '网页抓取与结构化输出', '跨平台桌面/测试自动化'],
    ['AI数字人/虚拟形象生成', '实时动作/唇形同步', 'VTuber/直播应用'],
]]
print(f'仍为旧通用文案的项目: {remaining if remaining else "无 ✅"}')