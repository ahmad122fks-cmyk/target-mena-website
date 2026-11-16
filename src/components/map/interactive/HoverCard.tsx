import { useLang, useT } from '@/features/i18n/LangContext'
import { mapToScreen } from '../camera'
import { anchorOf, countOf, findSpot, nameOf } from '../data'
import content from '../map.content.json'
import type { MapState } from '../state'
import { CountText } from './CountText'
import { TypeBars } from './TypeBars'

/**
 * Card above the hovered (or keyboard-focused) province or highway: name,
 * count, top 3 types with bars, "اضغط للتكبير". The marker's button already
 * says the count to screen readers, so the card is hidden from them.
 */
export function HoverCard({ state }: { state: MapState }) {
  const t = useT()
  const lang = useLang()
  const { hover, box, cam, drag, type } = state
  const spot = hover ? findSpot(hover) : undefined
  if (!spot || !box || drag) return null
  const at = mapToScreen(cam, box, anchorOf(spot))
  const left = Math.max(115, Math.min(box.w - 115, at.x))
  const top = Math.max(150, at.y - 18)
  return (
    <div
      key={spot.k}
      aria-hidden="true"
      className="pointer-events-none absolute flex w-[210px] flex-col gap-2 rounded-[14px] border border-white/14 bg-[#04111F]/86 px-3.5 py-3 shadow-[0_12px_40px_rgb(0_0_0/0.45)] backdrop-blur-xl motion-safe:animate-[map-tip_.22s_cubic-bezier(.2,.8,.2,1)_both]"
      style={{ left, top, transform: 'translate(-50%, -100%)' }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <b className="text-sm font-semibold">{nameOf(spot, lang)}</b>
        <CountText n={countOf(spot, type)} />
      </div>
      <TypeBars counts={spot.bt} max={3} />
      <span className="text-[10px] text-[#A9C1D4]">{t(content.clickToZoom)}</span>
    </div>
  )
}
