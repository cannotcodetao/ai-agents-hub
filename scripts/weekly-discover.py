"""
每周更新搜索脚本
发现 GitHub 上新晋 1k+ stars 的 AI 工具

用法:
  python scripts/weekly-discover.py

输出:
  _tmp_weekly_candidates.json - 候选项目清单

流程:
  1. 通过 GitHub Search API 搜索多个关键词组合
  2. 过滤 stars >= 1000 的项目
  3. 排除已在 agents.json 中的项目
  4. 输出候选清单，等待人工审核后录入
"""

import json
import urllib.request
import urllib.parse
import time
import os

DATA_FILE = r"d:\AI\project\IdeaCreate\ai-agents-hub\data\agents.json"
OUTPUT_FILE = r"d:\AI\project\IdeaCreate\ai-agents-hub\_tmp_weekly_candidates.json"

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")

SEARCH_KEYWORDS = [
    # 通用 AI 工具
    "ai tool",
    "ai agent",
    "ai assistant",
    "llm agent",
    "ai framework",
    # 编程相关
    "ai coding",
    "code assistant",
    "ai developer tool",
    "devtools ai",
    # 内容创作
    "ai writing",
    "ai content",
    "ai generator",
    # 视频/图像
    "ai video",
    "ai image generator",
    "text to video",
    # 知识/文档
    "ai document",
    "rag",
    "knowledge base ai",
    # 语音/音频
    "ai voice",
    "text to speech",
    "ai audio",
    # Agent/Skills
    "claude skill",
    "cursor rules",
    "agent skill",
    # 自动化
    "ai automation",
    "ai workflow",
    "auto gpt",
    # 平台/应用
    "ai app",
    "ai platform",
    "saas ai",
]

def github_api(url):
    headers = {"Accept": "application/vnd.github+json"}
    if GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        if e.code == 403:
            print(f"  ❌ API 限额: {e}")
            raise RuntimeError("RATE_LIMIT")
        print(f"  ❌ HTTP {e.code}: {e}")
        return None
    except Exception as e:
        print(f"  ❌ 错误: {e}")
        return None

def search_repos(keyword, min_stars=1000, per_page=30):
    query = urllib.parse.quote(f"{keyword} stars:>={min_stars}")
    url = f"https://api.github.com/search/repositories?q={query}&sort=stars&order=desc&per_page={per_page}"
    data = github_api(url)
    if data and "items" in data:
        return data["items"]
    return []

def main():
    print("=" * 60)
    print("📡 每周更新 · 发现新晋 AI 工具")
    print("=" * 60)
    print(f"关键词数量: {len(SEARCH_KEYWORDS)}")
    print(f"筛选条件: stars >= 1000")
    print(f"Token: {'已配置' if GITHUB_TOKEN else '未配置（限额 60/小时）'}")
    print()

    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    existing = set(a["fullName"] for a in data["agents"])
    print(f"已收录项目: {len(existing)} 个")
    print()

    all_repos = {}
    total_found = 0

    for i, kw in enumerate(SEARCH_KEYWORDS):
        print(f"[{i+1}/{len(SEARCH_KEYWORDS)}] 搜索: {kw}")
        try:
            repos = search_repos(kw, min_stars=1000, per_page=30)
            new_count = 0
            for repo in repos:
                full_name = repo["full_name"]
                if full_name not in all_repos:
                    all_repos[full_name] = {
                        "fullName": full_name,
                        "name": repo["name"],
                        "url": repo["html_url"],
                        "description": repo.get("description") or "",
                        "stars": repo.get("stargazers_count", 0),
                        "language": repo.get("language"),
                        "topics": repo.get("topics", []),
                        "createdAt": repo.get("created_at"),
                        "updatedAt": repo.get("updated_at"),
                        "fromKeyword": kw,
                    }
                    new_count += 1
            total_found += len(repos)
            print(f"  返回 {len(repos)} 个，新增 {new_count} 个去重仓库，累计 {len(all_repos)} 个")
        except RuntimeError as e:
            if str(e) == "RATE_LIMIT":
                print("  ⚠️  API 限额用尽，停止搜索")
                break
        except Exception as e:
            print(f"  ❌ 错误: {e}")

        time.sleep(2 if not GITHUB_TOKEN else 0.2)

    print()
    print("=" * 60)
    print(f"搜索完成: 共发现 {len(all_repos)} 个去重仓库（{total_found} 次命中）")
    print()

    new_candidates = []
    for full_name, repo in all_repos.items():
        if full_name not in existing and repo["stars"] >= 1000:
            new_candidates.append(repo)

    new_candidates.sort(key=lambda x: x["stars"], reverse=True)

    print(f"新晋候选（未收录且 stars >= 1000）: {len(new_candidates)} 个")
    print()

    if new_candidates:
        print("Top 30 候选:")
        for i, r in enumerate(new_candidates[:30]):
            desc = (r["description"] or "")[:60]
            lang = r.get("language") or "N/A"
            print(f"  {i+1:2d}. {r['fullName']:<45s} ⭐{r['stars']:>7d}  [{lang}]")
            print(f"      {desc}")
            print()

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(new_candidates, f, ensure_ascii=False, indent=2)

    print(f"候选清单已保存到: {OUTPUT_FILE}")
    print()
    print("下一步:")
    print("  1. 审核候选清单，筛选值得收录的项目")
    print("  2. 为选中的项目确定分类和子分类")
    print("  3. 录入 data/agents.json")
    print("  4. 运行 npm run update:stars:weekly 重置周涨幅基准")

if __name__ == "__main__":
    main()
