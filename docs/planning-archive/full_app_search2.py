import urllib.request
import urllib.parse
import json
import time
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

# 更精准的关键词，聚焦"完整程序+调用API"
keywords = [
    "self-hosted chatbot ui llm",
    "open source ai chat web app",
    "llm web interface docker",
    "ai writing assistant open source self-hosted",
    "open source llm application desktop",
    "rag chatbot ui open source",
    "ai agent ui web open source",
    "open source llm chat application",
    "ai knowledge base web ui open source",
    "self-hosted llm assistant",
    "open source ai platform web",
    "llm app open source web",
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'application/vnd.github.v3+json',
}

# 已存在的项目
existing = set()
with open('data/agents.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    for a in data['agents']:
        existing.add(a['fullName'])

# 已搜索过的
try:
    with open('.planning/full_app_search.json', 'r', encoding='utf-8') as f:
        old = json.load(f)
        for r in old:
            existing.add(r['fullName'])
except:
    pass

all_repos = {}

for kw in keywords:
    print(f"\n搜索: {kw}")
    encoded = urllib.parse.quote(kw)
    url = f"https://api.github.com/search/repositories?q={encoded}&sort=stars&order=desc&per_page=8"
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            new_count = 0
            for item in data.get('items', []):
                full_name = item['full_name']
                if full_name not in existing and full_name not in all_repos:
                    all_repos[full_name] = {
                        'name': item['name'],
                        'fullName': full_name,
                        'url': item['html_url'],
                        'description': item.get('description', '') or '',
                        'stars': item['stargazers_count'],
                        'language': item.get('language', '') or '',
                        'topics': item.get('topics', []) or [],
                    }
                    new_count += 1
            print(f"  新增 {new_count} 个，累计 {len(all_repos)} 个")
    except Exception as e:
        print(f"  错误: {e}")
        if 'rate limit' in str(e).lower() or '403' in str(e):
            print("  触发限流，等待 30s...")
            time.sleep(30)
            continue
    
    time.sleep(3)

# 按 stars 排序
sorted_repos = sorted(all_repos.values(), key=lambda x: x['stars'], reverse=True)

print(f"\n\n=== 本次新增 {len(sorted_repos)} 个项目 ===")
print("\nStars ≥ 1000 的项目:")
count = 0
for repo in sorted_repos:
    if repo['stars'] >= 1000:
        count += 1
        desc = (repo['description'] or '')[:80].replace('\n', ' ')
        print(f"  {count}. {repo['fullName']} - {repo['stars']:,}⭐ - {desc}")

# 追加保存
try:
    with open('.planning/full_app_search.json', 'r', encoding='utf-8') as f:
        old = json.load(f)
    old_names = {r['fullName'] for r in old}
    for r in sorted_repos:
        if r['fullName'] not in old_names:
            old.append(r)
    old = sorted(old, key=lambda x: x['stars'], reverse=True)
    with open('.planning/full_app_search.json', 'w', encoding='utf-8') as f:
        json.dump(old, f, ensure_ascii=False, indent=2)
    print(f"\n已追加保存，总计 {len(old)} 个")
except:
    with open('.planning/full_app_search2.json', 'w', encoding='utf-8') as f:
        json.dump(sorted_repos, f, ensure_ascii=False, indent=2)
    print(f"\n已保存到 .planning/full_app_search2.json")
