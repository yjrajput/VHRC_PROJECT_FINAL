import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://vhrc-project-final.onrender.com/',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'https://vhrc-project-final.onrender.com/',
        changeOrigin: true,
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group React core libraries together
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            // Group icons library separately
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            // Other dependencies
            return 'vendor-libs';
          }
        }
      }
    },
    chunkSizeWarningLimit: 800,
    sourcemap: false // reduce build files size asd
  }
})
