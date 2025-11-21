import { Link } from 'react-router-dom'
import { GENRE_MAP } from '../data/genres'
import { formatDistanceToNow } from 'date-fns'

export default function PodcastCard({ show }) {
  const updatedDate = show?.updated ? new Date(show.updated) : null
  return (
    <Link to={`/show/${show.id}`} className="block group">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
        <img src={show?.image || 'https://via.placeholder.com/400x400?text=No+Image'} alt={show?.title || 'Podcast cover'} className="w-full h-48 object-cover group-hover:scale-105 transition" />
        <div className="p-4">
          <h3 className="font-bold text-lg line-clamp-2">{show?.title ?? 'Untitled Show'}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{show?.seasons ?? 0} season{show?.seasons > 1 ? 's' : ''}</p>
          <div className="flex flex-wrap gap-2 my-2">
            {(show?.genres || []).map(id => (
              <span key={id} className="genre-tag">{GENRE_MAP[id] || 'Unknown'}</span>
            ))}
          </div>
          <p className="text-xs text-gray-500">{updatedDate ? `Updated ${formatDistanceToNow(updatedDate, { addSuffix: true })}` : 'Updated unknown'}</p>
        </div>
      </div>
    </Link>
  )
}
