import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";
import games from "../data/gamesData.json";

export default function Inicio() {
  const featured = games.slice(0, 9);

  return (
    <main className="cyber-grid">
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="relative z-10">
            <p className="mb-4 inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[.25em] text-fuchsia-300">
              Nueva generación gamer
            </p>
            <h1 className="max-w-2xl text-5xl font-black leading-[.95] tracking-tight sm:text-7xl">
              JUEGA SIN <span className="neon-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">LÍMITES</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Descubre tus próximos juegos favoritos y réntalos por un mes. Todo tu catálogo gamer en un solo lugar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/catalogo" className="neon-button rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-6 py-3 font-bold transition hover:scale-[1.02]">
                Explorar juegos →
              </Link>
              <Link to="/registro" className="rounded-xl border border-purple-400/30 bg-slate-900/70 px-6 py-3 font-bold text-purple-200 hover:bg-purple-500/10">
                Crear cuenta
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-8 rounded-full bg-fuchsia-500/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-purple-400/30 bg-slate-900 neon-border">
              <img
                src={games[0].image}
                alt={games[0].title}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent p-6 pt-20">
                <p className="text-xs font-bold uppercase tracking-[.25em] text-fuchsia-400">Destacado</p>
                <h2 className="mt-2 text-3xl font-black">{games[0].title}</h2>
                <p className="mt-1 text-slate-300">${games[0].price} / mes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-fuchsia-400">Selección Game Hub</p>
            <h2 className="mt-2 text-3xl font-black">🔥 Juegos destacados</h2>
          </div>
          <Link to="/catalogo" className="text-sm font-semibold text-purple-300 hover:text-fuchsia-300">Ver todos →</Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((game) => <GameCard key={game.id} game={game} />)}
        </div>
      </section>

      
    </main>
  );
}
