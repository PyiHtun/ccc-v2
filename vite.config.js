import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { platform } from 'node:os'
import { services } from './src/seo/services.js'

const servicePaths = new Set(services.map(({ slug }) => `/services/${slug}`))
const servicePageRoutes = {
  name: 'service-page-routes',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const url = new URL(req.url || '/', 'http://localhost')
      const path = url.pathname.replace(/\/$/, '')
      // Public directory URLs otherwise fall through to Vite's homepage fallback.
      if (servicePaths.has(path)) req.url = `${path}/index.html${url.search}`
      next()
    })
  },
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',  // ✅ root path for custom domain
  // Windows dev and WSL checks must not overwrite each other's optimized modules.
  cacheDir: `node_modules/.vite-${platform()}`,
  plugins: [react(), servicePageRoutes],
  build: { outDir: 'docs' }
})
