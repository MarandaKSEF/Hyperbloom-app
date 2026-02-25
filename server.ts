import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("hyperbloom.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS vaccinations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    livestock_type TEXT,
    vaccine_name TEXT,
    date TEXT,
    dosage TEXT,
    notes TEXT,
    completed INTEGER DEFAULT 0
  );
  
  CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    title TEXT,
    description TEXT,
    severity TEXT,
    date TEXT
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/vaccinations", (req, res) => {
    const rows = db.prepare("SELECT * FROM vaccinations ORDER BY date ASC").all();
    res.json(rows);
  });

  app.post("/api/vaccinations", (req, res) => {
    const { livestock_type, vaccine_name, date, dosage, notes } = req.body;
    const info = db.prepare(
      "INSERT INTO vaccinations (livestock_type, vaccine_name, date, dosage, notes) VALUES (?, ?, ?, ?, ?)"
    ).run(livestock_type, vaccine_name, date, dosage, notes);
    res.json({ id: info.lastInsertRowid });
  });

  app.patch("/api/vaccinations/:id", (req, res) => {
    const { completed } = req.body;
    db.prepare("UPDATE vaccinations SET completed = ? WHERE id = ?").run(completed ? 1 : 0, req.params.id);
    res.json({ success: true });
  });

  app.get("/api/alerts", (req, res) => {
    const rows = db.prepare("SELECT * FROM alerts ORDER BY date DESC").all();
    res.json(rows);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
