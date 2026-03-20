import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Fahrer from "./pages/Fahrer";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/fahrer" element={<Fahrer />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;