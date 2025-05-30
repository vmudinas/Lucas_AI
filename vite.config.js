import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: 'public',
  base: process.env.NODE_ENV === 'production' ? '/Lucas_AI/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
})
