import { usePageData } from '@/app/PageData'
import { ActionButton } from '@/components/experiences/production/ActionButton'
import { ProductionViewfinder } from '@/components/experiences/production/ProductionViewfinder'
import { useClapper } from '@/components/experiences/production/useFilm'
import viewfinder from '@/components/experiences/production/viewfinder.content.json'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Section } from '@/components/shared/Section'
import { useLang, useT } from '@/features/i18n/LangContext'
import { trailFor } from '@/lib/breadcrumbs'
import content from '../production.content.json'

const DEVICE = 'production-viewfinder'

/**
 * On set (v3, Production3.dc.html): a light ghost band with breadcrumb,
 * page name, the in-house line as H1 and the blue «أكشن» at the end side;
 * below, the viewfinder as a framed dark device (unchanged inside).
 */
export function Hero() {
  const t = useT()
  const lang = useLang()
  const data = usePageData('static')
  const clap = useClapper(viewfinder.stages.length)
  return (
    <Section tone="ghost" pad="md" labelledBy="page-title" className="border-t-0">
      <div className="flex flex-col gap-7 lg:gap-9">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div className="flex max-w-3xl flex-col gap-3">
            <Breadcrumbs items={trailFor(data, lang)} />
            <Eyebrow>{t(content.title)}</Eyebrow>
            <h1
              id="page-title"
              className="text-4xl leading-[1.2] sm:text-5xl lg:text-[3.5rem] lg:leading-[4.125rem]"
            >
              {t(content.hero.title)}
            </h1>
            <p className="text-[1.0625rem] leading-[1.875rem]">{t(content.hero.text)}</p>
          </div>
          <ActionButton stage={clap.stage} onAction={clap.action} controls={DEVICE} />
        </div>
        <ProductionViewfinder clap={clap} id={DEVICE} />
      </div>
    </Section>
  )
}
