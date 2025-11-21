import { useEffect, useRef, useState } from 'react'
import useAudio from '../hooks/useAudio'
import { FiPlay, FiPause } from 'react-icons/fi'

/**
 * AudioPlayer
 * -----------
 * Persistent bottom-fixed audio player that reads from AudioContext.
 *
 * Features:
 * - Displays artwork, title, show title.
 * - Play/pause button that calls togglePlay().
 * - Clickable progress bar that seeks audioRef.current.currentTime.
 * - Shows currentTime and duration (seconds).
 *
 * Implementation notes:
 * - Hidden when no currentEpisode is loaded (returns null).
 * - Uses inline seek calculation based on click position.
 */

export default function AudioPlayer() {
  const { currentEpisode, isPlaying, progress, togglePlay, audioRef } = useAudio()
  const [localProgress, setLocalProgress] = useState(0)
  const barRef = useRef(null)

  useEffect(() => setLocalProgress(progress ?? 0), [progress])

  const onSeek = (e) => {
    const audio = audioRef?.current
    if (!audio) return
    const rect = barRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const pct = Math.max(0, Math.min(1, clickX / rect.width))
    if (!isNaN(audio.duration) && audio.duration > 0) {
      audio.currentTime = pct * audio.duration
      setLocalProgress(pct * 100)
    }
  }

  if (!currentEpisode) return null

  return (
    <div className="fixed left-0 right-0 bottom-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur flex items-center gap-4 p-3 rounded-t-lg shadow-lg">
          <div className="flex items-center gap-3 min-w-0">
            <img src={currentEpisode.image || currentEpisode.showImage || 'https://via.placeholder.com/80'} alt={currentEpisode.title || currentEpisode.showTitle} className="w-16 h-16 object-cover rounded" />
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate">{currentEpisode.title ?? 'Untitled'}</div>
              <div className="text-xs text-gray-500 truncate">{currentEpisode.showTitle ?? ''}</div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-105 transition" aria-label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
              </button>

              <div className="flex-1">
                <div ref={barRef} onClick={onSeek} className="h-2 bg-gray-200 dark:bg-gray-800 rounded cursor-pointer relative">
                  <div style={{ width: `${Math.max(0, Math.min(100, localProgress))}%` }} className="h-2 bg-purple-600 dark:bg-green-500 rounded transition-[width]" />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{Math.floor((audioRef?.current?.currentTime ?? 0))}s</span>
                  <span>{Math.floor((audioRef?.current?.duration ?? 0)) ? `${Math.floor(audioRef.current.duration)}s` : ''}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-28 text-right text-xs text-gray-600">
            <div>Volume —</div>
          </div>
        </div>
      </div>
    </div>
  )
}
