#!/usr/bin/env python3
"""第八批：avatar 分类 18 个项目核心能力定制。"""
import json

avatar_caps = {
    'Deep-Live-Cam': ['实时面部换脸', '单张图即可', '直播流实时换脸'],
    'faceswap': ['开源 Deepfake 鼻祖', '社区庞大模型丰富', '深入研究换脸'],
    'Airis': ['自托管 AI 虚拟伴侣', '实时语音聊天 + 游戏互动', 'Web/桌面多端'],
    'DeepFaceLive': ['PC 端实时换脸', '直播流 + 视频通话', '兼容任意摄像头'],
    'FaceFusion': ['业界领先人脸处理平台', '换脸 + 面部增强', '批量处理'],
    'DeepFaceLab': ['Deepfake 标杆软件', '高质量视频换脸', '专业制作'],
    'Duix Avatar': ['开源 AI 数字人工具包', '离线视频生成 + 克隆', '企业级本地部署'],
    'Open-LLM-VTuber': ['开源 LLM 虚拟主播', '免提语音 + Live2D 驱动', '全本地运行'],
    'Live2D Widget': ['网页版 Live2D 看板娘', '多模型互动', '最流行网页插件'],
    'LiveTalking': ['实时交互数字人直播', '低延迟表情驱动', '流式口型生成'],
    'Duix Mobile': ['移动端实时数字人', '本地部署 <1.5s', '手机高性能'],
    'VideoReTalking': ['音频驱动唇形同步', '任意视频口型编辑', 'SIGGRAPH Asia 2022'],
    'LatentSync': ['字节高质量唇形同步', '基于 Stable Diffusion', '画面 + 时序一致'],
    'kalidokit': ['面部 + 全身动作捕捉库', 'Mediapipe/TF.js 配合', '驱动 VRM/Live2D'],
    'SimSwap': ['高效通用换脸框架', '单模型任意人脸互换', '学术 + 实用'],
    'Linly-Talker': ['数字人对话系统', 'LLM + 视觉模型结合', 'Whisper+Linly+SadTalker'],
    'V-Express': ['腾讯说话头生成', '图片 + 音频 + 姿态控制', '自然数字人视频'],
    'DreamTalk': ['阿里达摩院说话头生成', '扩散模型生动表情', '口型 + 表情动画'],
}

for path in ['data/agents.json', 'public/data/agents.json']:
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    changed = 0
    for agent in data['agents']:
        if agent['name'] in avatar_caps:
            new = avatar_caps[agent['name']]
            if agent.get('coreCapabilities') != new:
                agent['coreCapabilities'] = new
                changed += 1
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'[OK] {path}: {changed}/18')

print('--- avatar 改后预览 ---')
with open('data/agents.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
for a in data['agents']:
    if a['category'] == 'avatar':
        print(f"  {a['name'][:20]:20} -> {a['coreCapabilities']}")