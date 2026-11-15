import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useLink, useT } from '@/features/i18n/LangContext'
import content from '../home.content.json'
import { HeroCard } from './HeroCard'
import { HeroSearch } from './HeroSearch'

/** Ghost hero: headline, pill search, "plan with us" link; the "my list" product card beside it. */
export function Hero() {
  const t = useT()
  const link = useLink()
  const { hero } = content
  return (
    <Section tone="ghost" labelledBy="hero-title" className="border-t-0">
      <div className="flex flex-wrap items-center gap-x-14 gap-y-10 lg:pt-0">
        <div className="flex min-w-0 flex-[1_1_28rem] flex-col gap-6">
          <SectionHeading
            id="hero-title"
            level={1}
            size="hero"
            title={t(hero.title)}
            lead={t(hero.lead)}
          />
          <HeroSearch />
          <p className="text-sm">
            {t(hero.planHint)}{' '}
            <a
              href={link(hero.planLink.path)}
              className="font-medium text-brand-blue hover:underline"
            >
              {t(hero.planLink.label)}
            </a>
          </p>
        </div>
        <HeroCard />
      </div>
    </Section>
  )
}
