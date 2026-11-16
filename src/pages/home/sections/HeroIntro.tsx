import { Eyebrow } from '@/components/shared/Eyebrow'
import { useLink, useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import content from '../home.content.json'
import { HeroSearch } from './HeroSearch'

/** Eyebrow, H1, lead, the finder search and four service chips (links to each service). */
export function HeroIntro() {
  const t = useT()
  const link = useLink()
  const { hero } = content
  return (
    <div className="flex min-w-0 flex-[1_1_32rem] flex-col gap-6">
      <div className="flex max-w-[40rem] flex-col gap-3.5 [--eyebrow:var(--color-brand-yellow)]">
        <Eyebrow>{t(hero.eyebrow)}</Eyebrow>
        <h1 id="hero-title" className="text-4xl leading-[1.2] lg:text-[3.25rem]">
          {t(hero.title)}
        </h1>
        <p className="text-lg leading-[1.8]">{t(hero.lead)}</p>
      </div>
      <HeroSearch />
      <nav aria-label={t(hero.chipsLabel)}>
        <ul className="flex flex-wrap gap-2 text-[0.8125rem]">
          {hero.chips.map((chip) => (
            <li key={chip.path}>
              <a
                href={link(chip.path)}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/20 px-3 hover:border-white/50 hover:text-white"
              >
                <span aria-hidden="true" className={cn('size-[7px] rounded-full', chip.dot)} />
                {t(chip.label)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
