import { useEffect, useRef, type RefObject } from 'react'
import { clampCam } from '../camera'
import type { ViewKey } from '../data'
import type { SetMapState } from '../state'
import { viewTarget } from '../targets'
import type { MapContext } from './events'

type Root = RefObject<HTMLDivElement | null>

/**
 * Keeps state.box = the map's size in px and its fit (cover or contain).
 * In cover the camera is clamped again whenever the box changes (first
 * measure, resize, theme switch), so the photo keeps filling the frame.
 */
export function useBox(rootRef: Root, setState: SetMapState, cover: boolean) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const measure = () => {
      const [w, h] = [root.clientWidth, root.clientHeight]
      if (!w || !h) return
      setState((s) => {
        if (s.box?.w === w && s.box.h === h && Boolean(s.box.cover) === cover) return s
        const box = { w, h, cover }
        return { ...s, box, cam: cover ? clampCam(s.cam, box) : s.cam }
      })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    return () => observer.disconnect()
  }, [rootRef, setState, cover])
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
          // The box (size and fit) is measured by now; without it the map has no size.
          const box = latest.current.box
          if (touched.current || !box) return
          touched.current = true
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
