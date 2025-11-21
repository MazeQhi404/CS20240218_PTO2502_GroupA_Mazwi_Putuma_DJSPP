import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ShowDetail from './pages/ShowDetail'
import Favorites from './pages/Favorites'
import Header from './components/Header'
import AudioPlayer from './components/AudioPlayer'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pb-28">
      <Header />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <AudioPlayer />
    </div>
  )
}
