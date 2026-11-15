import { ListChecks, MapPin, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { usePageData } from '@/app/PageData'
import { ToConfirm } from '@/components/shared/ToConfirm'
import { useLang, useT } from '@/features/i18n/LangContext'
import { formatCount, formatSqm } from '@/lib/format'
import { cn } from '@/lib/utils'
import content from '../home.content.json'
import { HeroMap } from './HeroMap'

function Tile({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1 rounded-field border border-line px-3.5 py-3">
      <dt className="text-xs">{label}</dt>
      <dd className="text-xl font-semibold text-brand-black lg:text-2xl">{children}</dd>
    </div>
  )
}

type ChipProps = {
  icon: LucideIcon
  tint: string
  label: string
  value: ReactNode
  className: string
}

function FloatChip({ icon: Icon, tint, label, value, className }: ChipProps) {
  return (
    <div
      className={cn(
        'absolute flex items-center gap-2.5 rounded-[14px] border border-line bg-white px-3.5 py-2.5 shadow-float',
        className,
      )}
    >
      <span className={cn('flex size-[34px] items-center justify-center rounded-[10px]', tint)}>
        <Icon className="size-[18px] text-brand-black" strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="flex flex-col">
        <span className="text-xs">{label}</span>
        <b className="font-semibold text-brand-black">{value}</b>
      </span>
    </div>
  )
}

/** "Your list" product card: illustration, three tiles and two floating chips, all computed from boards.json. */
export function HeroCard() {
  const t = useT()
  const lang = useLang()
  const { featured, total } = usePageData('home')
  const { card } = content.hero
  const area = Math.round(featured.reduce((sum, board) => sum + board.sqm, 0) * 100) / 100
  return (
    <div className="relative min-w-0 flex-[1_1_31rem] py-6">
      <figure
        aria-label={t(card.label)}
        className="overflow-hidden rounded-card border border-line bg-white shadow-float"
      >
        <HeroMap />
        <dl className="grid grid-cols-3 gap-2.5 border-t border-line p-3.5">
          <Tile label={t(card.selected)}>
            <span className="ltr-run">{featured.length}</span>
          </Tile>
          <Tile label={t(card.area)}>
            <span className="ltr-run">{formatSqm(area, lang)}</span>
          </Tile>
          <Tile label={t(card.status)}>
            <span className="inline-block rounded-full bg-brand-green-10 px-2.5 py-1 text-[0.8125rem] font-medium">
              <span className="text-brand-green" aria-hidden="true">
                ●
              </span>{' '}
              {t(card.ready)}
            </span>
          </Tile>
        </dl>
      </figure>
      <FloatChip
        icon={ListChecks}
        tint="bg-brand-blue-10"
        label={t(card.list)}
        value={
          <>
            <span className="ltr-run">{featured[0]?.code}</span> +{' '}
            <span className="ltr-run">{featured.length - 1}</span>
          </>
        }
        className="start-3 top-0 lg:-start-[18px]"
      />
      <FloatChip
        icon={MapPin}
        tint="bg-brand-yellow-10"
        label={t(card.onSite)}
        value={formatCount(total, lang)}
        className="end-3 bottom-[7.5rem] lg:-end-[18px]"
      />
      <ToConfirm what={card.mapToConfirm} className="mt-3 text-xs text-brand-text" />
    </div>
  )
}
