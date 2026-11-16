import { useState } from 'react'
import { Photo } from '@/components/shared/Photo'
import { useT } from '@/features/i18n/LangContext'
import { ART } from '@/lib/images'
import { useInterval } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { Footage, FOOTAGE } from './Footage'
import { Rec, Timecode } from './Osd'
import { StageBars } from './StageBars'
import { useFilmRunning } from './useFilm'
import { nextStage, PHONE_STAGE_MS } from './viewfinder'
import content from './viewfinder.content.json'

type Props = { active: boolean; topPad: number }

/**
 * Phone screen (PhoneShowcase "الإنتاج"): REC and timecode under the
 * island, the camera photo on yellow inside a thin frame guide, the line
 * from the catalog and the five stages filling one after another.
 */
export function PhoneViewfinder({ active, topPad }: Props) {
  const t = useT()
  const { ref, running } = useFilmRunning<HTMLDivElement>(active)
  const { stages } = content
  const [stage, setStage] = useState(0)
  useInterval(() => setStage((s) => nextStage(s, stages.length)), running ? PHONE_STAGE_MS : null)
  return (
    <div
      ref={ref}
      className="absolute inset-0 flex flex-col bg-black text-white"
      style={{ paddingTop: topPad }}
    >
      <div
        aria-hidden="true"
        className="flex h-[2.875rem] shrink-0 items-end justify-between px-4 pb-3 text-xs"
      >
        <Rec running={running} className="gap-1.5" />
        <Timecode running={running} className="font-semibold tracking-[1px]" />
      </div>
      <div aria-hidden="true" className="relative min-h-0 flex-1 overflow-hidden bg-brand-yellow">
        {FOOTAGE ? (
          <Footage source={FOOTAGE} running={running} />
        ) : (
          <Photo
            picture={ART.production}
            alt=""
            sizes="272px"
            className={cn(
              'absolute inset-0 h-full object-cover mix-blend-multiply',
              running && 'pv-push',
            )}
          />
        )}
        <span className="absolute inset-6 border-2 border-black/50" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <b className="text-[1.0625rem] leading-[1.4]">{t(content.line)}</b>
        <StageBars count={stages.length} stage={stage} running={running} />
        <span className="text-[0.6875rem] text-white/70">{t(stages[stage].title)}</span>
      </div>
    </div>
  )
}
