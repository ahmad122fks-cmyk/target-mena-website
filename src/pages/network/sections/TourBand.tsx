import { usePageData } from '@/app/PageData'
import { NetworkMap } from '@/components/map/NetworkMap'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { Container, Section } from '@/components/shared/Section'
import { useLang, useT } from '@/features/i18n/LangContext'
import { trailFor } from '@/lib/breadcrumbs'
import content from '../network.tour.content.json'
import { StopCard } from './tour/StopCard'
import { StopList } from './tour/StopList'
import { useTour } from './tour/useTour'

/**
 * "A journey across Iraq" (v3, prompt 5): a white band; five stops as white
 * cards (current one blue) drive the map, which draws its own light frame.
 */
export function TourBand() {
  const t = useT()
  const lang = useLang()
  const data = usePageData('network')
  const tour = useTour()
  return (
    // overflow-clip, not hidden: the map can stay in view (sticky) beside the long stop column.
    <Section labelledBy="network-title" bare className="overflow-clip">
      <Container className="flex flex-col gap-8 pt-6 pb-16 lg:pb-[5.5rem]">
        <Breadcrumbs items={trailFor(data, lang)} />
        <div className="flex flex-col gap-3">
          <Eyebrow>{t(content.tour.eyebrow)}</Eyebrow>
          <h1
            id="network-title"
            className="text-4xl leading-[1.2] sm:text-5xl lg:text-[3.5rem] lg:leading-[4.125rem]"
          >
            {t(content.tour.title)}
          </h1>
          <p className="max-w-2xl">{t(content.tour.lead)}</p>
        </div>
        <div
          ref={tour.ref}
          className="grid gap-5 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:items-start"
        >
          <div className="flex min-w-0 flex-col gap-3.5">
            <div className="h-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
              <span
                className="block h-full bg-brand-blue transition-[width] duration-500 dark:bg-link"
                style={{ width: `${((tour.index + 1) / 5) * 100}%` }}
              />
            </div>
            <StopList index={tour.index} onPick={tour.go} />
            <div className="hidden lg:block">
              <StopCard {...tour} />
            </div>
          </div>
          <div className="min-w-0 lg:sticky lg:top-24">
            <NetworkMap height={700} view={tour.stop.view} selected={tour.stop.selected} priority />
          </div>
          <div className="lg:hidden">
            <StopCard {...tour} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
