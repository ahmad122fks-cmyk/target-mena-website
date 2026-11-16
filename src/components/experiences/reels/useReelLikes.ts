import { useState } from 'react'

/**
 * Like and follow state of the reels (this visit only, nothing stored or
 * counted). `burst` replays the heart on the reel liked last.
 */
export function useReelLikes() {
  const [liked, setLiked] = useState<Record<string, boolean>>({})
  const [burst, setBurst] = useState({ id: '', n: 0 })
  const [following, setFollowing] = useState(false)
  /** `only` = a double tap: likes, never unlikes. */
  const like = (id: string, only: boolean) => {
    const next = only || !liked[id]
    setLiked((current) => ({ ...current, [id]: next }))
    if (next) setBurst((current) => ({ id, n: current.n + 1 }))
  }
  return {
    isLiked: (id: string) => !!liked[id],
    burstOf: (id: string) => (burst.id === id ? burst.n : 0),
    like,
    following,
    toggleFollow: () => setFollowing((value) => !value),
  }
}
