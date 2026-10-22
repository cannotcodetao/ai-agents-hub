#!/usr/bin/env bash
# 发布 dist 构建产物到 release 分支（服务器端 git fetch + reset --hard origin/release）
# 用法：先 npm run build，再 bash release.sh
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -f dist/index.html ]; then echo "❌ dist/index.html 不存在，先执行 npm run build"; exit 1; fi
SCRIPT_DIR=$(pwd)
REMOTE_URL=$(git remote get-url origin)
case "$REMOTE_URL" in
  http*|git@*|ssh*|file:*|[A-Za-z]:*|/*) : ;;
  *) REMOTE_URL="$SCRIPT_DIR/$REMOTE_URL" ;;
esac
mkdir -p _deploy && cd _deploy
if [ ! -d .git ]; then
  git init -b release
fi
git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE_URL"
# 镜像 dist 内容到 _deploy 工作区（纯 bash 内建，不依赖 find/ls）
rm -rf _stage
mkdir _stage
cp -r ../dist/. _stage/
shopt -s dotglob nullglob
for f in *; do
  if [ "$f" != ".git" ] && [ "$f" != "_stage" ]; then rm -rf "$f"; fi
done
cp -r _stage/. ./
rm -rf _stage
shopt -u dotglob nullglob
git add -A
if git diff --cached --quiet 2>/dev/null && [ -n "$(git rev-parse HEAD 2>/dev/null || true)" ]; then
  echo "无变化，跳过发布"
  exit 0
fi
git -c user.name="deploy" -c user.email="deploy@local" commit -m "release: hub $(date +%Y-%m-%d\ %H:%M)"
git push origin release --force
echo "✅ hub release 分支已更新：$REMOTE_URL"
