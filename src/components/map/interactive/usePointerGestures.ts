import { useEffect, type RefObject } from 'react'
import { panCam, pinchCam, type Cam, type Point } from '../camera'
import { isUi, keyOf, listen, localPoint, type MapContext } from './events'

type Gesture = { cam: Cam; mid: Point; dist: number }

/**
 * Pointer events on the whole map: drag (mouse, pen, one finger) pans,
 * two fingers pinch-zoom, a click or tap on a marker / highway selects it
 * (not after a drag), mouse hover and keyboard focus show the hover card.
 */
export function usePointerGestures(rootRef: RefObject<HTMLDivElement | null>, ctx: MapContext) {
  const { latest, setState, fly, actions, touched, showHint } = ctx
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const fingers = new Map<number, Point>()
    let start: Gesture | null = null
    let moved = false
    let hinted = false
    const spread = () => {
      const [a, b] = [...fingers.values()]
      if (!b) return { mid: a, dist: 0 }
      return {
        mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
        dist: Math.hypot(a.x - b.x, a.y - b.y),
      }
    }
    const begin = () => {
      start = { cam: latest.current.cam, ...spread() }
    }
    const down = (e: PointerEvent) => {
      if (isUi(e.target) || e.button > 0) return
      fly.stop()
      touched.current = true
      if (e.pointerType === 'touch' && !hinted) {
        hinted = true
        showHint('touch')
      }
      if (!fingers.size) moved = false
      fingers.set(e.pointerId, localPoint(root, e))
      begin()
    }
    const move = (e: PointerEvent) => {
      const box = latest.current.box
      if (!start || !box || !fingers.has(e.pointerId)) return
      fingers.set(e.pointerId, localPoint(root, e))
      const { mid, dist } = spread()
      const pinch = fingers.size > 1 && start.dist > 0
      if (!moved && !pinch && Math.hypot(mid.x - start.mid.x, mid.y - start.mid.y) < 4) return
      if (!moved) {
        moved = true
        if (root.hasPointerCapture && !root.hasPointerCapture(e.pointerId))
          root.setPointerCapture(e.pointerId)
      }
      const { cam: c0, mid: m0, dist: d0 } = start
      const cam = pinch
        ? pinchCam(c0, box, m0, d0, mid, dist)
        : panCam(c0, box, mid.x - m0.x, mid.y - m0.y)
      setState((s) => ({ ...s, cam, drag: true, hover: null }))
    }
    const up = (e: PointerEvent) => {
      if (!fingers.delete(e.pointerId)) return
      if (fingers.size) return begin()
      start = null
      setState((s) => (s.drag ? { ...s, drag: false } : s))
      window.setTimeout(() => (moved = false))
    }
    const click = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
        return
      }
      const key = keyOf(e.target)
      if (key) actions.pick(key)
    }
    const offs = [
      listen(root, 'pointerdown', down),
      listen(root, 'pointermove', move),
      listen(root, 'pointerup', up),
      listen(root, 'pointercancel', up),
      listen(root, 'click', click, { capture: true }),
      listen(
        root,
        'pointerover',
        (e) => e.pointerType === 'mouse' && !start && actions.hover(keyOf(e.target)),
      ),
      listen(root, 'pointerleave', () => actions.hover(null)),
      listen(root, 'focusin', (e) => actions.hover(keyOf(e.target))),
      listen(root, 'focusout', (e) => {
        if (!root.contains(e.relatedTarget as Node | null)) actions.hover(null)
      }),
    ]
    return () => offs.forEach((off) => off())
  }, [rootRef, latest, setState, fly, actions, touched, showHint])
}
