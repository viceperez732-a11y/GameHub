import { useState } from "react";

const initialSettings = {
  displayName: "Jugador Game Hub",
  email: "jugador@gamehub.com",
  language: "Español",
  rentalReminder: true,
  newReleases: true,
  weeklyDeals: false,
  compactCards: false,
  highContrast: true,
  autoplayTrailers: false,
  downloadQuality: "Alta",
};

export default function Configuracion() {
  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const resetSettings = () => {
    setSettings(initialSettings);
    setSaved(false);
  };

  const saveSettings = (event) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <main className="cyber-grid min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-fuchsia-400">
              Ventana de configuracion
            </p>
            <h1 className="mt-2 text-4xl font-black sm:text-5xl">Configuración</h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Personaliza tu cuenta, tus avisos de renta y la experiencia visual de Game Hub.
            </p>
          </div>

          {saved && (
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200">
              Cambios guardados correctamente.
            </div>
          )}
        </div>

        <form onSubmit={saveSettings} className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="space-y-6">
            <div className="rounded-[1.5rem] border border-purple-500/25 bg-slate-950/80 p-6 neon-border">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-black">Cuenta</h2>
                  <p className="mt-1 text-sm text-slate-400">Datos visibles para tu perfil gamer.</p>
                </div>
                <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-bold text-fuchsia-200">
                  Frontend demo
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-300">Nombre visible</span>
                  <input
                    value={settings.displayName}
                    onChange={(event) => updateSetting("displayName", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-purple-500/25 bg-slate-900 px-4 py-3 text-white outline-none focus:border-fuchsia-400/60"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-slate-300">Correo</span>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(event) => updateSetting("email", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-purple-500/25 bg-slate-900 px-4 py-3 text-white outline-none focus:border-fuchsia-400/60"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-semibold text-slate-300">Idioma</span>
                  <select
                    value={settings.language}
                    onChange={(event) => updateSetting("language", event.target.value)}
                    className="mt-2 w-full rounded-xl border border-purple-500/25 bg-slate-900 px-4 py-3 text-white outline-none focus:border-fuchsia-400/60"
                  >
                    <option>Español</option>
                    <option>Inglés</option>
                    <option>Portugués</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-purple-500/25 bg-slate-950/80 p-6 neon-border">
              <h2 className="text-2xl font-black">Notificaciones</h2>
              <p className="mt-1 text-sm text-slate-400">
                Activa los avisos que quieres recibir dentro de la aplicacion.
              </p>

              <div className="mt-6 grid gap-3">
                <SwitchRow
                  title="Recordatorio de rentas"
                  description="Avisar antes de que termine el mes de renta."
                  checked={settings.rentalReminder}
                  onChange={(value) => updateSetting("rentalReminder", value)}
                />
                <SwitchRow
                  title="Nuevos lanzamientos"
                  description="Mostrar alertas cuando lleguen juegos nuevos al catalogo."
                  checked={settings.newReleases}
                  onChange={(value) => updateSetting("newReleases", value)}
                />
                <SwitchRow
                  title="Ofertas semanales"
                  description="Recibir promociones simuladas de juegos populares."
                  checked={settings.weeklyDeals}
                  onChange={(value) => updateSetting("weeklyDeals", value)}
                />
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-purple-500/25 bg-slate-950/80 p-6 neon-border">
              <h2 className="text-2xl font-black">Experiencia</h2>
              <p className="mt-1 text-sm text-slate-400">
                Ajusta como se ven y reproducen los contenidos del sitio.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <SwitchRow
                  title="Tarjetas compactas"
                  description="Reducir el espacio visual de las cards."
                  checked={settings.compactCards}
                  onChange={(value) => updateSetting("compactCards", value)}
                />
                <SwitchRow
                  title="Alto contraste"
                  description="Aumentar contraste para mejorar lectura."
                  checked={settings.highContrast}
                  onChange={(value) => updateSetting("highContrast", value)}
                />
                <SwitchRow
                  title="Autoplay de trailers"
                  description="Simular reproduccion automatica de videos."
                  checked={settings.autoplayTrailers}
                  onChange={(value) => updateSetting("autoplayTrailers", value)}
                />
                <label className="rounded-2xl border border-purple-500/20 bg-slate-900/70 p-4">
                  <span className="text-sm font-bold text-white">Calidad de descarga</span>
                  <select
                    value={settings.downloadQuality}
                    onChange={(event) => updateSetting("downloadQuality", event.target.value)}
                    className="mt-3 w-full rounded-xl border border-purple-500/25 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-fuchsia-400/60"
                  >
                    <option>Baja</option>
                    <option>Media</option>
                    <option>Alta</option>
                    <option>Ultra</option>
                  </select>
                </label>
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-[1.5rem] border border-fuchsia-400/25 bg-slate-950/85 p-6 neon-border lg:sticky lg:top-24">
            <h2 className="text-2xl font-black">Resumen</h2>
            <div className="mt-5 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-4">
              <p className="text-sm text-slate-400">Usuario</p>
              <p className="mt-1 font-bold">{settings.displayName || "Sin nombre"}</p>
              <p className="mt-1 text-sm text-fuchsia-300">{settings.email || "Sin correo"}</p>
            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <SummaryLine label="Idioma" value={settings.language} />
              <SummaryLine label="Contraste" value={settings.highContrast ? "Activo" : "Normal"} />
              <SummaryLine label="Descarga" value={settings.downloadQuality} />
              <SummaryLine
                label="Avisos activos"
                value={
                  [settings.rentalReminder, settings.newReleases, settings.weeklyDeals].filter(Boolean).length
                }
              />
            </div>

            <div className="mt-6 grid gap-3">
              <button
                type="submit"
                className="neon-button rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-4 py-3 font-bold text-white transition hover:from-purple-500 hover:to-pink-500"
              >
                Guardar cambios
              </button>
              <button
                type="button"
                onClick={resetSettings}
                className="rounded-xl border border-purple-500/30 px-4 py-3 font-semibold text-purple-200 hover:bg-purple-500/10"
              >
                Restaurar valores
              </button>
            </div>
          </aside>
        </form>
      </section>
    </main>
  );
}

function SwitchRow({ title, description, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-purple-500/20 bg-slate-900/70 p-4 hover:border-fuchsia-400/50">
      <span>
        <span className="block text-sm font-bold text-white">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-slate-400">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 shrink-0 accent-fuchsia-500"
      />
    </label>
  );
}

function SummaryLine({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-purple-500/20 bg-slate-900/70 px-4 py-3">
      <span className="text-slate-400">{label}</span>
      <span className="font-bold text-white">{value}</span>
    </div>
  );
}
