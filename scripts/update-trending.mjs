#!/usr/bin/env node
/**
 * update-trending.mjs
 * 通过 GitHub Search API 获取近期热门 AI/Agent 项目，写入 public/data/trending.json
 *
 * 模拟 GitHub Trending 效果：搜索近期创建/更新的高星仓库，筛选 AI 相关项目
 *
 * 用法:
 *   node scripts/update-trending.mjs
 *   GITHUB_TOKEN=ghp_xxx node scripts/update-trending.mjs  # 带 Token 可获取更多结果
 *
 * 在 package.json 中可添加:
 *   "scripts": { "update:trending": "node scripts/update-trending.mjs" }
 */

import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, '..', 'public', 'data');
const OUTPUT_FILE = join(DATA_DIR, 'trending.json');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';

// AI/Agent 关键词（用于搜索和过滤）
const AI_QUERIES = [
  'ai+agent',
  'llm+agent',
  'mcp+server',
  'claude+skill',
  'langchain',
  'rag+system',
  'stable-diffusion',
  'deepseek',
  'llama+model',
  'ai+copilot',
  'gpt+agent',
  'openai+tool',
  'crewai',
  'autogen',
  'browser+automation+ai',
  'text-to-image',
  'text-to-video',
  'speech+ai',
  'machine-learning+tool',
  'crawl+ai',
];

// 语言颜色映射
const LANG_COLORS = {
  'Python': '#3572A5',
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'Go': '#00ADD8',
  'Rust': '#dea584',
  'Java': '#b07219',
  'C++': '#f34b7d',
  'C': '#555555',
  'Ruby': '#701516',
  'Swift': '#F05138',
  'Kotlin': '#A97BFF',
  'Dart': '#00B4AB',
  'Shell': '#89e051',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
  'Jupyter Notebook': '#DA5B0B',
  'Vue': '#41b883',
  'Svelte': '#ff3e00',
  'Lua': '#000080',
  'R': '#198CE7',
  'Scala': '#c22d40',
  'Zig': '#ec915c',
  'Elixir': '#6e4a7e',
  'Haskell': '#5e5086',
  'Clojure': '#db5855',
  'MDX': '#fcb32c',
  'SCSS': '#c6538c',
};

function getLangColor(lang) {
  return LANG_COLORS[lang] || '#6e7681';
}

async function searchRepos(query, page = 1) {
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=30&page=${page}`;
  console.log(`[trending] Searching: ${query}`);

  const headers = {
    'User-Agent': 'ai-agents-hub/1.0',
    Accept: 'application/vnd.github+json',
  };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }

  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.warn(`[trending] Search failed for "${query}": ${res.status}`);
    return [];
  }

  const data = await res.json();
  return (data.items || []).map((item) => ({
    fullName: item.full_name,
    name: item.name,
    url: item.html_url,
    description: item.description || '',
    language: item.language || '',
    languageColor: getLangColor(item.language),
    stars: item.stargazers_count || 0,
    starsToday: 0, // 搜索 API 不提供今日涨幅，后续可用其他方式估算
    topics: item.topics || [],
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }));
}

/**
 * 计算近似的今日 stars 涨幅
 * 通过检查仓库的创建时间和 stars 数来估算
 */
async function enrichStarsToday(repos) {
  if (!GITHUB_TOKEN) return repos;

  console.log(`[trending] Enriching stars for ${repos.length} repos...`);
  for (let i = 0; i < Math.min(repos.length, 10); i++) {
    const repo = repos[i];
    try {
      const res = await fetch(`https://api.github.com/repos/${repo.fullName}`, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'ai-agents-hub',
        },
      });
      if (res.ok) {
        const data = await res.json();
        // 更新为准确的 stars
        repo.stars = data.stargazers_count || repo.stars;
        repo.description = data.description || repo.description;
        repo.language = data.language || repo.language;
        repo.languageColor = getLangColor(data.language);
        repo.topics = data.topics || repo.topics;
      } else if (res.status === 403) {
        console.warn(`[trending] Rate limited, stopping enrichment`);
        break;
      }
    } catch (err) {
      console.warn(`[trending] Failed to enrich ${repo.fullName}: ${err.message}`);
    }
  }
  return repos;
}

