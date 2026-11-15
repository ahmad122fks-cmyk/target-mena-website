import { useEffect, useState } from 'react'
import { DEFAULT_STATE, searchFromState, stateFromSearch, type FinderState } from './finderState'

/**
 * Finder state mirrored in the address bar (filters, sort, view, page,
 * shared codes, picker mode) so any view can be shared as a link.
 * Read after hydration, so the prerendered HTML always matches.
 */
export function useFinderState(): [FinderState, (patch: Partial<FinderState>) => void] {
  const [state, setState] = useState<FinderState>(DEFAULT_STATE)
  useEffect(() => setState(stateFromSearch(window.location.search)), [])
  function update(patch: Partial<FinderState>) {
    // Any change except paging starts again at page 1.
    const next = { ...state, ...patch, page: patch.page ?? 1 }
    setState(next)
    window.history.replaceState(null, '', `${window.location.pathname}${searchFromState(next)}`)
  }
  return [state, update]
}
