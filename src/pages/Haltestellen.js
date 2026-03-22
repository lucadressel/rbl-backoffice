import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🔧 Leaflet Icon Fix
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// 📍 Klick auf Karte
function MapClick({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    }
  });
  return null;
}

// 🧭 Map springt automatisch
function MapController({ position }) {
  const map = useMap();

  if (position) {
    map.setView(position, 15);
  }

  return null;
}

function Haltestellen() {
  const [stops, setStops] = useState([]);
  const [editing, setEditing] = useState(null);
  const [position, setPosition] = useState(null);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // 📥 Alle Haltestellen laden
  const loadStops = async () => {
    const res = await fetch("/api/stops");
    const data = await res.json();
    setStops(data);
  };

  useEffect(() => {
    loadStops();
  }, []);

  // 🔍 Ort suchen
  const searchLocation = async () => {
    if (!search) return;

    try {
      setLoading(true);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`
      );

      const data = await res.json();

      if (data.length > 0) {
        setPosition({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        });
      } else {
        alert("Ort nicht gefunden");
      }

    } catch (err) {
      console.error(err);
      alert("Fehler bei der Ortssuche");
    } finally {
      setLoading(false);
    }
  };

  // 💾 Speichern (Neu oder Update)
  const saveStop = async () => {
    if (!name || !position) {
      alert("Name und Position erforderlich!");
      return;
    }

    const body = {
      name,
      lat: position.lat,
      lng: position.lng
    };

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

      {/* 🧾 FORM */}
      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginRight: 10 }}
        />

        <input
          placeholder="Ort suchen..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginRight: 10 }}
        />

        <button onClick={searchLocation}>
          {loading ? "..." : "🔍"}
        </button>
      </div>

      {/* 🗺️ KARTE */}
      <div style={{ height: 350 }}>
        <MapContainer center={[52.52, 13.405]} zoom={13} style={{ height: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapClick setPosition={setPosition} />
          <MapController position={position} />

          {position && <Marker position={position} />}
        </MapContainer>
      </div>

      {/* 💾 BUTTON */}
      <button onClick={saveStop} style={{ marginTop: 10 }}>
        {editing ? "✏️ Aktualisieren" : "➕ Neu speichern"}
      </button>

      {/* 📋 LISTE */}
      <h2 style={{ marginTop: 30 }}>Alle Haltestellen</h2>

      {stops.map(s => (
        <div key={s.id} style={{ marginBottom: 10 }}>
          <b>{s.name}</b>

          <button onClick={() => editStop(s)} style={{ marginLeft: 10 }}>
            ✏️ Bearbeiten
          </button>

          <button onClick={() => deleteStop(s)} style={{ marginLeft: 10 }}>
            🗑️ Löschen
          </button>
        </div>
      ))}
    </div>
  );
}

export default Haltestellen;