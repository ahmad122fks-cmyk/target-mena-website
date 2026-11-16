import content from '@/content/experiences.json'
import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import type { Status } from './stage'

const TONE: Record<Status, string> = {
  draft: 'bg-[#1f4a78] text-[#eaf2f8]',
  scheduled: 'bg-brand-yellow text-black',
  live: 'bg-brand-green text-black',
}

/** Draft -> Scheduled -> Live now; pops in on each change, the live dot blinks. */
export function StatusPill({ status }: { status: Status }) {
  const t = useT()
  return (
    <span
      key={status}
      className={cn(
        'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] leading-none font-semibold motion-safe:animate-[campaign-pop_.5s_cubic-bezier(.2,.8,.2,1)_both]',
        TONE[status],
      )}
    >
      <span
        className={cn(
          'size-[7px] rounded-full bg-current',
          status === 'live' && 'motion-safe:animate-[twinkle_1.2s_ease-in-out_infinite]',
        )}
      />
      {t(content.social.status[status])}
    </span>
  )
}
