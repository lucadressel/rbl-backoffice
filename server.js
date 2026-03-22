const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let stops = [];

// 📥 Speichern
app.post("/api/stops", (req, res) => {
  const stop = req.body;
  stops.push(stop);
  res.json({ success: true });
});

// 📤 Alle laden
app.get("/api/stops", (req, res) => {
  res.json(stops);
});

app.listen(5000, () => {
  console.log("Server läuft auf Port 5000");
});