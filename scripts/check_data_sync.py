#!/usr/bin/env python3
"""
check_data_sync.py — AI Agents Hub 数据校验脚本

校验 data/agents.json 与 public/data/agents.json 是否完全一致（Vite 静态站点从
public/data/ 拉数据，必须保证两份同步）。

用法：
    python scripts/check_data_sync.py

退出码：
    0 — 完全一致
    1 — 不致
"""
import json
import sys
from pathlib import Path


def canonical(obj):
    """规范化 JSON：去除空白差异 + 排序键"""
    return json.dumps(obj, ensure_ascii=False, sort_keys=True, separators=(',', ':'))


def main():
    src = Path('data/agents.json')
    pub = Path('public/data/agents.json')

    if not src.exists():
        print(f'[!] 数据源不存在: {src}', file=sys.stderr)
        sys.exit(2)
    if not pub.exists():
        print(f'[!] 静态副本不存在: {pub}', file=sys.stderr)
        sys.exit(2)

    src_data = json.loads(src.read_text(encoding='utf-8'))
    pub_data = json.loads(pub.read_text(encoding='utf-8'))

    src_canonical = canonical(src_data)
    pub_canonical = canonical(pub_data)

    if src_canonical == pub_canonical:
        agents_count = len(src_data.get('agents') or [])
        categories_count = len(src_data.get('categories') or [])
        print(f'[PASS] data/agents.json == public/data/agents.json OK')
        print(f'  - 项目总数: {agents_count}')
        print(f'  - 分类总数: {categories_count}')
        sys.exit(0)
    else:
        print(f'[FAIL] 两份数据不一致', file=sys.stderr)
        if len(src_canonical) != len(pub_canonical):
            print(f'  - 文本长度: src={len(src_canonical)} pub={len(pub_canonical)}', file=sys.stderr)
        for i, (sc, pc) in enumerate(zip(src_canonical, pub_canonical)):
            if sc != pc:
                start = max(0, i - 50)
                print(f'  - 第一个差异位置 char {i}:', file=sys.stderr)
                print(f'    src: ...{src_canonical[start:i+50]!r}', file=sys.stderr)
                print(f'    pub: ...{pub_canonical[start:i+50]!r}', file=sys.stderr)
                break
        sys.exit(1)


if __name__ == '__main__':
    main()
