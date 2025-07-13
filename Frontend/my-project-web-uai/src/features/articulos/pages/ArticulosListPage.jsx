import React from 'react';
import { Link } from 'react-router-dom';
import { useArticulosList, useDeleteArticulo } from '../hooks/useArticulos.js';

export default function ArticulosListPage() {
  const { data: articulos, loading } = useArticulosList();
  const { execute: delArticulo } = useDeleteArticulo();

  if (loading) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-300">
        Cargando artículos…
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Artículos
        </h2>
        <Link
          to="/articulos/nuevo"
          className="
            px-4 py-2 rounded
            bg-sky-500 hover:bg-sky-600 dark:bg-sky-700 dark:hover:bg-sky-800
            text-white
            transition
          "
        >
          Nuevo artículo
        </Link>
      </div>

      <div className="overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-sky-100 dark:bg-gray-700">
            <tr>
              <th className="p-2 text-gray-700 dark:text-gray-300">ID</th>
              <th className="p-2 text-gray-700 dark:text-gray-300">Nombre</th>
              <th className="p-2 text-gray-700 dark:text-gray-300">Descripción</th>
              <th className="p-2 text-gray-700 dark:text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {articulos.map(a => (
              <tr
                key={a.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="p-2 text-gray-800 dark:text-gray-200">{a.id}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{a.nombre}</td>
                <td className="p-2 text-gray-800 dark:text-gray-200">{a.descripcion}</td>
                <td className="p-2 space-x-3">
                  <Link
                    to={`/articulos/${a.id}`}
                    className="text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    Ver
                  </Link>
                  <Link
                    to={`/articulos/${a.id}/editar`}
                    className="text-yellow-600 dark:text-yellow-400 hover:underline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => delArticulo(a.id).then(() => window.location.reload())}
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
