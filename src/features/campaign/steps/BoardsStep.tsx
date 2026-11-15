import { Plus } from 'lucide-react'
import content from '@/pages/campaign/campaign.content.json'
import { BoardPhoto } from '@/components/shared/BoardPhoto'
import selectionContent from '@/content/selection.json'
import { useLang, useLink, useT } from '@/features/i18n/LangContext'
import { selection, useSelection } from '@/features/selection/store'
import { boardPath, cityLabel, placeLine } from '@/lib/boards'
import { formatSize } from '@/lib/format'

/** Step 3: the boards from "My list" as rows; "add more" opens the finder in picker mode. */
export function BoardsStep({ error }: { error: boolean }) {
  const t = useT()
  const lang = useLang()
  const link = useLink()
  const items = useSelection()
  return (
    <div className="flex flex-col gap-4">
      {items.length ? (
        <ul className="flex flex-col gap-2.5">
          {items.map((item) => (
            <li
              key={item.code}
              className="flex items-center gap-3.5 rounded-[14px] border border-line p-2.5"
            >
              <BoardPhoto
                board={item}
                alt=""
                sizes="96px"
                label={false}
                className="h-[60px] w-24 shrink-0 rounded-[10px]"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <a
                  href={link(boardPath(item))}
                  className="ltr-run self-start font-semibold text-brand-blue hover:underline"
                >
                  {item.code}
                </a>
                <span className="truncate text-sm">
                  {cityLabel(item.city, lang)} · {placeLine(item, lang)} ·{' '}
                  <span className="ltr-run">{formatSize(item.height, item.width, lang)}</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => selection.remove(item.code)}
                className="min-h-11 rounded-lg px-2 text-sm hover:bg-brand-ghost hover:text-brand-black"
              >
                {t(selectionContent.remove)}
                <span className="sr-only ltr-run"> {item.code}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-[14px] border border-dashed border-input p-5">
          {t(content.boards.none)}
        </p>
      )}
      {error && (
        <p
          role="alert"
          className="rounded-[14px] border border-brand-yellow bg-brand-yellow-10 p-3 font-medium text-brand-black"
        >
          {t(content.errors.boards)}
        </p>
      )}
      <a
        href={link('/boards/?pick=1')}
        className="inline-flex min-h-11 items-center gap-2 self-start rounded-field border border-dashed border-brand-blue px-4 font-medium text-brand-blue hover:bg-brand-blue-10"
      >
        <Plus className="size-4" strokeWidth={2} aria-hidden="true" />
        {t(content.boards.addMore)}
      </a>
      <p className="text-[0.8125rem]">{t(content.boards.hint)}</p>
    </div>
  )
}
