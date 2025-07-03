 /* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, refreshToken as apiRefresh } from '../services/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refresh, setRefresh] = useState(null);

  // Al montar, intenta recuperar tokens de storage/cookie
  useEffect(() => {
    const savedAccess = sessionStorage.getItem('accessToken');
    const savedRefresh = sessionStorage.getItem('refreshToken');
    if (savedAccess && savedRefresh) {
      setAccessToken(savedAccess);
      setRefresh(savedRefresh);
      // opcional: decodificar y setear user
    }
  }, []);

  // Función para loguear
  const login = async (username, password) => {
    const { accessToken, refreshToken, user: userInfo } = await apiLogin(username, password);
    setAccessToken(accessToken);
    setRefresh(refreshToken);
    setUser(userInfo);
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
  };

  // Función para refrescar token
  const refreshAuthToken = async () => {
    const { accessToken: newToken } = await apiRefresh(refresh);
    setAccessToken(newToken);
    sessionStorage.setItem('accessToken', newToken);
    return newToken;
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefresh(null);
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, refreshAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}
