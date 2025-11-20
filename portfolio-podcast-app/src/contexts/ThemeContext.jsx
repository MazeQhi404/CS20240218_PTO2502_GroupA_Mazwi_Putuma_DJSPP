import { createContext, useContext, useEffect, useState } from "react";

/**
 *  Theme Context:
 * Provides app-wide theme state (light/dark) and toggle function
 */
const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.documentElement.classList.toggle('dark', theme === 'dark')
    }, [theme])

    
}