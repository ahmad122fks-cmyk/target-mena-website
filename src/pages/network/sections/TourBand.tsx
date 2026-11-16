import { usePageData } from '@/app/PageData'
import { NetworkMap } from '@/components/map/NetworkMap'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Container } from '@/components/shared/Section'
import { useLang, useT } from '@/features/i18n/LangContext'
import { trailFor } from '@/lib/breadcrumbs'
import content from '../network.tour.content.json'
import { LiveDot } from './LiveDot'
import { StopCard } from './tour/StopCard'
import { StopList } from './tour/StopList'
import { useTour } from './tour/useTour'

/** "A journey across Iraq": five stops drive the map (dark band, both themes). */
export function TourBand() {
  const t = useT()
  const lang = useLang()
  const data = usePageData('network')
  const tour = useTour()
  return (
    <section
      aria-labelledby="network-title"
      className="bg-deep text-brand-grey-40 [--heading:#fff]"
    >
      <Container wide className="flex flex-col gap-6 pt-8 pb-16 lg:pb-20">
        <Breadcrumbs items={trailFor(data, lang)} tone="dark" />
        <div className="flex flex-col gap-2.5 [--eyebrow:var(--color-brand-yellow)]">
          <Eyebrow>{t(content.tour.eyebrow)}</Eyebrow>
          <h1
            id="network-title"
            className="flex flex-wrap items-center gap-x-4 text-4xl leading-[1.2] lg:text-5xl"
          >
            {t(content.tour.title)}
            <LiveDot label={t(content.live)} />
          </h1>
          <p className="text-[1.0625rem]">{t(content.tour.lead)}</p>
        </div>
        <div ref={tour.ref} className="flex flex-wrap items-start gap-5">
          <div className="flex min-w-0 flex-[1_1_100%] flex-col gap-3.5 lg:flex-[1_1_340px]">
            <div className="h-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <span
                className="block h-full bg-brand-yellow transition-[width] duration-500"
                style={{ width: `${((tour.index + 1) / 5) * 100}%` }}
              />
            </div>
            <StopList index={tour.index} onPick={tour.go} />
            <div className="hidden lg:block">
              <StopCard {...tour} />
            </div>
          </div>
          <div className="min-w-0 flex-[999_1_640px]">
            <NetworkMap height={720} view={tour.stop.view} selected={tour.stop.selected} priority />
          </div>
          <div className="w-full lg:hidden">
            <StopCard {...tour} />
          </div>
        </div>
      </Container>
    </section>
  )
}
