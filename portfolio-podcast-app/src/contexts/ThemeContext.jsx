/*import { createContext, useContext, useEffect, useState } from 'react';
export const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const t = localStorage.getItem('theme');
      if (t === 'dark' || t === 'light') return t;
    } catch(e){}
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
    try { localStorage.setItem('theme', theme); } catch(e){}
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};*/

import { createContext, useContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const t = localStorage.getItem('theme');
      if (t === 'dark' || t === 'light') return t;
    } catch(e){}
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    // set both the class and a data attribute for robust styling checks
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    }
    try { localStorage.setItem('theme', theme); } catch(e){}
    // debug logging (remove in production)
    if (typeof window !== 'undefined' && window.console) {
      console.debug('[Theme] applied', theme, 'html.classList contains dark?', root.classList.contains('dark'));
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark';
      // debug log
      if (typeof window !== 'undefined' && window.console) {
        console.debug('[Theme] toggling from', t, 'to', next);
      }
      return next;
    });
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};


