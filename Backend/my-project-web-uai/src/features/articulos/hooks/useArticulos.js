import { useState, useEffect } from 'react';
import {
  getArticulos,
  getArticuloById,
  createArticulo,
  updateArticulo,
  deleteArticulo
} from '../services/articulosService.js';

export function useArticulosList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getArticulos().then(list => {
      setData(list);
      setLoading(false);
    });
  }, []);
  return { data, loading };
}

export function useArticulo(id) {
  const [articulo, setArticulo] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getArticuloById(id)
      .then(a => setArticulo(a))
      .catch(() => setArticulo(null))
      .finally(() => setLoading(false));
  }, [id]);
  return { articulo, loading };
}

export function useCreateArticulo() {
  const [loading, setLoading] = useState(false);
  const execute = async (payload) => {
    setLoading(true);
    const result = await createArticulo(payload);
    setLoading(false);
    return result;
  };
  return { execute, loading };
}

export function useUpdateArticulo(id) {
  const [loading, setLoading] = useState(false);
  const execute = async (payload) => {
    setLoading(true);
    const result = await updateArticulo(id, payload);
    setLoading(false);
    return result;
  };
  return { execute, loading };
}

export function useDeleteArticulo() {
  const [loading, setLoading] = useState(false);
  const execute = async (id) => {
    setLoading(true);
    await deleteArticulo(id);
    setLoading(false);
  };
  return { execute, loading };
}
