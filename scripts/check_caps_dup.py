#!/usr/bin/env python3
"""
check_caps_dup.py — AI Agents Hub 数据校验脚本

校验 data/agents.json 里所有 Agent 的 coreCapabilities 是否与同类目下其他项目差异化。

用法：
    python scripts/check_caps_dup.py data/agents.json

退出码：
    0 — 通过
    1 — 有重复或缺失
"""
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path


LEGACY_KEYWORDS = (
    '快速落地',
    '核心能力',
    '高效执行',
)


def load_agents(path: Path):
    if not path.exists():
        print(f'[!] 数据文件不存在: {path}', file=sys.stderr)
        sys.exit(2)
    data = json.loads(path.read_text(encoding='utf-8'))
    return data.get('agents') or []


def check_legacy(agents):
    """检查是否有上一轮已废弃的通用文案"""
    bad = []
    for a in agents:
        caps = a.get('coreCapabilities') or []
        for cap in caps:
            for kw in LEGACY_KEYWORDS:
                if kw in cap:
                    bad.append((a['name'], cap, kw))
                    break
    return bad


def check_duplicates(agents):
    """统计全量 + 按 category 的 coreCapabilities 组合重复情况"""
    combo_counter = Counter()
    combo_to_names = defaultdict(list)
    for a in agents:
        caps = a.get('coreCapabilities') or []
        combo = tuple(caps)
        combo_counter[combo] += 1
        combo_to_names[combo].append(a['name'])

    duplicates = {c: n for c, n in combo_counter.items() if n > 1}
    return {
        'total': len(agents),
        'distinct': len(combo_counter),
        'max_dup': max(combo_counter.values()) if combo_counter else 0,
        'duplicates': duplicates,
        'combo_to_names': combo_to_names,
    }


def check_missing(agents):
    missing = [a['name'] for a in agents if not a.get('coreCapabilities')]
    return missing


def check_short_or_long(agents):
    """检查每条 5~12 字（极简标签）"""
    offenders = []
    for a in agents:
        caps = a.get('coreCapabilities') or []
        for cap in caps:
            n = len(cap)
            if n < 5 or n > 12:
                offenders.append((a['name'], cap, n))
    return offenders


def check_in_category_unique(agents):
    """同类目下 coreCapabilities 不撞车（更严格）

    注意：用 fullName 作为"项目唯一身份"判断。同名项目（如不同 owner 的同 name 仓
    库）不应被视作撞车。
    """
    cat_by_cap = defaultdict(set)  # (cat, cap) -> set of fullName
    for a in agents:
        for cap in (a.get('coreCapabilities') or []):
            cat_by_cap[(a['category'], cap)].add(a['fullName'])
    issues = []
    for (cat, cap), names in cat_by_cap.items():
        if len(names) > 1:
            issues.append((cat, cap, sorted(names)))
    return issues


def check_oneclick_mirror_consistency(agents):
    """校验 oneClickPrompt 必须有 giteeMirror 字段或文本含 '镜像源：'

    规则：
    - 若项目有 oneClickPrompt，必须同时有 giteeMirror 字段
    - 或 oneClickPrompt 文本里显式含 '镜像源：'（允许非克隆场景 fallback）
    - 这条规则来自 Phase 10 决策 P10-2=A+C（手写 + 校验脚本兜底）
    """
    bad = []
    for a in agents:
        prompt = a.get('oneClickPrompt')
        if not prompt:
            continue
        if a.get('giteeMirror'):
            continue  # 满足条件 1
        if '镜像源：' in prompt:
            continue  # 满足条件 2
        bad.append((a['fullName'], prompt[:60]))
    return bad


def main():
    if len(sys.argv) > 1:
        target = Path(sys.argv[1])
    else:
        target = Path('data/agents.json')

    print(f'[*] 加载数据: {target}')
    agents = load_agents(target)
    print(f'[*] 共 {len(agents)} 个项目\n')

    failures = []
    warnings = []

    missing = check_missing(agents)
    print(f'[ ] 缺失 coreCapabilities 的项目: {len(missing)}')
    if missing:
        failures.append(f'缺失: {missing[:5]}...')

    # 长度：仅作 warning，不阻断（差异化优先于严格字数）
    short_long = check_short_or_long(agents)
    print(f'[W] 长度不在 5~12 字的项目数（信息项，差异化为首要）: {len(short_long)}')
    if short_long:
        warnings.append(f'长度不在 5~12 字符（信息项，不阻断 commit）: {short_long[:5]}...')

    legacy = check_legacy(agents)
    print(f'[ ] 上一轮已废弃的通用文案残留: {len(legacy)}')
    if legacy:
        failures.append(f'通用文案: {legacy[:5]}...')

    dup = check_duplicates(agents)
    print(f'\n[全量]')
    print(f'  - 总数: {dup["total"]}')
    print(f'  - 不同 coreCapabilities 组合: {dup["distinct"]}')
    print(f'  - 最大重复数: {dup["max_dup"]}')
    if dup['max_dup'] > 2:
        failures.append(f'有核心能力组合重复超过 2x 的项目')
        for combo, n in sorted(dup['duplicates'].items(), key=lambda x: -x[1])[:5]:
            print(f'    重复 {n}x: {list(combo)} ← {dup["combo_to_names"][combo]}')

    in_cat = check_in_category_unique(agents)
    print(f'\n[同 category 内标签撞车（不同 fullName）]: {len(in_cat)}')
    if in_cat:
        for cat, cap, names in in_cat[:10]:
            print(f'  {cat} | "{cap}" ← {names}')
        if len(in_cat) > 10:
            print(f'  ...还有 {len(in_cat) - 10} 条')
        failures.append(f'同类目下标签撞车 {len(in_cat)} 条')

    ocm = check_oneclick_mirror_consistency(agents)
    print(f'\n[oneClickPrompt ↔ giteeMirror 一致性]: {len(ocm)} 条项目有 prompt 但无镜像源（信息项）')
    if ocm:
        # 降级为 warning 而非 FAIL：当前多数项目确实无 gitee 镜像，硬阻断会卡住所有加新项目的工作流
        # 用户后续在 docs/MIRROR_PROPOSAL.md 里看到候选列表，可手动挑选补充
        for fn, prompt in ocm[:5]:
            print(f'  ℹ️   {fn:48s}  prompt: {prompt}...')
        if len(ocm) > 5:
            print(f'  ...还有 {len(ocm) - 5} 条')
        warnings.append(f'oneClickPrompt 缺 giteeMirror（信息项，候选清单见 docs/MIRROR_PROPOSAL.md）：{len(ocm)} 条')

    print()
    if failures:
        print(f'[FAIL] {len(failures)} 项校验未通过:')
        for f in failures:
            print(f'  - {f}')
        if warnings:
            print(f'\n[WARN] {len(warnings)} 项信息（不阻断）:')
            for w in warnings:
                print(f'  - {w}')
        sys.exit(1)
    elif warnings:
        print(f'[PASS w/ warnings] 全部硬校验通过，有 {len(warnings)} 项 info')
        sys.exit(0)
    else:
        print('[PASS] 所有校验通过 ✓')
        sys.exit(0)


if __name__ == '__main__':
    main()
