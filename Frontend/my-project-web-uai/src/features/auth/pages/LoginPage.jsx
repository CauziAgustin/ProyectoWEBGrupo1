// src/features/auth/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form.username, form.password);
      navigate('/dashboard');
    } catch {
      setError('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-br from-sky-200 via-white to-yellow-100
        p-4
      "
    >
      <div
        className="
          bg-white bg-opacity-75 backdrop-blur-md
          max-w-md w-full
          rounded-2xl shadow-2xl
          p-8
        "
      >
        {/* Logo o icono */}
        <div className="w-16 h-16 mx-auto mb-6 bg-yellow-300 rounded-full" />

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
          ¡Bienvenido de nuevo!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Ingresa tus credenciales para continuar
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              required
              placeholder="tu.usuario"
              className="
                w-full px-4 py-3
                bg-white bg-opacity-90
                border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-sky-300
                transition
              "
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="
                w-full px-4 py-3
                bg-white bg-opacity-90
                border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-sky-300
                transition
              "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-3
              bg-sky-500 text-white font-semibold text-lg
              rounded-lg
              hover:bg-sky-600
              active:scale-95 transition-transform duration-150
              flex items-center justify-center
            `}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿No tienes cuenta?{' '}
          <button
            type="button"
            onClick={() => navigate('/registro')}
            className="text-yellow-500 hover:underline"
          >
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
}
