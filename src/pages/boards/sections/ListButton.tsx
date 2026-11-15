import { ListChecks } from 'lucide-react'
import { Button } from '@/components/ui/button'
import content from '@/content/selection.json'
import { useT } from '@/features/i18n/LangContext'
import { useSelection } from '@/features/selection/store'

/** Blue "My list (n)" pill in the finder bar: side panel on desktop, sheet on phones. */
export function ListButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  const t = useT()
  const count = useSelection().length
  return (
    <Button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      className="h-11 shrink-0 gap-2 rounded-full bg-brand-blue px-4 text-[0.9375rem] font-medium text-white hover:bg-brand-blue-80"
    >
      <ListChecks className="size-4" strokeWidth={2} aria-hidden="true" />
      <span className="max-sm:sr-only">{t(content.title)}</span>
      <span className="ltr-run rounded-full bg-white px-2 text-[0.8125rem] font-semibold text-brand-blue">
        {count}
      </span>
    </Button>
  )
}
