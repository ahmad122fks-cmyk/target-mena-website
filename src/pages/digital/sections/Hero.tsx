import { useState } from 'react'
import { usePageData } from '@/app/PageData'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { Container } from '@/components/shared/Section'
import { useLang, useT } from '@/features/i18n/LangContext'
import { trailFor } from '@/lib/breadcrumbs'
import { useInView } from '@/lib/motion'
import { cn } from '@/lib/utils'
import content from '../digital.content.json'
import hero from '../digital.hero.content.json'
import { DEFAULT_TAB, TAB_IDS, type TabId } from '../tabs'
import { FloatingCalligraphy } from './FloatingCalligraphy'
import { PhoneStage } from './PhoneStage'
import { ServiceTabs } from './ServiceTabs'
import { TabPanels } from './TabPanels'

/**
 * Ghost hero (v3): page name (H1), the catalog line, intro, six service tabs
 * (active = blue) and their text at the start side; the navy phone that
 * plays the picked service at the end side. Floating calligraphy behind,
 * paused when off screen.
 */
export function Hero() {
  const t = useT()
  const lang = useLang()
  const data = usePageData('static')
  const [tab, setTab] = useState<TabId>(DEFAULT_TAB)
  const [ref, inView] = useInView<HTMLElement>()
  const label = `${t(hero.phoneLabel)}: ${t(hero.tabs[TAB_IDS.indexOf(tab)].label)}`
  return (
    <section
      ref={ref}
      aria-labelledby="page-title"
      className={cn(
        'relative overflow-hidden border-b border-line bg-brand-ghost',
        !inView && '[&>span]:[animation-play-state:paused]',
      )}
    >
      <FloatingCalligraphy />
      <Container className="flex flex-wrap items-center gap-x-12 gap-y-10 pt-8 pb-16 lg:pt-10 lg:pb-20">
        <div className="flex min-w-0 flex-[1_1_26rem] flex-col gap-5">
          <Breadcrumbs items={trailFor(data, lang)} />
          <h1 id="page-title" className="text-[0.9375rem] leading-normal font-semibold text-link">
            {t(content.title)}
          </h1>
          <p className="-mt-2 text-4xl leading-[1.2] font-bold text-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[4.125rem]">
            {t(hero.slogan)}
          </p>
          <p className="max-w-2xl text-[1.0625rem] leading-[1.875rem]">{t(content.intro)}</p>
          <p className="text-[0.9375rem] font-medium text-ink">{t(hero.hint)}</p>
          <ServiceTabs value={tab} onChange={setTab} />
          <TabPanels value={tab} />
        </div>
        <PhoneStage tab={tab} label={label} />
      </Container>
    </section>
  )
}
