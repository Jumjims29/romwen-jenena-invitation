import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// allow frontend (vite dev server usually runs on 5173)
app.use(cors({ origin: "*" }));
app.use(express.json());

// your Apps Script endpoint
const GSHEET_URL = process.env.GSHEET_URL;

// proxy POST
app.post("/api/rsvp", async (req, res) => {
  try {
    const response = await fetch(GSHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// proxy GET (for admin view)
app.get("/api/rsvp", async (req, res) => {
  try {
    const response = await fetch(GSHEET_URL);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
