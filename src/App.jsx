import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Registro from "./pages/Registro";
import Catalogo from "./pages/Catalogo";
import MiPerfil from "./pages/MiPerfil";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/perfil" element={<MiPerfil />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
