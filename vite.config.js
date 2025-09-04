import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Google Apps Script endpoint
const gsheetUrl = 'https://script.google.com/macros/s/AKfycbxC9d39KiZUMvx2aVC8bc2r1T1eSlb8WvoTCimdTzDtOPg8V-jtAZ8IjMJCjJ6g4WhB/exec'

// ✅ Your GitHub repo name (must match exactly)
const REPO = 'romwen-jenena-invitation'

export default defineConfig({
  plugins: [react()],
  // ✅ This ensures assets load correctly on GitHub Pages
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
