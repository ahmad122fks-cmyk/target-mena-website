import { useEffect, useState, type CSSProperties } from 'react'
import { useInView } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { MapScene } from './MapScene'
import { initialState, type NetworkMapProps } from './state'
import './map.css'

type Interactive = typeof import('./interactive')

// Light theme: a clean frame (20 px, hairline, soft blue shadow); dark theme as in prompt 4.
const FRAME =
  'rounded-card border border-line-strong bg-navy shadow-frame dark:rounded-[24px] dark:border-0 dark:bg-deep dark:shadow-none'

/**
 * Map of Target's network across Iraq: counts per province and highway, no
 * board details. The server render and the first browser frame are a static
 * map (satellite, outline, highways, markers, labels with counts). The
 * interactive layer (camera, gestures, chips, panel) loads when the map
 * comes within 300 px of the screen and takes over in place. Frame, cover
 * and vignette follow the theme through CSS (map.css), so the prerendered
 * page is right in both themes before any script runs.
 */
export function NetworkMap(props: NetworkMapProps) {
  const { height = 620, view, selected, priority, cover, vignette, className } = props
  const [state, setState] = useState(() => initialState(view, selected))
  const [lazy, setLazy] = useState<Interactive | null>(null)
  const [rootRef, near] = useInView<HTMLDivElement>({ rootMargin: '300px' })
  useEffect(() => {
    if (!near || lazy) return
    let live = true
    import('./interactive').then((mod) => live && setLazy(mod))
    return () => {
      live = false
    }
  }, [near, lazy])
  return (
    <div
      ref={rootRef}
      data-testid="network-map"
      data-view={state.view ?? undefined}
      data-ready={lazy ? 'true' : undefined}
      className={cn(
        'map-root relative isolate h-[420px] w-full overflow-hidden text-white select-none sm:h-(--map-h)',
        FRAME,
        cover === undefined ? 'map-auto' : cover && 'map-cover',
        !near && 'map-paused',
        className,
      )}
      style={{ '--map-h': `${height}px` } as CSSProperties}
    >
      <MapScene
        state={state}
        interactive={Boolean(lazy)}
        priority={priority}
        vignette={vignette}
        under={lazy && <lazy.MapLayers state={state} />}
      />
      {lazy && (
        <lazy.MapInteractive {...props} state={state} setState={setState} rootRef={rootRef} />
      )}
    </div>
  )
}
