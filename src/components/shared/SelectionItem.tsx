import content from '@/content/selection.json'
import { useLang, useLink, useT } from '@/features/i18n/LangContext'
import type { SelectedBoard } from '@/features/selection/items'
import { selection } from '@/features/selection/store'
import { boardPath, placeLine } from '@/lib/boards'
import { formatSqm } from '@/lib/format'
import { BoardPhoto } from './BoardPhoto'

/** One row in "My list": thumbnail, code, place · m², remove. */
export function SelectionItem({ item }: { item: SelectedBoard }) {
  const t = useT()
  const lang = useLang()
  const link = useLink()
  return (
    <li className="flex items-center gap-3 border-b border-line px-5 py-3 last:border-b-0">
      <BoardPhoto
        board={item}
        alt=""
        sizes="72px"
        label={false}
        className="h-12 w-[4.5rem] shrink-0 rounded-lg"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <a
          href={link(boardPath(item))}
          className="ltr-run self-start font-semibold text-brand-blue hover:underline"
        >
          {item.code}
        </a>
        <p className="truncate text-[0.8125rem]">
          {placeLine(item, lang)} · <span className="ltr-run">{formatSqm(item.sqm, lang)}</span>
        </p>
      </div>
      <button
        type="button"
        onClick={() => selection.remove(item.code)}
        className="min-h-11 rounded-lg px-2 text-[0.8125rem] hover:bg-brand-ghost hover:text-brand-black"
      >
        {t(content.remove)}
        <span className="sr-only ltr-run"> {item.code}</span>
      </button>
    </li>
  )
}
