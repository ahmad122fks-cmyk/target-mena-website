import type { ReactNode } from 'react'
import { useDir } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'

type Props = {
  art: ReactNode
  /** On phones the art becomes a band above or below the content. */
  band?: 'top' | 'bottom'
  artClassName?: string
  children: ReactNode
}

/**
 * Calligraphy column on the physical left edge, as on the catalog cover in
 * both languages, so the artwork is never behind text. Content keeps the
 * page direction.
 */
export function EdgeArt({ art, band = 'top', artClassName, children }: Props) {
  const dir = useDir()
  return (
    <div dir="ltr" className="flex flex-col lg:flex-row">
      <div
        className={cn('relative shrink-0 overflow-hidden', band === 'bottom' && 'order-last lg:order-none', artClassName)}
      >
        {art}
      </div>
      <div dir={dir} className="min-w-0 flex-1">
        {children}
      </div>
    </div>
  )
}
