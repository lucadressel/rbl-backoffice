import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Layout({ children, onLogout }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        <Topbar onLogout={onLogout} />

        {/* CONTENT */}
        <div style={{
          flex: 1,
          padding: 20,
          background: "#1e1e2f"
        }}>
          {children}
        </div>

        {/* STATUSBAR */}
        <div style={{
          height: 25,
          background: "#111",
          color: "#aaa",
          display: "flex",
          alignItems: "center",
          paddingLeft: 10
        }}>
          RBL Backoffice bereit ✔
        </div>

      </div>
    </div>
  );
}

export default Layout;