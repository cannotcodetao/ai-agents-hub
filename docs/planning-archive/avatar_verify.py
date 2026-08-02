"""Verify stars for virtual avatar candidates and check existence."""
import json
import urllib.request

UA = "agent-reach/1.0"

EXISTING = {
    "Rudrabha/Wav2Lip",  # already in video
}

CANDIDATES = [
    "hacksider/Deep-Live-Cam",
    "deepfakes/faceswap",
    "iperov/DeepFaceLive",
    "facefusion/facefusion",
    "iperov/DeepFaceLab",
    "duixcom/Duix-Avatar",
    "Open-LLM-VTuber/Open-LLM-VTuber",
    "stevenjoezhang/live2d-widget",
    "lipku/LiveTalking",
    "duixcom/Duix-Mobile",
    "OpenTalker/video-retalking",
    "bytedance/LatentSync",
    "yeemachine/kalidokit",
    "neuralchen/SimSwap",
    "sensity-ai/dot",
    "premieroctet/photoshot",
    "yoyo-nb/Thin-Plate-Spline-Motion-Model",
    "shinyflvre/Mate-Engine",
    "Kedreamix/Linly-Talker",
    "vrm-c/UniVRM",
    "xianfei/SysMocap",
    "yuyuyzl/EasyVtuber",
    "idootop/MagicMirror",
    "anliyuan/Ultralight-Digital-Human",
    "DanielSWolf/rhubarb-lip-sync",
    "wan-h/awesome-digital-human-live2d",
    "tencent-ailab/V-Express",
    "datascale-ai/opentalking",
    "pkhungurn/talking-head-anime-demo",
    "zenghongtu/PPet",
    "pixiv/three-vrm",
    "Zz-ww/SadTalker-Video-Lip-Sync",
    "visomaster/VisoMaster",
    "harlanhong/awesome-talking-head-generation",
    "ali-vilab/dreamtalk",
    "ai-forever/ghost",
    "xiazeyu/live2d-widget.js",
    "met4citizen/TalkingHead",
    "elevenyellow/handcrafted-persona-engine",
    "wladradchenko/wunjo.wladradchenko.ru",
    "moeru-ai/airi",
    "Mai-with-u/MaiBot",
    "heshengtao/super-agent-party",
    "Mayandev/notion-avatar",
    "tencent-ailab/EMA-VSR",
]


def fetch_repo(full_name):
    url = f"https://api.github.com/repos/{full_name}"
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/vnd.github+json"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            data = json.loads(r.read().decode("utf-8"))
        return {
            "full_name": data.get("full_name"),
            "stars": data.get("stargazers_count"),
            "desc": data.get("description"),
            "lang": data.get("language"),
            "license": (data.get("license") or {}).get("spdx_id") if data.get("license") else None,
        }
    except Exception as e:
        return {"full_name": full_name, "error": str(e)}


def main():
    results = []
    for r in CANDIDATES:
        if r in EXISTING:
            print(f"SKIP (existing): {r}")
            continue
        info = fetch_repo(r)
        results.append(info)
        if "error" in info:
            print(f"ERROR | {r} | {info['error']}")
        else:
            flag = "✅" if info["stars"] >= 1000 else "❌"
            print(f"{flag} {info['stars']:>7} | {info['full_name']:<50} | {info['lang'] or '-':<12} | {(info['desc'] or '')[:70]}")
    with open(r"d:\AI\project\IdeaCreate\ai-agents-hub\.planning\avatar_verify.json", "w", encoding="utf-8") as f:
        json.dump([r for r in results if "stars" in r and r["stars"] >= 1000], f, ensure_ascii=False, indent=2)
    print(f"\n✅ stars>=1000 saved to avatar_verify.json")


if __name__ == "__main__":
    main()
