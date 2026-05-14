import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Raise warning threshold slightly — our vendor chunk approach keeps sizes reasonable
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunk splitting: pull heavy, stable dependencies into separate
        // chunks that can be cached independently by the browser. After the first
        // visit, subsequent page loads only download the app chunk (changes often),
        // not the vendor chunks (changes rarely).
        manualChunks: {
          // React core — changes only on major upgrades
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // HTTP client — stable, rarely changes
          'vendor-axios': ['axios'],
          // HTML sanitization — separate as it's only used on content pages
          'vendor-html': ['dompurify', 'html-react-parser'],
        },
      },
    },
  },
})
