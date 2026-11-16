/*
 * Camera maths of the network map (pure, unit-tested in map-camera.test.ts
 * and map-cover.test.ts). The camera is the map point in the middle of the
 * box plus a zoom. Zoom 1 fits the whole 1400 x 1416 satellite image into
 * the box (contain, dark theme) or fills the box with it (cover, light
 * theme). Map points are pixels of that image, screen points are px from
 * the box's top-left.
 */
export const MAP_W = 1400
export const MAP_H = 1416
export const MIN_ZOOM = 1
export const MAX_ZOOM = 7

export type Cam = { cx: number; cy: number; z: number }
/** The map in px; `cover`: the photo fills it edge to edge (else it fits inside). */
export type Box = { w: number; h: number; cover?: boolean }
export type Point = { x: number; y: number }

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/** Screen px per map px at zoom 1: the smaller ratio fits the photo, the larger fills the box. */
export function baseScale(box: Box): number {
  const [rw, rh] = [box.w / MAP_W, box.h / MAP_H]
  return (box.cover ? Math.max(rw, rh) : Math.min(rw, rh)) || 1
}

export function scaleOf(cam: Cam, box: Box): number {
  return baseScale(box) * cam.z
}

/**
 * Zoom kept in 1-7 and the view kept over the map: with a small margin round
 * it (contain), or inside the photo, so it always fills the box (cover).
 */
export function clampCam(cam: Cam, box: Box): Cam {
  const z = clamp(cam.z, MIN_ZOOM, MAX_ZOOM)
  const s = baseScale(box) * z
  const [mx, my] = box.cover ? [0, 0] : [120, 60]
  const fit = (lo: number, hi: number, span: number, v: number) =>
    span >= hi - lo ? (lo + hi) / 2 : clamp(v, lo + span / 2, hi - span / 2)
  return {
    cx: fit(-mx, MAP_W + mx, box.w / s, cam.cx),
    cy: fit(-my, MAP_H + my, box.h / s, cam.cy),
    z,
  }
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/** Camera part-way (t = 0..1) through a fly: eased, zoom interpolated in log space. */
export function interpolateCam(from: Cam, to: Cam, t: number): Cam {
  const e = easeInOutCubic(clamp(t, 0, 1))
  const logZ = Math.log(from.z) + (Math.log(to.z) - Math.log(from.z)) * e
  return {
    cx: from.cx + (to.cx - from.cx) * e,
    cy: from.cy + (to.cy - from.cy) * e,
    z: Math.exp(logZ),
  }
}

/** Zoom by `factor`, keeping the map point `at` where it is on screen. */
export function zoomAt(cam: Cam, at: Point, factor: number): Cam {
  const z = clamp(cam.z * factor, MIN_ZOOM, MAX_ZOOM)
  const k = cam.z / z
  return { cx: at.x + (cam.cx - at.x) * k, cy: at.y + (cam.cy - at.y) * k, z }
}

/** Frame every point: `pad` map px round them, `top` screen px kept free for the chips. */
export function fitPoints(points: Point[], box: Box, pad = 70, top = 120): Cam {
  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  const [x0, x1] = [Math.min(...xs) - pad, Math.max(...xs) + pad]
  const [y0, y1] = [Math.min(...ys) - pad, Math.max(...ys) + pad]
  const s = Math.min(box.w / (x1 - x0), Math.max(box.h - top, box.h / 2) / (y1 - y0))
  return { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 + 20, z: s / baseScale(box) }
}

export function screenToMap(cam: Cam, box: Box, p: Point): Point {
  const s = scaleOf(cam, box)
  return { x: cam.cx + (p.x - box.w / 2) / s, y: cam.cy + (p.y - box.h / 2) / s }
}

export function mapToScreen(cam: Cam, box: Box, p: Point): Point {
  const s = scaleOf(cam, box)
  return { x: box.w / 2 + (p.x - cam.cx) * s, y: box.h / 2 + (p.y - cam.cy) * s }
}

/** Drag: the camera that moves the map by (dx, dy) screen px from `start`. */
export function panCam(start: Cam, box: Box, dx: number, dy: number): Cam {
  const s = scaleOf(start, box)
  return clampCam({ cx: start.cx - dx / s, cy: start.cy - dy / s, z: start.z }, box)
}

/** Two-finger pinch: zoom by the finger spread, the point under the fingers follows them. */
export function pinchCam(
  start: Cam,
  box: Box,
  mid0: Point,
  dist0: number,
  mid: Point,
  dist: number,
) {
  const z = clamp((start.z * dist) / dist0, MIN_ZOOM, MAX_ZOOM)
  const anchor = screenToMap(start, box, mid0)
  const s = baseScale(box) * z
  const cam = { cx: anchor.x - (mid.x - box.w / 2) / s, cy: anchor.y - (mid.y - box.h / 2) / s, z }
  return clampCam(cam, box)
}

/**
 * SVG viewBox of the camera. With preserveAspectRatio "xMidYMid meet" it
 * shows exactly the camera's view at any box size (so the server can render it).
 */
export function viewBoxOf(cam: Cam): string {
  const w = MAP_W / cam.z
  const h = MAP_H / cam.z
  return [cam.cx - w / 2, cam.cy - h / 2, w, h].map((v) => v.toFixed(2)).join(' ')
}

/**
 * Where a map point sits in the stage (the zoom-1 frame of the image, centred
 * in the box), as fractions of the stage: HTML layers use them as CSS %.
 */
export function stageAt(cam: Cam, p: Point): Point {
  return { x: 0.5 + (cam.z * (p.x - cam.cx)) / MAP_W, y: 0.5 + (cam.z * (p.y - cam.cy)) / MAP_H }
}
