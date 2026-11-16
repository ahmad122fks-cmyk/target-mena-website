import { usePageData } from '@/app/PageData'
import { PhoneShowcase } from '@/components/experiences/PhoneShowcase'
import { NetworkMap } from '@/components/map/NetworkMap'
import { Container } from '@/components/shared/Section'
import { HeroIntro } from './HeroIntro'
import { Kpis } from './Kpis'

/**
 * Dark hero (prompt 4): text, search and service chips at the start, the
 * services phone at the end (left in Arabic, right in English); below them
 * the network map with its intro flight and the network counters.
 */
export function Hero() {
  const { swipe } = usePageData('home')
  return (
    <section
      aria-labelledby="hero-title"
      className="bg-deep text-brand-grey-40 [--heading:var(--color-brand-white)]"
    >
      <Container className="flex flex-col gap-7 pt-10 pb-16 lg:pt-14">
        <div className="flex flex-wrap items-center gap-x-12 gap-y-10">
          <HeroIntro />
          <div className="flex min-w-0 flex-[1_1_100%] justify-center lg:flex-[0_0_380px]">
            <PhoneShowcase boards={swipe} />
          </div>
        </div>
        <NetworkMap panel />
        <Kpis />
      </Container>
    </section>
  )
}
