import { useState } from "react";

function Fahrer() {
  const [fahrer, setFahrer] = useState([
    { id: 1, name: "Max Mustermann", firma: "DB", status: "Vollzeit" }
  ]);

  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    firma: "",
    status: ""
  });

  // ➕ NEU
  const neuHandler = () => {
    setForm({ name: "", firma: "", status: "" });
    setSelected(null);
    setShowModal(true);
  };

  // ✏️ BEARBEITEN
  const bearbeitenHandler = () => {
    if (!selected) return alert("Bitte auswählen");

    setForm(selected);
    setShowModal(true);
  };

  // 🗑️ LÖSCHEN
  const loeschenHandler = () => {
    if (!selected) return alert("Bitte auswählen");

    setFahrer(fahrer.filter(f => f.id !== selected.id));
    setSelected(null);
  };

  // 💾 SPEICHERN
  const speichern = () => {
    if (selected) {
      setFahrer(fahrer.map(f =>
        f.id === selected.id ? { ...form } : f
      ));
    } else {
      setFahrer([...fahrer, { ...form, id: Date.now() }]);
    }

    setShowModal(false);
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>

      {/* 🔵 LINKE LISTE */}
      <div style={{
        width: 300,
        background: "#1b1b2b",
        color: "white",
        padding: 10
      }}>
        <h3>Fahrer</h3>

        <button style={btn} onClick={neuHandler}>➕ Neu</button>
        <button style={btn} onClick={bearbeitenHandler}>✏️</button>
        <button style={btnDanger} onClick={loeschenHandler}>🗑️</button>

        <div style={{ marginTop: 10 }}>
          {fahrer.map(f => (
            <div
              key={f.id}
              onClick={() => setSelected(f)}
              style={{
                padding: 10,
                marginBottom: 5,
                background:
                  selected?.id === f.id ? "#3a3aff" : "#2a2a40",
                cursor: "pointer",
                borderRadius: 5
              }}
            >
              {f.name}
            </div>
          ))}
        </div>
      </div>

      {/* 🟢 DETAIL PANEL */}
      <div style={{
        flex: 1,
        background: "#22223b",
        color: "white",
        padding: 20
      }}>
        {selected ? (
          <>
            <h2>Fahrer Details</h2>

            <p><strong>Name:</strong> {selected.name}</p>
            <p><strong>Firma:</strong> {selected.firma}</p>
            <p><strong>Status:</strong> {selected.status}</p>
          </>
        ) : (
          <h2>Bitte Fahrer auswählen</h2>
        )}
      </div>

      {/* 🔥 MODAL (NEU / EDITOR) */}
      {showModal && (
        <div style={modalBg}>
          <div style={modalBox}>
            <h3>{selected ? "Fahrer bearbeiten" : "Neuer Fahrer"}</h3>

            <label>Name</label>
            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <label>Firma</label>
            <input
              value={form.firma}
              onChange={(e) =>
                setForm({ ...form, firma: e.target.value })
              }
            />

            <label>Arbeitsverhältnis</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option value="">Bitte wählen</option>
              <option>Vollzeit</option>
              <option>Teilzeit</option>
              <option>Freelancer</option>
            </select>

            <div style={{ marginTop: 10 }}>
              <button style={btn} onClick={speichern}>💾 Speichern</button>
              <button onClick={() => setShowModal(false)}>Abbrechen</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// 🎨 STYLES

const btn = {
  background: "#3a3aff",
  color: "white",
  border: "none",
  padding: "6px 10px",
  marginRight: 5,
  borderRadius: 5,
  cursor: "pointer"
};

const btnDanger = {
  ...btn,
  background: "#ff4d4d"
};

const modalBg = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modalBox = {
  background: "#1e1e2f",
  color: "white",
  padding: 20,
  borderRadius: 10,
  width: 350,
  display: "flex",
  flexDirection: "column",
  gap: 5
};

export default Fahrer;