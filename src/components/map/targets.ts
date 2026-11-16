/*
 * Where the camera goes for a view chip, the Network tour and a click on a
 * province or highway (pure, unit-tested).
 */
import { fitPoints, type Box, type Cam } from './camera'
import {
  anchorOf,
  findSpot,
  FIT_POINTS,
  isProvince,
  PRESETS,
  type Highway,
  type Province,
  type ViewKey,
} from './data'

/** Box of the design (desktop) for the server render of «شبكتنا», before the real one is known. */
export const DESIGN_BOX: Box = { w: 1240, h: 620 }

/**
 * Camera for a view, optionally centred on a selected province or highway
 * at that view's zoom (the Network tour: «النجف» at the Middle Euphrates zoom).
 */
export function viewTarget(view: ViewKey, selected = 'all', box: Box = DESIGN_BOX): Cam {
  if (view === 'net') return fitPoints(FIT_POINTS, box)
  const preset = PRESETS[view]
  const spot = view === 'iraq' || selected === 'all' ? undefined : findSpot(selected)
  if (!spot) return preset
  const at = anchorOf(spot)
  return { cx: at.x, cy: at.y, z: preset.z }
}

/** Click on a province (Baghdad closer, it is dense) or a highway: never zooms out. */
export function spotTarget(spot: Province | Highway, cam: Cam): Cam {
  const at = anchorOf(spot)
  const z = isProvince(spot) ? (spot.k === 'baghdad' ? 5 : 3.2) : 2.4
  return { cx: at.x, cy: at.y, z: Math.max(cam.z, z) }
}
