function Topbar({ onLogout }) {
  return (
    <div style={{
      height: 50,
      background: "#11111a",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      color: "#fff"
    }}>
      
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src="/logo.png" width="30" />
        <strong>RBL Backoffice</strong>
      </div>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Topbar;