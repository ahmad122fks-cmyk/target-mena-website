import { countOf, HIGHWAYS } from './data'
import type { MapState } from './state'

// Widths in screen px at every zoom (non-scaling stroke).
const LINE = {
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke',
} as const

type Props = Pick<MapState, 'type' | 'sel' | 'hover'> & {
  /** Map px per screen px, once the box is known: the flowing lights need it. */
  u: number | null
}

/**
 * The two highways: thin yellow line with a soft glow, small white lights
 * flowing along it, and a wide invisible line to hover or click.
 */
export function Highways({ type, sel, hover, u }: Props) {
  return HIGHWAYS.filter((h) => countOf(h, type) > 0).map((h) => {
    const on = h.k === sel || h.k === hover
    return (
      <g key={h.k} data-key={h.k} className="cursor-pointer">
        <polyline points={h.pts} {...LINE} stroke="transparent" strokeWidth={18} />
        <polyline
          points={h.pts}
          {...LINE}
          stroke="#F7AF1C"
          strokeOpacity={on ? 0.38 : 0.16}
          strokeWidth={9}
        />
        <polyline points={h.pts} {...LINE} stroke="#F7AF1C" strokeOpacity={0.9} strokeWidth={1.8} />
        {u !== null && (
          <polyline
            points={h.pts}
            pathLength={1000}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={2.4 * u}
            strokeDasharray="4 36"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="map-flow"
          />
        )}
      </g>
    )
  })
}
