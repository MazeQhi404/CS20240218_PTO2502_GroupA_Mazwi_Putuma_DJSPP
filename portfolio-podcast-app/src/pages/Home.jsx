import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-roter-dom'
import { GENRE_MAP } from '../data/genres'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import PodcastCard from '../components/PodcastCard' 
import RecommendedCarousel from '../components/RecommendedCarousel'

// Main Home Page Component:
export default function Home() {
    // State for data and UI controls
    const [shows, setShows] = useState([])           // All podcast shows from API
    const [loading, setLoading] = useState(true)     // Show loading message while fetching
    const [search, setSearch] = useState('')         // Search input text
    const [sortBy, setSortBy] = useState('updated' ) // Sort option: updated, az, za
    const [selectedGenre, setSelectedGenre] = useState('all') //Selected genre filter

    //Fetch all shows once when page loads
    useEffect(() => {
        fetch('https://podcast-app.netlify.app')
        .then(res => res.json())
        .then(data => {
            setShows(data)
            setLoading(false)
        })
        .catch(() => setLoading(false))
    }, [])

    // Filter and sort whenever search, sort, or genre changes (optimized with useMemo)
    const filteredAndSorted = useMemo(() => {
        let result = [...shows]

        // Search by Title:
        if (search) {
            result = result.filter(show => 
                show.title.toLowerCase().includes(search.toLowerCase())
            )
        }

        //Filter by Selected Genre
        if (selectedGenre !== 'all') {
            result = result.filter(show => show.genres.includes(Number(selectedGenre)))
        }

        // Sort Results:
        if (sortBy === 'az') result.sort((a, b) => a.title.localeCompare(b.title))
        if (sortBy === 'za') result.sort((a, b) => b.title.localeCompare(a.title))
        if (sortBy === 'updated') result.sort((a, b) => new Date(b.updated) - new Date(a.updated))

        return result
    }, [shows, search, sortBy, selectedGenre])

    // Show loading spinner while data is fetching
    if (loading) {
        return <div className="text-center py-20">Loading podcasts...</div>
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            //Top Featured Carousel:
            <RecommendedCarousel shows={shows} />

            //Search + Filters Section:
            <div className="my-8 space-y-4">
                <input
                  type="text"
                  placeholder="Search podcasts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full max-w-md px-4 py-3 rounded-lg border dark:bg-gray-800 dark:border-gray-600"
                />

                <div className="flex flex-wrap gap-4">
                // Sort Dropdown:
                   <select 
                     value={sortBy} 
                     onChange={(e) => setSortBy(e.target.value)}
                     className="px-4 py-2 rounded-lg border dark:bg-gray-800">
                     <option value="updated">Recently Updated</option>
                     <option value="az">A–Z</option>
                     <option value="za">Z–A</option>
                    </select>

                // Genre Filter Dropdown:
                    <select 
                      value={selectedGenre} 
                      onChange={(e) => setSelectedGenre(e.target.value)} 
                      className="px-4 py-2 rounded-lg border dark:bg-gray-800"
                      >
                        <option value="all">All Genres</option>
                        {Object.entries(GENRE_MAP).map(([id, name]) => (
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </select>
                </div>
            </div>
            // Grid of Podcast Cards
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredAndSorted.map(show => (
                    <PodcastCard key={show.id} show={show} />
                ))}
            </div>
            // Message When No results Match Filters
            {filteredAndSorted.length === 0 && (
                <p className="text-center py-20 text-gray-500">No podcasts found</p>
            )}
        </div>
    )
}