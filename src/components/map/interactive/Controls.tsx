import { Layers, Maximize, Minus, Plus } from 'lucide-react'
import { memo } from 'react'
import { useT } from '@/features/i18n/LangContext'
import content from '../map.content.json'
import type { Layer } from '../state'
import { Chip, ChipGroup } from './Chip'
import { MapButton } from './MapButton'
import type { MapActions } from './useActions'

const ICON = { className: 'size-[18px]', strokeWidth: 2, 'aria-hidden': true } as const

/**
 * Zoom in, zoom out, whole Iraq, and the layer switch (provinces / density;
 * one toggle button on phones). Bottom corner on the start side.
 */
export const Controls = memo(function Controls(props: { layer: Layer; actions: MapActions }) {
  const { layer, actions } = props
  const t = useT()
  const density = layer === 'density'
  return (
    <div className="pointer-events-none absolute start-3 bottom-3 flex flex-col items-start gap-2 sm:start-4 sm:bottom-4">
      <div
        data-map-ui=""
        className="pointer-events-auto flex flex-col divide-y divide-white/12 overflow-hidden rounded-[14px] border border-white/12 bg-[#04111F]/60 backdrop-blur-md"
      >
        <MapButton label={t(content.zoomIn)} onClick={() => actions.zoomBy(1.7)}>
          <Plus {...ICON} />
        </MapButton>
        <MapButton label={t(content.zoomOut)} onClick={() => actions.zoomBy(1 / 1.7)}>
          <Minus {...ICON} />
        </MapButton>
        <MapButton label={t(content.reset)} onClick={actions.reset}>
          <Maximize {...ICON} />
        </MapButton>
        <MapButton
          label={t(content.layers.density)}
          pressed={density}
          onClick={() => actions.setLayer(density ? 'bubbles' : 'density')}
          className="sm:hidden"
        >
          <Layers {...ICON} />
        </MapButton>
      </div>
      <ChipGroup label={t(content.layersGroup)} className="hidden sm:flex">
        {(['bubbles', 'density'] as const).map((key) => (
          <Chip key={key} on={layer === key} onClick={() => actions.setLayer(key)}>
            {t(content.layers[key])}
          </Chip>
        ))}
      </ChipGroup>
    </div>
  )
})
