import { useState } from "react";

function Fahrer() {
  const [fahrer] = useState([
    { id: 1, name: "Max Mustermann" },
    { id: 2, name: "Test Fahrer" }
  ]);

  const [selected, setSelected] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h2>Fahrer Editor</h2>

      <button>➕ Neu</button>
      <button>✏️ Bearbeiten</button>
      <button>🗑️ Löschen</button>

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
    </div>
  );
}

export default Fahrer;