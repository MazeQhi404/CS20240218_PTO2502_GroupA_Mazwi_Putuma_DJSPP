import { Link } from 'react-router-dom'
import { FiSun, FiMoon, FiHeart } from 'react-icons/fi'
import { useTheme } from '../contexts/ThemeContext.jsx'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="w-full bg-white dark:bg-gray-900/80 border-b dark:border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">Podcast App</Link>

        <div className="flex items-center gap-3">
          <Link to="/favorites" className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            <FiHeart /> <span className="hidden sm:inline">Favorites</span>
          </Link>

          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
