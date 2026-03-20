import { useState } from "react";

function Linien() {
  const [linien] = useState([
    { id: 1, name: "101" }
  ]);

  return (
    <div style={{ color: "white" }}>
      <h2>Linien</h2>

      {linien.map(l => (
        <div key={l.id}>{l.name}</div>
      ))}
    </div>
  );
}

export default Linien;