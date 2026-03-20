import { useState, useEffect } from "react";
import axios from "axios";

function Fahrer() {
  const [fahrer, setFahrer] = useState([]);
  const [selected, setSelected] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");

  const API = "https://rbl-backoffice.onrender.com"; // später anpassen

  useEffect(() => {
    ladeFahrer();
  }, []);

  const ladeFahrer = async () => {
    try {
      const res = await axios.get(`${API}/fahrer`);
      setFahrer(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const openNeu = () => {
    setName("");
    setSelected(null);
    setShowModal(true);
  };

  const openEdit = () => {
    if (!selected) return alert("Bitte Fahrer auswählen!");
    setName(selected.name);
    setShowModal(true);
  };

  const speichern = async () => {
    try {
      if (selected) {
        await axios.put(`${API}/fahrer/${selected.id}`, { name });
      } else {
        await axios.post(`${API}/fahrer`, { name });
      }

      setShowModal(false);
      ladeFahrer();
    } catch (err) {
      console.error(err);
    }
  };

  const loeschen = async () => {
    if (!selected) return alert("Bitte Fahrer auswählen!");

    if (!window.confirm("Wirklich löschen?")) return;

    await axios.delete(`${API}/fahrer/${selected.id}`);
    ladeFahrer();
    setSelected(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Fahrer Editor</h2>

      {/* Toolbar */}
      <div style={{ marginBottom: 10 }}>
        <button onClick={openNeu}>➕ Neu</button>
        <button onClick={openEdit}>✏️ Bearbeiten</button>
        <button onClick={loeschen}>🗑️ Löschen</button>
      </div>

      {/* Tabelle */}
      <table border="1" width="100%">
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

      {/* MODAL */}
      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>{selected ? "Bearbeiten" : "Neuer Fahrer"}</h3>

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

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
  },
  modal: {
    background: "#fff",
    padding: 20,
    width: 300,
    margin: "100px auto",
    borderRadius: 8,
  },
};

export default Fahrer;