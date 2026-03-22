import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{
      width: 220,
      background: "#151521",
      color: "#fff",
      padding: 20,
      display: "flex",
      flexDirection: "column",
      height: "100vh"
    }}>
      
      {/* 🔷 LOGO */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <img src="/logo.png" width="100" alt="logo" />
        <div style={{ marginTop: 10, fontWeight: "bold" }}>
          RBL Backoffice
        </div>
      </div>

      {/* 🧭 NAVIGATION */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>

        <Link to="/" style={link}>📊 Hauptmenü</Link>

        <Link to="/fahrer" style={link}>👨‍✈️ Fahrerverwaltung</Link>

        <Link to="/haltestellen" style={link}>📍 Haltestellenverwaltung</Link>

        <Link to="/linien" style={link}>🚌 Linienverwaltung</Link>

        <Link to="/routen" style={link}>🧭 Routenverwaltung</Link>

	<Link to="/tarife" style={link}>🎟️ Tarifverwaltung</Link>

        <Link to="/routen-editor" style={link}>🛣️ Routen Editor</Link>

      </nav>

    </div>
  );
}

const link = {
  color: "#ccc",
  textDecoration: "none",
  padding: 10,
  borderRadius: 6,
  background: "#2a2a40"
};

export default Sidebar;