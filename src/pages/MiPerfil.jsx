import React, { useState } from 'react';
import perfilData from '../data/perfilData.json';

export default function MiPerfil() {
  
  const [usuario, setUsuario] = useState(perfilData);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ ...usuario });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUsuario({ ...formData });
    setEditando(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-700">
        <h1 className="text-3xl font-bold mb-6 text-indigo-400 border-b border-slate-700 pb-3">
          Mi Perfil de Jugador
        </h1>

        {!editando ? (
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <img
              src={usuario.avatar}
              alt="Avatar de usuario"
              className="w-32 h-32 rounded-full border-4 border-indigo-500 object-cover shadow-lg"
            />
            <div className="flex-1 text-center md:text-left space-y-3">
              <h2 className="text-2xl font-semibold text-white">{usuario.nombre}</h2>
              <p className="text-indigo-400 font-medium">{usuario.username}</p>
              <p className="text-slate-400 text-sm">{usuario.email}</p>
              <p className="text-slate-300 mt-2 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                {usuario.bio}
              </p>
              
              <button
                onClick={() => {
                  setFormData({ ...usuario });
                  setEditando(true);
                }}
                className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors shadow-md"
              >
                Editar Perfil
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Usuario</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Biografía</label>
              <textarea
                name="bio"
                rows="3"
                value={formData.bio}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="px-5 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition-colors shadow-md"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => setEditando(false)}
                className="px-5 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Sección de Juegos Favoritos */}
        <div className="mt-8 pt-6 border-t border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-indigo-300">Juegos Favoritos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {usuario.juegosFavoritos && usuario.juegosFavoritos.map((juego) => (
              <div key={juego.id} className="bg-slate-900/80 p-4 rounded-lg border border-slate-700/60 flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-white">{juego.titulo}</h4>
                  <p className="text-xs text-indigo-400">{juego.genero}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}