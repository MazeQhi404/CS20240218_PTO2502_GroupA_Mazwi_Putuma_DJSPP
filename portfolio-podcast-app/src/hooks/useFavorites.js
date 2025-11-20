import { useContext } from 'react'
import { FavoritesContext } from '../contexts/FavoritesContext'

// Custom hook to access favorites state and actions
export default function useFavorites() {
  const context = useContext(FavoritesContext)
  
  // Clear dev error if someone uses the hook without wrapping in <FavoritesProvider>
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider')
  
  return context
}