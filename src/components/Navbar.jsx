import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `transition ${isActive ? "text-fuchsia-400" : "text-slate-300 hover:text-white"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-purple-500/20 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">🎮</span>
          <span className="text-xl font-black tracking-wider text-white">
            GAME <span className="text-fuchsia-400">HUB</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <NavLink to="/" className={linkClass}>Inicio</NavLink>
          <NavLink to="/catalogo" className={linkClass}>Catálogo</NavLink>
          <NavLink to="/registro" className={linkClass}>Registrarse</NavLink>
        </nav>

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
        </div>
      </div>
      <div className="flex gap-5 overflow-x-auto px-4 pb-3 text-sm md:hidden">
        <NavLink to="/" className={linkClass}>Inicio</NavLink>
        <NavLink to="/catalogo" className={linkClass}>Catálogo</NavLink>
        <NavLink to="/registro" className={linkClass}>Registrarse</NavLink>
      </div>
    </header>
  );
}
