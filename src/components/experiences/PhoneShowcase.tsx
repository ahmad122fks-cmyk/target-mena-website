import { useEffect, useState } from 'react'
import content from '@/content/showcase.json'
import { useT } from '@/features/i18n/LangContext'
import type { Board } from '@/lib/boards'
import { useInView, usePrefersReducedMotion } from '@/lib/motion'
import { PhoneFrame } from './PhoneFrame'
import { Screen } from './showcase/Screen'
import { ShowcaseTabs } from './showcase/ShowcaseTabs'
import { HOLD_SECONDS, nextTab, ROTATE_SECONDS, SHOWCASE_TABS } from './showcase/tabs'

const PANEL_ID = 'showcase-screen'

/**
 * Home hero phone: one frame that moves through Target's services every 7 s
 * (boards → production → digital campaign → social → Alrabiaa TV). Picking a
 * tab holds that screen for 12 s. Stops when off screen or under reduced motion.
 */
export function PhoneShowcase({ boards }: { boards: Board[] }) {
  const t = useT()
  const reduce = usePrefersReducedMotion()
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 })
  const [current, setCurrent] = useState(0)
  const [round, setRound] = useState(0)
  const [held, setHeld] = useState(false)
  const rotating = inView && !reduce
  const seconds = rotating ? (held ? HOLD_SECONDS : ROTATE_SECONDS) : 0

  useEffect(() => {
    if (!seconds) return
    const id = window.setTimeout(() => {
      setHeld(false)
      setCurrent(nextTab)
      setRound((n) => n + 1)
    }, seconds * 1000)
    return () => window.clearTimeout(id)
  }, [seconds, round])

  const pick = (index: number) => {
    setCurrent(index)
    setHeld(true)
    setRound((n) => n + 1)
  }

  const which = SHOWCASE_TABS[current].key
  return (
    <div ref={ref} className="flex flex-col items-center gap-4">
      <PhoneFrame label={t(content.label)} float>
        <div
          key={which}
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={`showcase-tab-${which}`}
          className="absolute inset-0 animate-[rise-in_0.55s_cubic-bezier(.2,.8,.2,1)_both]"
        >
          <Screen which={which} boards={boards} active={inView} />
        </div>
      </PhoneFrame>
      <ShowcaseTabs
        current={current}
        round={round}
        seconds={seconds}
        panelId={PANEL_ID}
        onPick={pick}
      />
    </div>
  )
}
