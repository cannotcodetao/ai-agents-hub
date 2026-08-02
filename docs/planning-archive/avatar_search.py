"""Search GitHub for virtual avatar / VTuber / AI digital human related repos."""
import json
import sys
import urllib.request
import urllib.parse

UA = "agent-reach/1.0"

QUERIES = [
    "vtuber",
    "live2d",
    "vrm",
    "digital human",
    "ai avatar",
    "virtual youtuber",
    "talking head",
    "face swap",
    "deepfake",
    "lip sync",
    "sad talker",
    "wav2lip",
    "vseeface",
    "3d avatar",
]


def search(query, per_page=8):
    q = urllib.parse.quote(query)
    url = f"https://api.github.com/search/repositories?q={q}&sort=stars&order=desc&per_page={per_page}"
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/vnd.github+json"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            data = json.loads(r.read().decode("utf-8"))
        return data.get("items", [])
    except Exception as e:
        print(f"ERROR for '{query}': {e}", file=sys.stderr)
        return []


def main():
    seen = set()
    all_items = []
    for q in QUERIES:
        items = search(q, per_page=8)
        for it in items:
            fn = it.get("full_name", "")
            if fn in seen:
                continue
            seen.add(fn)
            all_items.append(it)
    all_items.sort(key=lambda x: x.get("stargazers_count", 0), reverse=True)
    print(f"=== Found {len(all_items)} unique repos ===")
    for it in all_items:
        stars = it.get("stargazers_count", 0)
        name = it.get("full_name", "")
        desc = (it.get("description") or "")[:100]
        lang = it.get("language") or "-"
        print(f"{stars:>7} | {name:<50} | {lang:<12} | {desc}")


if __name__ == "__main__":
    main()
