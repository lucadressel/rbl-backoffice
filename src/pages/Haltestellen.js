import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🔧 FIX für Marker Icons
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
    },
  });
  return null;
}

// 🧭 Map bewegt sich automatisch
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

  // 🔍 Ort suchen (OHNE map.setView!)
  const searchLocation = async () => {
  if (!search) return;

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${search}`,
      {
        headers: {
          "Accept": "application/json",
          "User-Agent": "RBLBackoffice/1.0 (your@email.com)"
        }
      }
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
    alert("Fehler bei der Ortssuche (API blockiert)");
  }
};

  // 💾 Speichern (aktuell nur Console)
  const saveStop = () => {
    if (!name || !position) {
      alert("Name und Position erforderlich!");
      return;
    }

    const stop = {
      name,
      lat: position.lat,
      lng: position.lng,
    };

    console.log("Gespeichert:", stop);

    alert("Haltestelle gespeichert (aktuell nur lokal)");

    // Reset
    setName("");
    setPosition(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Neue Haltestelle</h1>

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

      <button onClick={searchLocation}>🔍</button>

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