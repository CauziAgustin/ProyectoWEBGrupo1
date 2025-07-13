// src/features/usuarios/pages/UsuariosListPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useUsuariosList, useDeleteUsuario } from '../hooks/useUsuarios.js';

export default function UsuariosListPage() {
  const { data: usuarios, loading } = useUsuariosList();
  const { execute: delUsuario } = useDeleteUsuario();

  const handleDelete = async id => {
    if (window.confirm('¿Borrar este usuario?')) {
      await delUsuario(id);
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-300">
        Cargando usuarios…
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Usuarios
        </h2>
        <Link
          to="/usuarios/nuevo"
          className="px-4 py-2 bg-sky-500 hover:bg-sky-600 dark:bg-sky-700 dark:hover:bg-sky-800 text-white rounded transition"
        >
          Nuevo usuario
        </Link>
      </div>

      <div className="overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-sky-100 dark:bg-gray-700">
            <tr>
              <th className="p-2 text-gray-700 dark:text-gray-300">ID</th>
              <th className="p-2 text-gray-700 dark:text-gray-300">Nombre</th>
              <th className="p-2 text-gray-700 dark:text-gray-300">Email</th>
              <th className="p-2 text-gray-700 dark:text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr
                key={u.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="p-2 text-gray-800 dark:text-gray-200">{u.id}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{u.nombre}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{u.email}</td>
                <td className="p-2 space-x-2">
                  <Link
                    to={`/usuarios/${u.id}`}
                    className="text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    Ver
                  </Link>
                  <Link
                    to={`/usuarios/${u.id}/editar`}
                    className="text-yellow-600 dark:text-yellow-400 hover:underline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-600 dark:text-red-400 hover:underline"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
