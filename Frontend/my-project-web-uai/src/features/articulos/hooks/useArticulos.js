import { useState, useEffect } from 'react';
import {
  getArticulos,
  getArticuloBySku,
  createArticulo,
  updateArticulo,
  deleteArticulo
} from '../services/articulosService.js';

export function useArticulosList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticulos()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

export function useArticulo(sku) {
  const [articulo, setArticulo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sku) return;
    getArticuloBySku(sku)
      .then(setArticulo)
      .finally(() => setLoading(false));
  }, [sku]);

  return { articulo, loading };
}

export function useCreateArticulo() {
  const [loading, setLoading] = useState(false);

  const execute = async data => {
    setLoading(true);
    try {
      return await createArticulo(data);
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading };
}

export function useUpdateArticulo(sku) {
  const [loading, setLoading] = useState(false);

  const execute = async data => {
    setLoading(true);
    try {
      return await updateArticulo(sku, data);
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading };
}

export function useDeleteArticulo() {
  const [loading, setLoading] = useState(false);

  const execute = async sku => {
    setLoading(true);
    try {
      await deleteArticulo(sku);
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading };
}
