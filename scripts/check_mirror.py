"""
check_mirror.py - 校验/探测 gitee.com/mirrors 镜像
用法：
  1) 校验现有 giteeMirror：python check_mirror.py data/agents.json
  2) 探测一批潜在项目：python check_mirror.py data/agents.json --probe-top 100

输入：agents.json
输出：每行一个项目状态（200/404/网络错误）
不修改文件；只打印报告
"""
import json
import sys
import urllib.request
import urllib.error
from pathlib import Path
from collections import defaultdict


def check_mirror(url: str, timeout: int = 8) -> tuple[int, str]:
    """GET 探测 gitee 镜像。
    返回 (状态码, 原因):
      (200, 'ok')         命中
      (404, 'not_found')  Gitee 显式 404
      (200, 'not_found')  返回 200 但页面含「页面不存在」——也算不存在
      (000, 'error:xxx')  网络/超时错误
    """
    req = urllib.request.Request(url, method='GET')
    req.add_header('User-Agent', 'ai-agents-hub-mirror-checker/1.0')
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            code = r.getcode()
            raw = r.read(2000).decode('utf-8', errors='ignore')
            if '页面不存在' in raw or '404' in raw[:200]:
                return (200, 'not_found')
            return (code, 'ok')
    except urllib.error.HTTPError as e:
        return (e.code, f'http_{e.code}')
    except Exception as e:
        return (0, f'error:{type(e).__name__}')


def get_repo_basename(full_name: str) -> str:
    """从 owner/repo 提取 repo 部分（猜测 gitee mirror 路径）"""
    return full_name.split('/', 1)[-1] if '/' in full_name else full_name


def main():
    if len(sys.argv) < 2:
        print('用法: python check_mirror.py <agents.json> [--probe-top N]')
        sys.exit(1)
    target = Path(sys.argv[1])
    probe_top = 0
    if '--probe-top' in sys.argv:
        i = sys.argv.index('--probe-top')
        probe_top = int(sys.argv[i + 1])

    data = json.loads(target.read_text(encoding='utf-8'))
    agents = data['agents']

    # 1) 校验现有
    print('=' * 70)
    print(f'校验现有 giteeMirror ({sum(1 for a in agents if a.get("giteeMirror"))} 条):')
    print('=' * 70)
    bad = []
    for a in agents:
        m = a.get('giteeMirror')
        if not m:
            continue
        code, reason = check_mirror(m)
        ok = (code == 200 and reason == 'ok')
        flag = '✅' if ok else '❌'
        print(f'  {flag} [{code}/{reason}] {a["fullName"]:48s}  {m}')
        if not ok:
            bad.append((a['fullName'], m, code, reason))

    # 2) 探测 top N 缺镜像项目
    if probe_top:
        print()
        print('=' * 70)
        print(f'探测 top {probe_top} 缺镜像项目（按 stars 降序）:')
        print('=' * 70)
        missing = [a for a in agents if not a.get('giteeMirror')]
        missing.sort(key=lambda a: a.get('stars', 0), reverse=True)
        missing = missing[:probe_top]

        found = []
        for a in missing:
            repo = get_repo_basename(a['fullName'])
            url = f'https://gitee.com/mirrors/{repo}'
            code, reason = check_mirror(url)
            if code == 200 and reason == 'ok':
                found.append((a['fullName'], url, a.get('stars', 0)))
                print(f'  ✅ [{code}] {a["fullName"]:48s}  {url}')

        print()
        print(f'探测完成：扫描 {len(missing)} 个，可补 {len(found)} 个')

    # 总结
    print()
    print('=' * 70)
    print(f'汇总：现有坏链 {len(bad)} 个')
    if bad:
        for fn, url, code, reason in bad:
            print(f'  ❌ {fn}  ({code}/{reason})  {url}')


if __name__ == '__main__':
    main()
