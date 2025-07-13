// src/features/usuarios/pages/UsuarioFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useUsuario,
  useCreateUsuario,
  useUpdateUsuario
} from '../hooks/useUsuarios.js';

export default function UsuarioFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { usuario, loading: loadingUsr } = useUsuario(id);
  const { execute: createUsr, loading: creating } = useCreateUsuario();
  const { execute: updateUsr, loading: updating } = useUpdateUsuario(id);

  const [form, setForm] = useState({ nombre: '', email: '' });

  useEffect(() => {
    if (isEdit && usuario) {
      setForm({ nombre: usuario.nombre, email: usuario.email });
    }
  }, [isEdit, usuario]);

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (isEdit) {
      await updateUsr(form);
    } else {
      await createUsr(form);
    }
    navigate('/usuarios');
  };

  if (isEdit && loadingUsr) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-300">
        Cargando…
      </p>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        {isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
              rounded-lg
              focus:outline-none focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-600
              transition
            "
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="
              w-full px-4 py-2
              bg-white dark:bg-gray-700
              border border-gray-300 dark:border-gray-600
              rounded-lg
              focus:outline-none focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-600
              transition
            "
          />
        </div>
        <button
          type="submit"
          disabled={creating || updating}
          className="px-6 py-2 bg-sky-500 hover:bg-sky-600 dark:bg-sky-700 dark:hover:bg-sky-800 text-white rounded transition"
        >
          {isEdit
            ? updating
              ? 'Guardando...'
              : 'Guardar cambios'
            : creating
            ? 'Creando...'
            : 'Crear usuario'}
        </button>
      </form>
    </div>
  );
}
