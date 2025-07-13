// Mock de servicio de Artículos

let _articulos = [
  { id: 1, nombre: 'Batidora', descripcion: 'Para cocina' },
  { id: 2, nombre: 'Escoba', descripcion: 'Para limpieza' },
  { id: 3, nombre: 'Cuadro', descripcion: 'Para decoración' },
];

export async function getArticulos() {
  return new Promise(resolve => {
    setTimeout(() => resolve([..._articulos]), 300);
  });
}

export async function getArticuloById(id) {
  return new Promise((resolve, reject) => {
    const art = _articulos.find(a => a.id === Number(id));
    setTimeout(() => art ? resolve({ ...art }) : reject(new Error('No encontrado')), 300);
  });
}

export async function createArticulo({ nombre, descripcion }) {
  return new Promise(resolve => {
    const id = _articulos.length ? Math.max(..._articulos.map(a => a.id)) + 1 : 1;
    const nuevo = { id, nombre, descripcion };
    _articulos.push(nuevo);
    setTimeout(() => resolve({ ...nuevo }), 300);
  });
}

export async function updateArticulo(id, { nombre, descripcion }) {
  return new Promise((resolve, reject) => {
    const idx = _articulos.findIndex(a => a.id === Number(id));
    if (idx === -1) return setTimeout(() => reject(new Error('No encontrado')), 300);
    _articulos[idx] = { id: Number(id), nombre, descripcion };
    setTimeout(() => resolve({ ..._articulos[idx] }), 300);
  });
}

export async function deleteArticulo(id) {
  return new Promise((resolve, reject) => {
    const idx = _articulos.findIndex(a => a.id === Number(id));
    if (idx === -1) return setTimeout(() => reject(new Error('No encontrado')), 300);
    _articulos.splice(idx, 1);
    setTimeout(() => resolve(), 300);
  });
}
