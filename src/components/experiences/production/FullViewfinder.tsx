import { useState } from 'react'
import { useT } from '@/features/i18n/LangContext'
import { useInterval } from '@/lib/motion'
import { Controls } from './Controls'
import { FilmLook } from './FilmLook'
import { FrameGuides } from './FrameGuides'
import { Rec, Timecode } from './Osd'
import { SceneCard } from './SceneCard'
import { Shots } from './Shots'
import { useClapper, useFilmRunning, type Clapper } from './useFilm'
import { SHOT_MS } from './viewfinder'
import content from './viewfinder.content.json'

type Props = {
  active: boolean
  /** Clapper owned outside (the page shows «أكشن» itself); else built in. */
  clap?: Clapper
  id?: string
}

/**
 * The page-size viewfinder, a framed dark device on the light page (v3):
 * REC bar, the picture in 16:9 (2.4:1 from 1024 px) with the film look, the
 * slate and scene card, then the five stage frames (and «أكشن» unless the
 * page shows it). The chrome is black (deep navy in the dark theme); the
 * picture and letterbox stay black like real footage. Cuts to the next
 * framing every 2.6 s while it rolls.
 */
export function FullViewfinder({ active, clap: outside, id }: Props) {
  const t = useT()
  const { ref, running } = useFilmRunning<HTMLElement>(active)
  const [cut, setCut] = useState(0)
  useInterval(() => setCut((n) => n + 1), running ? SHOT_MS : null)
  const own = useClapper(content.stages.length)
  const clap = outside ?? own
  return (
    <figure
      ref={ref}
      id={id}
      aria-label={t(content.label)}
      className="relative m-0 overflow-hidden rounded-[22px] border border-line-strong bg-deep text-white shadow-frame"
    >
      <div
        aria-hidden="true"
        className="flex h-11 items-center justify-between px-3.5 text-xs sm:h-[3.375rem] sm:px-[1.375rem] sm:text-sm"
      >
        <Rec running={running} />
        <Timecode running={running} className="text-sm font-semibold tracking-[1px] sm:text-lg" />
        <span className="ltr-run text-white/70">{content.osd.format}</span>
      </div>
      <div className="relative">
        <div className="relative aspect-video overflow-hidden bg-black lg:aspect-[12/5]">
          <Shots cut={cut} running={running} />
          <FilmLook cut={cut} running={running} flash={clap.flash} />
          <FrameGuides cut={cut} />
        </div>
        <SceneCard stage={clap.stage} clapping={clap.clapping} flash={clap.flash} />
      </div>
      <Controls stage={clap.stage} onPick={clap.go} onAction={clap.action} action={!outside} />
    </figure>
  )
}
