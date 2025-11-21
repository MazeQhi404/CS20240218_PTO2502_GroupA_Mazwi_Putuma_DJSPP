// src/utils/normalizeEpisodes.js

// Build a stable episode id (use API id if present, otherwise composite)
export function buildEpisodeId(showId, seasonNumber, episodeNumber, maybeId) {
  if (maybeId) return String(maybeId)
  return `${showId}-${seasonNumber}-${episodeNumber}`
}

// Convert a flat episode list into an array of seasons:
// Input: episodesRaw = [ { season, episode, title, file, id?, ... }, ... ]
// Output: [ { season: 1, episodes: [ { id, showId, season, episode, ... }, ... ] }, ... ]
export function groupEpisodesBySeason(showId, episodesRaw = []) {
  if (!Array.isArray(episodesRaw)) return []

  const seasonsMap = new Map()

  episodesRaw.forEach(ep => {
    const seasonNum = ep.season ?? 1
    const episodeNum = ep.episode ?? ep.number ?? 0
    const id = buildEpisodeId(showId, seasonNum, episodeNum, ep.id)

    const normalized = {
      ...ep,
      id,
      showId,
      season: seasonNum,
      episode: episodeNum,
      // optional: ensure fields your UI expects
      title: ep.title ?? 'Untitled Episode',
      description: ep.description ?? '',
      file: ep.file ?? ep.audio ?? ep.audio_url ?? ''
    }

    if (!seasonsMap.has(seasonNum)) seasonsMap.set(seasonNum, [])
    seasonsMap.get(seasonNum).push(normalized)
  })

  const seasonsArr = Array.from(seasonsMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([seasonNumber, eps]) => ({
      season: seasonNumber,
      episodes: eps.sort((x, y) => (x.episode ?? 0) - (y.episode ?? 0))
    }))

  return seasonsArr
}
