import { useState } from "react";

function Fahrer() {
  const [fahrer, setFahrer] = useState([
    { id: 1, name: "Max Mustermann" },
    { id: 2, name: "Test Fahrer" }
  ]);

  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");

  // ➕ NEU
  const neuHandler = () => {
    setName("");
    setSelected(null);
    setShowModal(true);
  };

  // ✏️ BEARBEITEN
  const bearbeitenHandler = () => {
    if (!selected) {
      alert("Bitte Fahrer auswählen!");
      return;
    }
    setName(selected.name);
    setShowModal(true);
  };

  // 🗑️ LÖSCHEN
  const loeschenHandler = () => {
    if (!selected) {
      alert("Bitte Fahrer auswählen!");
      return;
    }

    setFahrer(fahrer.filter(f => f.id !== selected.id));
    setSelected(null);
  };

  // 💾 SPEICHERN
  const speichern = () => {
    if (selected) {
      // bearbeiten
      setFahrer(
        fahrer.map(f =>
          f.id === selected.id ? { ...f, name } : f
        )
      );
    } else {
      // neu
      setFahrer([
        ...fahrer,
        { id: Date.now(), name }
      ]);
    }

    setShowModal(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Fahrer Editor</h2>

      <button onClick={neuHandler}>➕ Neu</button>
      <button onClick={bearbeitenHandler}>✏️ Bearbeiten</button>
      <button onClick={loeschenHandler}>🗑️ Löschen</button>

      <table border="1" width="100%" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {fahrer.map((f) => (
            <tr
              key={f.id}
              onClick={() => setSelected(f)}
              style={{
                background:
                  selected?.id === f.id ? "#d0eaff" : "transparent",
                cursor: "pointer",
              }}
            >
              <td>{f.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔥 MODAL */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{
            background: "white",
            padding: 20,
            borderRadius: 10,
            width: 300
          }}>
            <h3>{selected ? "Fahrer bearbeiten" : "Neuer Fahrer"}</h3>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              style={{ width: "100%", marginBottom: 10 }}
            />

            <button onClick={speichern}>💾 Speichern</button>
            <button onClick={() => setShowModal(false)}>❌ Abbrechen</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Fahrer;