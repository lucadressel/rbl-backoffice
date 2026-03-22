import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

function MapClick({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    }
  });
  return null;
}

function Haltestellen() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState(null);
  const [stops, setStops] = useState([]);

  // 🔥 Stops laden
  const loadStops = async () => {
    const res = await fetch("/api/stops");
    const data = await res.json();
    setStops(data);
  };

  useEffect(() => {
    loadStops();
  }, []);

  // 🔥 SPEICHERN (FIXED)
  const saveStop = async () => {
    if (!name || !position) {
      return alert("Name und Position erforderlich");
    }

    try {
      const res = await fetch("/api/stops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          lat: position.lat,
          lng: position.lng
        })
      });

      const data = await res.json();

      console.log("GESPEICHERT:", data);

      alert("Haltestelle gespeichert");

      // 🔥 UI aktualisieren
      setStops(prev => [...prev, data]);

      // 🔄 Reset
      setName("");
      setPosition(null);

    } catch (err) {
      console.error("FEHLER:", err);
      alert("Fehler beim Speichern");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Haltestellen</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div style={{ marginTop: 10 }}>
        <MapContainer
          center={[52.52, 13.405]}
          zoom={13}
          style={{ height: 400 }}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />

          <MapClick setPosition={setPosition} />

          {position && (
            <Marker position={[position.lat, position.lng]} />
          )}
        </MapContainer>
      </div>

      <button onClick={saveStop} style={{ marginTop: 10 }}>
        💾 Speichern
      </button>

      <h2 style={{ marginTop: 20 }}>Alle Haltestellen</h2>

      {stops.map(s => (
        <div key={s._id}>
          {s.name} ({s.lat}, {s.lng})
        </div>
      ))}
    </div>
  );
}

export default Haltestellen;