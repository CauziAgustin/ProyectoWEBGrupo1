// src/features/articulos/services/articulosService.js
const API_BASE = 'https://backend-web-sparkling-glitter-6216.fly.dev/api';

function authHeader() {
  const token = sessionStorage.getItem('jwt');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getArticulos() {
  const resp = await fetch(`${API_BASE}/articulos`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error('Error al listar artículos');
  return await resp.json();
}

export async function getArticuloBySku(sku) {
  const resp = await fetch(`${API_BASE}/articulos/${sku}`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error('Artículo no encontrado');
  return await resp.json();
}

export async function createArticulo(data) {
  const resp = await fetch(`${API_BASE}/articulos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data),
  });
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.message || 'Error al crear artículo');
  }
  return await resp.json();
}

export async function updateArticulo(sku, data) {
  const resp = await fetch(`${API_BASE}/articulos/${sku}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data),
  });
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.message || 'Error al actualizar artículo');
  }
  return await resp.json();
}

export async function deleteArticulo(sku) {
  const resp = await fetch(`${API_BASE}/articulos/${sku}`, {
    method: 'DELETE',
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error('Error al borrar artículo');
  return;
}
