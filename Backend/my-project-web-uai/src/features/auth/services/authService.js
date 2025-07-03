// src/features/auth/services/authService.js

// Mock de login: solo acepta admin/admin
export async function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        resolve({
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          user: {
            username: 'admin',
            role: 'administrator',
          },
        });
      } else {
        reject(new Error('Credenciales inválidas'));
      }
    }, 500); // simula medio segundo de latencia
  });
}

// Mock de refresh (por si lo llamas)
export async function refreshToken(refreshToken) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (refreshToken === 'mock-refresh-token') {
        resolve({ accessToken: 'new-mock-access-token' });
      } else {
        reject(new Error('Refresh token inválido'));
      }
    }, 500);
  });
}


/*const API_BASE = '/api/auth';

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return await res.json(); // { accessToken, refreshToken, user }
}

export async function refreshToken(refreshToken) {
  const res = await fetch(`${API_BASE}/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken })
  });
  if (!res.ok) throw new Error('Refresh failed');
  return await res.json(); // { accessToken }
}
*/