import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import games from "../data/gamesData.json";

const rentalDurations = [
  { months: 1, label: "1 mes", discount: 0 },
  { months: 2, label: "2 meses", discount: 0.05 },
  { months: 3, label: "3 meses", discount: 0.1 },
];

const paymentMethods = ["Tarjeta", "PayPal", "Saldo Game Hub"];
const emptyPayment = { number: "", holder: "", expiry: "", cvv: "", email: "" };

export default function RentarJuego() {
  const location = useLocation();
  const initialGameId = location.state?.gameId ?? games[0].id;
  const [selectedId, setSelectedId] = useState(initialGameId);
  const [duration, setDuration] = useState(rentalDurations[0]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [payment, setPayment] = useState(emptyPayment);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [rentCompleted, setRentCompleted] = useState(false);
  const [orderReference, setOrderReference] = useState("");

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

  const cardDigits = payment.number.replace(/\D/g, "");
  const cardValid = cardDigits.length === 16 && payment.holder.trim().length >= 3 && /^(0[1-9]|1[0-2])\/\d{2}$/.test(payment.expiry) && /^\d{3,4}$/.test(payment.cvv);
  const paypalValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payment.email);
  const paymentReady = paymentMethod === "Tarjeta" ? cardValid : paymentMethod === "PayPal" ? paypalValid : true;

  const updatePayment = (key, value) => {
    setPayment((current) => ({ ...current, [key]: value }));
    setRentCompleted(false);
  };

  const formatCardNumber = (value) => value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const confirmRent = () => {
    if (!acceptedTerms || !paymentReady) return;
    setOrderReference(`GH-${String(Date.now()).slice(-6)}`);
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
            Renta confirmada: {selectedGame.title} queda agregado a tu biblioteca simulada por {duration.label}. Referencia: {orderReference}.
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
                <PaymentFields
                  method={paymentMethod}
                  payment={payment}
                  updatePayment={updatePayment}
                  formatCardNumber={formatCardNumber}
                  formatExpiry={formatExpiry}
                  cardValid={cardValid}
                  paypalValid={paypalValid}
                />
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
              disabled={!acceptedTerms || !paymentReady}
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
                <p className="mt-1 text-xs text-slate-400">
                  {paymentMethod === "Tarjeta" ? `Tarjeta terminada en ${cardDigits.slice(-4)}` : paymentMethod === "PayPal" ? payment.email : "Saldo disponible"}
                </p>
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

function PaymentFields({ method, payment, updatePayment, formatCardNumber, formatExpiry, cardValid, paypalValid }) {
  if (method === "Saldo Game Hub") {
    return (
      <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-4 text-sm text-emerald-200">
        Saldo disponible: <strong>$850.00 MXN</strong>
        <p className="mt-1 text-xs text-emerald-200/70">Se descontara el total al confirmar la simulacion.</p>
      </div>
    );
  }

  if (method === "PayPal") {
    return (
      <label className="mt-5 block text-sm font-semibold text-slate-300">
        Correo de PayPal
        <input type="email" value={payment.email} onChange={(event) => updatePayment("email", event.target.value)} placeholder="jugador@correo.com" className="mt-2 w-full rounded-xl border border-purple-500/25 bg-slate-900 px-4 py-3 text-white outline-none focus:border-fuchsia-400/60" />
        {payment.email && !paypalValid && <span className="mt-1 block text-xs text-rose-300">Escribe un correo valido.</span>}
      </label>
    );
  }

  return (
    <div className="mt-5 rounded-2xl border border-purple-500/20 bg-slate-900/60 p-4">
      <div className="flex items-center justify-between"><h3 className="font-bold">Datos de tarjeta</h3><span className="text-xs text-emerald-300">Checkout seguro</span></div>
      <p className="mt-1 text-xs text-slate-500">Usa datos de demostracion: 4242 4242 4242 4242</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-2 text-sm text-slate-300">Numero<input inputMode="numeric" value={payment.number} onChange={(event) => updatePayment("number", formatCardNumber(event.target.value))} placeholder="4242 4242 4242 4242" className="mt-2 w-full rounded-xl border border-purple-500/25 bg-slate-950 px-4 py-3 text-white outline-none focus:border-fuchsia-400/60" />{payment.number && !cardValid && <span className="mt-1 block text-xs text-amber-300">Captura 16 digitos.</span>}</label>
        <label className="sm:col-span-2 text-sm text-slate-300">Nombre del titular<input value={payment.holder} onChange={(event) => updatePayment("holder", event.target.value.slice(0, 40))} placeholder="NOMBRE DEL TITULAR" className="mt-2 w-full rounded-xl border border-purple-500/25 bg-slate-950 px-4 py-3 text-white outline-none focus:border-fuchsia-400/60" /></label>
        <label className="text-sm text-slate-300">Vencimiento<input inputMode="numeric" value={payment.expiry} onChange={(event) => updatePayment("expiry", formatExpiry(event.target.value))} placeholder="MM/AA" className="mt-2 w-full rounded-xl border border-purple-500/25 bg-slate-950 px-4 py-3 text-white outline-none focus:border-fuchsia-400/60" /></label>
        <label className="text-sm text-slate-300">CVV<input type="password" inputMode="numeric" value={payment.cvv} onChange={(event) => updatePayment("cvv", event.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" className="mt-2 w-full rounded-xl border border-purple-500/25 bg-slate-950 px-4 py-3 text-white outline-none focus:border-fuchsia-400/60" /></label>
      </div>
    </div>
  );
}
