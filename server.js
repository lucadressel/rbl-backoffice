import express from "express";
import path from "path";

const app = express();

// React Build Ordner
const __dirname = new URL('.', import.meta.url).pathname;

app.use(express.static(path.join(__dirname, "build")));

// Alle Requests → React App
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});