import { ListChecks } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { Button } from '@/components/ui/button'
import content from '@/content/selection.json'
import { useT } from '@/features/i18n/LangContext'
import { useSelection } from '@/features/selection/store'

// The list panel loads on first use, not with every page.
const loadSheet = () => import('./SelectionSheet')
const SelectionSheet = lazy(loadSheet)

/** Floating "My selection (n)" button, shown once the visitor has picked a board. */
export function SelectionButton() {
  const t = useT()
  const count = useSelection().length
  const [open, setOpen] = useState(false)
  const [used, setUsed] = useState(false)
  return (
    <>
      {count > 0 && (
        <Button
          type="button"
          onClick={() => {
            setUsed(true)
            setOpen(true)
          }}
          onPointerEnter={() => void loadSheet()}
          aria-haspopup="dialog"
          className="fixed end-4 bottom-4 z-40 h-14 rounded-full bg-brand-blue px-5 text-base font-semibold shadow-lg hover:bg-brand-blue-80"
        >
          <ListChecks className="size-5" strokeWidth={1.75} aria-hidden="true" />
          {t(content.title)}
          <span className="ltr-run flex size-7 items-center justify-center rounded-full bg-brand-yellow text-sm text-brand-black">
            {count}
          </span>
        </Button>
      )}
      {used && (
        <Suspense fallback={null}>
          <SelectionSheet open={open} onOpenChange={setOpen} />
        </Suspense>
      )}
    </>
  )
}
