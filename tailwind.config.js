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
        paper: '#FAFAF7',
        ink: '#1A1A1A',
        ink2: '#4A4A4A',
        ink3: '#8A8A8A',
        line: '#E8E6E1',
        line2: '#D4D2CC',
        accent: '#C8462C',
        accentDark: '#A53A24',
        accentBg: '#FBEDE8',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['ui-monospace', 'SF Mono', 'Consolas', 'monospace'],
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
