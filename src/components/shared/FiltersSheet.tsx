import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import type { Filters } from '@/features/boards/filter'
import { useDir, useLang, useT } from '@/features/i18n/LangContext'
import content from '@/pages/boards/boards.content.json'
import { formatCount } from '@/lib/format'
import { BoardFilters } from './BoardFilters'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: Filters
  onChange: (patch: Partial<Filters>) => void
  cityKeys: string[]
  total: number
}

/** Phone filters in a bottom sheet, closed by "Show N boards". */
export default function FiltersSheet({
  open,
  onOpenChange,
  filters,
  onChange,
  cityKeys,
  total,
}: Props) {
  const t = useT()
  const lang = useLang()
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        dir={useDir()}
        aria-describedby={undefined}
        className="max-h-[85vh] gap-4 overflow-y-auto rounded-t-2xl bg-white p-5"
      >
        <SheetTitle className="text-lg text-brand-black">{t(content.filters.button)}</SheetTitle>
        <BoardFilters filters={filters} onChange={onChange} cityKeys={cityKeys} stacked />
        <Button
          type="button"
          onClick={() => onOpenChange(false)}
          className="h-12 rounded-xl text-base font-semibold"
        >
          {t(content.filters.show)} {formatCount(total, lang)}
        </Button>
      </SheetContent>
    </Sheet>
  )
}
