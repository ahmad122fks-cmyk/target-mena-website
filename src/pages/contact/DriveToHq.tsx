import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ToConfirm } from '@/components/shared/ToConfirm'
import { LazyVideo, videoReady } from '@/components/shared/video/LazyVideo'
import site from '@/content/site.json'
import videos from '@/content/videos.json'
import { useT } from '@/features/i18n/LangContext'

/**
 * Prompt 4b: "The drive to our HQ" above the address block: the video in a
 * navy frame at its true ratio, the exact address, and the map button (no
 * map link exists yet, so it waits as [TO CONFIRM]; no invented
 * coordinates). Left out of the production build until the video exists.
 */
export function DriveToHq() {
  const t = useT()
  if (!videoReady('driveToHq') && import.meta.env.PROD) return null
  const { drive } = videos
  return (
    <Section labelledBy="drive-title" pad="md">
      <SectionHeading id="drive-title" title={t(drive.title)} size="band" />
      <div className="mt-6 overflow-hidden rounded-card bg-navy shadow-frame">
        <LazyVideo video="driveToHq" firstView />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-lg font-medium text-ink">{t(site.contact.address)}</span>
        <ToConfirm what={drive.mapsToConfirm} className="text-xs" />
      </div>
    </Section>
  )
}
