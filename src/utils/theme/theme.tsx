import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCookieItem, setCookieItem } from '@/utils/helpers/cookieHelper';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider');
  }
  return context;
};

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialTheme = getCookieItem<string>('theme') || 'dark';
  const [theme, setTheme] = useState<string>(initialTheme);

  useEffect(() => {
    setCookieItem('theme', theme, { maxAge: 30 * 24 * 60 * 60, path: '/' });
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
