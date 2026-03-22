import { useState } from "react";

export default function Tarife() {
  const [zones, setZones] = useState(["A", "B"]);
  const [ticketTypes, setTicketTypes] = useState(["Einzelfahrt", "Tageskarte"]);
  const [prices, setPrices] = useState([]);

  const [form, setForm] = useState({
    from: "A",
    to: "B",
    type: "Einzelfahrt",
    price: ""
  });

  const addPrice = () => {
    setPrices([...prices, form]);
    setForm({ ...form, price: "" });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🎟️ Tarife verwalten</h1>

      <div style={{ marginBottom: 20 }}>
        <h3>Neuen Preis anlegen</h3>

        <select
          value={form.from}
          onChange={(e) => setForm({ ...form, from: e.target.value })}
        >
          {zones.map((z) => (
            <option key={z}>{z}</option>
          ))}
        </select>

        <select
          value={form.to}
          onChange={(e) => setForm({ ...form, to: e.target.value })}
        >
          {zones.map((z) => (
            <option key={z}>{z}</option>
          ))}
        </select>

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          {ticketTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Preis €"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <button onClick={addPrice}>Speichern</button>
      </div>

      <h3>Gespeicherte Preise</h3>

      <table>
        <thead>
          <tr>
            <th>Von</th>
            <th>Nach</th>
            <th>Typ</th>
            <th>Preis</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((p, i) => (
            <tr key={i}>
              <td>{p.from}</td>
              <td>{p.to}</td>
              <td>{p.type}</td>
              <td>{p.price} €</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}