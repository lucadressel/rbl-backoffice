import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";

function Routen() {
  const [punkte, setPunkte] = useState([]);
  const [gps, setGps] = useState(null);

  // 📍 GPS holen
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setGps([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  // 🖱️ Klick auf Karte → Punkt hinzufügen
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setPunkte((prev) => [
          ...prev,
          [e.latlng.lat, e.latlng.lng]
        ]);
      },
    });
    return null;
  }

  // 🗑️ Route löschen
  const resetRoute = () => {
    if (!window.confirm("Route wirklich löschen?")) return;
    setPunkte([]);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      
      {/* 🔵 HEADER */}
      <div style={{
        padding: 10,
        background: "#1b1b2b",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2 style={{ margin: 0 }}>🧭 Routen Editor</h2>

        <div>
          <button style={btnDanger} onClick={resetRoute}>🗑️ Route löschen</button>
        </div>
      </div>

      {/* 🗺️ KARTE */}
      <div style={{ flex: 1 }}>
        <MapContainer
          center={[52.52, 13.405]} // Berlin
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler />

          {/* 📍 Haltestellen */}
          {punkte.map((p, i) => (
            <Marker key={i} position={p} />
          ))}

          {/* 🔵 Route */}
          {punkte.length > 1 && (
            <Polyline positions={punkte} color="#3a3aff" />
          )}

          {/* 📡 GPS */}
          {gps && (
            <Marker position={gps} />
          )}
        </MapContainer>
      </div>

      {/* 🟢 FOOTER INFO */}
      <div style={{
        padding: 10,
        background: "#111",
        color: "#aaa"
      }}>
        Punkte: {punkte.length} | Klick auf Karte → Haltestellen setzen
      </div>

    </div>
  );
}

// 🎨 BUTTON STYLE
const btnDanger = {
  background: "#ff4d4d",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: 5,
  cursor: "pointer"
};

export default Routen;