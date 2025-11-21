import { createContext, useContext, useEffect, useState } from 'react';

/**
 * ThemeContext
 * ------------
 * Provides light/dark theme state and persistence.
 *
 * Responsibilities:
 * - Reads/sanitizes theme from localStorage at startup.
 * - Falls back to OS preference when no valid stored value.
 * - Writes theme to localStorage and toggles html.classList + data-theme for CSS.
 * - Exposes: theme, toggleTheme().
 *
 * Notes:
 * - Adds debug logs for development; remove or gate behind env flag for production logs.
 * - Works in tandem with Tailwind configured for class-based dark mode.
 */

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


