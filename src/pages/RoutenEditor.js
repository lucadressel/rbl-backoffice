import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";

function RoutenEditor() {
  const [stops, setStops] = useState([]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("/api/stops")
      .then(res => res.json())
      .then(data => setStops(data));
  }, []);

  // ➕ Stop hinzufügen
  const addStop = (stop) => {
    setSelectedStops([...selectedStops, stop]);
  };

  // ❌ Stop entfernen
  const removeStop = (index) => {
    const updated = [...selectedStops];
    updated.splice(index, 1);
    setSelectedStops(updated);
  };

  // 💾 Speichern
  const saveRoute = async () => {
    if (!name || selectedStops.length < 2) {
      return alert("Mindestens 2 Haltestellen erforderlich");
    }

    await fetch("/api/routes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        stops: selectedStops.map(s => s.id)
      })
    });

    alert("Route gespeichert");

    setName("");
    setSelectedStops([]);
  };

  // 🗺️ Polyline Koordinaten
  const polyline = selectedStops.map(s => [s.lat, s.lng]);

  return (
    <div style={{ padding: 20 }}>
      <h1>🧭 Routen Editor</h1>

      <input
        placeholder="Routenname"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 20 }}
      />

      <div style={{ display: "flex", gap: 20 }}>

        {/* HALTESTELLEN */}
        <div style={{ width: 300 }}>
          <h3>Haltestellen</h3>

          {stops.map(s => (
            <div key={s.id} style={{ marginBottom: 5 }}>
              {s.name}
              <button onClick={() => addStop(s)}>➕</button>
            </div>
          ))}
        </div>

        {/* ROUTE */}
        <div style={{ width: 300 }}>
          <h3>Route</h3>

          {selectedStops.map((s, i) => (
            <div key={i}>
              {i + 1}. {s.name}
              <button onClick={() => removeStop(i)}>❌</button>
            </div>
          ))}
        </div>

        {/* KARTE */}
        <div style={{ flex: 1 }}>
          <MapContainer
            center={[52.52, 13.405]}
            zoom={13}
            style={{ height: 400 }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {selectedStops.map(s => (
              <Marker key={s.id} position={[s.lat, s.lng]} />
            ))}

            {polyline.length > 1 && (
              <Polyline positions={polyline} />
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