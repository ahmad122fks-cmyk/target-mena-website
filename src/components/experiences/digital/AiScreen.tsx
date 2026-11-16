import { Sparkles } from 'lucide-react'
import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import { AiTiles } from './AiTiles'
import content from './digital-screens.content.json'
import { ScreenBar, ScreenShell, type ScreenProps } from './ScreenShell'
import { aiCycle, aiFrame, typedText } from './sequence'
import { useLoopStep } from './useLoopStep'

/** الذكاء الاصطناعي / AI: the prompt types itself, a bar fills, result tiles appear. */
export function AiScreen({ topPad = 52, active = true }: ScreenProps) {
  const t = useT()
  const c = content.ai
  const prompt = t(c.prompt)
  const length = Array.from(prompt).length
  const cycle = aiCycle(length)
  const frame = aiFrame(useLoopStep(cycle, 70, active, cycle - 1), length)
  const typing = frame.typed < length || (!frame.generating && frame.tiles === 0)
  const status = frame.generating ? c.generating : frame.tiles > 0 ? c.results : null
  return (
    <ScreenShell topPad={topPad} active={active} className="gap-3 px-4 pb-6">
      <ScreenBar
        title={t(c.title)}
        status={t(c.badge)}
        icon={<Sparkles className="size-4 text-[#F7AF1C]" />}
      />
      <div className="flex flex-col gap-2.5 rounded-2xl border border-[#1F4A78] bg-[#0F2B4D] p-3">
        <span className="text-[10px] text-[#A9C1D4]">{t(c.label)}</span>
        <p className="min-h-[2.6em] text-[13px] leading-snug">
          {typedText(prompt, frame.typed)}
          {typing && (
            <span className="ms-0.5 inline-block h-[1.05em] w-0.5 translate-y-[0.15em] animate-[blink_1s_steps(1)_infinite] bg-[#F7AF1C]" />
          )}
        </p>
        <div className="flex items-center gap-2.5">
          <span className="block h-1 flex-1 overflow-hidden rounded-full bg-[#1F4A78]">
            <span
              className="block h-full bg-[#4DA8E8] transition-transform duration-100 ease-linear ltr:origin-left rtl:origin-right"
              style={{ transform: `scaleX(${frame.progress})` }}
            />
          </span>
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full bg-[#F7AF1C] px-3 py-1 text-[11px] font-semibold text-black',
              frame.generating && 'animate-[twinkle_0.8s_ease-in-out_infinite]',
            )}
          >
            <Sparkles className="size-3" />
            {t(c.button)}
          </span>
        </div>
      </div>
      <p className="min-h-[1.5em] text-[11px] font-medium text-[#A9C1D4]">{status && t(status)}</p>
      <AiTiles count={frame.tiles} picked={frame.picked} />
    </ScreenShell>
  )
}
