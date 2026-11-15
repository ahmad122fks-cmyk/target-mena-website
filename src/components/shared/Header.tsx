import site from '@/content/site.json'
import { useLink, useT } from '@/features/i18n/LangContext'
import { ClientLogin } from './ClientLogin'
import { LangSwitch } from './LangSwitch'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'
import { NavLinks } from './NavLinks'
import { PillButton } from './PillButton'

/** White sticky header: logo, plain menu, language, outlined "Plan your campaign" pill. */
export function Header() {
  const t = useT()
  const link = useLink()
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3 focus:text-brand-blue"
      >
        {t(site.skipLink)}
      </a>
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-2 sm:px-4">
        <div className="flex items-center gap-6 xl:gap-9">
          <Logo />
          <nav aria-label={t(site.navLabel)} className="hidden xl:block">
            <NavLinks />
          </nav>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <ClientLogin className="hidden sm:inline-flex" />
          <LangSwitch className="font-normal text-brand-black" />
          <PillButton
            tone="outline"
            size="sm"
            href={link(site.headerCta.path)}
            className="hidden sm:inline-flex"
          >
            {t(site.headerCta.label)}
          </PillButton>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
