const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

let stops = [];
let routes = [];

// ==================== STOPS ====================

// CREATE
app.post("/api/stops", (req, res) => {
  const stop = { id: Date.now(), ...req.body };
  stops.push(stop);
  res.json(stop);
});

// READ
app.get("/api/stops", (req, res) => {
  res.json(stops);
});

// UPDATE
app.put("/api/stops/:id", (req, res) => {
  const id = parseInt(req.params.id);
  stops = stops.map(s => s.id === id ? { ...s, ...req.body } : s);
  res.json({ success: true });
});

// DELETE
app.delete("/api/stops/:id", (req, res) => {
  const id = parseInt(req.params.id);
  stops = stops.filter(s => s.id !== id);
  res.json({ success: true });
});

// ==================== ROUTES ====================

// CREATE ROUTE
app.post("/api/routes", (req, res) => {
  const route = {
    id: Date.now(),
    name: req.body.name,
    stops: req.body.stops
  };
  routes.push(route);
  res.json(route);
});

// READ ROUTES
app.get("/api/routes", (req, res) => {
  res.json(routes);
});

// ==================== FRONTEND ====================

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server läuft auf Port", PORT));