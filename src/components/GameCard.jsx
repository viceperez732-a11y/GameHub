import PackageCollage from "./PackageCollage";

export default function GameCard({ game, onRent, onDetails, favorite, onFavorite }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-purple-500/25 bg-slate-900/80 neon-border transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/60">
      <div className="relative aspect-[4/5] overflow-hidden">
        <PackageCollage
          juegos={game.juegos}
          fallbackImage={game.image}
          alt={game.title}
          className="transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        <button
          onClick={() => onFavorite?.(game)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-slate-950/70 backdrop-blur hover:border-fuchsia-400/60"
          aria-label="Favorito"
        >
          {favorite ? "♥" : "♡"}
        </button>
        <span className="absolute bottom-3 left-3 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/15 px-3 py-1 text-xs font-semibold text-fuchsia-200">
          {game.genre}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="font-bold text-white">{game.title}</h3>
          <p className="mt-1 text-xs text-slate-400">{game.category} • ⭐ {game.rating}</p>
          {game.juegos && (
            <p className="mt-2 line-clamp-2 text-xs text-slate-500">
              Incluye: {game.juegos.map((j) => j.titulo).join(", ")}
            </p>
          )}
        </div>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xl font-black text-fuchsia-400">${game.price}</span>
            <span className="text-xs text-slate-400"> / paquete</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onDetails?.(game)}
            className="rounded-xl border border-purple-500/40 px-3 py-2 text-xs font-semibold text-purple-200 transition hover:bg-purple-500/10"
          >
            Ver detalles
          </button>
          <button
            onClick={() => onRent?.(game)}
            className="neon-button rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-3 py-2 text-xs font-bold text-white transition hover:from-purple-500 hover:to-pink-500"
          >
            Rentar paquete
          </button>
        </div>
      </div>
    </article>
  );
}
