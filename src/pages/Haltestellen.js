import { useState, useEffect } from "react";
import axios from "axios";

function Haltestellen() {
  const [name, setName] = useState("");
  const [liste, setListe] = useState([]);

  const laden = async () => {
    const res = await axios.get("http://127.0.0.1:5000/haltestellen");
    setListe(res.data);
  };

  useEffect(() => {
    laden();
  }, []);

  const speichern = async () => {
    await axios.post("http://127.0.0.1:5000/haltestellen", { name });
    setName("");
    laden();
  };

  const loeschen = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/haltestellen/${id}`);
    laden();
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Haltestellen</h1>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={speichern}>Speichern</button>

      {liste.map((h) => (
        <div key={h.id}>
          {h.name}
          <button onClick={() => loeschen(h.id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

export default Haltestellen;