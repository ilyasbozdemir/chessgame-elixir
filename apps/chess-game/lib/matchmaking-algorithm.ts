// ------------------------------------------------------
// Matchmaking Types
// ------------------------------------------------------
export type MatchmakingPlayer = {
  id: string
  name: string
  rating: number
  timeControl: string
  joinedAt: Date
  preferences: {
    minRating?: number
    maxRating?: number
    color?: "white" | "black" | "random"
  }
}

// ------------------------------------------------------
// Rating Range Expansion (Wait Time → Wider Range)
// ------------------------------------------------------
export function expandRatingRange(
  player: MatchmakingPlayer,
  waitTime: number
): MatchmakingPlayer {
  // 20 saniyede bir rating aralığı +50 genişlesin
  const expandStep = Math.floor(waitTime / 20) * 50

  const currentMin = player.preferences.minRating ?? player.rating - 200
  const currentMax = player.preferences.maxRating ?? player.rating + 200

  return {
    ...player,
    preferences: {
      ...player.preferences,
      minRating: currentMin - expandStep,
      maxRating: currentMax + expandStep,
    },
  }
}

// ------------------------------------------------------
// Best Match Algorithm
// ------------------------------------------------------
export function findBestMatch(
  player: MatchmakingPlayer,
  queue: MatchmakingPlayer[]
): MatchmakingPlayer | null {
  if (!queue.length) return null

  // Uygun oyuncuları filtrele
  const candidates = queue.filter((opponent) => {
    const r = opponent.rating
    const min = player.preferences.minRating ?? r - 200
    const max = player.preferences.maxRating ?? r + 200

    const timeMatch = opponent.timeControl === player.timeControl
    const ratingMatch = r >= min && r <= max

    return timeMatch && ratingMatch
  })

  if (candidates.length === 0) return null

  // En yakın rating farkına göre sıralayalım
  candidates.sort(
    (a, b) => Math.abs(player.rating - a.rating) - Math.abs(player.rating - b.rating)
  )

  return candidates[0] || null
}

// ------------------------------------------------------
// Estimated Wait Time Calculation
// ------------------------------------------------------
export function estimateWaitTime(
  player: MatchmakingPlayer,
  queue: MatchmakingPlayer[]
): number {
  const possibleMatches = queue.filter((opponent) => {
    const r = opponent.rating
    const min = player.preferences.minRating ?? r - 200
    const max = player.preferences.maxRating ?? r + 200

    const timeMatch = opponent.timeControl === player.timeControl
    const ratingMatch = r >= min && r <= max

    return timeMatch && ratingMatch
  })

  // Eğer aday yoksa → 30-60 saniye tahmin
  if (possibleMatches.length === 0) {
    return Math.floor(30 + Math.random() * 30)
  }

  // Aday varsa → 5-15 saniye arasında tahmin
  return Math.floor(5 + Math.random() * 10)
}
