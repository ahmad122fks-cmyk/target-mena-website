import { PillButton } from '@/components/shared/PillButton'
import content from '@/content/selection.json'
import { useLink, useT } from '@/features/i18n/LangContext'
import { selection } from '@/features/selection/store'
import type { Board } from '@/lib/boards'

const box = 'flex flex-wrap items-center gap-3 rounded-card border p-4'

/** Shown for a shared link (?codes=…): add them all, or see every board. */
export function SharedBanner({ boards, onShowAll }: { boards: Board[]; onShowAll: () => void }) {
  const t = useT()
  return (
    <div role="status" className={`${box} border-brand-blue-40 bg-brand-blue-10`}>
      <p className="flex-1 font-semibold text-ink">
        {t(content.shared)} <span className="ltr-run">({boards.length})</span>
      </p>
      <PillButton size="sm" onClick={() => selection.add(boards)}>
        {t(content.addAll)}
      </PillButton>
      <PillButton size="sm" tone="ghost" onClick={onShowAll}>
        {t(content.showAll)}
      </PillButton>
    </div>
  )
}

/** Picker mode (?pick=1, opened from the campaign builder): a way back to the request. */
export function PickerBanner() {
  const t = useT()
  const link = useLink()
  return (
    <div role="status" className={`${box} border-brand-yellow bg-brand-yellow-10`}>
      <p className="flex-1 font-semibold text-ink">{t(content.picker)}</p>
      <PillButton size="sm" href={link('/campaign/?step=boards')}>
        {t(content.backToCampaign)}
      </PillButton>
    </div>
  )
}
