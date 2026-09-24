import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Inicio", icon: "🏠" },
  { to: "/catalogo", label: "Catálogo", icon: "🕹️" },
  { to: "/detalles", label: "Detalles del juego", icon: "🔎" },
  { to: "/rentar", label: "Rentar juego", icon: "💳" },
  { to: "/mis-juegos", label: "Mis juegos", icon: "🎮" },
  { to: "/perfil", label: "Perfil", icon: "👤" },
  { to: "/iniciar-sesion", label: "Iniciar sesión", icon: "🔐" },
  { to: "/registro", label: "Registrarse", icon: "📝" },
  { to: "/configuracion", label: "Configuración", icon: "⚙️" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `transition ${isActive ? "text-fuchsia-400" : "text-slate-300 hover:text-white"}`;

  const drawerLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl border px-4 py-3 text-base transition ${
      isActive
        ? "border-fuchsia-400/50 bg-fuchsia-500/10 text-fuchsia-300"
        : "border-transparent text-slate-300 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white"
    }`;

  // Bloquea el scroll del body mientras el panel está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Cierra el panel con la tecla Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-purple-500/20 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🎮</span>
          <span className="text-xl font-black tracking-wider text-white">
            GAME <span className="text-fuchsia-400">HUB</span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/catalogo"
            className="hidden rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-200 transition hover:border-fuchsia-400/50 hover:bg-fuchsia-500/10 sm:block"
          >
            🔍 Buscar
          </Link>
          <button className="rounded-xl border border-purple-500/30 bg-slate-900 px-3 py-2 hover:border-fuchsia-400/50" aria-label="Carrito">
            🛒
          </button>
          <Link
            to="/registro"
            className="rounded-xl border border-purple-500/30 bg-slate-900 px-3 py-2 hover:border-fuchsia-400/50"
            aria-label="Cuenta"
          >
            👤
          </Link>

          {/* Botón hamburguesa */}
          <button
            onClick={() => setMenuOpen(true)}
            className="ml-1 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-purple-500/30 bg-slate-900 hover:border-fuchsia-400/50"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <span className="h-0.5 w-5 rounded bg-fuchsia-400"></span>
            <span className="h-0.5 w-5 rounded bg-fuchsia-400"></span>
            <span className="h-0.5 w-5 rounded bg-fuchsia-400"></span>
          </button>
        </div>
      </div>

      {/* Fondo oscuro (overlay) */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel lateral deslizante */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-72 max-w-[80vw] flex-col gap-2 border-l border-purple-500/20 bg-slate-950/95 p-5 shadow-2xl shadow-fuchsia-500/10 backdrop-blur-xl transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-lg font-black tracking-wider text-white">
            MENÚ <span className="text-fuchsia-400">HUB</span>
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-500/30 bg-slate-900 text-slate-300 hover:border-fuchsia-400/50 hover:text-white"
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={drawerLinkClass}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </header>
  );
}
