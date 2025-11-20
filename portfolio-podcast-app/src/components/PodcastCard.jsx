import { Link } from 'react-router-dom'
import { GENRE_MAP } from '../data/genres'
import { formatDistanceToNow } from 'date-fns'

// Reusable card that displays one podcast show
export default function PodcastCard({ show }) {
  return (
    // Makes the whole card clickable → goes to the show detail page
    <Link to={`/show/${show.id}`} className="block group">
      
      // Card container with hover shadow and dark mode support
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
        
        // Podcast cover image - scales slightly on hover
        <img
          src={show.image}
          alt={show.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition"
        />
        
        // Text content area
        <div className="p-4">
          // Show title (truncated to 2 lines if too long)
          <h3 className="font-bold text-lg line-clamp-2">{show.title}</h3>
          
          // Number of seasons with proper plural
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {show.seasons} season{show.seasons > 1 ? 's' : ''}
          </p>
          
          // Genre tags - converted from IDs using GENRE_MAP
          <div className="flex flex-wrap gap-2 my-2">
            {show.genres.map(id => (
              <span key={id} className="genre-tag">
                {GENRE_MAP[id] || 'Unknown'}
              </span>
            ))}
          </div>
          
          // Human-readable text
          <p className="text-xs text-gray-500">
            Updated {formatDistanceToNow(new Date(show.updated), { addSuffix: true })}
          </p>
        </div>
      </div>
    </Link>
  )
}