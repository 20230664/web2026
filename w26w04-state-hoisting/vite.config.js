import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 저장소명 및 하위 폴더 경로에 맞춰 base 설정
  base: '/web2026/w26w04-state-hoisting/',
})