// src/layouts/MainLayout.jsx
import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth.js';
import { ThemeContext } from '../contexts/ThemeContext.jsx';

export default function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navItems = [
    { name: 'Dashboard', to: '/dashboard' },
    { name: 'Artículos',  to: '/articulos'  },
    { name: 'Usuarios',   to: '/usuarios'   },
    // …añade aquí tus demás secciones
  ];

  return (
    <div className="min-h-screen flex bg-sky-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white bg-opacity-80 dark:bg-gray-800 backdrop-blur-md shadow-md flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">
            MiProyecto
          </h2>
          <nav className="space-y-2">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition ${
                    isActive
                      ? 'bg-sky-200 dark:bg-sky-700 text-sky-800 dark:text-sky-200 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-sky-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 rounded transition"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="
          flex justify-between items-center
          bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80
          backdrop-blur-md px-8 py-4 shadow-sm
        ">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Hola, <span className="text-sky-600 dark:text-sky-400">{user?.username}</span>
          </h1>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded transition focus:outline-none"
          >
            {theme === 'light' ? '🌙 Modo oscuro' : '☀️ Modo claro'}
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-auto text-gray-800 dark:text-gray-200">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 text-center p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">&copy; 2025 MiProyectoWebUAI</p>
        </footer>
      </div>
    </div>
  );
}
