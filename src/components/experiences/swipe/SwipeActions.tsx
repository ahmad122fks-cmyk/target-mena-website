import { MapPin } from 'lucide-react'
import { SelectionToggle } from '@/components/shared/SelectionToggle'
import content from '@/content/experiences.json'
import { useLink, useT } from '@/features/i18n/LangContext'
import { useSelection } from '@/features/selection/store'
import { boardPath, type Board } from '@/lib/boards'
import { absoluteUrl } from '@/lib/site'
import { fill } from '@/lib/template'
import { ShareButton } from './ShareButton'

const ROUND =
  'flex size-10 items-center justify-center rounded-full bg-white/12 text-white transition-transform active:scale-90'

/** «أضف إلى قائمتي» (the site's selection cart), the board page, share. */
export function SwipeActions({ board }: { board: Board }) {
  const t = useT()
  const link = useLink()
  const c = content.swipe
  const added = useSelection().some((item) => item.code === board.code)
  const values = { code: board.code }
  return (
    <div className="relative flex items-center gap-2 px-4 pt-3 pb-[22px]">
      <SelectionToggle
        board={board}
        className={
          'h-10 min-w-0 flex-1 gap-1.5 border-0 px-3 text-[13px] font-semibold text-black transition-transform active:scale-95 ' +
          (added ? 'bg-brand-yellow hover:bg-brand-yellow-80' : 'bg-white hover:bg-white/90')
        }
      />
      <a href={link(boardPath(board))} aria-label={fill(t(c.location), values)} className={ROUND}>
        <MapPin className="size-[19px]" strokeWidth={2} aria-hidden="true" />
      </a>
      <ShareButton
        url={absoluteUrl(link(boardPath(board)))}
        title={`${board.code} · ${t(c.title)}`}
        label={fill(t(c.share), values)}
        copiedLabel={t(c.copied)}
        className={ROUND}
      />
    </div>
  )
}
