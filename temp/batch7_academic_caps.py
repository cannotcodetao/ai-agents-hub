#!/usr/bin/env python3
"""第七批：academic 分类 23 个项目核心能力定制。"""
import json

academic_caps = {
    'GPT Academic': ['论文阅读/润色/写作优化', 'PDF + LaTeX 翻译', '代码剖析 + 自定义插件'],
    'ARS': ['Claude Code 学术研究 skill', '10 阶段 32 Agent 流水线', '引用验证 + 失败模式阻断'],
    'PDFMathTranslate': ['PDF 论文翻译工具', '保留公式和排版', 'EMNLP 2025 Demo'],
    'Overleaf': ['在线协作 LaTeX 编辑器', 'AGPL 自托管版', '官方开源'],
    'AI Scientist': ['全自动科学发现系统', '想法 + 编码 + 实验 + 论文', '开放科研'],
    'ARIS': ['自主 ML 研究 Agent', '跨模型评审循环', 'idea + 实验自动化'],
    'PaperQA': ['科学文献 RAG 问答', '带引用回答', '支持 PDF + 代码'],
    'ARS-Codex': ['ARS 的 Codex 原生版', 'OpenAI Codex CLI 10 阶段', '学术研究流水线'],
    'Research Paper Writing Skills': ['ML/CV/NLP 论文写作 Skill', '史朋朋方法论', '学术写作'],
    'Claude Scholar': ['半自动研究助理', '基于 Claude Code', '文献检索 + 软件开发'],
    'Zotero-MCP': ['Zotero MCP 主版本', '语义搜索 + 引用分析', 'PDF 全文检索'],
    'arxiv-mcp-server': ['arXiv MCP 服务器', '搜索 + 下载 + 分析论文', 'Apache-2.0'],
    'AcademicForge': ['学术写作精选 Skill 集', '文献综述 + 论文写作', '研究工作流'],
    'Paper Search MCP': ['论文搜索下载 MCP/CLI/Skills', 'arXiv+Semantic Scholar+OpenAlex', '多源'],
    'FAROS': ['蓝图驱动自动研究运行时', '想法 + 实验 + 写作 + 评审', 'AI 工作流'],
    'Codex Claude Academic Skills': ['三个 Claude Code Skills', '文献阅读 + 写作 + 科学计算', '完整研究流'],
    'paperai': ['医学科学论文 AI 工具', '自动化文献综述', '语义搜索 + 问答'],
    'Claude Prism': ['离线优先科学写作台', 'LaTeX + Python + 实时预览', '桌面应用'],
    'academic-ai-prompt': ['40+ 学术 AI Prompt 库', '选题 + 综述 + 论证模板', '论文撰写'],
    'PaperDebugger': ['多智能体学术写作系统', '编辑器内写作 + 评审', '实时反馈'],
    'medical-research-skills': ['医学研究数百 Agent 技能', '实验设计 + 数据分析', '证据洞察 + 写作'],
    'Academic Paper Skills': ['Claude Code 论文规划框架', '大纲到终稿结构化', '写作方法论'],
    'Zotero-MCP-Plugin': ['Zotero 插件版 MCP', '中文支持', '文献检索 + 元数据管理'],
}

for path in ['data/agents.json', 'public/data/agents.json']:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    changed = 0
    for agent in data['agents']:
        if agent['name'] in academic_caps:
            new = academic_caps[agent['name']]
            if agent.get('coreCapabilities') != new:
                agent['coreCapabilities'] = new
                changed += 1
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'[OK] {path}: {changed}/23')

print('--- academic 改后预览 ---')
with open('data/agents.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
for a in data['agents']:
    if a['category'] == 'academic':
        print(f"  {a['name'][:26]:26} -> {a['coreCapabilities']}")