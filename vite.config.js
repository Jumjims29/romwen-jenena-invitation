import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const gsheetUrl = 'https://script.google.com/macros/s/AKfycbxWSYC3nga1g4SscLQ4hnHVGv6UnT58XK7KX9QQRRUUmEfkxYETUsE9E-hpGvlXHbty/exec'
const REPO = 'romwen-jenena-invitation' // your GitHub repo name

export default defineConfig({
  plugins: [react()],
  // 👇 ensures correct paths when deployed to GitHub Pages
  base: `/${REPO}/`,
  server: {
    proxy: {
      '/rsvp': {
        target: gsheetUrl,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/rsvp/, ''),
      },
    },
  },
})
