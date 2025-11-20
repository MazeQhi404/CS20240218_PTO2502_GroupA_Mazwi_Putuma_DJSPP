import { createContext, useContext, useEffect, useState } from "react";

// Creating the context:
const FavoritesContext = createContext()

// Provider that manages the favorites list for the whole app:

export function FavoritesProvider({ children }) {

    //Load favorites from localStorage on first mount, otherwise start empty:
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('podcast-favorites')
        return saved ? JSON.parse(saved) : []
    })
}