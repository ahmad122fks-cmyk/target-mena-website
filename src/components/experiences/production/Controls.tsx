import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import { ActionButton } from './ActionButton'
import { stageState } from './viewfinder'
import content from './viewfinder.content.json'

const FRAME = {
  done: 'border-white/30 bg-white/5 text-white',
  current: 'border-brand-yellow bg-brand-yellow text-brand-black',
  next: 'border-white/10 bg-white/5 text-white',
}

type Props = {
  stage: number
  onPick: (stage: number) => void
  onAction: () => void
  /** False when «أكشن» sits outside the device (Production hero, v3). */
  action?: boolean
}

/** The five stage frames, with «أكشن» in front of them unless it sits outside. */
export function Controls({ stage, onPick, onAction, action = true }: Props) {
  const t = useT()
  const { stages } = content
  return (
    <div className="flex flex-col gap-3 px-3.5 pb-4 sm:px-[1.375rem] lg:flex-row lg:items-center lg:gap-4 lg:py-3.5">
      {action && <ActionButton stage={stage} onAction={onAction} className="self-start" />}
      <div
        role="group"
        aria-label={t(content.stagesLabel)}
        className="grid flex-1 grid-cols-5 gap-1.5 sm:gap-2"
      >
        {stages.map((item, i) => (
          <button
            key={item.title.en}
            type="button"
            aria-pressed={i === stage}
            onClick={() => onPick(i)}
            className={cn(
              'flex min-h-11 flex-col gap-0.5 rounded-[10px] border-2 px-1.5 py-2 text-start sm:px-3',
              FRAME[stageState(i, stage)],
            )}
          >
            <span aria-hidden="true" className="ltr-run self-start text-[0.6875rem] opacity-75">
              {`${content.osd.scene} ${String(i + 1).padStart(2, '0')}`}
            </span>
            <span className="text-[0.6875rem] leading-snug font-semibold sm:text-sm">
              {t(item.title)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
