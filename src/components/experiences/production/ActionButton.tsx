import { Clapperboard } from 'lucide-react'
import { PillButton } from '@/components/shared/PillButton'
import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import { isLastStage } from './viewfinder'
import content from './viewfinder.content.json'

type Props = {
  stage: number
  onAction: () => void
  /** Id of the viewfinder it drives (when the button sits outside it). */
  controls?: string
  className?: string
}

/**
 * «أكشن» (then «من البداية» on the last stage): v3 primary blue button
 * (prompt 5). Claps the slate and moves the viewfinder to the next stage.
 */
export function ActionButton({ stage, onAction, controls, className }: Props) {
  const t = useT()
  return (
    <PillButton
      tone="blue"
      onClick={onAction}
      aria-controls={controls}
      className={cn('h-14 shrink-0 gap-2.5 px-7 text-lg font-bold', className)}
    >
      <Clapperboard aria-hidden="true" className="size-[1.375rem]" />
      {t(isLastStage(stage, content.stages.length) ? content.again : content.action)}
    </PillButton>
  )
}
