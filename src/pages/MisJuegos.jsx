import React, { useState } from 'react';
import juegosIniciales from '../data/misJuegosData.json';

export default function MisJuegos() {
  const [juegos] = useState(juegosIniciales);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  // Filtrado dinámico en tiempo real según búsqueda y estado
  const juegosFiltrados = juegos.filter((juego) => {
    const coincideTitulo = juego.titulo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === 'Todos' || juego.estado === filtroEstado;
    return coincideTitulo && coincideEstado;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-2 text-indigo-400">Mis Juegos</h1>
        <p className="text-slate-400 mb-6">Gestiona y explora tu biblioteca personal de videojuegos.</p>

        {/* Barra de Filtros e Interacción */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-slate-800 p-4 rounded-xl border border-slate-700">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
          >
            <option value="Todos">Todos los estados</option>
            <option value="Jugando">Jugando</option>
            <option value="Completado">Completado</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </div>

        {/* Cuadrícula de Juegos */}
        {juegosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {juegosFiltrados.map((juego) => (
              <div
                key={juego.id}
                className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-indigo-500 transition-all shadow-lg flex flex-col"
              >
                <img
                  src={juego.imagen}
                  alt={juego.titulo}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-white">{juego.titulo}</h3>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          juego.estado === 'Jugando'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : juego.estado === 'Completado'
                            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}
                      >
                        {juego.estado}
                      </span>
                    </div>
                    <p className="text-sm text-indigo-400 mb-1">{juego.genero}</p>
                    <p className="text-xs text-slate-400">Plataforma: {juego.plataforma}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-700/60 flex justify-between items-center text-xs text-slate-300">
                    <span>⏱️ {juego.horasJugadas} hrs jugadas</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700/50 text-slate-400">
            No se encontraron juegos que coincidan con la búsqueda.
          </div>
        )}
      </div>
    </div>
  );
}