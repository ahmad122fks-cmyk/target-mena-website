import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import content from './digital-screens.content.json'
import { IdentityMark } from './IdentityMark'
import { MOVE, ScreenBar, ScreenShell, type ScreenProps } from './ScreenShell'
import { useLoopStep } from './useLoopStep'

/* Steps: 1-4 shapes, 5 colours, 6 type, 7 ready (held until the loop restarts). */
const STEPS = 12
const READY = 7
const SWATCHES = ['bg-[#0161A6]', 'bg-[#F7AF1C]', 'bg-[#2AB99D]', 'bg-[#709EB2]']
/** Step at which each checklist part (logo, colours, type, guide) is done. */
const PART_AT = [4, 5, 6, 7]

const show = (on: boolean) => (on ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0')

/** الهوية البصرية / Brand identity: a mark built shape by shape, then colours and type. */
export function IdentityScreen({ topPad = 52, active = true }: ScreenProps) {
  const t = useT()
  const c = content.identity
  const step = useLoopStep(STEPS, 650, active, READY)
  const ready = step >= READY
  return (
    <ScreenShell topPad={topPad} active={active} className="gap-4 px-4 pb-6">
      <ScreenBar title={t(c.title)} status={t(ready ? c.ready : c.building)} done={ready} />
      <IdentityMark step={step} ready={ready} />
      <div className="flex justify-center gap-1.5">
        {SWATCHES.map((swatch, i) => (
          <span
            key={swatch}
            className={cn('block size-7 rounded-lg', MOVE, swatch, show(step >= 5))}
            style={{ transitionDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
      <div className={cn('flex flex-col items-center', MOVE, show(step >= 6))}>
        <span className="text-[26px] leading-tight font-bold">{t(c.typeSample)}</span>
        <span dir="ltr" className="text-[10px] tracking-[0.12em] text-[#A9C1D4]">
          {c.fontName}
        </span>
      </div>
      <ul className="mt-auto flex flex-wrap justify-center gap-1.5">
        {c.parts.map((part, i) => (
          <li
            key={part.en}
            className={cn(
              'rounded-full px-2.5 py-1 text-[10px] font-medium',
              step >= PART_AT[i]
                ? 'bg-[#2AB99D] text-black'
                : 'border border-[#1F4A78] text-[#A9C1D4]',
            )}
          >
            {step >= PART_AT[i] && '✓ '}
            {t(part)}
          </li>
        ))}
      </ul>
    </ScreenShell>
  )
}
