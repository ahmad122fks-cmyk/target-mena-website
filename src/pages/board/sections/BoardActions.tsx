import { PillButton } from '@/components/shared/PillButton'
import { SelectionToggle } from '@/components/shared/SelectionToggle'
import content from '@/content/selection.json'
import { useLink, useT } from '@/features/i18n/LangContext'
import { selection } from '@/features/selection/store'
import { boardPath, type Board } from '@/lib/boards'
import { absoluteUrl, whatsappHref } from '@/lib/site'
import page from '../board.content.json'

/**
 * Add this board to "My list", go straight to the campaign builder with it,
 * or ask about it on WhatsApp (the message carries the code and the page link).
 */
export function BoardActions({ board }: { board: Board }) {
  const t = useT()
  const link = useLink()
  const ask = `${t(page.askText).replace('{code}', board.code)}\n${absoluteUrl(link(boardPath(board)))}`
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-brand-ghost p-6">
      <h2 className="text-xl">{t(content.title)}</h2>
      <SelectionToggle board={board} className="h-12 w-full" />
      <div onClickCapture={() => selection.add([board])}>
        <PillButton href={link('/campaign/')} className="w-full">
          {t(content.planWith)}
        </PillButton>
      </div>
      <PillButton href={whatsappHref(ask)} tone="outline" external className="w-full">
        {t(page.askWhatsapp)}
      </PillButton>
    </div>
  )
}
