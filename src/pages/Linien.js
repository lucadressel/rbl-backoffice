import { useState, useEffect } from "react";
import axios from "axios";

function Linien() {
  const [name, setName] = useState("");
  const [liste, setListe] = useState([]);

  const laden = async () => {
    const res = await axios.get("http://127.0.0.1:5000/linien");
    setListe(res.data);
  };

  useEffect(() => {
    laden();
  }, []);

  const speichern = async () => {
    await axios.post("http://127.0.0.1:5000/linien", { name });
    setName("");
    laden();
  };

  const loeschen = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/linien/${id}`);
    laden();
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Linien</h1>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={speichern}>Speichern</button>

      {liste.map((l) => (
        <div key={l.id}>
          Linie {l.name}
          <button onClick={() => loeschen(l.id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

export default Linien;