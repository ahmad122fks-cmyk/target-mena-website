import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import content from './digital-screens.content.json'
import { ScreenBar, ScreenShell, type ScreenProps } from './ScreenShell'
import { useLoopStep } from './useLoopStep'
import { Cursor, Wire } from './Wire'
import { BAR, WireHero, WireNav } from './WireParts'

/* Steps: 1 nav, 2 hero, 3 its cross, 4-5 text, 6-7 cards, 8 button, 9 pointer, 10 final design. */
const STEPS = 15
const FINAL = 10

/** UI/UX: a wireframe draws itself in box by box, then turns into the final design. */
export function WireframeScreen({ topPad = 52, active = true }: ScreenProps) {
  const t = useT()
  const c = content.uiux
  const step = useLoopStep(STEPS, 520, active, FINAL)
  const final = step >= FINAL
  const p = { step, final }
  return (
    <ScreenShell
      topPad={topPad}
      active={active}
      className="gap-3 bg-[image:radial-gradient(rgba(255,255,255,.07)_1px,transparent_1px)] bg-[size:14px_14px] px-4 pb-6"
    >
      <ScreenBar title={t(c.title)} status={t(final ? c.final : c.wire)} done={final} />
      <WireNav {...p} />
      <WireHero {...p} />
      <Wire at={4} {...p} fill="bg-[#EAF2F8]" className="h-3.5 w-[72%] rounded-full" />
      <Wire at={5} {...p} fill="bg-[#A9C1D4]" className="h-2 w-[92%] rounded-full" />
      <Wire at={5} {...p} fill="bg-[#A9C1D4]" className="h-2 w-[64%] rounded-full" />
      <div className="grid grid-cols-2 gap-2.5">
        {[6, 7].map((at) => (
          <Wire key={at} at={at} {...p} fill="bg-[#0F2B4D]" className="h-[84px] rounded-xl p-2.5">
            <span className="relative block size-6 rounded-md border border-[#4DA8E8]" />
            <span className={cn(BAR, 'relative mt-3 w-3/4')} />
          </Wire>
        ))}
      </div>
      <Wire
        at={8}
        {...p}
        fill="bg-[#F7AF1C]"
        className="mt-auto grid h-11 place-items-center rounded-full"
      >
        <span
          className={cn(
            'relative text-[13px] font-semibold',
            final ? 'text-black' : 'text-[#4DA8E8]',
          )}
        >
          {t(c.button)}
        </span>
      </Wire>
      <Cursor show={step >= 9} pressed={final} />
    </ScreenShell>
  )
}
