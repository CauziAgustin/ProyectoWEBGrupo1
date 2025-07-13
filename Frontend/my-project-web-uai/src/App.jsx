// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { AuthProvider }  from './features/auth/context/AuthContext.jsx';
import { RequireAuth }   from './features/auth/hooks/useRequireAuth.jsx';

import LoginPage          from './features/auth/pages/LoginPage.jsx';
import MainLayout         from './layouts/MainLayout.jsx';
import DashboardPage      from './pages/DashboardPage.jsx';
import ArticulosListPage  from './features/articulos/pages/ArticulosListPage.jsx';
import ArticuloFormPage   from './features/articulos/pages/ArticuloFormPage.jsx';
import ArticuloDetailPage from './features/articulos/pages/ArticuloDetailPage.jsx';
import UsuariosListPage   from './features/usuarios/pages/UsuariosListPage.jsx';
import UsuarioFormPage    from './features/usuarios/pages/UsuarioFormPage.jsx';
import UsuarioDetailPage  from './features/usuarios/pages/UsuarioDetailPage.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            { /* Ruta pública */ }
            <Route path="/login" element={<LoginPage />} />

            { /* Rutas protegidas bajo el mismo layout */ }
            <Route
              path="/"
              element={
                <RequireAuth>
                  <MainLayout />
                </RequireAuth>
              }
            >
              { /* Al entrar a “/” redirige a dashboard */ }
              <Route index element={<Navigate to="dashboard" replace />} />

              { /* Dashboard */ }
              <Route path="dashboard" element={<DashboardPage />} />

              { /* Módulo Artículos */ }
              <Route path="articulos">
                <Route index element={<ArticulosListPage />} />
                <Route path="nuevo" element={<ArticuloFormPage />} />
                <Route path=":id" element={<ArticuloDetailPage />} />
                <Route path=":id/editar" element={<ArticuloFormPage />} />
              </Route>

              { /* Módulo Usuarios */ }
              <Route path="usuarios">
                <Route index element={<UsuariosListPage />} />
                <Route path="nuevo" element={<UsuarioFormPage />} />
                <Route path=":id" element={<UsuarioDetailPage />} />
                <Route path=":id/editar" element={<UsuarioFormPage />} />
              </Route>
            </Route>

            { /* Cualquier otra ruta redirige al login */ }
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
