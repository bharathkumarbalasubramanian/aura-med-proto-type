import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    localStorage.setItem('aura-theme', 'dark');
    document.documentElement.className = 'theme-dark';
    document.body.className = 'theme-dark';
  }, [theme]);

  const toggleTheme = () => {
    // Theme toggling disabled, forced to night mode
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
