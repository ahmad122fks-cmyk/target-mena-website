import { Search } from 'lucide-react'
import { PillButton } from '@/components/shared/PillButton'
import { useLink, useT } from '@/features/i18n/LangContext'
import content from '../home.content.json'

/**
 * White search bar on the blue hero (v3): a plain GET form to the finder
 * (?q=…), so it works before the page hydrates. White in both themes.
 */
export function HeroSearch() {
  const t = useT()
  const link = useLink()
  const { hero } = content
  return (
    <form
      role="search"
      action={link('/boards/')}
      method="get"
      aria-label={t(hero.searchLabel)}
      className="flex max-w-[36rem] items-center gap-2 rounded-[14px] bg-white p-2 shadow-[0_20px_50px_rgb(0_0_0/0.25)]"
    >
      <Search className="ms-2 size-5 shrink-0 text-brand-grey" strokeWidth={2} aria-hidden="true" />
      <label htmlFor="hero-q" className="sr-only">
        {t(hero.searchPlaceholder)}
      </label>
      <input
        id="hero-q"
        name="q"
        type="search"
        placeholder={t(hero.searchPlaceholder)}
        className="h-11 min-w-0 flex-1 bg-transparent text-base text-brand-black outline-none placeholder:text-brand-text"
      />
      <PillButton type="submit" size="sm" className="px-6">
        {t(hero.searchButton)}
      </PillButton>
    </form>
  )
}
