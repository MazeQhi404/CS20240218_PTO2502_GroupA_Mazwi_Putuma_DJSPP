import { useContext } from "react";
import { AudioContext } from '../contexts/AudioContext'

// Custom Hook to safely access the AudioContext
export default function useAudio() {
    const context = useContext(AudioContext)

    // Prevents bugs - gives clear error incase someone forgets to wrap with <AudioProvider>
    if (!context) throw new error('useAudio must be used within AudioProvider')
    
    return context    
}