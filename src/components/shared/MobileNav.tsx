import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import site from '@/content/site.json'
import { useDir, useLang, useLink, useT } from '@/features/i18n/LangContext'
import { CtaLink } from './CtaLink'
import { NavLinks } from './NavLinks'

/** Phone and tablet menu (shadcn Sheet), opening from the side of its button. */
export function MobileNav() {
  const t = useT()
  const lang = useLang()
  const dir = useDir()
  const link = useLink()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-11 xl:hidden"
          aria-label={t(site.menuOpen)}
        >
          <Menu className="size-6" strokeWidth={1.75} aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={lang === 'ar' ? 'left' : 'right'}
        dir={dir}
        aria-describedby={undefined}
        className="w-[min(20rem,85vw)] gap-6 bg-white p-6 pt-14"
      >
        <SheetTitle className="sr-only">{t(site.navLabel)}</SheetTitle>
        <nav aria-label={t(site.navLabel)}>
          <NavLinks column />
        </nav>
        <CtaLink href={link(site.headerCta.path)}>{t(site.headerCta.label)}</CtaLink>
      </SheetContent>
    </Sheet>
  )
}
