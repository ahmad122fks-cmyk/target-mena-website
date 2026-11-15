import { PillButton } from '@/components/shared/PillButton'
import { SelectionToggle } from '@/components/shared/SelectionToggle'
import content from '@/content/selection.json'
import { useLink, useT } from '@/features/i18n/LangContext'
import { selection } from '@/features/selection/store'
import type { Board } from '@/lib/boards'

/** Add this board to "My selection", or go straight to the campaign builder with it. */
export function BoardActions({ board }: { board: Board }) {
  const t = useT()
  const link = useLink()
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-brand-ghost p-6">
      <h2 className="text-xl">{t(content.title)}</h2>
      <SelectionToggle board={board} className="h-12 w-full" />
      <div onClickCapture={() => selection.add([board])}>
        <PillButton href={link('/campaign/')} className="w-full">
          {t(content.planWith)}
        </PillButton>
      </div>
    </div>
  )
}
