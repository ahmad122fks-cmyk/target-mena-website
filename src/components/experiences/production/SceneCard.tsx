import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import { Clapboard } from './Clapboard'
import content from './viewfinder.content.json'

type Props = { stage: number; clapping: boolean; flash: number }

/**
 * The current stage: slate plus title, what happens and what is delivered.
 * Over the picture from 1280 px; under it on smaller screens (side by
 * side from 768 px). Stage changes are announced politely to screen readers.
 */
export function SceneCard({ stage, clapping, flash }: Props) {
  const t = useT()
  const scene = content.stages[stage]
  return (
    <div className="flex flex-col gap-3.5 px-3.5 pt-14 pb-4 sm:px-[1.375rem] md:flex-row md:items-end xl:absolute xl:flex-col xl:items-stretch xl:start-[4.375rem] xl:bottom-10 xl:z-10 xl:w-[26.25rem] xl:max-w-[calc(100%-8.75rem)] xl:p-0">
      <Clapboard scene={stage + 1} clapping={clapping} />
      <div aria-live="polite" className="min-w-0 flex-1 rounded-[18px] bg-white/5 xl:bg-black/80">
        <div
          key={stage}
          className={cn('flex flex-col gap-2 p-5 xl:p-[1.375rem]', flash > 0 && 'pv-scene')}
        >
          <b className="text-2xl leading-[1.3] text-brand-yellow xl:text-[1.875rem]">
            {t(scene.title)}
          </b>
          <span className="text-[0.9375rem] leading-[1.8] text-white/90">{t(scene.text)}</span>
          <span className="text-[0.8125rem] text-white/70">
            {t(content.deliver)} <b className="text-white">{t(scene.out)}</b>
          </span>
        </div>
      </div>
    </div>
  )
}
