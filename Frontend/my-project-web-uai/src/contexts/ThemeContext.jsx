/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  // Al montar, leo localStorage o prefijo de sistema
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      console.log('ThemeProvider: cargué tema de localStorage →', saved);
      setTheme(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      console.log('ThemeProvider: cargué tema de sistema →', prefersDark ? 'dark' : 'light');
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Cada vez que cambie theme, aplico clase y guardo
  useEffect(() => {
    console.log('ThemeProvider: theme cambió a', theme);
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
