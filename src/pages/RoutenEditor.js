import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
  useMap
} from "react-leaflet";

// 🧭 Klick → Strecke zeichnen
function DrawPath({ path, setPath }) {
  useMapEvents({
    click(e) {
      setPath([...path, [e.latlng.lat, e.latlng.lng]]);
    }
  });
  return null;
}

// 🔥 AUTO ZOOM Controller
function MapController({ focus }) {
  const map = useMap();

  if (focus) {
    map.setView([focus.lat, focus.lng], 16);
  }

  return null;
}

function RoutenEditor() {
  const [stops, setStops] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [name, setName] = useState("");
  const [path, setPath] = useState([]);
  const [focusStop, setFocusStop] = useState(null); // 🔥 NEU

  // 📥 Stops laden
  useEffect(() => {
    fetch("/api/stops")
      .then(res => res.json())
      .then(data => setStops(data));
  }, []);

  // ➕ Stop hinzufügen + Auto Zoom
  const addStop = (stop) => {
    setSelectedStops([...selectedStops, stop]);
    setFocusStop(stop); // 🔥 Karte springt
  };

  // ❌ Stop entfernen
  const removeStop = (index) => {
    const updated = [...selectedStops];
    updated.splice(index, 1);
    setSelectedStops(updated);
  };

  // ↩️ letzten Punkt löschen
  const removeLastPoint = () => {
    const updated = [...path];
    updated.pop();
    setPath(updated);
  };

  // 🗑️ Strecke löschen
  const clearPath = () => {
    setPath([]);
  };

  // 💾 Route speichern
  const saveRoute = async () => {
    if (!name || path.length < 2) {
      return alert("Route nicht vollständig");
    }

    await fetch("/api/routes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        stops: selectedStops.map(s => s.id),
        path
      })
    });

    alert("Route gespeichert");

    setName("");
    setSelectedStops([]);
    setPath([]);
    setFocusStop(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🧭 Routen Editor</h1>

      <input
        placeholder="Routenname"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      <div style={{ display: "flex", gap: 20 }}>

        {/* HALTESTELLEN */}
        <div style={{ width: 250 }}>
          <h3>Haltestellen</h3>

          {stops.map(s => (
            <div key={s.id} style={{ marginBottom: 5 }}>
              {s.name}
              <button onClick={() => addStop(s)}>➕</button>
            </div>
          ))}
        </div>

        {/* ROUTE */}
        <div style={{ width: 250 }}>
          <h3>Route</h3>

          {selectedStops.map((s, i) => (
            <div key={i}>
              {i + 1}. {s.name}
              <button onClick={() => removeStop(i)}>❌</button>
            </div>
          ))}

          <div style={{ marginTop: 10 }}>
            <button onClick={removeLastPoint}>↩️ Punkt löschen</button>
            <button onClick={clearPath}>🗑️ Strecke löschen</button>
          </div>
        </div>

        {/* KARTE */}
        <div style={{ flex: 1 }}>
          <MapContainer
            center={[52.52, 13.405]}
            zoom={13}
            style={{ height: 450 }}
          >
            {/* 🛰️ Satellitenkarte */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />

            {/* 🔥 AUTO ZOOM */}
            <MapController focus={focusStop} />

            {/* ✏️ Zeichnen */}
            <DrawPath path={path} setPath={setPath} />

            {/* 📍 Haltestellen Marker */}
            {selectedStops.map(s => (
              <Marker key={s.id} position={[s.lat, s.lng]} />
            ))}

            {/* 🔴 Route */}
            {path.length > 1 && (
              <Polyline positions={path} color="red" />
            )}
          </MapContainer>
        </div>

      </div>

      <button onClick={saveRoute} style={{ marginTop: 20 }}>
        💾 Route speichern
      </button>
    </div>
  );
}

export default RoutenEditor;