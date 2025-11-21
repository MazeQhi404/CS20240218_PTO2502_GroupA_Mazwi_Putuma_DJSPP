// src/pages/ShowDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EpisodeCard from "../components/EpisodeCard";
import { formatDistanceToNow } from "date-fns";

/**
 * ShowDetail Page
 * ---------------
 * Fetches full show metadata from `/id/:id` and renders:
 * - show header (image, title, description, updated)
 * - season accordion (open / close)
 * - EpisodeCard list for selected season
 *
 * Behavior:
 * - Robust loading + error states.
 * - Guards against missing seasons/episodes arrays.
 * - Uses composite keys for EpisodeCard entries when necessary.
 */

export default function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSeason, setOpenSeason] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!res.ok) {
          throw new Error(`API error ${res.status}`);
        }

        const data = await res.json();
        if (!mounted) return;

        setShow(data);

        // open first season by default
        if (Array.isArray(data.seasons) && data.seasons.length > 0) {
          setOpenSeason(data.seasons[0].season);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Failed to load show");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8">Loading…</div>;
  if (error)
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-red-600">Error: {error}</div>
    );
  if (!show)
    return <div className="max-w-7xl mx-auto px-4 py-8">Show not found.</div>;

  const updatedDate = show.updated ? new Date(show.updated) : null;

  // ALWAYS convert seasons to a number
  const seasonsCount = Array.isArray(show.seasons)
    ? show.seasons.length
    : typeof show.seasons === "number"
    ? show.seasons
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={show.image || "https://via.placeholder.com/400?text=No+Image"}
          alt={show.title}
          className="w-full md:w-64 h-auto rounded shadow"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{show.title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {show.description}
          </p>

          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <span>Seasons: {seasonsCount}</span>
            <span className="mx-3">•</span>
            <span>
              {updatedDate
                ? `Updated ${formatDistanceToNow(updatedDate, {
                    addSuffix: true,
                  })}`
                : "Updated: unknown"}
            </span>
          </div>
        </div>
      </div>

      {/* SEASONS */}
      <div className="mt-10">
        {Array.isArray(show.seasons) && show.seasons.length > 0 ? (
          show.seasons.map((season) => (
            <div key={season.season} className="mb-8">
              <button
                onClick={() =>
                  setOpenSeason((s) =>
                    s === season.season ? null : season.season
                  )
                }
                className="w-full flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <div>
                  <div className="font-semibold">Season {season.season}</div>
                  <div className="text-xs text-gray-500">
                    {Array.isArray(season.episodes)
                      ? season.episodes.length
                      : 0}{" "}
                    episodes
                  </div>
                </div>
                <span className="text-xl">
                  {openSeason === season.season ? "▲" : "▼"}
                </span>
              </button>

              {openSeason === season.season && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {Array.isArray(season.episodes) &&
                    season.episodes.map((ep) => (
                      <EpisodeCard
                        key={`${show.id}-${season.season}-${ep.episode}`}
                        episode={{
                          ...ep,
                          showId: show.id,
                          season: season.season,
                        }}
                        showTitle={show.title}
                      />
                    ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">No episodes available.</div>
        )}
      </div>
    </div>
  );
}
