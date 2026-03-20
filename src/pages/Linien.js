import { useState } from "react";

function Linien() {
  const [linien, setLinien] = useState([
    { id: 1, name: "101" }
  ]);

  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");

  const neu = () => {
    setName("");
    setSelected(null);
    setShowModal(true);
  };

  const speichern = () => {
    if (selected) {
      setLinien(linien.map(l =>
        l.id === selected.id ? { ...l, name } : l
      ));
    } else {
      setLinien([...linien, { id: Date.now(), name }]);
    }
    setShowModal(false);
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>

      {/* LISTE */}
      <div style={{ width: 250, background: "#1b1b2b", padding: 10 }}>
        <h3 style={{color:"white"}}>Linien</h3>

        <button onClick={neu}>➕ Neu</button>

        {linien.map(l => (
          <div key={l.id}
            onClick={() => setSelected(l)}
            style={{
              padding: 10,
              background: selected?.id === l.id ? "#3a3aff" : "#2a2a40",
              marginTop: 5,
              color: "white",
              cursor: "pointer"
            }}>
            Linie {l.name}
          </div>
        ))}
      </div>

      {/* DETAIL */}
      <div style={{ flex: 1, padding: 20, color: "white" }}>
        {selected ? (
          <>
            <h2>Linie {selected.name}</h2>
          </>
        ) : "Bitte auswählen"}
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={modalBg}>
          <div style={modalBox}>
            <h3>Neue Linie</h3>
            <input value={name} onChange={e => setName(e.target.value)} />
            <button onClick={speichern}>Speichern</button>
          </div>
        </div>
      )}

    </div>
  );
}

const modalBg = {
  position: "fixed",
  top: 0, left: 0,
  width: "100%", height: "100%",
  background: "rgba(0,0,0,0.5)"
};

const modalBox = {
  background: "#1e1e2f",
  color: "white",
  padding: 20,
  margin: "100px auto",
  width: 300
};

export default Linien;