import { lazy, Suspense } from 'react'
import { usePageData } from '@/app/PageData'
import { PhoneFrame } from '@/components/experiences/PhoneFrame'
import { Container } from '@/components/shared/Section'
import { useT } from '@/features/i18n/LangContext'
import { useInView } from '@/lib/motion'
import content from '../network.tour.content.json'
import { LiveDot } from './LiveDot'
import { TrackingPanel } from './TrackingPanel'
import './network.css'

const BoardSwipe = lazy(() =>
  import('@/components/experiences/BoardSwipe').then((m) => ({ default: m.BoardSwipe })),
)

/** "On the ground now": the swipe cards in a phone, and the portal's tracking demo. */
export function OnTheGround() {
  const t = useT()
  const { swipe } = usePageData('network')
  // Load the cards once the phone comes near; pause them whenever it is off screen.
  const [nearRef, near] = useInView<HTMLDivElement>({ rootMargin: '300px', once: true })
  const [ref, inView] = useInView<HTMLDivElement>()
  const { ground } = content
  return (
    <section
      aria-labelledby="ground-title"
      className="border-t border-white/10 bg-deep text-brand-grey-40 [--heading:#fff]"
    >
      <Container wide className="flex flex-wrap items-center gap-12 py-16 lg:py-20">
        <div ref={nearRef} className="flex flex-[1_1_100%] justify-center lg:flex-[0_0_320px]">
          <div ref={ref}>
            <PhoneFrame label={t(ground.phoneLabel)}>
              <Suspense fallback={<div className="absolute inset-0 bg-[#04111f]" />}>
                {near && <BoardSwipe boards={swipe} active={inView} />}
              </Suspense>
            </PhoneFrame>
          </div>
        </div>
        <div className="flex min-w-0 flex-[1_1_32rem] flex-col gap-5">
          <LiveDot label={t(ground.eyebrow)} />
          <h2 id="ground-title" className="text-3xl leading-[1.25] lg:text-[2.5rem]">
            {t(ground.title)}
          </h2>
          <p className="leading-[1.8]">{t(ground.text)}</p>
          <TrackingPanel boards={swipe} />
        </div>
      </Container>
    </section>
  )
}
