import type { ReactNode } from 'react'
import type { Localized } from '@/features/i18n/lang'
import { useLink, useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'

const TONES = {
  dark: 'bg-deep text-white ring-1 ring-white/10 [--heading:#fff] [--tile-text:var(--color-brand-grey-40)]',
  light: 'border border-line bg-brand-ghost text-ink [--tile-text:var(--color-brand-text)]',
} as const

type Props = {
  tone: keyof typeof TONES
  title: Localized
  text?: Localized
  link: { path: string; label: Localized }
  /** Link colour on the card (channel colour on dark cards). */
  accent: string
  art: ReactNode
  /** Shown instead of the text line while it waits on Ahmad. */
  note?: ReactNode
}

/** Service tile: 170 px animated art on top, title, one line and the channel link. */
export function Tile({ tone, title, text, link, accent, art, note }: Props) {
  const t = useT()
  const href = useLink()
  return (
    <a
      href={href(link.path)}
      className={cn(
        'group flex min-h-[320px] flex-col overflow-hidden rounded-[22px] transition-transform duration-400 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-1.5',
        TONES[tone],
      )}
    >
      <div aria-hidden="true" className="relative h-[170px] overflow-hidden">
        {art}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-[18px]">
        <h3 className="text-[1.1875rem] font-semibold">{t(title)}</h3>
        {text && (
          <p className="text-[0.8125rem] leading-[1.7] text-[var(--tile-text)]">{t(text)}</p>
        )}
        {note}
        <span className={cn('mt-auto pt-2 text-sm group-hover:underline', accent)}>
          {t(link.label)}
        </span>
      </div>
    </a>
  )
}
