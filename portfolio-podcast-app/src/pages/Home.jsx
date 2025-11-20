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

    

}