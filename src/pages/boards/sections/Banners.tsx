import { Button } from '@/components/ui/button'
import content from '@/content/selection.json'
import { useLink, useT } from '@/features/i18n/LangContext'
import { selection } from '@/features/selection/store'
import type { Board } from '@/lib/boards'

/** Shown for a shared link (?codes=…): add them all, or see every board. */
export function SharedBanner({ boards, onShowAll }: { boards: Board[]; onShowAll: () => void }) {
  const t = useT()
  return (
    <div
      role="status"
      className="flex flex-wrap items-center gap-3 rounded-xl bg-brand-blue-10 p-4"
    >
      <p className="flex-1 font-semibold text-brand-black">
        {t(content.shared)} <span className="ltr-run">({boards.length})</span>
      </p>
      <Button
        type="button"
        onClick={() => selection.add(boards)}
        className="h-11 rounded-xl font-semibold"
      >
        {t(content.addAll)}
      </Button>
      <Button
        type="button"
        variant="ghost"
        onClick={onShowAll}
        className="h-11 rounded-xl font-semibold text-brand-blue"
      >
        {t(content.showAll)}
      </Button>
    </div>
  )
}

/** Picker mode (?pick=1, opened from the campaign builder): a way back to the request. */
export function PickerBanner() {
  const t = useT()
  const link = useLink()
  return (
    <div
      role="status"
      className="flex flex-wrap items-center gap-3 rounded-xl bg-brand-yellow-40 p-4"
    >
      <p className="flex-1 font-semibold text-brand-black">{t(content.picker)}</p>
      <Button asChild className="h-11 rounded-xl font-semibold">
        <a href={link('/campaign/?step=boards')}>{t(content.backToCampaign)}</a>
      </Button>
    </div>
  )
}
