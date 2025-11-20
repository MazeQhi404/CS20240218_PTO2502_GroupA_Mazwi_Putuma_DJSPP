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

    
}

