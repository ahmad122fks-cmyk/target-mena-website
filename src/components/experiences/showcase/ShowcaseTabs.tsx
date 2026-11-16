import type { KeyboardEvent } from 'react'
import content from '@/content/showcase.json'
import { useDir, useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import { SHOWCASE_TABS } from './tabs'

type Props = {
  current: number
  /** Changes on every switch, so the progress line starts again. */
  round: number
  /** Seconds until the next automatic switch (7, or 12 after a click); 0 = no rotation. */
  seconds: number
  panelId: string
  onPick: (index: number) => void
}

/** Pills under the phone (WAI-ARIA tabs); a thin line shows the time left on the current one. */
export function ShowcaseTabs({ current, round, seconds, panelId, onPick }: Props) {
  const t = useT()
  const dir = useDir()
  const onKey = (event: KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key]
    if (!step) return
    const next =
      (current + (dir === 'rtl' ? -step : step) + SHOWCASE_TABS.length) % SHOWCASE_TABS.length
    onPick(next)
    document.getElementById(`showcase-tab-${SHOWCASE_TABS[next].key}`)?.focus()
  }
  return (
    <div
      role="tablist"
      aria-label={t(content.tabsLabel)}
      onKeyDown={onKey}
      className="flex max-w-[360px] flex-wrap justify-center gap-1.5"
    >
      {SHOWCASE_TABS.map((tab, j) => {
        const on = j === current
        return (
          <button
            key={tab.key}
            id={`showcase-tab-${tab.key}`}
            type="button"
            role="tab"
            aria-selected={on}
            aria-controls={panelId}
            tabIndex={on ? 0 : -1}
            data-tab={tab.key}
            onClick={() => onPick(j)}
            className={cn(
              'relative flex min-h-9 items-center gap-1.5 overflow-hidden rounded-full border px-3 text-xs font-medium',
              on
                ? 'border-transparent bg-white text-brand-black'
                : 'border-white/25 text-white hover:bg-white/10',
            )}
          >
            <span aria-hidden="true" className={cn('size-[7px] rounded-full', tab.dot)} />
            {t(content.tabs[tab.key])}
            {on && seconds > 0 && (
              <span
                key={round}
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left animate-[grow-x_linear_both] bg-brand-yellow rtl:origin-right"
                style={{ animationDuration: `${seconds}s` }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
