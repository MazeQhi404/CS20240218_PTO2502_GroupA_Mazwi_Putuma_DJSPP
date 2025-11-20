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

    // Toggle Function that flips between Light and Dark
    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

    // Provides Theme State and Toggle Function to All Descendents 
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

//Custom Hook for consuming the Theme Context anywhere in the App:
export const useTheme = () => useContext(ThemeContext)