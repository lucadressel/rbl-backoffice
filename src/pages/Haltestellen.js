import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents
} from "react-leaflet";

// 🔍 Ortssuche Controller
function SearchController({ search }) {
  const map = useMap();

  useEffect(() => {
    if (!search) return;

    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${search}`
    )
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);

          map.setView([lat, lon], 16);
        } else {
          alert("Ort nicht gefunden");
        }
      });
  }, [search, map]);

  return null;
}

// 📍 Klick auf Karte
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
  const [search, setSearch] = useState("");
  const [searchTrigger, setSearchTrigger] = useState("");
  const [position, setPosition] = useState(null);
  const [stops, setStops] = useState([]);

  // 🔄 Stops laden
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
    if (!name || !position) {
      return alert("Name und Position erforderlich");
    }

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

    setStops(prev => [...prev, data]);

    setName("");
    setPosition(null);

    alert("Haltestelle gespeichert");
  };

  // 🔍 Suche starten
  const handleSearch = () => {
    if (!search) return;
    setSearchTrigger(search);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Haltestellen</h1>

      {/* Eingaben */}
      <div style={{ display: "flex", gap: 10 }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Ort suchen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>🔍</button>
      </div>

      {/* Karte */}
      <div style={{ marginTop: 10 }}>
        <MapContainer
          center={[52.52, 13.405]}
          zoom={13}
          style={{ height: 400 }}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />

          {/* 🔍 Suche */}
          <SearchController search={searchTrigger} />

          {/* 📍 Klick */}
          <MapClick setPosition={setPosition} />

          {/* 📍 Marker */}
          {position && (
            <Marker position={[position.lat, position.lng]} />
          )}
        </MapContainer>
      </div>

      <button onClick={saveStop} style={{ marginTop: 10 }}>
        💾 Speichern
      </button>

      {/* Liste */}
      <h2 style={{ marginTop: 20 }}>Alle Haltestellen</h2>

      {stops.map(s => (
        <div key={s._id}>
          {s.name} ({s.lat.toFixed(4)}, {s.lng.toFixed(4)})
        </div>
      ))}
    </div>
  );
}

export default Haltestellen;