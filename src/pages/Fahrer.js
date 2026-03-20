import { useState, useEffect } from "react";
import axios from "axios";

function Fahrer() {
  const [name, setName] = useState("");
  const [liste, setListe] = useState([]);

  const laden = async () => {
    const res = await axios.get("http://127.0.0.1:5000/fahrer");
    setListe(res.data);
  };

  useEffect(() => {
    laden();
  }, []);

  const speichern = async () => {
    await axios.post("http://127.0.0.1:5000/fahrer", { name });
    setName("");
    laden();
  };

  const loeschen = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/fahrer/${id}`);
    laden();
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Fahrer</h1>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={speichern}>Speichern</button>

      {liste.map((f) => (
        <div key={f.id}>
          {f.name}
          <button onClick={() => loeschen(f.id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

export default Fahrer;