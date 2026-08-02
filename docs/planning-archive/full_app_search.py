import urllib.request
import urllib.parse
import json
import time
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

keywords = [
    "llm chatbot web ui open source",
    "ai assistant desktop app open source",
    "rag web application open source",
    "open source gpt ui",
    "self-hosted ai chat",
    "llm frontend open source",
    "ai writing tool open source",
    "chatgpt alternative open source self-hosted",
    "llm playground open source",
    "ai agent platform web ui",
    "open source ai workspace",
    "self-hosted llm application",
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'application/vnd.github.v3+json',
}

all_repos = {}

for kw in keywords:
    print(f"\n搜索: {kw}")
    encoded = urllib.parse.quote(kw)
    url = f"https://api.github.com/search/repositories?q={encoded}&sort=stars&order=desc&per_page=10"
    
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            for item in data.get('items', []):
                full_name = item['full_name']
                if full_name not in all_repos:
                    all_repos[full_name] = {
                        'name': item['name'],
                        'fullName': full_name,
                        'url': item['html_url'],
                        'description': item.get('description', '') or '',
                        'stars': item['stargazers_count'],
                        'language': item.get('language', '') or '',
                        'topics': item.get('topics', []) or [],
                    }
        print(f"  找到 {len(data.get('items', []))} 个，累计 {len(all_repos)} 个去重")
    except Exception as e:
        print(f"  错误: {e}")
    
    time.sleep(2)

# 按 stars 排序
sorted_repos = sorted(all_repos.values(), key=lambda x: x['stars'], reverse=True)

print(f"\n\n=== 总计 {len(sorted_repos)} 个去重项目 ===")
print("\nStars ≥ 1000 的项目:")
count = 0
for repo in sorted_repos:
    if repo['stars'] >= 1000:
        count += 1
        print(f"  {count}. {repo['fullName']} - {repo['stars']:,}⭐ - {repo['description'][:60]}")

# 保存
with open('.planning/full_app_search.json', 'w', encoding='utf-8') as f:
    json.dump(sorted_repos, f, ensure_ascii=False, indent=2)

print(f"\n已保存到 .planning/full_app_search.json")
