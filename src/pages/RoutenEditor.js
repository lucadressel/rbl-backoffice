import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
  useMap
} from "react-leaflet";

// 🎯 Punkt für Punkt zeichnen
function DrawPath({ setPath }) {
  useMapEvents({
    click(e) {
      setPath(prev => [...prev, [e.latlng.lat, e.latlng.lng]]);
    }
  });
  return null;
}

// 🔥 MapController mit Zoom-Block + Reset
function MapController({ focus, resetZoom }) {
  const map = useMap();
  const hasZoomed = useRef(false);

  // 🔁 Reset (bei neuer Route)
  if (resetZoom) {
    hasZoomed.current = false;
  }

  // 🎯 Nur einmal zoomen
  if (focus && !hasZoomed.current) {
    map.setView([focus.lat, focus.lng], 15, {
      animate: true
    });

    hasZoomed.current = true;
  }

  return null;
}

function RoutenEditor() {
  const [stops, setStops] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [name, setName] = useState("");
  const [path, setPath] = useState([]);
  const [focusStop, setFocusStop] = useState(null);
  const [resetZoom, setResetZoom] = useState(false); // 🔥 neu

  // 📥 Stops laden
  useEffect(() => {
    fetch("/api/stops")
      .then(res => res.json())
      .then(data => setStops(data));
  }, []);

  // ➕ Stop hinzufügen (Zoom nur beim ersten!)
  const addStop = (stop) => {
    setSelectedStops(prev => [...prev, stop]);

    if (selectedStops.length === 0) {
      setFocusStop(stop);
    }
  };

  // ❌ Stop entfernen
  const removeStop = (index) => {
    const updated = [...selectedStops];
    updated.splice(index, 1);
    setSelectedStops(updated);
  };

  // ↩️ letzten Punkt löschen
  const removeLastPoint = () => {
    setPath(prev => prev.slice(0, -1));
  };

  // 🗑️ Strecke löschen
  const clearPath = () => {
    setPath([]);
  };

  // ➕ Neue Route starten (RESET!)
  const newRoute = () => {
    setName("");
    setSelectedStops([]);
    setPath([]);
    setFocusStop(null);

    // 🔥 Zoom wieder erlauben
    setResetZoom(true);

    // Reset Flag wieder zurücksetzen
    setTimeout(() => setResetZoom(false), 0);
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

    newRoute(); // 🔥 direkt resetten
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

      <button onClick={newRoute} style={{ marginBottom: 10 }}>
        ➕ Neue Route
      </button>

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

          <p style={{ fontSize: 12, color: "#aaa", marginTop: 10 }}>
            👉 Klick auf Karte, um Punkte zu setzen
          </p>
        </div>

        {/* KARTE */}
        <div style={{ flex: 1 }}>
          <MapContainer
            center={[52.52, 13.405]}
            zoom={13}
            style={{ height: 500 }}
          >
            {/* 🛰️ Satellitenkarte */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />

            {/* 🔥 FIXED ZOOM */}
            <MapController focus={focusStop} resetZoom={resetZoom} />

            {/* 🎯 Zeichnen */}
            <DrawPath setPath={setPath} />

            {/* 📍 Haltestellen */}
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