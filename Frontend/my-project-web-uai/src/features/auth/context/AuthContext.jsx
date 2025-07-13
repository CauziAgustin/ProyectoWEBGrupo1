/* eslint-disable react-refresh/only-export-components */
// src/features/auth/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout } from '../services/authService.js';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [jwt, setJwt]   = useState(null);

  // Al montar intenta cargar token de sessionStorage
  useEffect(() => {
    const token = sessionStorage.getItem('jwt');
    if (token) {
      setJwt(token);
      // Opcional: decodificar el token y setear `user` si lo deseas
    }
  }, []);

  // Función de login
  const login = async (nombreUsuario, password) => {
    const { token, usuario } = await apiLogin(nombreUsuario, password);
    sessionStorage.setItem('jwt', token);
    setJwt(token);
    setUser(usuario);
  };

  // Función de logout
  const logout = () => {
    apiLogout();
    sessionStorage.removeItem('jwt');
    setJwt(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, jwt, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
