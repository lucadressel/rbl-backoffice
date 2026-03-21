import { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";

function Routen() {

  // 🔵 HALTESTELLEN (später Backend)
  const [haltestellen] = useState([
    { id:1, name:"Hbf", pos:[52.52,13.405] },
    { id:2, name:"Markt", pos:[52.525,13.41] },
    { id:3, name:"Schule", pos:[52.53,13.42] }
  ]);

  // 🟢 ROUTEN
  const [routen, setRouten] = useState([]);
  const [aktiveRoute, setAktiveRoute] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [routeName, setRouteName] = useState("");

  // ➕ ROUTE ANLEGEN
  const neueRoute = () => {
    setRouteName("");
    setShowModal(true);
  };

  const speichernRoute = () => {
    const neue = {
      id: Date.now(),
      name: routeName,
      stops: []
    };

    setRouten([...routen, neue]);
    setAktiveRoute(neue);
    setShowModal(false);
  };

  // ➕ HALTESTELLE ZUR ROUTE
  const addStop = (h) => {
    if (!aktiveRoute) return alert("Bitte zuerst Route auswählen");

    const updated = {
      ...aktiveRoute,
      stops: [...aktiveRoute.stops, h]
    };

    setAktiveRoute(updated);
    setRouten(routen.map(r => r.id === updated.id ? updated : r));
  };

  return (
    <div style={{ display:"flex", height:"100%" }}>

      {/* 🔵 LINKER BEREICH */}
      <div style={{
        width:300,
        background:"#1b1b2b",
        padding:10,
        color:"white"
      }}>

        <h3>Routen</h3>

        <button onClick={neueRoute}>➕ Neue Route</button>

        {/* ROUTEN LISTE */}
        {routen.map(r => (
          <div key={r.id}
            onClick={()=>setAktiveRoute(r)}
            style={{
              padding:10,
              marginTop:5,
              background: aktiveRoute?.id === r.id ? "#3a3aff" : "#2a2a40",
              cursor:"pointer"
            }}>
            {r.name}
          </div>
        ))}

        <hr/>

        <h3>Haltestellen</h3>

        {/* HALTESTELLEN */}
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

      {/* 🗺️ KARTE */}
      <div style={{ flex:1 }}>

        <MapContainer center={[52.52,13.405]} zoom={13} style={{height:"100%"}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

          {/* Alle Haltestellen */}
          {haltestellen.map(h => (
            <Marker key={h.id} position={h.pos}/>
          ))}

          {/* Route anzeigen */}
          {aktiveRoute && aktiveRoute.stops.length > 1 && (
            <Polyline
              positions={aktiveRoute.stops.map(s => s.pos)}
              color="blue"
            />
          )}

        </MapContainer>

      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div style={modalBg}>
          <div style={modalBox}>
            <h3>Neue Route</h3>

            <input
              placeholder="Routenname"
              value={routeName}
              onChange={(e)=>setRouteName(e.target.value)}
            />

            <button onClick={speichernRoute}>Speichern</button>
            <button onClick={()=>setShowModal(false)}>Abbrechen</button>
          </div>
        </div>
      )}

    </div>
  );
}

// 🎨 STYLE
const modalBg = {
  position:"fixed",
  top:0,left:0,
  width:"100%",height:"100%",
  background:"rgba(0,0,0,0.6)"
};

const modalBox = {
  background:"#1e1e2f",
  padding:20,
  width:300,
  margin:"100px auto",
  color:"white"
};

export default Routen;