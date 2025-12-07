import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',  // ✅ root path for custom domain
  plugins: [react()],
  build: { outDir: 'docs' }
})
