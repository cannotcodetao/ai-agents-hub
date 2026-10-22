import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Phase 42：本站部署于门户下的 /hub/ 子路径（域名根归 personal-portal 门户）
  base: '/hub/',
})
