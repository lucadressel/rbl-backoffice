import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{
      width: 220,
      height: "100vh",
      background: "#1e1e2f",
      color: "white",
      padding: 20
    }}>
      <h2>RBL</h2>

      <p><Link to="/" style={{ color: "white" }}>Dashboard</Link></p>
      <p><Link to="/fahrer" style={{ color: "white" }}>Fahrer</Link></p>
      <p><Link to="/linien" style={{ color: "white" }}>Linien</Link></p>
    </div>
  );
}

export default Sidebar;