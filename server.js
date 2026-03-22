// server.js

import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("✅ Server läuft ohne MongoDB");
});

// Optional: Health Check für Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Server starten
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf Port ${PORT}`);
});