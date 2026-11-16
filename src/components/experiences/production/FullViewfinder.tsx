import { useState } from 'react'
import { useT } from '@/features/i18n/LangContext'
import { useInterval } from '@/lib/motion'
import { Controls } from './Controls'
import { FilmLook } from './FilmLook'
import { FrameGuides } from './FrameGuides'
import { Rec, Timecode } from './Osd'
import { SceneCard } from './SceneCard'
import { Shots } from './Shots'
import { useClapper, useFilmRunning } from './useFilm'
import { SHOT_MS } from './viewfinder'
import content from './viewfinder.content.json'

/**
 * The page-size viewfinder: REC bar, the picture in 16:9 (2.4:1 from 1024
 * px) with the film look, the slate and scene card, then «أكشن» and the
 * five stage frames. The chrome is the deep band colour (navy in the dark
 * theme); the picture and letterbox stay black like real footage. Cuts
 * to the next framing every 2.6 s while it rolls.
 */
export function FullViewfinder({ active }: { active: boolean }) {
  const t = useT()
  const { ref, running } = useFilmRunning<HTMLElement>(active)
  const [cut, setCut] = useState(0)
  useInterval(() => setCut((n) => n + 1), running ? SHOT_MS : null)
  const clap = useClapper(content.stages.length)
  return (
    <figure
      ref={ref}
      aria-label={t(content.label)}
      className="relative m-0 overflow-hidden rounded-[22px] border border-white/10 bg-deep text-white"
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
      <Controls stage={clap.stage} onPick={clap.go} onAction={clap.action} />
    </figure>
  )
}
