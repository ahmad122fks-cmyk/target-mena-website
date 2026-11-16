import { useLocation } from 'react-router'
import site from '@/content/site.json'
import { basePath } from '@/features/i18n/lang'
import { useLink, useT } from '@/features/i18n/LangContext'
import { useScrolled } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { ClientLogin } from './ClientLogin'
import { LangSwitch } from './LangSwitch'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'
import { NavLinks } from './NavLinks'
import { PillButton } from './PillButton'
import { ThemeToggle } from './ThemeToggle'

/**
 * Sticky header: logo, plain menu, language, theme, yellow "Plan your
 * campaign" (blue; yellow on the hero). v3: white on every page; on the home page it sits on the blue
 * brand hero (white logo and links) and turns solid blue once scrolled.
 */
export function Header() {
  const t = useT()
  const link = useLink()
  const onHero = basePath(useLocation().pathname) === '/'
  const scrolled = useScrolled()
  return (
    <header
      data-on-hero={onHero || undefined}
      data-scrolled={(onHero && scrolled) || undefined}
      className={cn(
        'sticky top-0 z-40 border-b',
        onHero ? 'header-on-hero' : 'border-line bg-page',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:p-3 focus:text-link"
      >
        {t(site.skipLink)}
      </a>
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-2 sm:px-4">
        <div className="flex items-center gap-6 xl:gap-9">
          <Logo tone={onHero ? 'white' : 'blue'} />
          <nav aria-label={t(site.navLabel)} className="hidden xl:block">
            <NavLinks />
          </nav>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <ClientLogin className="hidden sm:inline-flex" />
          <LangSwitch className="font-normal text-ink" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <PillButton
            tone={onHero ? 'yellow' : 'blue'}
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
