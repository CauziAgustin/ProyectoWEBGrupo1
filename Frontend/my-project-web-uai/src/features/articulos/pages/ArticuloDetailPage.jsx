import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArticulo } from '../hooks/useArticulos.js';

export default function ArticuloDetailPage() {
  const { id } = useParams();
  const { articulo, loading } = useArticulo(id);

  if (loading) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-300">
        Cargando artículo…
      </p>
    );
  }
  if (!articulo) {
    return (
      <p className="text-center text-red-600 dark:text-red-400">
        Artículo no encontrado
      </p>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {articulo.nombre}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {articulo.descripcion}
      </p>
      <Link
        to={`/articulos/${id}/editar`}
        className="
          px-4 py-2 rounded
          bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700
          text-white transition
        "
      >
        Editar
      </Link>
    </div>
  );
}
