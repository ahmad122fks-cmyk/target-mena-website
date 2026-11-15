import { Search } from 'lucide-react'
import { PillButton } from '@/components/shared/PillButton'
import { useLink, useT } from '@/features/i18n/LangContext'
import content from '../home.content.json'

/** Pill search: a plain GET form to the finder (?q=…), so it works before the page hydrates. */
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
      className="flex max-w-[520px] items-center gap-2 rounded-full border border-input bg-white p-1.5 shadow-soft focus-within:border-brand-blue"
    >
      <Search className="ms-3 size-5 shrink-0 text-brand-text" strokeWidth={2} aria-hidden="true" />
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
