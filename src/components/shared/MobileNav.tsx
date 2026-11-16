import { Menu } from 'lucide-react'
import { lazy, Suspense, useState } from 'react'
import { Button } from '@/components/ui/button'
import site from '@/content/site.json'
import { useT } from '@/features/i18n/LangContext'

// The menu panel (shadcn Sheet / Radix Dialog) loads on first use, not with every page.
const loadSheet = () => import('./MobileNavSheet')
const MobileNavSheet = lazy(loadSheet)

/** Phone and tablet menu button; opens the menu panel from its own side. */
export function MobileNav() {
  const t = useT()
  const [open, setOpen] = useState(false)
  const [used, setUsed] = useState(false)
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="size-11 text-ink hover:bg-brand-ghost hover:text-ink xl:hidden"
        aria-label={t(site.menuOpen)}
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={() => void loadSheet()}
        onFocus={() => void loadSheet()}
        onClick={() => {
          setUsed(true)
          setOpen(true)
        }}
      >
        <Menu className="size-6" strokeWidth={1.75} aria-hidden="true" />
      </Button>
      {used && (
        <Suspense fallback={null}>
          <MobileNavSheet open={open} onOpenChange={setOpen} />
        </Suspense>
      )}
    </>
  )
}
