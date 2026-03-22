const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Mongo Verbindung (MIT LOG!)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB verbunden"))
  .catch(err => console.error("❌ Mongo Fehler:", err));

// ==================== SCHEMAS ====================

const Stop = mongoose.model("Stop", {
  name: String,
  lat: Number,
  lng: Number
});

const RouteModel = mongoose.model("Route", {
  name: String,
  stops: [String], // 🔥 WICHTIG: Mongo IDs sind Strings!
  path: [[Number]]
});

// ==================== STOPS ====================

app.post("/api/stops", async (req, res) => {
  try {
    console.log("POST STOP:", req.body);

    const stop = new Stop(req.body);
    await stop.save();

    res.json(stop);
  } catch (err) {
    console.error("❌ STOP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/stops", async (req, res) => {
  try {
    const stops = await Stop.find();
    res.json(stops);
  } catch (err) {
    console.error(err);
    res.json([]);
  }
});

// ==================== ROUTES ====================

app.post("/api/routes", async (req, res) => {
  try {
    console.log("POST ROUTE:", req.body);

    const route = new RouteModel(req.body);
    await route.save();

    res.json(route);
  } catch (err) {
    console.error("❌ ROUTE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/routes", async (req, res) => {
  try {
    const routes = await RouteModel.find();
    res.json(routes);
  } catch (err) {
    console.error(err);
    res.json([]);
  }
});

// ==================== FRONTEND ====================

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("🚀 Server läuft auf Port", PORT));