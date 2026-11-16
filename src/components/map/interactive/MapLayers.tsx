import { memo } from 'react'
import { scaleOf } from '../camera'
import type { MapState } from '../state'
import { densityHexes, lights } from './layersData'

/*
 * Rounded board points as dots: zero-length, round-capped segments in six
 * paths (one steady, five twinkling with staggered delays) instead of 353
 * circles, so a camera frame only changes six stroke widths.
 */
const LIGHT_PATHS = lights.reduce(
  (paths, point, j) => {
    const i = j % 5 === 0 ? 1 + ((j / 5) % 5) : 0
    paths[i] += `M${point.x} ${point.y}h0`
    return paths
  },
  ['', '', '', '', '', ''],
)

const Hexes = memo(function Hexes() {
  return densityHexes.map((hex, i) => (
    <polygon key={i} points={hex.p} fill="#F7AF1C" fillOpacity={hex.o * 0.62} />
  ))
})

const Lights = memo(function Lights({ width, opacity }: { width: number; opacity: number }) {
  return (
    <g
      fill="none"
      stroke="#EAF2F8"
      strokeOpacity={opacity}
      strokeWidth={width}
      strokeLinecap="round"
    >
      {LIGHT_PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          className={i ? 'animate-[twinkle_3.5s_ease-in-out_infinite]' : undefined}
          style={i ? { animationDelay: `${(i - 1) * 0.7}s` } : undefined}
        />
      ))}
    </g>
  )
})

/** SVG layers under the highways: faint twinkling city lights, density hexes on demand. */
export function MapLayers({ state }: { state: MapState }) {
  const { cam, box, layer } = state
  if (!box) return null
  const density = layer === 'density'
  return (
    <>
      {density && <Hexes />}
      <Lights width={2.5 / scaleOf(cam, box)} opacity={density ? 0.9 : cam.z > 2 ? 0.75 : 0.45} />
    </>
  )
}
