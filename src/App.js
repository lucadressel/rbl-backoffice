import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Layout from "./Layout";

import Fahrer from "./pages/Fahrer";
import Linien from "./pages/Linien";
import Haltestellen from "./pages/Haltestellen";
import Routen from "./pages/Routen";

function App() {
  const [eingeloggt, setEingeloggt] = useState(false);

  if (!eingeloggt) {
    return <Login onLogin={() => setEingeloggt(true)} />;
  }

  return (
    <Router>
      <Layout onLogout={() => setEingeloggt(false)}>
        <Routes>
          <Route path="/" element={<h1>Dashboard</h1>} />
          <Route path="/fahrer" element={<Fahrer />} />
          <Route path="/linien" element={<Linien />} />
          <Route path="/haltestellen" element={<Haltestellen />} />
          <Route path="/routen" element={<Routen />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;