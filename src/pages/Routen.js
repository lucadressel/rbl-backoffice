import { useState, useEffect } from "react";
import axios from "axios";

function Routen() {
  const [linien, setLinien] = useState([]);
  const [haltestellen, setHaltestellen] = useState([]);
  const [route, setRoute] = useState([]);
  const [linieId, setLinieId] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/linien").then(r => setLinien(r.data));
    axios.get("http://127.0.0.1:5000/haltestellen").then(r => setHaltestellen(r.data));
  }, []);

  const ladeRoute = async (id) => {
    const res = await axios.get(`http://127.0.0.1:5000/routen/${id}`);
    setRoute(res.data);
  };

  const add = async (h) => {
    await axios.post("http://127.0.0.1:5000/routen", {
      linie_id: linieId,
      haltestelle_id: h.id,
      reihenfolge: route.length + 1
    });
    ladeRoute(linieId);
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>

      {/* LEFT */}
      <div style={{ width: 250, background: "#252538", padding: 10 }}>
        <h3>Linien</h3>

        {linien.map(l => (
          <div key={l.id} onClick={() => {
            setLinieId(l.id);
            ladeRoute(l.id);
          }}>
            Linie {l.name}
          </div>
        ))}

        <h3>Haltestellen</h3>

        {haltestellen.map(h => (
          <div key={h.id} onClick={() => add(h)}>
            + {h.name}
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div style={{ flex: 1, padding: 20 }}>
        <h2>Routen Editor</h2>

        {route.map((r, i) => (
          <div key={r.id}>
            {i + 1}. {r.name}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Routen;