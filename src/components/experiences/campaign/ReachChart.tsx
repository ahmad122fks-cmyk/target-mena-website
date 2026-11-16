import content from '@/content/experiences.json'
import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import { BARS, barScale } from './stage'
import { Wipe } from './Wipe'

/** Demo reach and engagement: bars growing (scaleY) and a line drawing in. No numbers. */
export function ReachChart({ growth }: { growth: number }) {
  const t = useT()
  const c = content.social
  const scale = barScale(growth)
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-1.5 rounded-2xl border border-[#1f4a78] bg-[#0f2b4d] p-2.5">
      <div className="flex justify-between text-[11px]">
        <b>{t(c.reach)}</b>
        <span className="rounded-full bg-brand-yellow px-1.5 text-[10px] font-semibold text-black">
          {t(c.demo)}
        </span>
      </div>
      <div aria-hidden="true" className="relative flex min-h-[60px] flex-1 items-end gap-[5px]">
        {BARS.map((h, j) => (
          <span
            key={j}
            className={cn(
              'block flex-1 origin-bottom rounded-t transition-transform duration-900 ease-[cubic-bezier(.2,.8,.2,1)]',
              j > 6 ? 'bg-brand-blue' : 'bg-brand-blue-40',
            )}
            style={{ height: `${h}%`, transform: `scaleY(${scale})` }}
          />
        ))}
        <Wipe run="draw" className="absolute inset-0">
          <svg
            viewBox="0 0 200 60"
            preserveAspectRatio="none"
            className="block size-full rtl:-scale-x-100"
          >
            <path
              d="M0 52 C30 48 40 40 60 36 S100 30 120 20 S170 10 200 4"
              fill="none"
              stroke="#F7AF1C"
              strokeWidth={2.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </Wipe>
      </div>
    </div>
  )
}
