import site from '@/content/site.json'
import { useLink, useT } from '@/features/i18n/LangContext'
import { LangSwitch } from './LangSwitch'
import { Logo } from './Logo'
import { Stripe } from './Stripe'

export function Footer() {
  const t = useT()
  const link = useLink()
  const { footer } = site
  return (
    <footer className="bg-white">
      <Stripe />
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-2 py-6 text-sm sm:px-4">
        <Logo />
        <p>{t(footer.rights)}</p>
        <nav aria-label={t(footer.footerNav)} className="flex items-center gap-1">
          <a href={link(footer.privacy.path)} className="inline-flex min-h-11 items-center px-3 hover:underline">
            {t(footer.privacy.label)}
          </a>
          <LangSwitch />
        </nav>
      </div>
    </footer>
  )
}
