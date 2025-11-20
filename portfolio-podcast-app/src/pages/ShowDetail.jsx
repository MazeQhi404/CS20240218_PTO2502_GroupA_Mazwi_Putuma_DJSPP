import { useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { GENRE_MAP } from '../data/genres'
import { formatDistanceToNow } from 'date-fns'
import EpisodeCard from '../components/EpisodeCard'

//Page that shows full details for a single podcast show
export default function ShowDetail() {
  const { id } = useParams()                         // Get Show ID from URL
  const [show, setShow] = useState(null)             // Full Show Data
  const [loading, setLoading] = useState(true).      // Loading State
  const [openSeason, setOpenSeason] = useState(null) // Which Season is Expanded
   
  // Fetch show data by ID when the page loads or ID changes
  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then(res => res.json())
      .then(data => {
        setShow(data)
        setLoading(false)
        setOpenSeason(data.seasons[0]?.season || null) // open first season by default
      })
      .catch(() => setLoading(false))
  }, [id])
   
  // Loading and Error States:
  if (loading) return <div className="text-center py-20">Loading show details...</div>
  if (!show) return <div className="text-center py-20">Show not found</div>

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/" className="inline-block mb-6 text-purple-600 hover:underline">
        ← Back to Home
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img
            src={show.image}
            alt={show.title}
            className="w-full rounded-xl shadow-2xl"
          />
        </div>

        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{show.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {show.genres.map(gid => (
              <span key={gid} className="genre-tag">
                {GENRE_MAP[gid] || 'Unknown'}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Updated {formatDistanceToNow(new Date(show.updated), { addSuffix: true })}
          </p>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {show.description}
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-8">Seasons</h2>
        {show.seasons.map(season => (
          <div key={season.season} className="mb-6">
            <button
              onClick={() => setOpenSeason(openSeason === season.season ? null : season.season)}
              className="w-full text-left bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex justify-between items-center hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <div>
                <span className="text-xl font-semibold">Season {season.season}</span>
                <span className="ml-4 text-gray-600 dark:text-gray-400">
                  {season.episodes.length} episodes
                </span>
              </div>
              <span className="text-2xl">{openSeason === season.season ? '−' : '+'}</span>
            </button>

            {openSeason === season.season && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {season.episodes.map(episode => (
                  <EpisodeCard key={episode.episode} episode={episode} showTitle={show.title} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

