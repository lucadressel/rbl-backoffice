import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Icon Fix
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
  const [editing, setEditing] = useState(null);
  const [position, setPosition] = useState(null);
  const [name, setName] = useState("");

  // 📥 Laden
  const loadStops = async () => {
    const res = await fetch("/api/stops");
    const data = await res.json();
    setStops(data);
  };

  useEffect(() => {
    loadStops();
  }, []);

  // 💾 Speichern
  const saveStop = async () => {
    if (!name || !position) return alert("Fehlt!");

    const body = { name, lat: position.lat, lng: position.lng };

    if (editing) {
      await fetch(`/api/stops/${editing.id}`, {
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

    setName("");
    setPosition(null);
    setEditing(null);
    loadStops();
  };

  // ✏️ Bearbeiten
  const editStop = (stop) => {
    setEditing(stop);
    setName(stop.name);
    setPosition({ lat: stop.lat, lng: stop.lng });
  };

  // 🗑️ Löschen
  const deleteStop = async (stop) => {
    if (!window.confirm("Soll die ausgewählte Haltestelle wirklich gelöscht werden?")) return;

    await fetch(`/api/stops/${stop.id}`, {
      method: "DELETE"
    });

    loadStops();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Haltestellen</h1>

      {/* FORM */}
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <div style={{ height: 300, marginTop: 10 }}>
        <MapContainer center={[52.52, 13.405]} zoom={13} style={{ height: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClick setPosition={setPosition} />
          <MapController position={position} />
          {position && <Marker position={position} />}
        </MapContainer>
      </div>

      <button onClick={saveStop}>
        {editing ? "✏️ Aktualisieren" : "➕ Neu speichern"}
      </button>

      {/* LISTE */}
      <h2 style={{ marginTop: 30 }}>Alle Haltestellen</h2>

      {stops.map(s => (
        <div key={s.id} style={{ marginBottom: 10 }}>
          <b>{s.name}</b>

          <button onClick={() => editStop(s)}>✏️ Bearbeiten</button>

          <button onClick={() => deleteStop(s)}>🗑️ Löschen</button>
        </div>
      ))}
    </div>
  );
}

export default Haltestellen;