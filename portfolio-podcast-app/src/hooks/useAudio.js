import { useContext } from "react";
import { AudioContext } from '../contexts/AudioContext';

/**
 * useAudio
 * --------
 * Hook wrapper that returns AudioContext values.
 *
 * Usage: const { playEpisode, currentEpisode, isPlaying, audioRef } = useAudio();
 *
 * Notes:
 * - Throws a helpful error if used outside AudioProvider.
 */

export default function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
}
