import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import games from "../data/games.json";

const gameDetails = {
  1: {
    developer: "CD Projekt Red",
    release: "10 dic. 2020",
    platforms: "PC / PlayStation / Xbox",
    tags: ["Accion", "RPG", "Mundo abierto"],
    requirements: ["Procesador i5 o Ryzen 5", "12 GB RAM", "70 GB disponibles"],
  },
  2: {
    developer: "Rockstar Games",
    release: "5 nov. 2019",
    platforms: "PC / PlayStation / Xbox",
    tags: ["Aventura", "Historia", "Mundo abierto"],
    requirements: ["Procesador i5", "8 GB RAM", "150 GB disponibles"],
  },
  3: {
    developer: "FromSoftware",
    release: "25 feb. 2022",
    platforms: "PC / PlayStation / Xbox",
    tags: ["RPG", "Fantasia", "Desafio"],
    requirements: ["Procesador i5", "12 GB RAM", "60 GB disponibles"],
  },
  4: {
    developer: "Rockstar Games",
    release: "14 abr. 2015",
    platforms: "PC / PlayStation / Xbox",
    tags: ["Accion", "Autos", "Mundo abierto"],
    requirements: ["Procesador i5", "8 GB RAM", "110 GB disponibles"],
  },
  5: {
    developer: "CD Projekt Red",
    release: "18 may. 2015",
    platforms: "PC / PlayStation / Xbox / Switch",
    tags: ["RPG", "Aventura", "Fantasia"],
    requirements: ["Procesador i5", "6 GB RAM", "50 GB disponibles"],
  },
  6: {
    developer: "Mojang Studios",
    release: "18 nov. 2011",
    platforms: "PC / Consolas / Mobile",
    tags: ["Construccion", "Supervivencia", "Creativo"],
    requirements: ["Procesador basico", "4 GB RAM", "2 GB disponibles"],
  },
  7: {
    developer: "Avalanche Software",
    release: "10 feb. 2023",
    platforms: "PC / PlayStation / Xbox / Switch",
    tags: ["Aventura", "Magia", "RPG"],
    requirements: ["Procesador i5", "16 GB RAM", "85 GB disponibles"],
  },
  8: {
    developer: "EA Sports",
    release: "29 sep. 2023",
    platforms: "PC / PlayStation / Xbox / Switch",
    tags: ["Deportes", "Futbol", "Competitivo"],
    requirements: ["Procesador i5", "8 GB RAM", "100 GB disponibles"],
  },
  9: {
    developer: "Bilalaika",
    release: "2 ago. 2023",
    platforms: "PC",
    tags: ["Suspenso", "Granja", "Indie"],
    requirements: ["Procesador basico", "4 GB RAM", "1 GB disponible"],
  },
};

export default function DetallesJuego() {
  const [selectedId, setSelectedId] = useState(games[0].id);
  const [search, setSearch] = useState("");
  const selectedGame = games.find((game) => game.id === selectedId) ?? games[0];
  const details = gameDetails[selectedGame.id];

  const relatedGames = useMemo(
    () =>
      games
        .filter((game) => game.id !== selectedGame.id)
        .filter((game) => game.genre === selectedGame.genre || game.category === selectedGame.category)
        .slice(0, 3),
    [selectedGame]
  );

  const searchResults = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="cyber-grid min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-fuchsia-400">
              Ventana de detalles
            </p>
            <h1 className="mt-2 text-4xl font-black sm:text-5xl">Detalles del juego</h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Consulta precio, descripcion, plataformas y requisitos antes de rentar.
            </p>
          </div>

          <div className="w-full max-w-md">
            <label className="text-sm font-semibold text-slate-300" htmlFor="game-search">
              Buscar juego
            </label>
            <input
              id="game-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cyberpunk, Elden Ring, Minecraft..."
              className="mt-2 w-full rounded-xl border border-purple-500/25 bg-slate-950/75 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-fuchsia-400/60"
            />
          </div>
        </div>

        {search && (
          <div className="mb-6 flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {searchResults.map((game) => (
              <button
                key={game.id}
                onClick={() => {
                  setSelectedId(game.id);
                  setSearch("");
                }}
                className="shrink-0 rounded-xl border border-purple-500/30 bg-slate-950/80 px-4 py-2 text-sm text-slate-200 transition hover:border-fuchsia-400/60"
              >
                {game.title}
              </button>
            ))}
          </div>
        )}

        <article className="overflow-hidden rounded-[1.5rem] border border-purple-500/25 bg-slate-950/80 neon-border">
          <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
            <div className="relative min-h-[420px] overflow-hidden">
              <img
                src={selectedGame.image}
                alt={selectedGame.title}
                className="h-full min-h-[420px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-slate-950/75 p-4 backdrop-blur">
                <p className="text-sm text-slate-400">Renta mensual</p>
                <p className="text-4xl font-black text-fuchsia-400">${selectedGame.price}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {details.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-bold text-fuchsia-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-4xl font-black text-white">{selectedGame.title}</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    {selectedGame.category} / {selectedGame.genre} / {selectedGame.rating} estrellas
                  </p>
                </div>

                <select
                  value={selectedId}
                  onChange={(event) => setSelectedId(Number(event.target.value))}
                  className="rounded-xl border border-purple-500/30 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none focus:border-fuchsia-400/60"
                >
                  {games.map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.title}
                    </option>
                  ))}
                </select>
              </div>

              <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300">
                {selectedGame.description}
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
                  <p className="text-xs uppercase tracking-[.2em] text-slate-500">Desarrollador</p>
                  <p className="mt-2 font-bold">{details.developer}</p>
                </div>
                <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
                  <p className="text-xs uppercase tracking-[.2em] text-slate-500">Lanzamiento</p>
                  <p className="mt-2 font-bold">{details.release}</p>
                </div>
                <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
                  <p className="text-xs uppercase tracking-[.2em] text-slate-500">Plataformas</p>
                  <p className="mt-2 font-bold">{details.platforms}</p>
                </div>
              </div>

              <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_280px]">
                <div className="rounded-2xl border border-purple-500/20 bg-slate-900/70 p-5">
                  <h3 className="font-bold text-white">Requisitos recomendados</h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-300">
                    {details.requirements.map((requirement) => (
                      <li key={requirement} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-fuchsia-400/25 bg-fuchsia-500/10 p-5">
                  <p className="text-sm text-slate-300">Listo para jugar por</p>
                  <p className="mt-1 text-3xl font-black text-fuchsia-300">1 mes</p>
                  <Link
                    to="/rentar"
                    state={{ gameId: selectedGame.id }}
                    className="neon-button mt-5 block rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-4 py-3 text-center font-bold text-white transition hover:from-purple-500 hover:to-pink-500"
                  >
                    Rentar este juego
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        <section className="mt-8">
          <h3 className="text-xl font-black">Juegos similares</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {(relatedGames.length ? relatedGames : games.filter((game) => game.id !== selectedGame.id).slice(0, 3)).map((game) => (
              <button
                key={game.id}
                onClick={() => setSelectedId(game.id)}
                className="overflow-hidden rounded-2xl border border-purple-500/20 bg-slate-950/70 text-left transition hover:-translate-y-1 hover:border-fuchsia-400/60"
              >
                <img src={game.image} alt={game.title} className="h-36 w-full object-cover" />
                <div className="p-4">
                  <p className="font-bold">{game.title}</p>
                  <p className="mt-1 text-sm text-fuchsia-300">${game.price} / mes</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
