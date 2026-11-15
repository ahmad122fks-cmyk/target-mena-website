import site from '@/content/site.json'
import { useLink, useT } from '@/features/i18n/LangContext'
import { CtaLink } from './CtaLink'
import { LangSwitch } from './LangSwitch'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'
import { NavLinks } from './NavLinks'
import { Stripe } from './Stripe'

export function Header() {
  const t = useT()
  const link = useLink()
  return (
    <header className="bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3 focus:text-brand-blue"
      >
        {t(site.skipLink)}
      </a>
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-2 py-2 sm:px-4">
        <Logo />
        <nav aria-label={t(site.navLabel)} className="hidden xl:block">
          <NavLinks />
        </nav>
        <div className="flex items-center gap-1">
          <LangSwitch className="text-brand-text" />
          <CtaLink href={link(site.headerCta.path)} className="hidden h-11 sm:inline-flex">
            {t(site.headerCta.label)}
          </CtaLink>
          <MobileNav />
        </div>
      </div>
      <Stripe />
    </header>
  )
}
