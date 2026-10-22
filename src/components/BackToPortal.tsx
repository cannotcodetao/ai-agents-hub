import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const KEY = 'portal-entry';

/**
 * 门户来路判定：仅当从门户首页进入时才显示「返回首页」。
 *
 * 判定顺序：
 *   ① 本标签页已记录（sessionStorage，兼容子站内刷新 / SPA 内跳转）
 *   ② 同源 referrer 且路径为门户根（/ 或 /index.html）
 *
 * 非同源 referrer、file:// 打开、直接在地址栏输入 /hub/ → 一律不显示。
 * 注意 sessionStorage 按标签页隔离：新标签页直接打开子站不会误显示。
 */
function detectPortalEntry(): boolean {
  try {
    if (sessionStorage.getItem(KEY) === '1') return true;
  } catch {
    /* sessionStorage 不可用时降级为纯 referrer 判定 */
  }

  let ref = '';
  try {
    ref = document.referrer || '';
  } catch {
    return false;
  }
  if (!ref) return false;

  try {
    const u = new URL(ref);
    // file:// 下 origin 为字符串 'null'，必须排除，否则会误判为同源
    if (!u.origin || u.origin === 'null' || u.origin !== window.location.origin) return false;
    if (/^\/(index\.html)?$/.test(u.pathname)) {
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {
        /* ignore */
      }
      return true;
    }
  } catch {
    /* referrer 非法时视为非门户进入 */
  }
  return false;
}

export default function BackToPortal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(detectPortalEntry());
  }, []);

  if (!show) return null;

  return (
    <a
      href="/"
      className="group flex items-center gap-2 border-b border-line bg-accent-bg/40 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink3 transition-colors hover:bg-accent-bg hover:text-accent"
    >
      <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
      <span>返回首页</span>
    </a>
  );
}
