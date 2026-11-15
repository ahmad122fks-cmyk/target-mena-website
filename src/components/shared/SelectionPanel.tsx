import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import content from '@/content/selection.json'
import { useT } from '@/features/i18n/LangContext'
import { useSelection } from '@/features/selection/store'
import { cn } from '@/lib/utils'
import { SelectionActions } from './SelectionActions'
import { SelectionItem } from './SelectionItem'

type Props = {
  /** Close button (desktop side panel); the phone sheet has its own. */
  onClose?: () => void
  /** Wraps the title (the sheet needs its dialog title here). */
  title?: (children: ReactNode) => ReactNode
  className?: string
}

const defaultTitle = (children: ReactNode) => <h2 className="text-lg font-semibold">{children}</h2>

/** "My list" body: chosen boards, total m², request / copy link / clear. Used by the side panel and the sheet. */
export function SelectionPanel({ onClose, title = defaultTitle, className }: Props) {
  const t = useT()
  const items = useSelection()
  return (
    <div className={cn('flex min-h-0 flex-col bg-white', className)}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        {title(
          <>
            {t(content.title)} <span className="ltr-run text-brand-blue">({items.length})</span>
          </>,
        )}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label={t(content.close)}
            className="flex size-11 items-center justify-center rounded-field bg-brand-ghost text-brand-black hover:bg-brand-blue-10"
          >
            <X className="size-4" strokeWidth={2} aria-hidden="true" />
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <p className="px-5 py-9 text-center text-[0.9375rem] leading-[1.8]">{t(content.empty)}</p>
      ) : (
        <ul className="min-h-0 flex-1 overflow-y-auto">
          {items.map((item) => (
            <SelectionItem key={item.code} item={item} />
          ))}
        </ul>
      )}
      <SelectionActions items={items} onDone={onClose} />
    </div>
  )
}
