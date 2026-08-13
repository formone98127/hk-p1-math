import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  const ghPages = process.env.GITHUB_PAGES === 'true'
  return {
    plugins: [react()],
    base: command === 'build' && ghPages ? '/hk-p1-math/' : '/',
  }
})
