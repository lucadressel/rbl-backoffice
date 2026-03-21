import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { useState } from "react";

function Routen() {

  // DEMO HALTESTELLEN (später Backend)
  const [haltestellen] = useState([
    { id:1, name:"Hbf", pos:[52.52,13.405] },
    { id:2, name:"Markt", pos:[52.525,13.41] },
    { id:3, name:"Schule", pos:[52.53,13.42] }
  ]);

  const [route, setRoute] = useState([]);

  // ➕ Haltestelle zur Route hinzufügen
  const addToRoute = (h) => {
    setRoute([...route, h.pos]);
  };

  return (
    <div style={{ display:"flex", height:"100%" }}>

      {/* LISTE */}
      <div style={{ width:250, background:"#1b1b2b", padding:10 }}>
        <h3 style={{color:"white"}}>Haltestellen</h3>

        {haltestellen.map(h => (
          <div key={h.id}
            onClick={()=>addToRoute(h)}
            style={{
              padding:10,
              background:"#2a2a40",
              marginTop:5,
              color:"white",
              cursor:"pointer"
            }}>
            {h.name}
          </div>
        ))}
      </div>

      {/* KARTE */}
      <div style={{ flex:1 }}>
        <MapContainer center={[52.52,13.405]} zoom={13} style={{height:"100%"}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

          {/* Haltestellen anzeigen */}
          {haltestellen.map(h => (
            <Marker key={h.id} position={h.pos} />
          ))}

          {/* Route */}
          {route.length > 1 && (
            <Polyline positions={route} color="blue" />
          )}
        </MapContainer>
      </div>

    </div>
  );
}

export default Routen;