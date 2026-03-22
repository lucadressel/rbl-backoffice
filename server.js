const fs = require("fs");

const ROUTES_FILE = "./routes.json";

// Laden beim Start
let routes = [];
if (fs.existsSync(ROUTES_FILE)) {
  routes = JSON.parse(fs.readFileSync(ROUTES_FILE));
}

// Speichern Funktion
const saveRoutesToFile = () => {
  fs.writeFileSync(ROUTES_FILE, JSON.stringify(routes, null, 2));
};

// CREATE
app.post("/api/routes", (req, res) => {
  const route = {
    id: Date.now(),
    name: req.body.name,
    stops: req.body.stops,
    path: req.body.path
  };

  routes.push(route);
  saveRoutesToFile(); // 🔥 speichern

  res.json(route);
});

// READ
app.get("/api/routes", (req, res) => {
  res.json(routes);
});

// UPDATE
app.put("/api/routes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  routes = routes.map(r =>
    r.id === id ? { ...r, ...req.body } : r
  );

  saveRoutesToFile(); // 🔥 speichern

  res.json({ success: true });
});

// DELETE
app.delete("/api/routes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  routes = routes.filter(r => r.id !== id);

  saveRoutesToFile(); // 🔥 speichern

  res.json({ success: true });
});