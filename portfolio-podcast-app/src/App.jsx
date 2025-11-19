import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/Home.jsx';
import ShowDetail from './pages/ShowDetail.jsx';
import Favorites from './pages/Favorites.jsx';
import Header from './components/Header.jsx';
import AudioPlayer from './components/AudioPlayer.jsx';

/**
 * Main Application Component - Defines Routing and Global Layout:
 * 
 * Structure:
 * 🌸 BrowserRouter: enables client-side routing
 * 🌸 Persistent Header ( navigation, search, theme toggle, etc.)
 * 🌸 Routes: declarative page routing
 * 🌸 Fixed AudioPlayer: constant visibility at the bottom even when user is scrolling
 * 🌸 Bottom Padding to ensure page content isn't hidden behind the player
 */

export default function App() {
  return (
    <BrowserRouter>
       {/* 💋 Global layout wrapper with dark mode and safe area for fixed player */}
       <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pb-24">
        {/* Persistant Header */}
        <Header/>

        {/* Page content based on current URL */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show:id" element={<ShowDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>

        {/* Global Audio Player */}
        <AudioPlayer />
       </div>
    </BrowserRouter>
  );
}