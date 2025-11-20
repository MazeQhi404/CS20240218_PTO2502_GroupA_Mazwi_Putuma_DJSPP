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
}