import { useLayoutEffect, useMemo, useRef, type RefObject } from 'react'
import { usePrefersReducedMotion } from '@/lib/motion'
import type { MapState, NetworkMapProps, SetMapState } from '../state'
import { Controls } from './Controls'
import type { MapContext } from './events'
import { Hint } from './Hint'
import { HoverCard } from './HoverCard'
import { Panel } from './Panel'
import { Toolbar } from './Toolbar'
import { useActions } from './useActions'
import { useBox, useControlled, useIntro } from './useDirector'
import { useFly } from './useFly'
import { useHint } from './useHint'
import { usePointerGestures } from './usePointerGestures'
import { useWheelZoom } from './useWheelZoom'

type Props = NetworkMapProps & {
  state: MapState
  setState: SetMapState
  rootRef: RefObject<HTMLDivElement | null>
}

/**
 * The interactive layer (lazy chunk): camera flights, gestures, the auto
 * intro or the page-driven camera, chips, controls, panel, hover card and
 * hint. The map itself stays drawn by MapScene from the shared state.
 */
export function MapInteractive({ state, setState, rootRef, panel = true, view, selected }: Props) {
  const latest = useRef(state)
  useLayoutEffect(() => {
    latest.current = state
  })
  const touched = useRef(false)
  const reduced = usePrefersReducedMotion()
  const [hint, showHint] = useHint()
  const fly = useFly(latest, setState, reduced)
  const actions = useActions(latest, setState, fly, touched)
  const ctx: MapContext = useMemo(
    () => ({ latest, setState, fly, actions, touched, showHint }),
    [setState, fly, actions, showHint],
  )
  const controlled = view !== undefined || selected !== undefined
  useBox(rootRef, setState)
  usePointerGestures(rootRef, ctx)
  useWheelZoom(rootRef, ctx)
  useIntro(rootRef, !controlled, ctx)
  useControlled(view, selected, state.box !== null, ctx)
  return (
    <>
      <HoverCard state={state} />
      <Toolbar type={state.type} view={state.view} actions={actions} />
      <Controls layer={state.layer} actions={actions} />
      {panel && <Panel sel={state.sel} />}
      <Hint hint={hint} />
    </>
  )
}
