import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

function Haltestellen() {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    position: null
  });

  // 🔄 Laden
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("haltestellen")) || [];
    setList(data);
  }, []);

  // 💾 Speichern
  useEffect(() => {
    localStorage.setItem("haltestellen", JSON.stringify(list));
  }, [list]);

  // 📍 Map Click
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

  // ➕ NEU
  const neu = () => {
    setForm({ name: "", position: null });
    setSelected(null);
    setShowModal(true);
  };

  // ✏️ EDIT
  const edit = () => {
    if (!selected) return alert("Bitte auswählen");
    setForm(selected);
    setShowModal(true);
  };

  // 🗑️ DELETE
  const loeschen = () => {
    if (!selected) return;
    setList(list.filter(h => h.id !== selected.id));
    setSelected(null);
  };

  // 💾 SAVE
  const speichern = () => {
    if (!form.name || !form.position) {
      alert("Name + Position!");
      return;
    }

    if (selected) {
      setList(list.map(h => h.id === selected.id ? form : h));
    } else {
      setList([...list, { ...form, id: Date.now() }]);
    }

    setShowModal(false);
  };

  return (
    <div style={{ display:"flex", height:"100%" }}>

      {/* 🔵 LISTE */}
      <div style={{
        width:300,
        background:"#1b1b2b",
        padding:10,
        color:"white"
      }}>
        <h3>Haltestellen</h3>

        <button onClick={neu}>➕ Neu</button>
        <button onClick={edit}>✏️</button>
        <button onClick={loeschen}>🗑️</button>

        {list.map(h => (
          <div key={h.id}
            onClick={()=>setSelected(h)}
            style={{
              padding:10,
              marginTop:5,
              background: selected?.id === h.id ? "#3a3aff" : "#2a2a40",
              cursor:"pointer"
            }}>
            {h.name}
          </div>
        ))}
      </div>

      {/* 🟢 DETAIL */}
      <div style={{ flex:1, padding:20, color:"white" }}>
        {selected ? (
          <>
            <h2>{selected.name}</h2>

            <div style={{ height:400 }}>
              <MapContainer center={selected.position} zoom={15} style={{height:"100%"}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker position={selected.position}/>
              </MapContainer>
            </div>
          </>
        ) : "Bitte auswählen"}
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div style={modalBg}>
          <div style={modalBox}>
            <h3>{selected ? "Bearbeiten" : "Neue Haltestelle"}</h3>

            <input
              placeholder="Name"
              value={form.name}
              onChange={(e)=>setForm({...form, name:e.target.value})}
            />

            <div style={{ height:300, marginTop:10 }}>
              <MapContainer center={[52.52,13.405]} zoom={13} style={{height:"100%"}}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <MapClick />
                {form.position && <Marker position={form.position}/>}
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
  position:"fixed",
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