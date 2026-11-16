import { lazy, Suspense } from 'react'
import { usePageData } from '@/app/PageData'
import { PhoneFrame } from '@/components/experiences/PhoneFrame'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useT } from '@/features/i18n/LangContext'
import { useInView } from '@/lib/motion'
import content from '../network.tour.content.json'
import { LiveDot } from './LiveDot'
import { TrackingPanel } from './TrackingPanel'
import './network.css'

const BoardSwipe = lazy(() =>
  import('@/components/experiences/BoardSwipe').then((m) => ({ default: m.BoardSwipe })),
)

/**
 * "On the ground now" (v3: ghost band): the swipe cards in the navy phone,
 * and the portal's tracking demo on a white panel.
 */
export function OnTheGround() {
  const t = useT()
  const { swipe } = usePageData('network')
  // Load the cards once the phone comes near; pause them whenever it is off screen.
  const [nearRef, near] = useInView<HTMLDivElement>({ rootMargin: '300px', once: true })
  const [ref, inView] = useInView<HTMLDivElement>()
  const { ground } = content
  return (
    <Section tone="ghost" labelledBy="ground-title">
      <div className="flex flex-wrap items-center gap-12">
        <div ref={nearRef} className="flex flex-[1_1_100%] justify-center lg:flex-[0_0_320px]">
          <div ref={ref}>
            <PhoneFrame label={t(ground.phoneLabel)} className="dark:border-line">
              <Suspense fallback={<div className="absolute inset-0 bg-[#04111f]" />}>
                {near && <BoardSwipe boards={swipe} active={inView} />}
              </Suspense>
            </PhoneFrame>
          </div>
        </div>
        <div className="flex min-w-0 flex-[1_1_32rem] flex-col gap-5">
          <LiveDot label={t(ground.eyebrow)} className="text-link ltr:tracking-[0.06em]" />
          <SectionHeading id="ground-title" title={t(ground.title)} lead={t(ground.text)} />
          <TrackingPanel boards={swipe} />
        </div>
      </div>
    </Section>
  )
}
