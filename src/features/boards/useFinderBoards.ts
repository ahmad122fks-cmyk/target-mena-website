import { useEffect, useState } from 'react'
import type { Board } from '@/lib/boards'

/**
 * The finder's full board list, fetched once the page is on screen (the page
 * itself carries only its first 24 boards). null until it arrives; if it
 * cannot load, the first 24 stay visible.
 */
export function useFinderBoards(feed: string): Board[] | null {
  const [boards, setBoards] = useState<Board[] | null>(null)
  useEffect(() => {
    let live = true
    fetch(feed)
      .then((response) => (response.ok ? response.json() : null))
      .then((list: unknown) => live && Array.isArray(list) && setBoards(list as Board[]))
      .catch(() => {})
    return () => {
      live = false
    }
  }, [feed])
  return boards
}
