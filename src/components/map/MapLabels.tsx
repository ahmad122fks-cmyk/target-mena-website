import { useLang } from '@/features/i18n/LangContext'
import { findSpot, nameOf } from './data'
import { LabelPill } from './LabelPill'
import { ALL_FROM_ZOOM, mapLabels } from './labels'
import type { MapState } from './state'
import { StagePoint } from './StagePoint'

/**
 * Name + count pills over the map (rules in labels.ts), HTML so they stay
 * sharp and readable at every zoom. Highway pills are buttons once the map
 * is interactive (the keyboard way to a highway).
 */
export function MapLabels({ state, interactive }: { state: MapState; interactive: boolean }) {
  const lang = useLang()
  return mapLabels(state).map((label) => {
    const spot = findSpot(label.k)
    return (
      <StagePoint key={label.k} cam={state.cam} at={label.at}>
        <LabelPill
          label={label}
          name={spot ? nameOf(spot, lang) : label.k}
          big={state.cam.z >= ALL_FROM_ZOOM}
          interactive={interactive}
          dim={state.drag}
          pressed={label.k === state.sel}
        />
      </StagePoint>
    )
  })
}
