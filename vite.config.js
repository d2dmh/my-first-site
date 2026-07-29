import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    assetsInlineLimit: 600_000,
    rollupOptions: {
      input: resolve(projectRoot, 'app.html'),
    },
  },
  server: {
    host: true,
  },
  preview: {
    host: true,
  },
})
