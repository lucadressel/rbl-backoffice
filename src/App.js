import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Layout from "./layout/Layout";

import Fahrer from "./pages/Fahrer";
import Linien from "./pages/Linien";
import Routen from "./pages/Routen";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <BrowserRouter>
      <Layout onLogout={() => setLoggedIn(false)}>
        <Routes>
          <Route path="/" element={<h2 style={{color:"white"}}>Dashboard</h2>} />
          <Route path="/fahrer" element={<Fahrer />} />
          <Route path="/linien" element={<Linien />} />
          <Route path="/routen" element={<Routen />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;