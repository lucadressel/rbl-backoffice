const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// React Build ausliefern
app.use(express.static(path.join(__dirname, "build")));

// Fallback für React Routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server läuft auf Port " + PORT);
});