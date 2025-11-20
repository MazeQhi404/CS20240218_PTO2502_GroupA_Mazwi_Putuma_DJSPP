import { createContext, useContext, useEffect, useState } from "react";

// Creating the context:
const FavoritesContext = createContext()

// Provider that manages the favorites list for the whole app:

export function FavoritesProvider({ children }) {

    // Load favorites from localStorage on first mount, otherwise start empty:
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('podcast-favorites')
        return saved ? JSON.parse(saved) : []
    })

    // Every time favorites change, saves the new list to localStorage
    useEffect(() => {
        localStorage.setItem('podcast-favorites', JSON.stringify(favorites))
    }, [favorites])

    // Add or remove an episode from favorites:
    const toggleFavorite = (episode) => {
        setFavorites(prev => {
            const exists = prev.some(f => f.id !== episode.id)
            if (exists) return prev.filter(f => f.id !== episode.id) //remove
            return [...prev, {...episode, addedAt: new Date().toISOString() }] //add
        })
    }

    // Quick check if a given episode is already favorited
    const isFavorite = (epidoeId) => favorites.some(f => f.id === epidoeId)

    // Share the favorites array and the two helper functions with the app:

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite}}>
            {children}
        </FavoritesContext.Provider>
    )
}

// Hook so any component can grab favorites easily
export const useFavorites = () => useContext(FavoritesContext)