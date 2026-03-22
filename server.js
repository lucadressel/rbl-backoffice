const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 MongoDB Verbindung
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB verbunden"))
.catch(err => console.error(err));

// ==================== SCHEMAS ====================

// Haltestellen
const StopSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number
});

const Stop = mongoose.model("Stop", StopSchema);

// Routen
const RouteSchema = new mongoose.Schema({
  name: String,
  stops: [Number],
  path: [[Number]]
});

const RouteModel = mongoose.model("Route", RouteSchema);

// ==================== STOPS ====================

app.post("/api/stops", async (req, res) => {
  const stop = new Stop(req.body);
  await stop.save();
  res.json(stop);
});

app.get("/api/stops", async (req, res) => {
  const stops = await Stop.find();
  res.json(stops);
});

app.put("/api/stops/:id", async (req, res) => {
  await Stop.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true });
});

app.delete("/api/stops/:id", async (req, res) => {
  await Stop.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// ==================== ROUTES ====================

app.post("/api/routes", async (req, res) => {
  const route = new RouteModel(req.body);
  await route.save();
  res.json(route);
});

app.get("/api/routes", async (req, res) => {
  const routes = await RouteModel.find();
  res.json(routes);
});

app.put("/api/routes/:id", async (req, res) => {
  await RouteModel.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true });
});

app.delete("/api/routes/:id", async (req, res) => {
  await RouteModel.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// ==================== FRONTEND ====================

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server läuft auf Port", PORT));