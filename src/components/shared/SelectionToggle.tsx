import { Check, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import content from '@/content/selection.json'
import { useT } from '@/features/i18n/LangContext'
import { selection, useSelection } from '@/features/selection/store'
import type { Board } from '@/lib/boards'
import { cn } from '@/lib/utils'

type Props = { board: Board; onAdd?: () => void; className?: string }

/** Blue "+ Add to my list" pill; green "✓ In my list" once added. */
export function SelectionToggle({ board, onAdd, className }: Props) {
  const t = useT()
  const added = useSelection().some((item) => item.code === board.code)
  const Icon = added ? Check : Plus
  return (
    <Button
      type="button"
      aria-pressed={added}
      onClick={() => {
        selection.toggle(board)
        if (!added) onAdd?.()
      }}
      className={cn(
        'h-11 rounded-full px-4 text-sm font-medium',
        added
          ? 'border border-brand-green bg-brand-green-10 text-ink hover:bg-brand-green-10'
          : 'bg-brand-blue text-white hover:bg-brand-blue-80',
        className,
      )}
    >
      <Icon className="size-4" strokeWidth={2.25} aria-hidden="true" />
      {t(added ? content.added : content.add)}
      <span className="sr-only ltr-run"> {board.code}</span>
    </Button>
  )
}
