import { createContext, useContext, useRef, useState, useEffect } from "react";

export const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(typeof Audio !== "undefined" ? new Audio() : null);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const playEpisode = (episode) => {
    const audio = audioRef.current;
    if (!audio) return;
    try { audio.pause(); } catch(e){}
    setProgress(0);
    audio.src = episode.file;
    setCurrentEpisode(episode);
    const p = audio.play();
    if (p && typeof p.then === 'function') {
      p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      setIsPlaying(!audio.paused);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) { audio.play(); setIsPlaying(true); }
    else { audio.pause(); setIsPlaying(false); }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => {
      const dur = audio.duration || 0;
      const pct = dur > 0 ? (audio.currentTime / dur) * 100 : 0;
      setProgress(Number.isFinite(pct) ? Math.max(0, Math.min(100, pct)) : 0);
    };
    const onEnd = () => setIsPlaying(false);
    const onLoaded = () => update();
    audio.addEventListener('timeupdate', update);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('loadedmetadata', onLoaded);
    return () => {
      audio.removeEventListener('timeupdate', update);
      audio.removeEventListener('ended', onEnd);
      audio.removeEventListener('loadedmetadata', onLoaded);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isPlaying) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isPlaying]);

  return (
    <AudioContext.Provider value={{ audioRef, currentEpisode, isPlaying, progress, playEpisode, togglePlay }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
};
