import { useEffect, useState } from 'react'
import PodcastCard from '../components/PodcastCard'
import RecommendedCarousel from '../components/RecommendedCarousel'

/**
 * Home Page
 * ---------
 * Fetches show previews from API root `/` and renders:
 * - RecommendedCarousel at top
 * - Responsive grid of PodcastCard components
 *
 * Behavior:
 * - Handles loading state and logs errors.
 */

export default function Home() {
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        const res = await fetch('https://podcast-api.netlify.app')
        const data = await res.json()
        if (!mounted) return
        setShows(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error('Failed to load shows', e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <RecommendedCarousel shows={shows} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {shows.map(s => <PodcastCard key={s.id} show={s} />)}
      </div>
    </div>
  )
}
