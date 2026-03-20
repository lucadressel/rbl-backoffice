import { useState } from "react";

function Routen() {
  const [route, setRoute] = useState([
    "Hbf", "Markt", "Schule"
  ]);

  return (
    <div style={{ padding: 20, color: "white" }}>
      <h2>Routen Editor</h2>

      {route.map((r, i) => (
        <div key={i} style={{
          padding: 10,
          background: "#2a2a40",
          marginBottom: 5
        }}>
          {i + 1}. {r}
        </div>
      ))}
    </div>
  );
}

export default Routen;