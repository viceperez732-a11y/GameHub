import { useMemo, useState } from "react";
import GameCard from "../components/GameCard";
import GameModal from "../components/GameModal";
import paquetes from "../data/gamesData.json";

export default function Catalogo() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState(200);
  const [sort, setSort] = useState("popular");
  const [selectedGame, setSelectedGame] = useState(null);
  const [rentGame, setRentGame] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const genres = ["Todos", ...new Set(paquetes.map((g) => g.genre))];

  const filteredGames = useMemo(() => {
    const result = paquetes.filter((paquete) => {
      const term = search.toLowerCase();
      const matchesSearch =
        paquete.title.toLowerCase().includes(term) ||
        paquete.juegos?.some((juego) => juego.titulo.toLowerCase().includes(term));
      const matchesGenre = genre === "Todos" || paquete.genre === genre;
      const matchesPrice = paquete.price <= maxPrice;
      return matchesSearch && matchesGenre && matchesPrice;
    });

    return [...result].sort((a, b) => {
      if (sort === "priceLow") return a.price - b.price;
      if (sort === "priceHigh") return b.price - a.price;
      if (sort === "recent") return b.id - a.id;
      return b.rating - a.rating;
    });
  }, [search, genre, maxPrice, sort]);

  const toggleFavorite = (game) => {
    setFavorites((current) =>
      current.includes(game.id)
        ? current.filter((id) => id !== game.id)
        : [...current, game.id]
    );
  };

  return (
    <main className="cyber-grid min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[.25em] text-fuchsia-400">Explora Game Hub</p>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">Todos los paquetes</h1>
          <p className="mt-3 text-slate-400">Busca por paquete o por juego incluido, filtra y encuentra tu próxima renta.</p>
        </div>

        <div className="mb-7 grid gap-5 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-2xl border border-purple-500/20 bg-slate-950/70 p-5 neon-border lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Filtros</h2>
              <button
                onClick={() => { setGenre("Todos"); setMaxPrice(200); setSearch(""); setSort("popular"); }}
                className="text-xs text-fuchsia-300 hover:text-fuchsia-200"
              >
                Limpiar
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-200">Género</h3>
              <div className="mt-3 space-y-2">
                {genres.map((item) => (
                  <label key={item} className="flex cursor-pointer items-center gap-2 text-sm text-slate-400 hover:text-white">
                    <input
                      type="radio"
                      name="genre"
                      checked={genre === item}
                      onChange={() => setGenre(item)}
                      className="accent-fuchsia-500"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <div className="flex justify-between text-sm">
                <h3 className="font-semibold text-slate-200">Precio máximo</h3>
                <span className="font-bold text-fuchsia-400">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                step="1"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-4 w-full accent-fuchsia-500"
              />
              <div className="mt-1 flex justify-between text-xs text-slate-600"><span>$50</span><span>$200</span></div>
            </div>
          </aside>

          <section>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar paquete o juego incluido..."
                  className="w-full rounded-xl border border-purple-500/25 bg-slate-950/75 py-3 pl-11 pr-4 text-white outline-none placeholder:text-slate-600 focus:border-fuchsia-400/60"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-purple-500/25 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none focus:border-fuchsia-400/60"
              >
                <option value="popular">Más populares</option>
                <option value="priceLow">Menor precio</option>
                <option value="priceHigh">Mayor precio</option>
                <option value="recent">Más recientes</option>
              </select>
            </div>

            <div className="mb-5 flex items-center justify-between text-sm text-slate-500">
              <span>Mostrando {filteredGames.length} paquetes</span>
              <span>♥ {favorites.length} favoritos</span>
            </div>

            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    favorite={favorites.includes(game.id)}
                    onFavorite={toggleFavorite}
                    onDetails={setSelectedGame}
                    onRent={setRentGame}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-purple-500/20 bg-slate-950/70 p-12 text-center">
                <div className="text-5xl">🔎</div>
                <h2 className="mt-4 text-xl font-bold">No encontramos paquetes</h2>
                <p className="mt-2 text-sm text-slate-500">Prueba con otra búsqueda o cambia los filtros.</p>
              </div>
            )}
          </section>
        </div>
      </section>

      <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} onRent={setRentGame} />

      {rentGame && (
        <div className="fixed inset-0 z-[70] overflow-y-auto bg-black/75 p-4 backdrop-blur-sm" onClick={() => setRentGame(null)}>
          <div className="flex min-h-full items-center justify-center">
          <div className="w-full max-w-md rounded-3xl border border-fuchsia-400/35 bg-slate-950 p-6 neon-border" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.2em] text-fuchsia-400">Confirmar renta</p>
                <h2 className="mt-1 text-2xl font-black">{rentGame.title}</h2>
              </div>
              <button onClick={() => setRentGame(null)} className="text-2xl text-slate-400 hover:text-white">×</button>
            </div>
            {rentGame.juegos && (
              <div className="mt-4 rounded-2xl border border-purple-500/20 bg-slate-900/60 p-4">
                <p className="text-xs font-bold uppercase tracking-[.2em] text-fuchsia-400">Juegos incluidos</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-300">
                  {rentGame.juegos.map((juego) => (
                    <li key={juego.titulo} className="flex items-center gap-2">
                      <img src={juego.imagen} alt={juego.titulo} className="h-8 w-8 rounded-md object-cover" />
                      {juego.titulo}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
              <div className="flex justify-between text-sm text-slate-400"><span>Duración</span><span>1 mes</span></div>
              <div className="mt-3 flex justify-between text-sm text-slate-400"><span>Precio del paquete</span><span>${rentGame.price}</span></div>
              <div className="mt-4 border-t border-purple-500/20 pt-4 flex justify-between font-bold">
                <span>Total</span><span className="text-fuchsia-400">${rentGame.price}</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button onClick={() => setRentGame(null)} className="rounded-xl border border-purple-500/30 px-4 py-3 font-semibold text-slate-300 hover:bg-purple-500/10">Cancelar</button>
              <button
                onClick={() => { alert(`Renta simulada: paquete "${rentGame.title}" por 1 mes.`); setRentGame(null); }}
                className="rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-4 py-3 font-bold neon-button"
              >
                Confirmar renta
              </button>
            </div>
          </div>
          </div>
        </div>
      )}
    </main>
  );
}
