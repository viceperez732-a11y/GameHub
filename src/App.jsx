import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Registro from "./pages/Registro";
import Catalogo from "./pages/Catalogo";
import DetallesJuego from "./pages/DetallesJuego";
import RentarJuego from "./pages/RentarJuego";
import MiPerfil from "./pages/MiPerfil";
import IniciarSesion from "./pages/IniciarSesion";
import MisJuegos from "./pages/MisJuegos";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/detalles" element={<DetallesJuego />} />
          <Route path="/rentar" element={<RentarJuego />} />
          <Route path="/perfil" element={<MiPerfil />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/mis-juegos" element={<MisJuegos />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
