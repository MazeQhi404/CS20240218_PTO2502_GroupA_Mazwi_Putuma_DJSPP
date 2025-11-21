import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { GENRE_MAP } from '../data/genres'

// Slider configuration – auto-plays, responsive, no dots
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 4 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768,  settings: { slidesToShow: 2 } },
    { breakpoint: 640,  settings: { slidesToShow: 1 } },
  ],
}

// Carousel shown at the top of Home page
export default function RecommendedCarousel({ shows }) {
  // Pick 10 random shows every time (simple shuffle + slice)
  const recommended = shows.sort(() => 0.5 - Math.random()).slice(0, 10)

  return (
    <div className="mb-12">
      {/*Section title*/}
      <h2 className="text-2xl font-bold mb-6">Recommended For You</h2>
      
      {/* react-slick carousel with the settings above*/}
      <Slider {...settings}>
        {recommended.map(show => (
          <div key={show.id} className="px-2">
            {/*Clickable card that goes to show detail page */}
            <Link to={`/show/${show.id}`}>
              <div className="text-center">
                {/*Show image with hover zoom */}
                <img
                  src={show.image}
                  alt={show.title}
                  className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition"
                />
                {/*// Title (max 2 lines) */}
                <p className="mt-3 font-medium line-clamp-2">{show.title}</p>
                {/*First two genres joined with bullet */}
                <p className="text-xs text-gray-500">
                  {show.genres.slice(0, 2).map(id => GENRE_MAP[id]).join(' • ')}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  )
}