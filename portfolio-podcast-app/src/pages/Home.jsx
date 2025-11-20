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
        <div>
            
        </div>
    )



}