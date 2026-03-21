import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";

function Routen() {
  const [haltestellen, setHaltestellen] = useState([]);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("haltestellen")) || [];
    setHaltestellen(data);
  }, []);

  const addStop = (h) => {
    setRoute([...route, h]);
  };

  return (
    <div style={{ display:"flex", height:"100%" }}>

      {/* LISTE */}
      <div style={{ width:300, background:"#1b1b2b", padding:10, color:"white" }}>
        <h3>Haltestellen</h3>

        {haltestellen.map(h => (
          <div key={h.id}
            onClick={()=>addStop(h)}
            style={{
              padding:10,
              marginTop:5,
              background:"#2a2a40",
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

          {haltestellen.map(h => (
            <Marker key={h.id} position={h.position}/>
          ))}

          {route.length > 1 && (
            <Polyline positions={route.map(r => r.position)} color="blue"/>
          )}
        </MapContainer>
      </div>

    </div>
  );
}

export default Routen;