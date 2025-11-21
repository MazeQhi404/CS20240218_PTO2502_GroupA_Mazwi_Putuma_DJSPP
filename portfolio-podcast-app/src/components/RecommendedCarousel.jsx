import { Link } from 'react-router-dom'
import { GENRE_MAP } from '../data/genres'
import Slick from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
const Slider = Slick && Slick.default ? Slick.default : Slick

const settings = {
  dots: false, infinite: true, speed: 500, slidesToShow: 5, slidesToScroll: 1,
  autoplay: true, autoplaySpeed: 4000,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 4 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768,  settings: { slidesToShow: 2 } },
    { breakpoint: 640,  settings: { slidesToShow: 1 } },
  ],
}

export default function RecommendedCarousel({ shows = [] }) {
  const arr = Array.isArray(shows) ? shows : []
  const recommended = [...arr].sort(() => 0.5 - Math.random()).slice(0,10)
  if (!recommended.length) return null
  if (!Slider) {
    console.warn('react-slick not available')
    return null
  }
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Recommended For You</h2>
      <Slider {...settings}>
        {recommended.map(show => (
          <div key={String(show.id)} className="px-2">
            <Link to={`/show/${show.id}`} aria-label={`Open ${show.title}`}>
              <div className="text-center">
                <img src={show.image || 'https://via.placeholder.com/300x180?text=No+Image'} alt={show.title || 'Podcast cover'} className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-200" />
                <p className="mt-3 font-medium line-clamp-2">{show.title ?? 'Untitled Show'}</p>
                <p className="text-xs text-gray-500">{(Array.isArray(show.genres)? show.genres.slice(0,2):[]).map(id=>GENRE_MAP[id]||'Unknown').join(' • ')|| 'Unknown'}</p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  )
}
