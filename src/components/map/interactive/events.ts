import type { RefObject } from 'react'
import type { MapState, SetMapState } from '../state'
import type { MapActions } from './useActions'
import type { Fly } from './useFly'
import type { HintKind } from './useHint'

/** What the gesture hooks share. Every member keeps its identity between renders. */
export type MapContext = {
  latest: RefObject<MapState>
  setState: SetMapState
  fly: Fly
  actions: MapActions
  touched: RefObject<boolean>
  showHint: (kind: HintKind) => void
}

/** Chips, buttons and the panel: pressing there never drags the map. */
export function isUi(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest('[data-map-ui]') !== null
}

/** Province or highway under the pointer (markers, highway lines and pills carry data-key). */
export function keyOf(target: EventTarget | null): string | null {
  if (!(target instanceof Element)) return null
  return target.closest<HTMLElement | SVGElement>('[data-key]')?.dataset.key ?? null
}

/** Pointer position in px from the map's top-left corner. */
export function localPoint(root: HTMLElement, e: { clientX: number; clientY: number }) {
  const rect = root.getBoundingClientRect()
  return { x: e.clientX - rect.left, y: e.clientY - rect.top }
}

/** addEventListener that returns its own removal. */
export function listen<K extends keyof HTMLElementEventMap>(
  el: HTMLElement,
  type: K,
  handler: (e: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions,
): () => void {
  el.addEventListener(type, handler, options)
  return () => el.removeEventListener(type, handler, options)
}
