#!/usr/bin/env python3
"""第一批：定制编程代码分类 25 个项目的核心能力。"""
import json

# 每个项目 3 条：覆盖真实差异化能力，避免再次陷入"通用文案填 25 个"
coding_caps = {
    'OpenHands': ['自主执行多步编程任务', '沙箱内浏览器+终端', '开源 Devin 替代'],
    'Cline': ['IDE 内自主编码 Agent', '创建/编辑文件+执行命令', '逐步用户授权制'],
    'OpenSpec': ['规约驱动开发 SDD', 'AI 严格遵循规格说明', '编写规格说明书'],
    'Aider': ['终端 AI 结对编程', '与 LLM 协作编辑 Git 仓库', '变更自动提交'],
    'Continue': ['VS Code + JetBrains 插件', '接入任意 LLM', '完全开源可自部署'],
    'Tabby': ['自托管 AI 编程助手', 'Copilot 开源自部署替代', '企业内网合规部署'],
    'Taipy': ['数据科学家零前端搭建 Web', 'AI 算法快速变生产级应用', '拖拽式 Dashboard'],
    'CC Connect': ['编程助手桥接微信/飞书', 'Claude Code 远程控制', '消息平台对话编程'],
    'Grok Build': ['xAI 编码代理工具', 'Rust 编写全屏 TUI', '可扩展 CLI 架构'],
    'TabNine': ['深度学习 AI 代码补全', '全主流语言和 IDE 支持', '本地与云端双模式'],
    'Sweep AI': ['Bug 报告转 GitHub PR', 'AI 自动化代码修复', 'Issue 驱动开发'],
    'forgecode': ['AI 结对编程助手', 'Claude/GPT/Grok/DeepSeek 多模型', '智能上下文理解'],
    'Qodo Cover': ['AI 自动生成测试用例', '提升代码覆盖率', '质量保障自动化'],
    'Costrict': ['企业级严格 AI 编程', 'AI Agent + 代码审查 + 测试生成', '质量优先设计'],
    'aiac': ['AI 生成 IaC 配置文件', 'Terraform/CloudFormation/Dockerfile', '基础设施即代码自动化'],
    'Claude DevTools': ['Claude Code 开发者工具', '会话日志与工具调用可视化', 'Token 使用实时追踪'],
    'twinny': ['VS Code AI 补全插件', '支持本地 LLM 部署', 'API 调用双模式'],
    'Devon': ['Devin AI 开源替代方案', '自主结对编程', '全自动代码生成'],
    'AutoCodeRover': ['LLM 自主程序改进', '自动化 Bug 修复', '学术研究项目'],
    'Ruler': ['编程 Agent 统一规则管理', 'Claude/Cursor/Codex 一致代码质量', '跨工具规则同步'],
    'CodeGeeX4': ['开源 9B 软件开发模型', '代码补全/翻译/Bug 修复', '多任务全能型'],
    'TestSprite CLI': ['终端 AI 测试工具', '生成+运行+反馈一体化', '命令行 CI 集成'],
    'Minuet': ['Neovim AI 实时补全', '轻量快速低延迟', '本地模型与 API 双模式'],
    'ChatGPT VSCode': ['VS Code AI 结对编程', '聊天/重构/解释/生成', 'ChatGPT 深度集成'],
    'CodeSight': ['AI 上下文生成器', '每次对话节省数千 Token', 'Claude Code 等工具增强'],
}

for path in ['data/agents.json', 'public/data/agents.json']:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    changed = 0
    changed_names = []
    for agent in data['agents']:
        if agent['name'] in coding_caps:
            new_caps = coding_caps[agent['name']]
            old_caps = agent.get('coreCapabilities')
            agent['coreCapabilities'] = new_caps
            if old_caps != new_caps:
                changed += 1
                changed_names.append(agent['name'])

    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f'[OK] {path}: 改动 {changed} 个项目')
    print(f'    {changed_names}')

print()
print('--- 编程代码分类改后效果预览 ---')
with open('data/agents.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
for a in data['agents']:
    if a['category'] == 'coding':
        print(f"  {a['name']:18} -> {a['coreCapabilities']}")