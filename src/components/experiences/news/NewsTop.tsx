import content from '@/content/news.json'
import { useT } from '@/features/i18n/LangContext'
import { LOGO_BLUE } from '@/lib/site'

/** App bar under the island: the blue logo on white and a "Latest news" light. */
export function NewsTop({ running }: { running: boolean }) {
  const t = useT()
  return (
    <div className="flex items-center justify-between border-b border-line px-3.5 pt-[50px] pb-2">
      <img src={LOGO_BLUE} alt="" width={1111} height={202} className="h-5 w-auto" />
      <span className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-text">
        <span
          aria-hidden="true"
          className="size-[7px] rounded-full bg-brand-green motion-safe:animate-[twinkle_1.2s_ease-in-out_infinite]"
          style={{ animationPlayState: running ? 'running' : 'paused' }}
        />
        {t(content.header)}
      </span>
    </div>
  )
}
