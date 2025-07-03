// src/features/usuarios/pages/UsuarioDetailPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUsuario } from '../hooks/useUsuarios.js';

export default function UsuarioDetailPage() {
  const { id } = useParams();
  const { usuario, loading } = useUsuario(id);

  if (loading) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-300">
        Cargando usuario…
      </p>
    );
  }
  if (!usuario) {
    return (
      <p className="text-center text-red-600 dark:text-red-400">
        Usuario no encontrado
      </p>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {usuario.nombre}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Email: {usuario.email}
      </p>
      <Link
        to={`/usuarios/${id}/editar`}
        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white rounded transition"
      >
        Editar
      </Link>
    </div>
  );
}
