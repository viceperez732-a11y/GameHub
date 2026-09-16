export default function GameModal({ game, onClose, onRent }) {
  if (!game) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/75 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-fuchsia-400/35 bg-slate-950 neon-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          <img src={game.image} alt={game.title} className="h-72 w-full object-cover md:h-full" />
          <div className="space-y-5 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[.25em] text-fuchsia-400">{game.genre}</p>
                <h2 className="mt-2 text-2xl font-black">{game.title}</h2>
              </div>
              <button onClick={onClose} className="text-2xl text-slate-400 hover:text-white" aria-label="Cerrar">×</button>
            </div>
            <p className="text-sm leading-6 text-slate-300">{game.description}</p>
            <div className="flex items-center justify-between rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
              <span className="text-slate-400">Renta por 1 mes</span>
              <span className="text-2xl font-black text-fuchsia-400">${game.price}</span>
            </div>
            <button
              onClick={() => onRent(game)}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-4 py-3 font-bold neon-button"
            >
              🎮 Rentar por 1 mes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
