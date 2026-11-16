import { useEffect, useState, type CSSProperties } from 'react'
import { useInView } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { MapScene } from './MapScene'
import { initialState, type NetworkMapProps } from './state'
import './map.css'

type Interactive = typeof import('./interactive')

/**
 * Map of Target's network across Iraq: counts per province and highway, no
 * board details. The server render and the first browser frame are a static
 * map (satellite, outline, highways, markers, labels with counts). The
 * interactive layer (camera, gestures, chips, panel) loads when the map
 * comes within 300 px of the screen and takes over in place.
 */
export function NetworkMap(props: NetworkMapProps) {
  const { height = 620, view, selected, priority, className } = props
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
        'map-root relative isolate h-[420px] w-full overflow-hidden rounded-[24px] bg-deep text-white select-none sm:h-(--map-h)',
        !near && 'map-paused',
        className,
      )}
      style={{ '--map-h': `${height}px` } as CSSProperties}
    >
      <MapScene
        state={state}
        interactive={Boolean(lazy)}
        priority={priority}
        under={lazy && <lazy.MapLayers state={state} />}
      />
      {lazy && (
        <lazy.MapInteractive {...props} state={state} setState={setState} rootRef={rootRef} />
      )}
    </div>
  )
}
