import type { Dispatch, SetStateAction } from 'react'
import type { Box, Cam } from './camera'
import type { ViewKey } from './data'
import { viewTarget } from './targets'

export type Layer = 'bubbles' | 'density'

/** Everything the map draws from. Held by NetworkMap, changed by the interactive layer. */
export type MapState = {
  cam: Cam
  /** Lit view chip (null after the visitor moved the map away from it). */
  view: ViewKey | null
  /** 'all' or a province / highway key. */
  sel: string
  hover: string | null
  /** 'all' or a board type. */
  type: string
  layer: Layer
  drag: boolean
  /** Size of the map in px, once measured in the browser. */
  box: Box | null
}

export type SetMapState = Dispatch<SetStateAction<MapState>>

export type NetworkMapProps = {
  /** Height in px from 640 px wide screens up (phones: 420). */
  height?: number
  /** Totals and top types of the selection (a bottom sheet on phones). */
  panel?: boolean
  /** Controlled camera (Network tour): no intro, flies whenever it changes. */
  view?: ViewKey
  /** 'all' or a province / highway key, with `view`. */
  selected?: string
  /** Above the fold: load the satellite image first. */
  priority?: boolean
  className?: string
}

/** First frame, the same on the server and in the browser. */
export function initialState(view?: ViewKey, selected?: string): MapState {
  const start = view ?? 'iraq'
  const sel = selected ?? 'all'
  return {
    cam: viewTarget(start, sel),
    view: start,
    sel,
    hover: null,
    type: 'all',
    layer: 'bubbles',
    drag: false,
    box: null,
  }
}
