import { highways, provinces, totals } from '@/data/network-map.json'

/** Map cameras the network map knows (src/components/map). */
export type TourView = 'net' | 'iraq' | 'center' | 'south' | 'baghdad'

export type Stop = {
  key: string
  view: TourView
  /** What the map highlights: 'all' or a province / highway key. */
  selected: string
  /** Provinces and highways counted at this stop ('all' = the whole network). */
  members: string[] | 'all'
}

/** The five stops of "a journey across Iraq" (prompt 4, Network), in order. */
export const STOPS: Stop[] = [
  { key: 'iraq', view: 'iraq', selected: 'all', members: 'all' },
  { key: 'baghdad', view: 'baghdad', selected: 'baghdad', members: ['baghdad'] },
  { key: 'najaf', view: 'center', selected: 'najaf', members: ['najaf'] },
  { key: 'south-road', view: 'center', selected: 'highway-south', members: ['highway-south'] },
  {
    key: 'south',
    view: 'south',
    selected: 'basra',
    members: ['basra', 'samawa', 'nasiriyah', 'amara'],
  },
]

const PLACES = [...provinces, ...highways]

/** Boards at a stop and its types, most first (counts only, from network-map.json). */
export function stopCounts(stop: Stop): { total: number; types: [string, number][] } {
  if (stop.members === 'all')
    return {
      total: totals.boards,
      types: Object.entries(totals.byType).sort((a, b) => b[1] - a[1]),
    }
  const places = PLACES.filter((place) => stop.members.includes(place.k))
  const types: Record<string, number> = {}
  for (const place of places)
    for (const [type, n] of Object.entries(place.bt)) types[type] = (types[type] ?? 0) + (n ?? 0)
  return {
    total: places.reduce((sum, place) => sum + place.t, 0),
    types: Object.entries(types).sort((a, b) => b[1] - a[1]),
  }
}

/** Seconds on each stop while the tour plays by itself. */
export const STOP_SECONDS = 6

/**
 * Where the self-playing tour goes after stop `current` (0-based, `count`
 * stops). `rounds` = how many times it has already come back to the first
 * stop. Return the next stop's index, or null to stop playing.
 */
export function nextStop(current: number, count: number, rounds: number): number | null {
  // TODO(human)
  void rounds
  return current + 1 < count ? current + 1 : null
}
