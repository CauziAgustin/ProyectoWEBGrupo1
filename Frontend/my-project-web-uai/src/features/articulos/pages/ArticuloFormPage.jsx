import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useArticulo,
  useCreateArticulo,
  useUpdateArticulo
} from '../hooks/useArticulos.js';

export default function ArticuloFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { articulo, loading: loadingArt } = useArticulo(id);
  const { execute: createArt, loading: creating } = useCreateArticulo();
  const { execute: updateArt, loading: updating } = useUpdateArticulo(id);

  const [form, setForm] = useState({ nombre: '', descripcion: '' });

  useEffect(() => {
    if (isEdit && articulo) {
      setForm({ nombre: articulo.nombre, descripcion: articulo.descripcion });
    }
  }, [isEdit, articulo]);

  if (isEdit && loadingArt) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-300">
        Cargando artículo…
      </p>
    );
  }

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (isEdit) await updateArt(form);
    else await createArt(form);
    navigate('/articulos');
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        {isEdit ? 'Editar Artículo' : 'Nuevo Artículo'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nombre
          </label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="
              w-full px-4 py-2
              bg-white dark:bg-gray-700
              border border-gray-300 dark:border-gray-600
              rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-600
              transition
            "
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            required
            className="
              w-full px-4 py-2
              bg-white dark:bg-gray-700
              border border-gray-300 dark:border-gray-600
              rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-600
              transition
            "
          />
        </div>
        <button
          type="submit"
          disabled={creating || updating}
          className="
            w-full px-6 py-2
            bg-sky-500 hover:bg-sky-600 dark:bg-sky-700 dark:hover:bg-sky-800
            text-white rounded-lg
            transition
          "
        >
          {isEdit
            ? updating
              ? 'Guardando…'
              : 'Guardar cambios'
            : creating
            ? 'Creando…'
            : 'Crear artículo'}
        </button>
      </form>
    </div>
);
}
