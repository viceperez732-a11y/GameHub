import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setMessage("⚠ Completa todos los campos.");
      return;
    }

    if (form.password.length < 6) {
      setMessage("⚠ La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (form.password !== form.confirm) {
      setMessage("⚠ Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          confirm: form.confirm,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setMessage(`⚠ ${data.error || "No se pudo crear la cuenta."}`);
        return;
      }

      setMessage("✅ Cuenta creada correctamente. ¡Bienvenido a Game Hub!");
      setForm({ name: "", email: "", password: "", confirm: "" });
      setTimeout(() => navigate("/iniciar-sesion"), 1200);
    } catch (err) {
      setMessage("⚠ No se pudo conectar con el servidor.");
    }
  };

  return (
    <main className="cyber-grid flex min-h-[calc(100vh-145px)] items-center justify-center px-4 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-purple-500/25 bg-slate-950/80 neon-border lg:grid-cols-2">
        <div className="relative hidden min-h-[650px] overflow-hidden lg:block">
          <img src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1000&q=80" alt="Gaming" className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-purple-950/45 to-slate-950" />
          <div className="relative flex h-full flex-col justify-end p-10">
            <p className="text-xs font-bold uppercase tracking-[.3em] text-fuchsia-400">Game Hub</p>
            <h1 className="mt-3 text-5xl font-black">Tu próxima partida comienza aquí.</h1>
            <p className="mt-4 max-w-md text-slate-300">Crea tu cuenta para explorar y rentar tus juegos favoritos.</p>
          </div>
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[.25em] text-fuchsia-400">Únete al hub</p>
            <h2 className="mt-2 text-3xl font-black">Crea tu cuenta</h2>
            <p className="mt-2 text-sm text-slate-400">Regístrate para comenzar tu experiencia gamer.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              ["name", "Nombre", "Tu nombre", "text"],
              ["email", "Correo electrónico", "correo@ejemplo.com", "email"]
            ].map(([name, label, placeholder, type]) => (
              <label key={name} className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-200">{label}</span>
                <input
                  name={name}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full rounded-xl border border-purple-500/25 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-fuchsia-400/70 focus:ring-2 focus:ring-fuchsia-500/10"
                />
              </label>
            ))}

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-200">Contraseña</span>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full rounded-xl border border-purple-500/25 bg-slate-900 px-4 py-3 pr-12 text-white outline-none transition placeholder:text-slate-600 focus:border-fuchsia-400/70"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-200">Confirmar contraseña</span>
              <input
                name="confirm"
                type={showPassword ? "text" : "password"}
                value={form.confirm}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                className="w-full rounded-xl border border-purple-500/25 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-fuchsia-400/70"
              />
            </label>

            {message && (
              <div className={`rounded-xl border px-4 py-3 text-sm ${message.startsWith("✅") ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-300" : "border-amber-400/25 bg-amber-500/10 text-amber-200"}`}>
                {message}
              </div>
            )}

            <button type="submit" className="neon-button w-full rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-4 py-3 font-bold transition hover:from-purple-500 hover:to-pink-500">
              Crear cuenta
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
