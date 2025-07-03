// src/features/usuarios/hooks/useUsuarios.js
import { useState, useEffect } from 'react';
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from '../services/usuariosService.js';

export function useUsuariosList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUsuarios().then(list => {
      setData(list);
      setLoading(false);
    });
  }, []);
  return { data, loading };
}

export function useUsuario(id) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUsuarioById(id)
      .then(u => setUsuario(u))
      .catch(() => setUsuario(null))
      .finally(() => setLoading(false));
  }, [id]);
  return { usuario, loading };
}

export function useCreateUsuario() {
  const [loading, setLoading] = useState(false);
  const execute = async payload => {
    setLoading(true);
    const result = await createUsuario(payload);
    setLoading(false);
    return result;
  };
  return { execute, loading };
}

export function useUpdateUsuario(id) {
  const [loading, setLoading] = useState(false);
  const execute = async payload => {
    setLoading(true);
    const result = await updateUsuario(id, payload);
    setLoading(false);
    return result;
  };
  return { execute, loading };
}

export function useDeleteUsuario() {
  const [loading, setLoading] = useState(false);
  const execute = async id => {
    setLoading(true);
    await deleteUsuario(id);
    setLoading(false);
  };
  return { execute, loading };
}
