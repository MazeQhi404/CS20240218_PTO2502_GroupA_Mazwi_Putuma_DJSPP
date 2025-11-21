import { createContext, useContext, useEffect, useState } from "react";

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
