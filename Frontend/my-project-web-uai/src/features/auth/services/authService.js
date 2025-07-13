// src/features/auth/services/authService.js
const API_BASE = 'https://backend-web-sparkling-glitter-6216.fly.dev/api';

export async function login(nombreUsuario, password) {
  const resp = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombreUsuario, password }),
  });
  console.log(resp.body);
  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.message || 'Login fallido');
  }
  const { token, usuario } = await resp.json();
  return { token, usuario };
}

export function logout() {
  sessionStorage.removeItem('jwt');
}

export async function refreshToken() {
  // Implementar si tu API lo soporta
  throw new Error('refreshToken no implementado');
}
