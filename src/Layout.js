import { Link } from "react-router-dom";

function Layout({ children, onLogout }) {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>

      {/* TOPBAR */}
      <div style={{
        height: 50,
        background: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px"
      }}>
        <span>🚍 RBL Leitstelle</span>
        <button onClick={onLogout}>Logout</button>
      </div>

      {/* MAIN */}
      <div style={{ display: "flex", flex: 1 }}>

        {/* SIDEBAR */}
        <div style={{
          width: 220,
          background: "#181828",
          padding: 20
        }}>
          <p><Link to="/" style={{ color: "white" }}>Dashboard</Link></p>
          <p><Link to="/fahrer" style={{ color: "white" }}>Fahrer</Link></p>
          <p><Link to="/linien" style={{ color: "white" }}>Linien</Link></p>
          <p><Link to="/haltestellen" style={{ color: "white" }}>Haltestellen</Link></p>
          <p><Link to="/routen" style={{ color: "white" }}>Routen</Link></p>
        </div>

        {/* WORKSPACE */}
        <div style={{
          flex: 1,
          padding: 20,
          background: "#1e1e2f"
        }}>
          {children}
        </div>

      </div>

      {/* STATUSBAR */}
      <div style={{
        height: 30,
        background: "#111",
        display: "flex",
        alignItems: "center",
        paddingLeft: 20
      }}>
        System bereit ✔
      </div>

    </div>
  );
}

export default Layout;