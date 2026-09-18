import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { games } from "../data/games";

const rentalDurations = [
  { months: 1, label: "1 mes", discount: 0 },
  { months: 2, label: "2 meses", discount: 0.05 },
  { months: 3, label: "3 meses", discount: 0.1 },
];

const paymentMethods = ["Tarjeta gamer", "PayPal", "Saldo Game Hub"];

export default function RentarJuego() {
  const location = useLocation();
  const initialGameId = location.state?.gameId ?? games[0].id;
  const [selectedId, setSelectedId] = useState(initialGameId);
  const [duration, setDuration] = useState(rentalDurations[0]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [rentCompleted, setRentCompleted] = useState(false);

  const selectedGame = games.find((game) => game.id === Number(selectedId)) ?? games[0];

  const summary = useMemo(() => {
    const subtotal = selectedGame.price * duration.months;
    const discount = Math.round(subtotal * duration.discount);
    const serviceFee = duration.months > 1 ? 0 : 9;
    return {
      subtotal,
      discount,
      serviceFee,
      total: subtotal - discount + serviceFee,
    };
  }, [selectedGame, duration]);

  const confirmRent = () => {
    if (!acceptedTerms) return;
    setRentCompleted(true);
    setShowConfirmation(false);
  };

  return (
    <main className="cyber-grid min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[.25em] text-fuchsia-400">
            Ventana de renta
          </p>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">Rentar juego</h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            Simula una renta mensual, revisa el total y confirma tu pedido sin usar backend.
          </p>
        </div>

        {rentCompleted && (
          <div className="mb-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            Renta confirmada: {selectedGame.title} queda agregado a tu biblioteca simulada por {duration.label}.
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <section className="rounded-[1.5rem] border border-purple-500/25 bg-slate-950/80 p-5 neon-border sm:p-6">
            <div className="grid gap-6 md:grid-cols-[260px_1fr]">
              <div className="overflow-hidden rounded-2xl border border-purple-500/20 bg-slate-900">
                <img
                  src={selectedGame.image}
                  alt={selectedGame.title}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-300" htmlFor="rent-game">
                  Juego seleccionado
                </label>
                <select
                  id="rent-game"
                  value={selectedId}
                  onChange={(event) => {
                    setSelectedId(Number(event.target.value));
                    setRentCompleted(false);
                  }}
                  className="mt-2 w-full rounded-xl border border-purple-500/30 bg-slate-900 px-4 py-3 text-white outline-none focus:border-fuchsia-400/60"
                >
                  {games.map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.title}
                    </option>
                  ))}
                </select>

                <div className="mt-6">
                  <h2 className="text-3xl font-black">{selectedGame.title}</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    {selectedGame.category} / {selectedGame.genre} / {selectedGame.rating} estrellas
                  </p>
                  <p className="mt-4 max-w-2xl leading-7 text-slate-300">{selectedGame.description}</p>
                </div>

                <div className="mt-7">
                  <h3 className="font-bold">Duracion de la renta</h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {rentalDurations.map((item) => (
                      <button
                        key={item.months}
                        onClick={() => {
                          setDuration(item);
                          setRentCompleted(false);
                        }}
                        className={`rounded-2xl border p-4 text-left transition ${
                          duration.months === item.months
                            ? "border-fuchsia-400 bg-fuchsia-500/15 text-white"
                            : "border-purple-500/20 bg-slate-900/70 text-slate-300 hover:border-fuchsia-400/50"
                        }`}
                      >
                        <span className="block text-lg font-black">{item.label}</span>
                        <span className="mt-1 block text-xs text-slate-400">
                          {item.discount ? `${item.discount * 100}% de descuento` : "Plan basico"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-7">
                  <h3 className="font-bold">Metodo de pago</h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {paymentMethods.map((method) => (
                      <label
                        key={method}
                        className="flex cursor-pointer items-center gap-3 rounded-2xl border border-purple-500/20 bg-slate-900/70 p-4 text-sm text-slate-300 hover:border-fuchsia-400/50"
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === method}
                          onChange={() => setPaymentMethod(method)}
                          className="accent-fuchsia-500"
                        />
                        {method}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-[1.5rem] border border-fuchsia-400/25 bg-slate-950/85 p-6 neon-border lg:sticky lg:top-24">
            <h2 className="text-2xl font-black">Resumen</h2>
            <div className="mt-5 flex gap-4">
              <img
                src={selectedGame.image}
                alt={selectedGame.title}
                className="h-24 w-20 rounded-xl object-cover"
              />
              <div>
                <p className="font-bold">{selectedGame.title}</p>
                <p className="mt-1 text-sm text-slate-400">{duration.label}</p>
                <p className="mt-2 text-lg font-black text-fuchsia-400">${selectedGame.price} / mes</p>
              </div>
            </div>

            <div className="mt-6 space-y-3 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>${summary.subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Descuento</span>
                <span>-${summary.discount}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Servicio</span>
                <span>${summary.serviceFee}</span>
              </div>
              <div className="border-t border-purple-500/20 pt-3">
                <div className="flex justify-between text-lg font-black">
                  <span>Total</span>
                  <span className="text-fuchsia-400">${summary.total}</span>
                </div>
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
                className="mt-1 accent-fuchsia-500"
              />
              Acepto que esta renta es una simulacion academica de frontend.
            </label>

            <button
              onClick={() => setShowConfirmation(true)}
              disabled={!acceptedTerms}
              className="neon-button mt-6 w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-4 py-3 font-bold text-white transition enabled:hover:from-purple-500 enabled:hover:to-pink-500 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Confirmar renta
            </button>
            <Link
              to="/detalles"
              state={{ gameId: selectedGame.id }}
              className="mt-3 block rounded-xl border border-purple-500/30 px-4 py-3 text-center font-semibold text-purple-200 hover:bg-purple-500/10"
            >
              Volver a detalles
            </Link>
          </aside>
        </div>
      </section>

      {showConfirmation && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setShowConfirmation(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-fuchsia-400/35 bg-slate-950 p-6 neon-border"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.2em] text-fuchsia-400">
                  Confirmar renta
                </p>
                <h2 className="mt-2 text-2xl font-black">{selectedGame.title}</h2>
              </div>
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-2xl text-slate-400 hover:text-white"
                aria-label="Cerrar confirmacion"
              >
                x
              </button>
            </div>

            <div className="mt-6 flex gap-4 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
              <img
                src={selectedGame.image}
                alt={selectedGame.title}
                className="h-24 w-20 rounded-xl object-cover"
              />
              <div className="text-sm text-slate-300">
                <p className="font-bold text-white">{duration.label}</p>
                <p className="mt-1">Pago: {paymentMethod}</p>
                <p className="mt-3 text-lg font-black text-fuchsia-400">Total: ${summary.total}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="rounded-xl border border-purple-500/30 px-4 py-3 font-semibold text-slate-300 hover:bg-purple-500/10"
              >
                Cancelar
              </button>
              <button
                onClick={confirmRent}
                className="neon-button rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-4 py-3 font-bold text-white"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
