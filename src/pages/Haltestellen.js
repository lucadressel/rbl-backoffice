import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🔧 Icon Fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function MapClick({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    }
  });
  return null;
}

function MapController({ position }) {
  const map = useMap();
  if (position) map.setView(position, 15);
  return null;
}

function Haltestellen() {
  const [stops, setStops] = useState([]);
  const [selected, setSelected] = useState(null);
  const [position, setPosition] = useState(null);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  // 📥 Laden
  const loadStops = async () => {
    const res = await fetch("/api/stops");
    const data = await res.json();
    setStops(data);
  };

  useEffect(() => {
    loadStops();
  }, []);

  // 🔍 Suche
  const searchLocation = async () => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
    );
    const data = await res.json();

    if (data.length > 0) {
      setPosition({
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      });
    }
  };

  // 💾 Speichern
  const saveStop = async () => {
    if (!name || !position) return alert("Fehlt!");

    const body = { name, lat: position.lat, lng: position.lng };

    if (selected) {
      await fetch(`/api/stops/${selected.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
    } else {
      await fetch("/api/stops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
    }

    resetForm();
    loadStops();
  };

  // ✏️ Bearbeiten
  const editStop = (s) => {
    setSelected(s);
    setName(s.name);
    setPosition({ lat: s.lat, lng: s.lng });
    setShowForm(true);
  };

  // 🗑️ Löschen
  const deleteStop = async (s) => {
    if (!window.confirm("Soll die Haltestelle gelöscht werden?")) return;

    await fetch(`/api/stops/${s.id}`, {
      method: "DELETE"
    });

    loadStops();
  };

  // ➕ Neu
  const newStop = () => {
    resetForm();
    setShowForm(true);
  };

  const resetForm = () => {
    setSelected(null);
    setName("");
    setPosition(null);
    setSearch("");
    setShowForm(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Haltestellen</h1>

      <button onClick={newStop}>➕ Neue Haltestelle</button>

      <div style={{ display: "flex", marginTop: 20, gap: 20 }}>

        {/* 📋 LISTE */}
        <div style={{
          width: 300,
          background: "#1f1f2e",
          padding: 10,
          borderRadius: 10,
          maxHeight: 500,
          overflowY: "auto"
        }}>
          <h3>Alle</h3>

          {stops.map(s => (
            <div
              key={s.id}
              style={{
                padding: 10,
                marginBottom: 5,
                background: "#2a2a40",
                borderRadius: 6
              }}
            >
              <b>{s.name}</b>

              <div style={{ marginTop: 5 }}>
                <button onClick={() => editStop(s)}>✏️</button>
                <button onClick={() => deleteStop(s)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>

        {/* 🗺️ FORM + KARTE */}
        {showForm && (
          <div style={{ flex: 1 }}>

            <div style={{ marginBottom: 10 }}>
              <input
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <input
                placeholder="Ort suchen..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ marginLeft: 10 }}
              />

              <button onClick={searchLocation}>🔍</button>
            </div>

            <div style={{ height: 400 }}>
              <MapContainer center={[52.52, 13.405]} zoom={13} style={{ height: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <MapClick setPosition={setPosition} />
                <MapController position={position} />

                {position && <Marker position={position} />}
              </MapContainer>
            </div>

            <button onClick={saveStop} style={{ marginTop: 10 }}>
              💾 Speichern
            </button>

            <button onClick={resetForm} style={{ marginLeft: 10 }}>
              Abbrechen
            </button>

          </div>
        )}
      </div>
    </div>
  );
}

export default Haltestellen;