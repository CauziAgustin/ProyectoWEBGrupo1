// src/features/usuarios/services/usuariosService.js
const API_BASE = 'https://backend-web-sparkling-glitter-6216.fly.dev/api';

function authHeader() {
  const token = sessionStorage.getItem('jwt');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getUsuarios() {
  const resp = await fetch(`${API_BASE}/usuarios`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error('Error al listar usuarios');
  return await resp.json();
}

export async function getUsuarioById(id) {
  const resp = await fetch(`${API_BASE}/usuarios/${id}`, {
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error('Usuario no encontrado');
  return await resp.json();
}

export async function createUsuario(data) {
  const resp = await fetch(`${API_BASE}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data),
  });
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.message || 'Error al crear usuario');
  }
  return await resp.json();
}

export async function updateUsuario(id, data) {
  const resp = await fetch(`${API_BASE}/usuarios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(data),
  });
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.message || 'Error al actualizar usuario');
  }
  return await resp.json();
}

export async function deleteUsuario(id) {
  const resp = await fetch(`${API_BASE}/usuarios/${id}`, {
    method: 'DELETE',
    headers: { ...authHeader() },
  });
  if (!resp.ok) throw new Error('Error al borrar usuario');
  return;
}
