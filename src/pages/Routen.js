import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";

function Routen() {
  const [routes, setRoutes] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("/api/routes")
      .then(res => res.json())
      .then(data => setRoutes(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Routen</h1>

      <div style={{ display: "flex", gap: 20 }}>

        {/* LISTE */}
        <div style={{ width: 300 }}>
          {routes.map(r => (
            <div
              key={r.id}
              style={{
                padding: 10,
                background: "#2a2a40",
                marginBottom: 5,
                cursor: "pointer"
              }}
              onClick={() => setSelected(r)}
            >
              {r.name}
            </div>
          ))}
        </div>

        {/* KARTE */}
        <div style={{ flex: 1 }}>
          {selected && (
            <MapContainer
              center={selected.path[0]}
              zoom={15}
              style={{ height: 450 }}
            >
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />

              <Polyline positions={selected.path} color="red" />
            </MapContainer>
          )}
        </div>

      </div>
    </div>
  );
}

export default Routen;