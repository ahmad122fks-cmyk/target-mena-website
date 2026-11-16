import { useEffect, type RefObject } from 'react'
import { clampCam, screenToMap, zoomAt, type Point } from '../camera'
import { isUi, keyOf, listen, localPoint, type MapContext } from './events'

type SafariGesture = UIEvent & { scale: number; clientX: number; clientY: number }

/**
 * Ctrl/⌘ + wheel and trackpad pinch (a wheel with ctrlKey; gesture events
 * in Safari) zoom at the cursor; a plain wheel scrolls the page and shows a
 * short hint; double-click zooms in at the point.
 */
export function useWheelZoom(rootRef: RefObject<HTMLDivElement | null>, ctx: MapContext) {
  const { latest, setState, fly, touched, showHint } = ctx
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    // From the latest state inside the update: several wheel events can come in one frame.
    const zoomNow = (at: Point, factor: (z: number) => number) => {
      touched.current = true
      fly.stop()
      setState((s) => {
        if (!s.box) return s
        const point = screenToMap(s.cam, s.box, at)
        return { ...s, cam: clampCam(zoomAt(s.cam, point, factor(s.cam.z)), s.box) }
      })
    }
    const wheel = (e: WheelEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return showHint('wheel')
      e.preventDefault()
      const delta = e.deltaY * (e.deltaMode === 1 ? 16 : 1)
      zoomNow(localPoint(root, e), () => Math.exp(-delta * 0.01))
    }
    const double = (e: MouseEvent) => {
      const { cam, box } = latest.current
      if (!box || isUi(e.target) || keyOf(e.target)) return
      touched.current = true
      fly.to(zoomAt(cam, screenToMap(cam, box, localPoint(root, e)), 2), 650)
    }
    let gestureZoom = 1
    const gestureStart = (e: Event) => {
      e.preventDefault()
      gestureZoom = latest.current.cam.z
    }
    const gestureChange = (e: Event) => {
      e.preventDefault()
      const g = e as SafariGesture
      // On iPhone the pointer pinch already runs (it marks the map as dragging).
      if (!latest.current.drag) zoomNow(localPoint(root, g), (z) => (gestureZoom * g.scale) / z)
    }
    root.addEventListener('gesturestart', gestureStart)
    root.addEventListener('gesturechange', gestureChange)
    const offs = [
      listen(root, 'wheel', wheel, { passive: false }),
      listen(root, 'dblclick', double),
    ]
    return () => {
      offs.forEach((off) => off())
      root.removeEventListener('gesturestart', gestureStart)
      root.removeEventListener('gesturechange', gestureChange)
    }
  }, [rootRef, latest, setState, fly, touched, showHint])
}
