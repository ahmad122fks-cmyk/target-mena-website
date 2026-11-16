import { useRef, type KeyboardEvent } from 'react'
import { useDir, useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import hero from '../digital.hero.content.json'
import { TAB_IDS, tabFromKey, type TabId } from '../tabs'

/* Small colour mark per service (guideline colours; 3D = an outlined square). */
const MARK: Record<TabId, string> = {
  campaign: 'bg-brand-blue',
  social: 'bg-brand-yellow',
  identity: 'bg-brand-green',
  uiux: 'bg-brand-grey',
  '3d': 'border-2 border-current',
  ai: 'bg-[#4DA8E8]',
}
const MARK_BASE = 'size-3 flex-none rounded-[4px]'
const SELECTED_MARK = 'ring-[1.5px] ring-white'

type Props = { value: TabId; onChange: (id: TabId) => void }

/**
 * Six service tabs (WAI-ARIA tabs: arrows follow the screen direction, Home
 * and End, roving tabindex). Two columns at every width, so all six stay in
 * view on a phone; picking one changes the phone and the text below.
 * v3: the active tab is blue; its colour mark gets a white ring.
 */
export function ServiceTabs({ value, onChange }: Props) {
  const t = useT()
  const dir = useDir()
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const next = tabFromKey(event.key, TAB_IDS.indexOf(value), TAB_IDS.length, dir)
    if (next === null) return
    event.preventDefault()
    onChange(TAB_IDS[next])
    buttons.current[next]?.focus()
  }
  return (
    <div
      role="tablist"
      aria-label={t(hero.tabsLabel)}
      onKeyDown={onKeyDown}
      className="grid grid-cols-2 gap-2.5"
    >
      {TAB_IDS.map((id, i) => {
        const tab = hero.tabs[i]
        const selected = id === value
        return (
          <button
            key={id}
            ref={(el) => {
              buttons.current[i] = el
            }}
            type="button"
            role="tab"
            id={`digital-tab-${id}`}
            data-tab={id}
            aria-selected={selected}
            aria-controls={`digital-panel-${id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(id)}
            className={cn(
              'flex min-h-12 items-center gap-3 rounded-xl border-[1.5px] px-3.5 py-3 text-start text-[0.9375rem] leading-snug font-semibold transition-[translate] duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link sm:text-base',
              selected
                ? 'border-brand-blue bg-brand-blue text-white'
                : 'border-line-strong bg-surface text-ink hover:border-link',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(MARK_BASE, MARK[id], selected && SELECTED_MARK)}
            />
            {t(tab.label)}
          </button>
        )
      })}
    </div>
  )
}
