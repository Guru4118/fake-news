import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],

  server: {
    proxy: {
      // Proxy /api/* requests to your Express backend
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      // (optional) if you’re serving uploaded PDFs under /uploads
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    }
  }
})
