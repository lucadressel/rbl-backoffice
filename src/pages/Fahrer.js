import { useState } from "react";

function Fahrer() {
  const [fahrer, setFahrer] = useState([
    { id: 1, name: "Max Mustermann", firma: "DB", status: "Vollzeit" }
  ]);

  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const gefiltert = fahrer.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", height: "100%" }}>

      {/* LISTE */}
      <div style={{ width: 300, background: "#1b1b2b", padding: 10 }}>
        
        <input
          placeholder="🔍 Suchen..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          style={searchBox}
        />

        {gefiltert.map(f => (
          <div key={f.id}
            onClick={() => setSelected(f)}
            style={{
              padding: 10,
              marginTop: 5,
              background: selected?.id === f.id ? "#3a3aff" : "#2a2a40",
              color: "white",
              cursor: "pointer"
            }}>
            {f.name}
          </div>
        ))}
      </div>

      {/* DETAIL */}
      <div style={{ flex: 1, padding: 20, color: "white" }}>
        {selected ? (
          <>
            <h2>{selected.name}</h2>
            <p>Firma: {selected.firma}</p>
            <p>Status: {selected.status}</p>
          </>
        ) : "Bitte auswählen"}
      </div>

    </div>
  );
}

const searchBox = {
  width: "100%",
  padding: 8,
  background: "#2a2a40",
  color: "white",
  border: "none"
};

export default Fahrer;