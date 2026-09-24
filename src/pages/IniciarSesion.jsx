import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function IniciarSesion() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación sencilla de campos obligatorios
    if (!formData.email || !formData.password) {
      setError('Por favor llena todos los campos.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // necesario para que la cookie de sesión se guarde
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || 'Correo o contraseña incorrectos.');
        return;
      }

      setError('');
      navigate(data.redirect || '/perfil'); // Redirige a la vista de Mi Perfil
    } catch (err) {
      setError('No se pudo conectar con el servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-800 rounded-xl p-8 shadow-xl border border-slate-700">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-2">GameHub</h2>
        <p className="text-slate-400 text-center text-sm mb-6">Ingresa a tu cuenta para gestionar tus juegos</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tuemail@ejemplo.com"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors shadow-md mt-2"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          ¿No tienes una cuenta?{' '}
          <Link to="/registro" className="text-indigo-400 hover:underline font-medium">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}