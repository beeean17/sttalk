import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { siteUrl } from './src/data/llm.ts'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  experimental: {
    // 카카오톡 등 링크 미리보기는 og:image를 절대 주소로만 읽는다.
    // 원본(assets/images/share/)은 다른 이미지처럼 번들에 넣고, 그 주소만 배포 주소로 바꿔 적는다.
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'html' && filename.includes('sttalk-link-preview')) {
        return `${siteUrl}${filename}`
      }
      return { relative: true }
    },
  },
})
