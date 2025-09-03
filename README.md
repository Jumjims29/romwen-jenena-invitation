# Wedding E‑Card Starter (React + Vite + Google Sheets)

A simple, elegant wedding microsite inspired by Luxe Events PH pages.
Includes:
- Guest view (hero, countdown, entourage, gallery, details, attire, notes)
- RSVP form saving to Google Sheets
- Admin dashboard to view/filter RSVPs

## 1) Install
```bash
npm install
cp .env.example .env
# paste your Apps Script URLs:
# VITE_GSHEET_ENDPOINT=...
# VITE_GSHEET_READ_ENDPOINT=...
npm run dev
```

## 2) Google Sheets Setup
1. Create a Sheet.
2. Extensions → Apps Script → paste `scripts/AppsScript.gs`.
3. Deploy → New deployment → Web App → Execute as **Me**; Who has access **Anyone**.
4. Copy **Web app URL** into `.env`:
   - `VITE_GSHEET_ENDPOINT` (POST)
   - `VITE_GSHEET_READ_ENDPOINT` (GET)

## 3) Customize
- Replace `public/music.mp3` with your song.
- Edit text/images in `src/App.jsx` (gallery uses placeholders).
- Change names/date/venue, or add sections.

## 4) Build & Deploy
- **Netlify/Vercel**: Import repo → add `.env` vars → build.
- **GitHub Pages**: `npm run build` → serve `dist` folder (requires static hosting).

## 5) Troubleshooting
- If you see *Missing VITE_GSHEET_ENDPOINT*, set .env and restart dev server.
- Apps Script returns 403? Check *Who has access* is **Anyone with the link**.
- JSON/Comments error? Never put comments inside `package.json`.

Enjoy and best wishes! 💍
