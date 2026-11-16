import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import site from '@/content/site.json'
import { useDir, useLang, useLink, useT } from '@/features/i18n/LangContext'
import { ClientLogin } from './ClientLogin'
import { PillButton } from './PillButton'
import { NavLinks } from './NavLinks'
import { ThemeToggle } from './ThemeToggle'

type Props = { open: boolean; onOpenChange: (open: boolean) => void }

/** The phone menu panel (shadcn Sheet), loaded only when the menu button is used. */
export default function MobileNavSheet({ open, onOpenChange }: Props) {
  const t = useT()
  const lang = useLang()
  const dir = useDir()
  const link = useLink()
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={lang === 'ar' ? 'left' : 'right'}
        dir={dir}
        aria-describedby={undefined}
        closeLabel={t(site.close)}
        className="w-[min(20rem,85vw)] gap-6 bg-surface p-6 pt-14"
      >
        <SheetTitle className="sr-only">{t(site.navLabel)}</SheetTitle>
        <nav aria-label={t(site.navLabel)}>
          <NavLinks column />
        </nav>
        <div className="flex items-center justify-between gap-3">
          <ClientLogin className="text-lg" />
          <ThemeToggle className="border border-line" />
        </div>
        <PillButton tone="yellow" href={link(site.headerCta.path)}>
          {t(site.headerCta.label)}
        </PillButton>
      </SheetContent>
    </Sheet>
  )
}
