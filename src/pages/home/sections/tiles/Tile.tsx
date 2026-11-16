import type { ReactNode } from 'react'
import type { Localized } from '@/features/i18n/lang'
import { useLink, useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'

type Props = {
  title: Localized
  text?: Localized
  link: { path: string; label: Localized }
  /** Soft tinted art panel (v3): bg-panel-blue / -yellow / -green / -grey, or bg-alrabiaa. */
  panel: string
  art: ReactNode
  /** The large Outdoor card: art on top, spans two rows on desktop. */
  large?: boolean
  /** Link colour (Alrabiaa uses its dark green). */
  accent?: string
  /** Shown instead of the text line while it waits on Ahmad. */
  note?: ReactNode
}

/** v3 service card: white, 1 px hairline, 20 px, lift on hover; art panel beside (or above) the text. */
export function Tile({ title, text, link, panel, art, large, accent, note }: Props) {
  const t = useT()
  const href = useLink()
  return (
    <a
      href={href(link.path)}
      className={cn(
        'card-lift group flex h-full overflow-hidden rounded-card border border-line bg-surface',
        large ? 'flex-col' : 'flex-col sm:flex-row',
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'relative shrink-0 overflow-hidden',
          large ? 'h-[300px]' : 'h-40 sm:h-auto sm:min-h-[180px] sm:w-[44%]',
          panel,
        )}
      >
        {art}
      </div>
      <div className={cn('flex flex-1 flex-col gap-2', large ? 'p-6' : 'p-[22px]')}>
        <h3 className={large ? 'text-[1.375rem] font-bold' : 'text-xl font-semibold'}>
          {t(title)}
        </h3>
        {text && <p className="text-[0.9375rem] leading-[1.8]">{t(text)}</p>}
        {note}
        <span
          className={cn(
            'mt-auto pt-2 text-[0.9375rem] font-semibold group-hover:underline',
            accent ?? 'text-link',
          )}
        >
          {t(link.label)}
        </span>
      </div>
    </a>
  )
}
