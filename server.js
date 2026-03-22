const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

let stops = [];

// API
app.post("/api/stops", (req, res) => {
  stops.push(req.body);
  res.json({ success: true });
});

app.get("/api/stops", (req, res) => {
  res.json(stops);
});

// React Build ausliefern
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server läuft auf Port", PORT);
});