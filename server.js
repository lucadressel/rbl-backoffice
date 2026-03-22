const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(express.json());

// ==================== MONGODB ====================
if (!process.env.MONGO_URI) {
  console.log("❌ MONGO_URI fehlt!");
} else {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB verbunden"))
    .catch(err => console.error("❌ MongoDB Fehler:", err));
}

// ==================== SCHEMAS ====================

const StopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
});

const Stop = mongoose.model("Stop", StopSchema);

const RouteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stop" }],
  path: [[Number]]
});

const RouteModel = mongoose.model("Route", RouteSchema);

// ==================== STOPS ====================

// CREATE
app.post("/api/stops", async (req, res) => {
  try {
    console.log("📩 POST /api/stops:", req.body);

    const { name, lat, lng } = req.body;

    if (!name || lat === undefined || lng === undefined) {
      return res.status(400).json({ error: "Fehlende Daten" });
    }

    const stop = new Stop({ name, lat, lng });
    await stop.save();

    console.log("✅ Stop gespeichert:", stop);

    res.json(stop);

  } catch (err) {
    console.error("❌ STOP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// READ
app.get("/api/stops", async (req, res) => {
  try {
    const stops = await Stop.find();
    res.json(stops);
  } catch (err) {
    console.error("❌ GET STOPS ERROR:", err);
    res.json([]);
  }
});

// UPDATE
app.put("/api/stops/:id", async (req, res) => {
  try {
    await Stop.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ UPDATE STOP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete("/api/stops/:id", async (req, res) => {
  try {
    await Stop.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ DELETE STOP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==================== ROUTES ====================

// CREATE
app.post("/api/routes", async (req, res) => {
  try {
    console.log("📩 POST /api/routes:", req.body);

    const route = new RouteModel(req.body);
    await route.save();

    console.log("✅ Route gespeichert");

    res.json(route);

  } catch (err) {
    console.error("❌ ROUTE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// READ
app.get("/api/routes", async (req, res) => {
  try {
    const routes = await RouteModel.find().populate("stops");
    res.json(routes);
  } catch (err) {
    console.error("❌ GET ROUTES ERROR:", err);
    res.json([]);
  }
});

// UPDATE
app.put("/api/routes/:id", async (req, res) => {
  try {
    await RouteModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ UPDATE ROUTE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete("/api/routes/:id", async (req, res) => {
  try {
    await RouteModel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ DELETE ROUTE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ==================== FRONTEND ====================

// React Build ausliefern
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// ==================== SERVER ====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});