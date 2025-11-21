import useAudio from '../hooks/useAudio'
import useFavorites from '../hooks/useFavorites'
import { FiHeart, FiPlay } from 'react-icons/fi'

export default function EpisodeCard({ episode, showTitle }) {
  const { playEpisode, currentEpisode, isPlaying } = useAudio()
  const { isFavorite, toggleFavorite } = useFavorites()

  const episodeId = episode.id || `${episode.showId ?? 'unknown'}-${episode.season ?? 1}-${episode.episode ?? 0}`
  const isCurrentlyPlaying = currentEpisode?.id === episodeId

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-xl transition">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold">Episode {episode.episode ?? '—'}</h4>
        <button
          onClick={() => toggleFavorite({ ...episode, id: episodeId, showTitle })}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={isFavorite(episodeId) ? 'Remove favorite' : 'Add favorite'}
        >
          <FiHeart
            size={20}
            className={isFavorite(episodeId) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
            aria-hidden="true"
          />
        </button>
      </div>

      <h3 className="font-bold text-lg mb-2 line-clamp-2">{episode.title ?? 'Untitled Episode'}</h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
        {episode.description ?? ''}
      </p>

      <button
        onClick={() => playEpisode({ ...episode, id: episodeId, showTitle })}
        className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition ${
          isCurrentlyPlaying && isPlaying ? 'bg-green-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
        }`}
        aria-pressed={isCurrentlyPlaying && isPlaying}
      >
        <FiPlay size={20} />
        {isCurrentlyPlaying && isPlaying ? 'Now Playing' : 'Play Episode'}
      </button>
    </div>
  )
}
