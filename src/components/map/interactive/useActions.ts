import { useMemo, type RefObject } from 'react'
import { zoomAt } from '../camera'
import { findSpot, PRESETS, type ViewKey } from '../data'
import type { Layer, MapState, SetMapState } from '../state'
import { DESIGN_BOX, spotTarget, viewTarget } from '../targets'
import type { Fly } from './useFly'

export type MapActions = {
  showView: (view: ViewKey) => void
  pick: (key: string) => void
  zoomBy: (factor: number) => void
  reset: () => void
  setType: (type: string) => void
  setLayer: (layer: Layer) => void
  hover: (key: string | null) => void
}

/** What the chips, buttons and clicks do. `touched` stops the auto intro once the visitor acts. */
export function useActions(
  latest: RefObject<MapState>,
  setState: SetMapState,
  fly: Fly,
  touched: RefObject<boolean>,
): MapActions {
  return useMemo(() => {
    const patch = (part: Partial<MapState>) => setState((s) => ({ ...s, ...part }))
    const act = () => {
      touched.current = true
    }
    return {
      showView(view) {
        act()
        patch({ view, sel: view === 'baghdad' ? 'baghdad' : 'all' })
        fly.to(
          viewTarget(view, 'all', latest.current.box ?? DESIGN_BOX),
          view === 'net' ? 1400 : 1100,
        )
      },
      pick(key) {
        const spot = findSpot(key)
        if (!spot) return
        act()
        patch({ sel: key })
        fly.to(spotTarget(spot, latest.current.cam))
      },
      zoomBy(factor) {
        act()
        const { cam } = latest.current
        fly.to(zoomAt(cam, { x: cam.cx, y: cam.cy }, factor), 500)
      },
      reset() {
        act()
        patch({ view: 'iraq', sel: 'all' })
        fly.to(PRESETS.iraq)
      },
      setType: (type) => patch({ type }),
      setLayer: (layer) => patch({ layer }),
      hover: (key) => setState((s) => (s.hover === key ? s : { ...s, hover: key })),
    }
  }, [latest, setState, fly, touched])
}
