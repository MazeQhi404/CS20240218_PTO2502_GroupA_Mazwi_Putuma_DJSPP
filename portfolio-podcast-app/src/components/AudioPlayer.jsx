import useAudio from '../hooks/useAudio'
import { FiPause, FiPlay } from 'react-icons/fi'

export default function AudioPlayer() {
    const { currentEpisode, isPlaying, progress, togglePlay } = useAudio()

    if (!currentEpisode) return null

    return (

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 shadow-2xl z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
            <img
               src={currentEpisode.image || '/placeholder.jpg'}
               alt="cover"
               className="w-14 h-14 rounded-lg"
            />
            <div className="flex-1">
                <p className="font-medium truncate">{currentEpisode.title}</p>
                <p className="text-sm text-gray-500 truncate">{currentEpisode.showTitle}</p>
            </div>
            
            <button
               onClick={togglePlay}
               className="p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full"
            >
                {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
            </button>
            
            <div className="w-64">
                <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                    className="h-full bg-purple-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
                </div>
            </div>
        </div>
       </div>
    )

}