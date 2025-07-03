// src/features/usuarios/services/usuariosService.js

let _usuarios = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@ejemplo.com' },
  { id: 2, nombre: 'María García', email: 'maria@ejemplo.com' },
  { id: 3, nombre: 'Carlos López', email: 'carlos@ejemplo.com' },
];

export async function getUsuarios() {
  return new Promise(resolve => {
    setTimeout(() => resolve([..._usuarios]), 300);
  });
}

export async function getUsuarioById(id) {
  return new Promise((resolve, reject) => {
    const u = _usuarios.find(u => u.id === Number(id));
    setTimeout(() => (u ? resolve({ ...u }) : reject(new Error('No encontrado'))), 300);
  });
}

export async function createUsuario({ nombre, email }) {
  return new Promise(resolve => {
    const id = _usuarios.length ? Math.max(..._usuarios.map(u => u.id)) + 1 : 1;
    const nuevo = { id, nombre, email };
    _usuarios.push(nuevo);
    setTimeout(() => resolve({ ...nuevo }), 300);
  });
}

export async function updateUsuario(id, { nombre, email }) {
  return new Promise((resolve, reject) => {
    const idx = _usuarios.findIndex(u => u.id === Number(id));
    if (idx === -1) return setTimeout(() => reject(new Error('No encontrado')), 300);
    _usuarios[idx] = { id: Number(id), nombre, email };
    setTimeout(() => resolve({ ..._usuarios[idx] }), 300);
  });
}

export async function deleteUsuario(id) {
  return new Promise((resolve, reject) => {
    const idx = _usuarios.findIndex(u => u.id === Number(id));
    if (idx === -1) return setTimeout(() => reject(new Error('No encontrado')), 300);
    _usuarios.splice(idx, 1);
    setTimeout(() => resolve(), 300);
  });
}
