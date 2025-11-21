import { createContext, useContext, useEffect, useState } from "react";

/**
 * FavoritesContext
 * ----------------
 * Manages user's favourited episodes with persistence.
 *
 * Responsibilities:
 * - Loads favourites from localStorage on init.
 * - Persists changes back to localStorage.
 * - Exposes: favorites array, toggleFavorite(episode), isFavorite(id).
 *
 * Notes:
 * - Ensures stored value is parsed safely with try/catch.
 * - Adds `addedAt` timestamp when adding favorites.
 * - Expects a stable `id` on episodes; if missing, caller should provide a composite id.
 */

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const s = localStorage.getItem('podcast-favorites');
      return s ? JSON.parse(s) : [];
    } catch (e) {
      console.warn('Failed to read favorites from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('podcast-favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites', e);
    }
  }, [favorites]);

  const toggleFavorite = (episode) => {
    if (!episode || !episode.id) {
      console.warn('toggleFavorite called without episode.id', episode);
    }
    setFavorites(prev => {
      const exists = prev.some(f => f.id === episode.id);
      if (exists) return prev.filter(f => f.id !== episode.id);
      return [...prev, { ...episode, addedAt: new Date().toISOString() }];
    });
  };

  const isFavorite = (episodeId) => {
    if (!episodeId) return false;
    return favorites.some(f => f.id === episodeId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};
