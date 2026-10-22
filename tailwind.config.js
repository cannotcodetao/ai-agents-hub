import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 纸感底：保留原浅色基调，中性色整体偏暖以配合 Editorial Ink
        paper: '#FAFAF7',
        surface: '#FFFFFF',
        ink: '#26231D',        // 暖墨
        ink2: '#54503F',
        ink3: '#8A8474',
        line: '#E8E4DA',       // 暖灰分隔线
        line2: '#D6D1C4',
        // 强调色：朱红 → 琥珀（Editorial Ink 主色系）
        accent: '#B45309',         // 深琥珀 · 正文/链接/图标（浅底可读，4.8:1）
        'accent-bright': '#E8A838', // 技能原色 · 装饰色点/高亮/选中底色
        'accent-dark': '#8A3F06',
        'accent-bg': '#FBF3E4',
        // 状态色：正向用鼠尾草绿（替代 emerald/green）
        sage: '#4F7A55',
        'sage-bg': '#EDF3EE',
      },
      fontFamily: {
        // Editorial Ink 三件套；CDN 不可达时由系统字体栈兜底（含中文）
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'Songti SC', 'STSong', 'SimSun', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'Times New Roman', 'Songti SC', 'STSong', 'SimSun', 'serif'],
        mono: ['JetBrains Mono', 'Cascadia Code', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [
    typography,
  ],
}
