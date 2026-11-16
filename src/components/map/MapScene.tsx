import type { ReactNode } from 'react'
import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import { scaleOf, viewBoxOf } from './camera'
import { OUTLINE } from './data'
import { Highways } from './Highways'
import { MapLabels } from './MapLabels'
import content from './map.content.json'
import { MapPicture } from './MapPicture'
import { Markers } from './Markers'
import type { MapState } from './state'

type Props = {
  state: MapState
  interactive: boolean
  priority?: boolean
  /** Dark inner edge: on, off, or (undefined) dark theme only. */
  vignette?: boolean
  /** Extra SVG layers between the outline and the highways (lights, density). */
  under?: ReactNode
}

/**
 * The map itself, drawn from the camera alone: satellite picture, SVG
 * (outline, highways) and HTML markers and labels. Rendered on the server
 * and kept mounted when the interactive layer takes over. Contain or cover
 * is CSS only (map.css sizes the stage and the SVG).
 */
export function MapScene({ state, interactive, priority, vignette, under }: Props) {
  const t = useT()
  const { cam, box } = state
  return (
    <>
      <div className="map-stage map-sat pointer-events-none">
        <MapPicture cam={cam} priority={priority} />
      </div>
      <svg
        viewBox={viewBoxOf(cam)}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={t(content.aria)}
        className="map-svg touch-none"
      >
        <path
          d={OUTLINE}
          fill="#0161A6"
          fillOpacity={0.06}
          stroke="#FFFFFF"
          strokeOpacity={0.42}
          strokeWidth={1.2}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {under}
        <Highways
          type={state.type}
          sel={state.sel}
          hover={state.hover}
          u={box ? 1 / scaleOf(cam, box) : null}
        />
      </svg>
      {vignette !== false && (
        <div aria-hidden="true" className={cn('map-vignette', vignette ?? 'hidden dark:block')} />
      )}
      <div className="map-stage pointer-events-none touch-none">
        <Markers
          cam={cam}
          type={state.type}
          sel={state.sel}
          hover={state.hover}
          layer={state.layer}
        />
        <MapLabels state={state} interactive={interactive} />
      </div>
    </>
  )
}
