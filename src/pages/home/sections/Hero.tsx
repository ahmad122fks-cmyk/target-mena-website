import { TargetNews } from '@/components/experiences/news/TargetNews'
import { Container } from '@/components/shared/Section'
import { useT } from '@/features/i18n/LangContext'
import content from '../home.content.json'
import { BrandPattern } from './BrandPattern'
import { HeroIntro } from './HeroIntro'
import './hero.css'

/**
 * Home hero v3 (prompt 5): the Target brand pattern on the blue gradient,
 * with the header sitting on it. Text, search and the four numbers at the
 * start; the news phone at the end (left in Arabic, right in English).
 */
export function Hero() {
  const t = useT()
  return (
    <section
      aria-labelledby="hero-title"
      className="hero-brand relative overflow-hidden text-white [--heading:#fff]"
    >
      <BrandPattern />
      <Container className="flex flex-wrap items-center gap-x-14 gap-y-12 pt-24 pb-16 lg:pt-[7.5rem] lg:pb-[5.5rem]">
        <HeroIntro />
        <div className="flex min-w-0 flex-[1_1_100%] flex-col items-center gap-3.5 lg:flex-[0_0_360px]">
          <TargetNews />
          <p className="text-center text-[0.8125rem] text-on-blue">
            {t(content.hero.phoneCaption)}
          </p>
        </div>
      </Container>
    </section>
  )
}
