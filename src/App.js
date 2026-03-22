import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./layout/Sidebar";

// Seiten
import Dashboard from "./pages/Dashboard";
import Fahrer from "./pages/Fahrer";
import Haltestellen from "./pages/Haltestellen";
import Linien from "./pages/Linien";
import Routen from "./pages/Routen";
import RoutenEditor from "./pages/RoutenEditor";
import Tarife from "./pages/Tarife";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div style={{
          flex: 1,
          background: "#0f0f1a",
          color: "#fff",
          minHeight: "100vh",
          padding: 20
        }}>
          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route path="/fahrer" element={<Fahrer />} />

            <Route path="/haltestellen" element={<Haltestellen />} />

            <Route path="/linien" element={<Linien />} />

            <Route path="/routen" element={<Routen />} />

            <Route path="/routen-editor" element={<RoutenEditor />} />

            <Route path="/tarife" element={<Tarife />} />

          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;