import { Container } from '@/components/shared/Section'
import { LazyVideo, videoReady } from '@/components/shared/video/LazyVideo'
import videos from '@/content/videos.json'
import { useLink, useT } from '@/features/i18n/LangContext'

/**
 * Prompt 4b, in the v3 style: a slim strip before the footer, the "drive to
 * HQ" loop contained (never cropped) in a navy frame, one line and a link to
 * Contact. Left out of the production build until the video file exists.
 */
export function VisitUs() {
  const t = useT()
  const link = useLink()
  if (!videoReady('driveToHq') && import.meta.env.PROD) return null
  const { visit } = videos
  return (
    <section aria-labelledby="visit-title" className="bg-page">
      <Container className="py-10 lg:py-12">
        <div className="relative overflow-hidden rounded-card bg-navy shadow-frame">
          <LazyVideo video="driveToHq" fill className="h-[220px] sm:h-[280px]" />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 bg-linear-to-t from-navy/90 to-transparent px-5 pt-10 pb-4 text-white">
            <p id="visit-title" className="text-lg font-semibold">
              {t(visit.line)}
            </p>
            <a href={link(visit.link.path)} className="font-semibold hover:underline">
              {t(visit.link.label)}
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
