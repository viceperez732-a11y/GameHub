import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PackageCollage from "../components/PackageCollage";
import paquetes from "../data/gamesData.json";

// 👉 AQUÍ ELIGES QUÉ PAQUETES SALEN EN "MIS JUEGOS" (ids de gamesData.json):
//    1 = Paquete Mundo Abierto
//    2 = Paquete RPG Legendario
//    3 = Paquete Casual & Deportes
// Ejemplos:  [1]  → un paquete   |   [1, 2]  → dos paquetes   |   [1, 2, 3]  → todos
const MIS_PAQUETES_IDS = [1, 2];

export default function MisJuegos() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Los mismos paquetes del Catálogo, pero solo los que están en MIS_PAQUETES_IDS
  const misPaquetes = paquetes.filter((paquete) => MIS_PAQUETES_IDS.includes(paquete.id));

  // Búsqueda por nombre del paquete o por un juego incluido (igual que en el Catálogo)
  const paquetesFiltrados = misPaquetes.filter((paquete) => {
    const term = search.toLowerCase();
    return (
      paquete.title.toLowerCase().includes(term) ||
      paquete.juegos?.some((juego) => juego.titulo.toLowerCase().includes(term))
    );
  });

  return (
    <main className="cyber-grid min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[.25em] text-fuchsia-400">Tu biblioteca</p>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">Mis juegos</h1>
          <p className="mt-3 text-slate-400">Los paquetes que tienes y los juegos que incluye cada uno.</p>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar paquete o juego incluido..."
              className="w-full rounded-xl border border-purple-500/25 bg-slate-950/75 py-3 pl-11 pr-4 text-white outline-none placeholder:text-slate-600 focus:border-fuchsia-400/60"
            />
          </div>
          <span className="text-sm text-slate-500">
            {misPaquetes.length} {misPaquetes.length === 1 ? "paquete" : "paquetes"}
          </span>
        </div>

        {paquetesFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {paquetesFiltrados.map((paquete) => (
              <article
                key={paquete.id}
                className="group overflow-hidden rounded-2xl border border-purple-500/25 bg-slate-900/80 neon-border transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/60"
              >
                {/* Collage con las imágenes de los juegos del paquete (igual que el Catálogo) */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <PackageCollage
                    juegos={paquete.juegos}
                    fallbackImage={paquete.image}
                    alt={paquete.title}
                    className="transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/15 px-3 py-1 text-xs font-semibold text-fuchsia-200">
                    {paquete.genre}
                  </span>
                </div>

                <div className="space-y-3 p-4">
                  <div>
                    <h3 className="font-bold text-white">{paquete.title}</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      {paquete.category} • ⭐ {paquete.rating}
                    </p>
                  </div>

                  {/* Lista de juegos incluidos */}
                  <div className="rounded-xl border border-purple-500/20 bg-slate-950/60 p-3">
                    <p className="text-[11px] font-bold uppercase tracking-[.2em] text-fuchsia-400">
                      Juegos incluidos ({paquete.juegos.length})
                    </p>
                    <ul className="mt-2 space-y-2">
                      {paquete.juegos.map((juego) => (
                        <li key={juego.titulo} className="flex items-center gap-2 text-sm text-slate-300">
                          <img
                            src={juego.imagen}
                            alt={juego.titulo}
                            className="h-8 w-8 rounded-md object-cover"
                          />
                          {juego.titulo}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => navigate("/rentar", { state: { gameId: paquete.id } })}
                    className="neon-button w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-3 py-2 text-xs font-bold text-white transition hover:from-purple-500 hover:to-pink-500"
                  >
                    Rentar de nuevo
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-purple-500/20 bg-slate-950/70 p-12 text-center">
            <div className="text-5xl">🔎</div>
            <h2 className="mt-4 text-xl font-bold">No encontramos paquetes</h2>
            <p className="mt-2 text-sm text-slate-500">Prueba con otra búsqueda.</p>
          </div>
        )}
      </section>
    </main>
  );
}