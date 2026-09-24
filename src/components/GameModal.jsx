import PackageCollage from "./PackageCollage";

export default function GameModal({ game, onClose, onRent }) {
  if (!game) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/75 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="flex min-h-full items-center justify-center">
        <div
          className="w-full max-w-4xl overflow-hidden rounded-3xl border border-fuchsia-400/35 bg-slate-950 neon-border"
          onClick={(e) => e.stopPropagation()}
        >
        <div className="grid md:grid-cols-2">
          <div className="h-64 w-full md:h-full">
            <PackageCollage juegos={game.juegos} fallbackImage={game.image} alt={game.title} />
          </div>
          <div className="space-y-5 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[.25em] text-fuchsia-400">{game.genre} • Paquete</p>
                <h2 className="mt-2 text-2xl font-black">{game.title}</h2>
              </div>
              <button onClick={onClose} className="text-2xl text-slate-400 hover:text-white" aria-label="Cerrar">×</button>
            </div>
            <p className="text-sm leading-6 text-slate-300">{game.description}</p>

            <div className="flex items-center justify-between rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
              <span className="text-slate-400">Renta del paquete por 1 mes</span>
              <span className="text-2xl font-black text-fuchsia-400">${game.price}</span>
            </div>
            <button
              onClick={() => onRent(game)}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-4 py-3 font-bold neon-button"
            >
              🎮 Rentar paquete por 1 mes
            </button>
          </div>
        </div>

        {game.juegos && (
          <div className="border-t border-purple-500/20 p-6">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-fuchsia-400">
              Juegos incluidos en este paquete ({game.juegos.length})
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {game.juegos.map((juego) => (
                <div
                  key={juego.titulo}
                  className="overflow-hidden rounded-2xl border border-purple-500/20 bg-slate-900/70"
                >
                  <img
                    src={juego.imagen}
                    alt={juego.titulo}
                    className="h-36 w-full object-cover"
                  />
                  <div className="space-y-1.5 p-3">
                    <h3 className="text-sm font-bold text-white">{juego.titulo}</h3>
                    <p className="text-xs leading-5 text-slate-400">{juego.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
