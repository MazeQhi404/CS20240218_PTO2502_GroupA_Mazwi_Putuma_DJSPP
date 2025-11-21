import { useMemo } from 'react'
import { useFavorites } from '../contexts/FavoritesContext.jsx'

export default function Favorites() {
  // use context directly to ensure provider exists
  const { favorites, toggleFavorite } = useFavorites()
  // group by showTitle
  const grouped = useMemo(() => {
    const map = new Map()
    favorites.forEach(f => {
      const title = f.showTitle || f.show || 'Unknown Show'
      if (!map.has(title)) map.set(title, [])
      map.get(title).push(f)
    })
    return Array.from(map.entries()).map(([showTitle, eps]) => ({ showTitle, episodes: eps }))
  }, [favorites])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      {grouped.length === 0 ? <div>No favorites yet</div> : (
        grouped.map(g => (
          <div key={g.showTitle} className="mb-6">
            <h2 className="font-semibold">{g.showTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {g.episodes.map(ep => (
                <div key={ep.id} className="p-4 bg-white dark:bg-gray-800 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold">{ep.title}</div>
                      <div className="text-xs text-gray-500">Episode {ep.episode}</div>
                    </div>
                    <button onClick={() => toggleFavorite(ep)} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Remove</button>
                  </div>
                  <div className="text-xs text-gray-500">Added: {new Date(ep.addedAt).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
