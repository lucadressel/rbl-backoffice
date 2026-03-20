function Topbar() {
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
      <div>🚦 RBL Leitstelle</div>
      <button>Logout</button>
    </div>
  );
}

export default Topbar;