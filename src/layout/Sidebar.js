import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{
      width: 220,
      background: "#151521",
      color: "#fff",
      padding: 20
    }}>
      <h2 style={{ marginBottom: 30 }}>RBL</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        <Link to="/" style={linkStyle}>📊 Dashboard</Link>
        <Link to="/fahrer" style={linkStyle}>👨‍✈️ Fahrer</Link>
        <Link to="/linien" style={linkStyle}>🚌 Linien</Link>
      </nav>
    </div>
  );
}

const linkStyle = {
  color: "#ccc",
  textDecoration: "none",
  padding: "8px 10px",
  borderRadius: 5,
};

export default Sidebar;