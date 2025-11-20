import { useAudio } from '../hooks/useAudio'
import useFavorites from '../hooks/useFavorites'
import { FiHeart, FiPlay } from 'react-icons/fi'

//Card For a Single Episode ( used in ShowDetail and Favorites):
export default function EpisodeCard({ episode, showTitle}) {
    const { playEpisode, currentEpisode, isPlaying } = useAudio() // Audio Controls
    const { isFavorite, toggleFavorite } = useFavorites()         // Favorites Controls

    // Check if this exact episode is currently loaded and playing
    const isCurrentlyPlaying = currentEpisode?.episode === episode.episode &&
                               currentEpisode?.title === episode.title
    
    return (
        // Card with Hover Elevation:
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-xl transition">
            
            // Header: episode number + favorite heart button
            <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold">Episode {episode.episode}</h4>
                <button
                   onClick={() => toggleFavorite({ ...episode, showTitle })}
                   className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <FiHeart
                       size={20}
                       className={isFavorite(episode.episode) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                    />
                </button>
            </div>
            
            // Episode title (max 2 lines)
            <h3 className="font-bold text-lg mb-2 line-clamp-2">{episode.title}</h3>
            
            // Description preview (max 3 lines)
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                {episode.description}
            </p>
            
            // Play button – changes color/text when this episode is actively playing
            <button
               onClick={() => playEpisode({ ...episode, showTitle })}
               className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition ${
                isCurrentlyPlaying && isPlaying
                   ? 'bg-green-600 text-white'
                   : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
            >
                <FiPlay size={20} />
                {isCurrentlyPlaying && isPlaying ? 'Now Playing' : 'Play Episode'}
            </button>
        </div>
    )

}