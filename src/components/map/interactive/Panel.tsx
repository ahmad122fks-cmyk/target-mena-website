import { ChevronUp } from 'lucide-react'
import { memo, useState } from 'react'
import { useLang, useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import { findSpot, nameOf } from '../data'
import content from '../map.content.json'
import { CountText } from './CountText'
import { totals } from './layersData'
import { TypeBars } from './TypeBars'

/**
 * Totals and top 5 types of the selection («كل الشبكة» = every board,
 * the 2 mupis without a province included). Counts only. Under 640 px a
 * small bottom sheet the visitor opens.
 */
export const Panel = memo(function Panel({ sel }: { sel: string }) {
  const t = useT()
  const lang = useLang()
  const [open, setOpen] = useState(false)
  const spot = sel === 'all' ? undefined : findSpot(sel)
  const title = spot ? nameOf(spot, lang) : t(content.panelAll)
  const total = spot ? spot.t : totals.boards
  const head = (
    <>
      <b className="text-[15px] font-semibold">{title}</b>
      <CountText n={total} large />
    </>
  )
  return (
    <section
      aria-label={t(content.panelLabel)}
      data-map-ui=""
      className="absolute end-3 bottom-3 w-[min(270px,calc(100%-80px))] rounded-[18px] border border-white/12 bg-[#04111F]/72 px-3 py-1.5 backdrop-blur-md sm:end-4 sm:bottom-4 sm:w-[min(270px,calc(100%-100px))] sm:p-4"
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-2.5 sm:hidden"
      >
        {head}
        <ChevronUp
          aria-hidden="true"
          className={cn('size-4 shrink-0 transition-transform', !open && 'rotate-180')}
        />
      </button>
      <div className="hidden items-baseline justify-between gap-2.5 sm:flex">{head}</div>
      <div
        className={cn('flex-col gap-2.5 pt-2.5 pb-1.5 sm:flex sm:pb-0', open ? 'flex' : 'hidden')}
      >
        <TypeBars counts={spot ? spot.bt : totals.byType} max={5} />
        <p className="text-[10px] text-[#A9C1D4]">{t(content.footnote)}</p>
      </div>
    </section>
  )
})
