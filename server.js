import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Fix für __dirname bei ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// React Build Ordner
app.use(express.static(path.join(__dirname, "build")));

// Alle Requests → React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});