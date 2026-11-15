import { Plus } from 'lucide-react'
import { PillButton } from '@/components/shared/PillButton'
import { SelectionItem } from '@/components/shared/SelectionItem'
import { useLink, useT } from '@/features/i18n/LangContext'
import { useSelection } from '@/features/selection/store'
import content from '@/pages/campaign/campaign.content.json'

/** Step 3: the boards from "My selection"; "add more" opens the finder in picker mode. */
export function BoardsStep({ error }: { error: boolean }) {
  const t = useT()
  const link = useLink()
  const items = useSelection()
  return (
    <div className="flex flex-col gap-4">
      {items.length ? (
        <ul className="divide-y rounded-xl border bg-white">
          {items.map((item) => (
            <SelectionItem key={item.code} item={item} />
          ))}
        </ul>
      ) : (
        <p className="rounded-xl border border-dashed p-5">{t(content.boards.none)}</p>
      )}
      {error && (
        <p
          role="alert"
          className="rounded-lg border-s-4 border-brand-yellow bg-white p-3 font-medium text-brand-black"
        >
          {t(content.errors.boards)}
        </p>
      )}
      <PillButton tone="outline" href={link('/boards/?pick=1')} className="self-start">
        <Plus className="size-4" aria-hidden="true" />
        {t(content.boards.addMore)}
      </PillButton>
    </div>
  )
}