/**
 * 筛选 AI 相关项目（基于 name + description + topics）
 */
function filterAI(repos) {
  const AI_KEYWORDS = [
    'ai', 'agent', 'llm', 'gpt', 'claude', 'skill', 'mcp',
    'rag', 'langchain', 'chatbot', 'copilot', 'diffusion',
    'whisper', 'stable-diffusion', 'deepseek', 'llama', 'openai',
    'anthropic', 'machine-learning', 'deep-learning', 'nlp',
    'transformer', 'embedding', 'vector', 'fine-tune',
    'prompt', 'chain', 'autogen', 'crewai', 'workflow',
    'generative', 'neural', 'inference', 'comfyui', 'langflow',
    'flowise', 'dify', 'n8n', 'cursor', 'codex',
    'browser-use', 'playwright', 'crawl', 'scraper',
    'model-context-protocol', 'modelcontextprotocol',
    'text-to-image', 'text-to-video', 'image-generation',
    'speech', 'voice', 'tts', 'stt', 'audio',
    'research', 'academic', 'scientist', 'paper',
    'humanize', 'detector', 'aigc', 'tool-use',
    'function-calling', 'reasoning', 'chatgpt',
    'gemini', 'qwen', 'mistral', 'mixtral',
  ];

  const seen = new Set();
  const filtered = repos.filter((repo) => {
    if (seen.has(repo.fullName)) return false;
    const text = [
      repo.fullName,
      repo.description,
      repo.language || '',
      ...(repo.topics || []),
    ].join(' ').toLowerCase();
    const isAI = AI_KEYWORDS.some((kw) => text.includes(kw));
    if (isAI) seen.add(repo.fullName);
    return isAI;
  });

  console.log(`[trending] AI-filtered: ${filtered.length}/${repos.length}`);
  return filtered;
}

async function main() {
  try {
    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR, { recursive: true });
    }

    const allRepos = [];
    const seen = new Set();

    // 搜索最近 7 天创建的仓库
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const dateStr = sevenDaysAgo.toISOString().split('T')[0]; // YYYY-MM-DD

    // 策略1: 搜索近期创建的高星 AI 仓库
    console.log(`[trending] Searching repos created since ${dateStr}...`);
    const recentRepos = await searchRepos(`stars:>50 created:>${dateStr}`, 1);
    for (const r of recentRepos) {
      if (!seen.has(r.fullName)) {
        seen.add(r.fullName);
        allRepos.push(r);
      }
    }

    // 策略2: 按 AI 关键词搜索近期更新的仓库
    for (const query of AI_QUERIES.slice(0, 5)) {
      const repos = await searchRepos(`${query} pushed:>${dateStr}`, 1);
      for (const r of repos) {
        if (!seen.has(r.fullName)) {
          seen.add(r.fullName);
          allRepos.push(r);
        }
      }
      // 避免 API 限流
      await new Promise((r) => setTimeout(r, 500));
    }

    console.log(`[trending] Total unique repos: ${allRepos.length}`);

    // 按 stars 排序
    allRepos.sort((a, b) => b.stars - a.stars);

    // 筛选 AI 相关
    const aiRepos = filterAI(allRepos);

    // 取前 25 个
    const topRepos = aiRepos.slice(0, 25);

    // 如果有 Token，丰富前 10 个的 stars 数据
    const enriched = await enrichStarsToday(topRepos);

    const result = {
      updatedAt: new Date().toISOString(),
      source: 'github-search-api',
      strategy: 'recently-created-updated-high-star-ai-repos',
      total: enriched.length,
      items: enriched.map((r, i) => ({
        rank: i + 1,
        name: r.name,
        fullName: r.fullName,
        url: r.url,
        description: r.description,
        language: r.language,
        languageColor: r.languageColor,
        stars: r.stars,
        starsToday: r.starsToday,
      })),
    };

    writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`[trending] Written ${enriched.length} items to ${OUTPUT_FILE}`);
    console.log('[trending] Done!');
  } catch (err) {
    console.error('[trending] Error:', err.message);
    process.exit(1);
  }
}

main();