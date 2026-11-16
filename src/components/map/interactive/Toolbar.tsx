import { memo } from 'react'
import { useLang, useT } from '@/features/i18n/LangContext'
import { TYPE_COLORS, TYPE_KEYS, VIEW_KEYS, type ViewKey } from '../data'
import content from '../map.content.json'
import { Chip, ChipGroup } from './Chip'
import { typeLabels } from './layersData'
import type { MapActions } from './useActions'

type Props = { type: string; view: ViewKey | null; actions: MapActions }

/**
 * Top row: board-type filter and the view chips («شبكتنا»، العراق، ...).
 * One row that scrolls sideways on phones; wraps from 640 px.
 */
export const Toolbar = memo(function Toolbar({ type, view, actions }: Props) {
  const t = useT()
  const lang = useLang()
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 flex gap-2.5 overflow-x-auto p-3 [scrollbar-width:none] sm:flex-wrap sm:justify-between sm:overflow-visible sm:p-4">
      <ChipGroup label={t(content.typesGroup)}>
        <Chip on={type === 'all'} onClick={() => actions.setType('all')} dot="#FFFFFF">
          {t(content.allTypes)}
        </Chip>
        {TYPE_KEYS.map((key) => (
          <Chip
            key={key}
            on={type === key}
            onClick={() => actions.setType(key)}
            dot={TYPE_COLORS[key]}
          >
            {typeLabels[lang][key]}
          </Chip>
        ))}
      </ChipGroup>
      <ChipGroup label={t(content.viewsGroup)}>
        {VIEW_KEYS.map((key) => (
          <Chip key={key} on={view === key} onClick={() => actions.showView(key)}>
            {t(content.views[key])}
          </Chip>
        ))}
      </ChipGroup>
    </div>
  )
})
