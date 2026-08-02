#!/usr/bin/env node
/**
 * update-stars.mjs
 * 通过 GitHub API 定期更新 data/agents.json 中所有项目的 stars 数量
 * 支持每周快照和周涨幅（weekGrowth）计算
 *
 * 用法:
 *   node scripts/update-stars.mjs              # 直接运行（受 API 限额限制，约 60 次/小时）
 *   GITHUB_TOKEN=ghp_xxx node scripts/update-stars.mjs  # 带 Token 运行（5000 次/小时）
 *   node scripts/update-stars.mjs --weekly     # 每周快照模式：将当前 stars 作为 prevStars 基准
 *
 * 在 package.json 中可添加:
 *   "scripts": {
 *     "update:stars": "node scripts/update-stars.mjs",
 *     "update:stars:weekly": "node scripts/update-stars.mjs --weekly"
 *   }
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = join(__dirname, '..', 'public', 'data', 'agents.json');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const headers = GITHUB_TOKEN
  ? { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: 'application/vnd.github+json' }
  : { Accept: 'application/vnd.github+json' };

const WEEKLY_MODE = process.argv.includes('--weekly');

function log(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`);
}

async function fetchStars(fullName) {
  const url = `https://api.github.com/repos/${fullName}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    if (res.status === 404) {
      log(`  ⚠️  仓库不存在: ${fullName}`);
      return null;
    }
    if (res.status === 403) {
      const remaining = res.headers.get('x-ratelimit-remaining');
      const reset = res.headers.get('x-ratelimit-reset');
      log(`  ❌ 触发 API 限额 (剩余 ${remaining}, 重置时间 ${reset ? new Date(reset * 1000).toISOString() : 'N/A'})`);
      throw new Error('RATE_LIMIT_EXCEEDED');
    }
    log(`  ❌ 请求失败 ${res.status}: ${fullName}`);
    return null;
  }
  const data = await res.json();
  return data.stargazers_count ?? 0;
}

async function main() {
  log('开始更新 stars 数据...');
  log(GITHUB_TOKEN ? '使用 GITHUB_TOKEN 鉴权' : '未使用 Token（匿名访问，限额 60/小时）');
  log(WEEKLY_MODE ? '📅 每周快照模式：更新后将重置周涨幅基准' : '普通更新模式：计算周涨幅');

  const raw = readFileSync(DATA_FILE, 'utf-8');
  const data = JSON.parse(raw);
  const { agents } = data;

  log(`共 ${agents.length} 个项目待更新`);

  let updated = 0;
  let failed = 0;
  let unchanged = 0;
  let newEntry = 0;

  for (let i = 0; i < agents.length; i++) {
    const agent = agents[i];
    process.stdout.write(`[${i + 1}/${agents.length}] ${agent.fullName} ... `);
    try {
      const stars = await fetchStars(agent.fullName);
      if (stars === null) {
        failed++;
        console.log('跳过');
        continue;
      }

      const oldStars = agent.stars;

      if (agent.prevStars === undefined || agent.prevStars === null) {
        agent.prevStars = stars;
        agent.weekGrowth = 0;
        newEntry++;
      }

      if (oldStars !== stars) {
        agent.stars = stars;
        agent.weekGrowth = stars - agent.prevStars;
        const diff = stars - oldStars;
        const weekDiff = agent.weekGrowth;
        console.log(
          `${oldStars} → ${stars} (本次${diff >= 0 ? '+' : ''}${diff}, 周${weekDiff >= 0 ? '+' : ''}${weekDiff})`
        );
        updated++;
      } else {
        agent.weekGrowth = stars - agent.prevStars;
        const weekDiff = agent.weekGrowth;
        console.log(`${stars} (无变化, 周${weekDiff >= 0 ? '+' : ''}${weekDiff})`);
        unchanged++;
      }
    } catch (err) {
      if (err.message === 'RATE_LIMIT_EXCEEDED') {
        console.log('\n⚠️  API 限额已用尽，已保存当前进度，请稍后重试');
        break;
      }
      console.log(`错误: ${err.message}`);
      failed++;
    }
    // 礼貌性延迟，避免触发二级限额
    if (i < agents.length - 1) {
      await new Promise((r) => setTimeout(r, GITHUB_TOKEN ? 100 : 2000));
    }
  }

  // 每周快照模式：将当前 stars 设为新的基准
  if (WEEKLY_MODE) {
    log('\n📅 每周快照：将当前 stars 设为下周的基准...');
    for (const agent of agents) {
      if (agent.stars !== undefined && agent.stars !== null) {
        agent.prevStars = agent.stars;
        agent.weekGrowth = 0;
      }
    }
    log('✅ 快照完成，下周起将重新计算周涨幅');
  }

  // 周涨幅 Top 10
  const topGrowth = [...agents]
    .filter((a) => a.weekGrowth && a.weekGrowth > 0)
    .sort((a, b) => b.weekGrowth - a.weekGrowth)
    .slice(0, 10);

  if (topGrowth.length > 0) {
    log('\n📈 周涨幅 Top 10:');
    topGrowth.forEach((a, i) => {
      log(`  ${i + 1}. ${a.fullName} +${a.weekGrowth} stars (当前 ${a.stars})`);
    });
  }

  // 写回文件
  data.updatedAt = new Date().toISOString();
  if (WEEKLY_MODE) {
    data.lastWeeklySnapshot = new Date().toISOString();
  }
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + '\n', 'utf-8');

  log('='.repeat(50));
  log(`更新完成: ${updated} 个更新, ${unchanged} 个无变化, ${failed} 个失败, ${newEntry} 个新基准`);
  log(`数据已写入: ${DATA_FILE}`);
}

main().catch((err) => {
  console.error('致命错误:', err);
  process.exit(1);
});
