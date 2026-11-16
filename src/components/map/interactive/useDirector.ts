import { useEffect, useRef, type RefObject } from 'react'
import type { ViewKey } from '../data'
import type { SetMapState } from '../state'
import { viewTarget } from '../targets'
import type { MapContext } from './events'

type Root = RefObject<HTMLDivElement | null>

/** Keeps state.box = the map's size in px. */
export function useBox(rootRef: Root, setState: SetMapState) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const measure = () => {
      const [w, h] = [root.clientWidth, root.clientHeight]
      if (w && h) setState((s) => (s.box?.w === w && s.box.h === h ? s : { ...s, box: { w, h } }))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    return () => observer.disconnect()
  }, [rootRef, setState])
}

/**
 * Auto intro: once a third of the map is on screen, fly from all Iraq to
 * «شبكتنا» over 2.4 s (a jump under reduced motion). Skipped if the visitor
 * already moved the map.
 */
export function useIntro(rootRef: Root, enabled: boolean, ctx: MapContext) {
  const { latest, setState, fly, touched } = ctx
  useEffect(() => {
    const root = rootRef.current
    if (!enabled || !root) return
    let timer = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        timer = window.setTimeout(() => {
          if (touched.current) return
          touched.current = true
          const box = latest.current.box ?? { w: root.clientWidth, h: root.clientHeight }
          setState((s) => ({ ...s, view: 'net', sel: 'all' }))
          fly.to(viewTarget('net', 'all', box), 2400)
        }, 450)
      },
      { threshold: 0.35 },
    )
    observer.observe(root)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [rootRef, enabled, latest, setState, fly, touched])
}

/**
 * Camera driven by the page (Network tour): on the first measured frame it
 * jumps (the static frame already shows the view), then flies on every change.
 */
export function useControlled(
  view: ViewKey | undefined,
  selected: string | undefined,
  hasBox: boolean,
  ctx: MapContext,
) {
  const { latest, setState, fly } = ctx
  const first = useRef(true)
  const controlled = view !== undefined || selected !== undefined
  useEffect(() => {
    const box = latest.current.box
    if (!controlled || !hasBox || !box) return
    const [next, sel] = [view ?? 'iraq', selected ?? 'all']
    setState((s) => ({ ...s, view: next, sel }))
    const target = viewTarget(next, sel, box)
    if (first.current) fly.set(target)
    else fly.to(target)
    first.current = false
  }, [controlled, view, selected, hasBox, latest, setState, fly])
}
