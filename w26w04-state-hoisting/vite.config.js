import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 하위 폴더명이 아닌 저장소 이름만 base로 설정
  base: '/web2026/',
})