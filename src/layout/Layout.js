import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Layout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh", background: "#1e1e2f" }}>
      
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar />
        
        <div style={{ padding: 20, color: "white" }}>
          {children}
        </div>
      </div>

    </div>
  );
}

export default Layout;