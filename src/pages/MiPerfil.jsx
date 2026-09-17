import React, { useState } from 'react';

export default function MiPerfil() {
  // Estado local para los datos del perfil
  const [usuario, setUsuario] = useState({
    nombre: "Vicio300",
    username: "@Pedrita_sys",
    email: "janne@ejemplo.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    bio: "Apasionada de los videojuegos RPG, Indie y de aventuras visuales 🚀",
    juegosFavoritos: [
      { id: 1, titulo: "Sky: Children of the Light", genero: "Aventura / Social", cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=300&auto=format&fit=crop" },
      { id: 2, titulo: "Minecraft", genero: "Sandbox / Survival", cover: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=300&auto=format&fit=crop" },
    ]
  });

  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ ...usuario });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    setUsuario({ ...formData });
    setEditando(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Banner y Tarjeta Principal del Perfil */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl relative">
          <div className="h-32 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900"></div>

          <div className="p-6 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-20 mb-4">
              <img
                src={usuario.avatar}
                alt="Avatar de perfil"
                className="w-28 h-28 rounded-full border-4 border-slate-900 object-cover shadow-lg"
              />
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl font-bold text-white">{usuario.nombre}</h1>
                <p className="text-purple-400 font-medium">{usuario.username}</p>
              </div>

              <button
                onClick={() => setEditando(!editando)}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-md hover:shadow-purple-500/20"
              >
                {editando ? "Cancelar" : "Editar perfil"}
              </button>
            </div>

            <p className="text-slate-300 text-sm mt-2 max-w-2xl">{usuario.bio}</p>
          </div>
        </div>

        {/* Formulario de Edición */}
        {editando && (
          <form onSubmit={handleGuardar} className="bg-slate-900 border border-purple-500/30 rounded-2xl p-6 space-y-4 shadow-lg">
            <h2 className="text-lg font-bold text-purple-400">Editar Información</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Biografía</label>
              <textarea
                name="bio"
                rows="3"
                value={formData.bio}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-white focus:outline-none focus:border-purple-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
            >
              Guardar Cambios
            </button>
          </form>
        )}

        {/* Sección de Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
            <span className="text-2xl font-black text-purple-400">12</span>
            <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mt-1">Juegos en Biblioteca</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
            <span className="text-2xl font-black text-indigo-400">48 hrs</span>
            <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mt-1">Tiempo Jugado</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
            <span className="text-2xl font-black text-pink-400">5</span>
            <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider mt-1">Reseñas Publicadas</p>
          </div>
        </div>

        {/* Sección: Juegos Favoritos */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Juegos Favoritos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {usuario.juegosFavoritos.map((juego) => (
              <div key={juego.id} className="flex items-center space-x-4 bg-slate-950 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all">
                <img src={juego.cover} alt={juego.titulo} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h3 className="font-semibold text-white text-sm">{juego.titulo}</h3>
                  <p className="text-xs text-slate-400">{juego.genero}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}