import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { FiSun, FiMoon, FiHeart, FiSearch } from 'react-icons/fi'

export default function Header() {
    //Gets current theme and toggle function from ThemeContext
    const { theme, toggleTheme} = useTheme()

    return (
        // Sticky header that stays at the top with proper z-index and dark mode borders
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

                {/*App logo /Home Link: */}
                <Link to="/" className="text-2xl font-bold tracking-tight">
                  PodcastApp
                </Link>

                {/*Right-side action: Favorites link + theme toggle: */}
                <div className="flex items-center gap-6">

                    {/*Link to Favorites page with heart icon (text is hidden on small screens) */}
                    <Link to="/favorites" className="flex items-center gap-2 hover:text-purple-600 transition">
                      <FiHeart size={22} />
                      <span className="hidden sm:inline">Favorites</span>
                    </Link>

                    {/*Theme toggle button - shows Moon in light mode, Sun in dark mode: */}
                    <button
                      onClick={toggleTheme}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                        {theme === 'light' ? <FiMoon size={22} /> : <FiSun size={22} />}
                    </button>
                </div>
            </div>
        </header>
    )
}