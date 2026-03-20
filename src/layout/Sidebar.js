import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{
      width: 220,
      background: "#151521",
      color: "#fff",
      padding: 20
    }}>
      
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <img src="/logo.png" width="100" />
        <div>RBL Backoffice</div>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Link to="/" style={link}>Dashboard</Link>
        <Link to="/fahrer" style={link}>Fahrer</Link>
        <Link to="/linien" style={link}>Linien</Link>
        <Link to="/routen" style={link}>Routen</Link>
      </nav>
    </div>
  );
}

const link = {
  color: "#ccc",
  textDecoration: "none",
  padding: 8
};

export default Sidebar;