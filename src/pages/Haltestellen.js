import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { supabase } from "../supabaseClient";
import "leaflet/dist/leaflet.css";

function Haltestellen() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState(null);
  const [haltestellen, setHaltestellen] = useState([]);

  // 📍 Klick auf Karte
  function MapClick() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });
    return position ? <Marker position={position} /> : null;
  }

  // 🔄 Laden
  const ladeHaltestellen = async () => {
    const { data, error } = await supabase
      .from("Haltestellen")
      .select("*");

    if (error) {
      console.error(error);
    } else {
      setHaltestellen(data);
    }
  };

  useEffect(() => {
    ladeHaltestellen();
  }, []);

  // 💾 Speichern
  const speichern = async () => {
    if (!name || !position) {
      alert("Bitte Name und Position setzen");
      return;
    }

    const { error } = await supabase
      .from("Haltestellen")
      .insert([
        {
          name: name,
          lat: position.lat,
          lng: position.lng,
        },
      ]);

    if (error) {
      console.error(error);
      alert("Speichern fehlgeschlagen!");
    } else {
      alert("Gespeichert!");
      setName("");
      setPosition(null);
      ladeHaltestellen();
    }
  };

  // 🗑 Löschen
  const loeschen = async (id) => {
    const confirmDelete = window.confirm(
      "Soll die Haltestelle wirklich gelöscht werden?"
    );

    if (!confirmDelete) return;

    await supabase.from("Haltestellen").delete().eq("id", id);
    ladeHaltestellen();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Haltestellen</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: 10, marginBottom: 10 }}
      />

      <MapContainer
        center={[52.52, 13.405]}
        zoom={13}
        style={{ height: 400 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClick />
      </MapContainer>

      <button onClick={speichern} style={{ marginTop: 10 }}>
        💾 Speichern
      </button>

      <h3>Alle Haltestellen</h3>

      {haltestellen.map((h) => (
        <div key={h.id} style={{ marginBottom: 10 }}>
          {h.name} ({h.lat}, {h.lng})
          <button
            onClick={() => loeschen(h.id)}
            style={{ marginLeft: 10 }}
          >
            🗑 Löschen
          </button>
        </div>
      ))}
    </div>
  );
}

export default Haltestellen;