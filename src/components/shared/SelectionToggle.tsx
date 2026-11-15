import { Check, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import content from '@/content/selection.json'
import { useT } from '@/features/i18n/LangContext'
import { selection, useSelection } from '@/features/selection/store'
import type { Board } from '@/lib/boards'
import { cn } from '@/lib/utils'

/** "Add to selection" toggle; shows a tick when the board is in the visitor's list. */
export function SelectionToggle({ board, className }: { board: Board; className?: string }) {
  const t = useT()
  const added = useSelection().some((item) => item.code === board.code)
  const Icon = added ? Check : Plus
  return (
    <Button
      type="button"
      variant={added ? 'default' : 'outline'}
      aria-pressed={added}
      onClick={() => selection.toggle(board)}
      className={cn(
        'h-11 rounded-xl px-4 font-semibold',
        !added && 'border-brand-blue text-brand-blue',
        className,
      )}
    >
      <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
      {t(added ? content.added : content.add)}
      <span className="sr-only ltr-run"> {board.code}</span>
    </Button>
  )
}
