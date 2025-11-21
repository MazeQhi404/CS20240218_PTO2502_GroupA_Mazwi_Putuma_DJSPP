import { Link } from 'react-router-dom'
import useFavorites from '../hooks/useFavorites'
import { FiTrash2 } from 'react-icons/fi'
import { format } from 'date-fns'

// Page that lists all Favorited Episodes
export default function Favorites() {
    const { favorites, toggleFavorite } = useFavorites()
    
    //Group episodes by show title (so all episodes from the same podcast appear together)
    const grouped = favorites.reduce((acc, ep) => {
        if (!acc[ep.showTitle]) acc[ep.showTitle] = []
        acc[ep.showTitle].push(ep)
        return acc
    }, {})
    
    // Empty state - Show when the user has no favorites yet:
    if (favorites.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-xl">No Favourite Episodes Yet 🖤</p>
                <Link to="/" className="text-purple-600 hover:underline">Browse Podcasts</Link>
            </div>
        )
    }

    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Favorite Episodes</h1>
        
        {/*Loop through each show and display its favorited episodes */}
        {Object.entries(grouped).map(([showTitle, episodes]) => (
            <div key={showTitle} className="mb-10">
               {/*Show title as section header */}
                <h2 className="text-2xl font-semibold mb-4">{showTitle}</h2>
                
               {/*Grid of episode cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {episodes.map(ep => (
                        <div key={ep.episode} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    {/*Episode number + title */}
                                    <p className="font-medium">Episode {ep.episode}: {ep.title}</p>
                                    {/*Date the episode was added to favorites */}
                                    <p className="text-sm text-gray-500">
                                        Added {format(new Date(ep.addedAt), 'MMM d, yyyy')}
                                    </p>
                                </div>
                                
                                {/*Remove from favorites button */}
                                <button
                                  onClick={() => toggleFavorite(ep)}
                                  className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded"
                                >
                                    <FiTrash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>
    )
}