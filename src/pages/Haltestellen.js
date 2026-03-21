import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

function Haltestellen() {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    position: null
  });

  // 📍 Klick auf Karte
  function MapClick() {
    useMapEvents({
      click(e) {
        setForm({
          ...form,
          position: [e.latlng.lat, e.latlng.lng]
        });
      }
    });
    return null;
  }

  const speichern = () => {
    if (!form.name || !form.position) {
      alert("Name + Position wählen!");
      return;
    }

    setList([
      ...list,
      { id: Date.now(), ...form }
    ]);

    setShowModal(false);
  };

  return (
    <div style={{ padding: 20, color: "white" }}>
      <h2>Haltestellen Editor</h2>

      <button onClick={() => {
        setForm({ name: "", position: null });
        setShowModal(true);
      }}>
        ➕ Neue Haltestelle
      </button>

      {/* Liste */}
      {list.map(h => (
        <div key={h.id} style={{
          background: "#2a2a40",
          marginTop: 5,
          padding: 10
        }}>
          {h.name}
        </div>
      ))}

      {/* MODAL */}
      {showModal && (
        <div style={modalBg}>
          <div style={modalBox}>
            <h3>Neue Haltestelle</h3>

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e)=>setForm({...form, name: e.target.value})}
            />

            {/* 🗺️ KARTE */}
            <div style={{ height: 300, marginTop: 10 }}>
              <MapContainer center={[52.52,13.405]} zoom={13} style={{height:"100%"}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <MapClick />

                {form.position && (
                  <Marker position={form.position} />
                )}
              </MapContainer>
            </div>

            <button onClick={speichern}>💾 Speichern</button>
            <button onClick={()=>setShowModal(false)}>Abbrechen</button>
          </div>
        </div>
      )}
    </div>
  );
}

const modalBg = {
  position: "fixed",
  top:0,left:0,
  width:"100%",height:"100%",
  background:"rgba(0,0,0,0.6)"
};

const modalBox = {
  background:"#1e1e2f",
  padding:20,
  width:400,
  margin:"50px auto",
  color:"white"
};

export default Haltestellen;