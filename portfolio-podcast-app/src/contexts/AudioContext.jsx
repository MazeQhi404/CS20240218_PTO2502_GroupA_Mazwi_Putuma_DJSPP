import { createContext, useContext, useRef, useState, useEffect } from "react";

// Creates a global audio context:
const AudioContext = createContext()

//Provider that manages a single <audio> element for the entire app:
export function AudioProvider({ children }) {
    // Single persistant Audio instance via useRef (survives re-renders)
    const audioRef = useRef(new Audio())

    //Currently playing episode object:
    const [currentEpisode, setCurrentEpisode] = useState(null)

    //Playback state:
    const [isPlaying, setIsPlaying] = useState(false)

    //Playback progress as percentage (0-100):
    const [progress, setProgress] = useState(0)

    //Start playing a new episode (replaces current src and plays)
    const playEpisode = (episode) => {
        audioRef.current.src = episode.file 
        audioRef.current.play()
        setCurrentEpisode(episode)
        setIsPlaying(true)
    }

    // Toggle play/pause on the current audio element
    const togglePlay = () => {
        isPlaying ? audioRef.current.pause() : audioRef.current.play()
        setIsPlaying(!isPlaying)
    }

    // Updates progress bar as audio plays and resets isPlaying when track ends:
    useEffect(() => {
        const audio = audioRef.current
        const updateProgress = () => setProgress((audio.currentTime / audio.duration) * 100 || 0)

        audio.addEventListener('timeupdate', updateProgress)
        audio.addEventListener('ended', () => setIsPlaying(false))

        //Cleanup listeners on unmount
        return () => {
            audio.removeEventListener('timeupdate', updateProgress)
            audio.removeEventListener('ended', () => setIsPlaying(false))
        }
    }, []) // Empty dependency - runs once on mount

    //Warnes user if they try to close/refresh the page while audio is playing:
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isPlaying) {
                e.preventDefault()
                e.returnValue = '' //Triggers browser confirmation dialog
            }
        }
        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }, [isPlaying])

    // Exposes audio state and controls to the entire component tree

    return (
        <AudioContext.Provider value={{ currentEpisode, isPlaying, progress, playEpisode, togglePlay }}>
            {children}
        </AudioContext.Provider>
    )
}

// Custom Hook to access audio controls from any component :
export const useAudio = () => useContext(AudioContext)
