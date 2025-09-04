import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const gsheetUrl = 'https://script.google.com/macros/s/AKfycbyFxErWlC93tWUt6bMS68GN_juEXW58jMAK-NsL1uSJxX_784xNdrpzF8_xo7U5ceMb/exec'
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
