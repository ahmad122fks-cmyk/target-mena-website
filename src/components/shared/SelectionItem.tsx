import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import content from '@/content/selection.json'
import { useLang, useLink, useT } from '@/features/i18n/LangContext'
import type { SelectedBoard } from '@/features/selection/items'
import { selection } from '@/features/selection/store'
import { boardPath, cityLabel, typeLabel } from '@/lib/boards'
import { formatSize, formatSqm } from '@/lib/format'
import { BoardPhoto } from './BoardPhoto'

/** One row in "My selection": thumbnail, code, province, size, remove. */
export function SelectionItem({ item }: { item: SelectedBoard }) {
  const t = useT()
  const lang = useLang()
  const link = useLink()
  return (
    <li className="flex items-center gap-3 p-4">
      <BoardPhoto
        board={item}
        alt=""
        sizes="96px"
        className="size-16 shrink-0 rounded-lg text-xs"
      />
      <div className="min-w-0 flex-1">
        <a
          href={link(boardPath(item))}
          className="ltr-run font-semibold text-brand-blue hover:underline"
        >
          {item.code}
        </a>
        <p className="truncate text-sm">
          {typeLabel(item.type, lang)} · {cityLabel(item.city, lang)}
        </p>
        <p className="text-sm">
          <span className="ltr-run">{formatSize(item.height, item.width, lang)}</span> ·{' '}
          <span className="ltr-run">{formatSqm(item.sqm, lang)}</span>
        </p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-11"
        onClick={() => selection.remove(item.code)}
      >
        <X className="size-5" aria-hidden="true" />
        <span className="sr-only">
          {t(content.remove)} {item.code}
        </span>
      </Button>
    </li>
  )
}
