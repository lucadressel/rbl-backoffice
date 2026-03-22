import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🔧 Leaflet Icon Fix (wichtig!)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// 📍 Klick auf Karte → Marker setzen
function MapClick({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
}

// 🧭 Karte bewegt sich automatisch bei neuer Position
function MapController({ position }) {
  const map = useMap();

  if (position) {
    map.setView(position, 15);
  }

  return null;
}

function Haltestellen() {
  const [position, setPosition] = useState(null);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔍 Ort suchen (Render + CORS safe)
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
      alert("Fehler bei der Ortssuche (Render/CORS Problem)");
    } finally {
      setLoading(false);
    }
  };

  // 💾 Haltestelle speichern (Backend!)
  const saveStop = async () => {
    if (!name || !position) {
      alert("Bitte Name und Position setzen!");
      return;
    }

    const stop = {
      name,
      lat: position.lat,
      lng: position.lng,
    };

    try {
      await fetch("http://localhost:5000/api/stops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stop),
      });

      alert("Haltestelle gespeichert!");

      // Reset
      setName("");
      setPosition(null);

    } catch (err) {
      console.error(err);
      alert("Speichern fehlgeschlagen (Backend nicht erreichbar)");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Neue Haltestelle anlegen</h1>

      {/* 📝 Name */}
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: 10 }}
      />

      {/* 🔍 Suche */}
      <input
        placeholder="Ort suchen..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginRight: 10 }}
      />

      <button onClick={searchLocation}>
        {loading ? "..." : "🔍"}
      </button>

      {/* 🗺️ Karte */}
      <div style={{ height: 400, marginTop: 20 }}>
        <MapContainer
          center={[52.52, 13.405]}
          zoom={13}
          style={{ height: "100%", borderRadius: 10 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapClick setPosition={setPosition} />
          <MapController position={position} />

          {position && <Marker position={position} />}
        </MapContainer>
      </div>

      {/* 💾 Button */}
      <button
        onClick={saveStop}
        style={{ marginTop: 20, padding: 10 }}
      >
        💾 Speichern
      </button>
    </div>
  );
}

export default Haltestellen;