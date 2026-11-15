import { ListChecks } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { useLocation } from 'react-router'
import { Button } from '@/components/ui/button'
import content from '@/content/selection.json'
import { basePath } from '@/features/i18n/lang'
import { useT } from '@/features/i18n/LangContext'
import { useSelection } from '@/features/selection/store'

// The list panel loads on first use, not with every page.
const loadSheet = () => import('./SelectionSheet')
const SelectionSheet = lazy(loadSheet)

/** Pages that show "My list" themselves (finder bar and side panel, campaign summary). */
const OWN_LIST = ['/boards/', '/campaign/']

/** Floating "My list (n)" pill, shown once the visitor has picked a board. */
export function SelectionButton() {
  const t = useT()
  const count = useSelection().length
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [used, setUsed] = useState(false)
  if (OWN_LIST.includes(basePath(pathname))) return null
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
          className="fixed end-4 bottom-4 z-40 h-14 rounded-full bg-brand-blue px-5 text-base font-medium shadow-float hover:bg-brand-blue-80"
        >
          <ListChecks className="size-5" strokeWidth={1.75} aria-hidden="true" />
          {t(content.title)}
          <span className="ltr-run rounded-full bg-white px-2.5 text-sm font-semibold text-brand-blue">
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
