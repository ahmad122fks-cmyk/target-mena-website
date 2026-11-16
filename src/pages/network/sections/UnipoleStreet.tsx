import { Section } from '@/components/shared/Section'
import { LazyVideo, videoReady } from '@/components/shared/video/LazyVideo'
import videos from '@/content/videos.json'
import { useLink, useT } from '@/features/i18n/LangContext'

/**
 * Prompt 4b, in the v3 style: the unipole street scene at its true ratio in
 * a navy frame, a caption and a link to the finder. One section, easy to
 * move. Left out of the production build until the video file exists.
 */
export function UnipoleStreet() {
  const t = useT()
  const link = useLink()
  if (!videoReady('unipoleStreet') && import.meta.env.PROD) return null
  const { unipole } = videos
  return (
    <Section tone="ghost" labelledBy="unipole-title" pad="md">
      <figure className="m-0 overflow-hidden rounded-card bg-navy shadow-frame">
        <LazyVideo video="unipoleStreet" />
        <figcaption className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-white">
          <span id="unipole-title" className="text-lg font-semibold">
            {t(unipole.caption)}
          </span>
          <a href={link(unipole.link.path)} className="font-semibold hover:underline">
            {t(unipole.link.label)}
          </a>
        </figcaption>
      </figure>
    </Section>
  )
}
