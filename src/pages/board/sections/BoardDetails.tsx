import { MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useLang, useT } from '@/features/i18n/LangContext'
import { cityLabel, mapUrl, placeLine, typeLabel, type Board } from '@/lib/boards'
import { formatFaces, formatSize, formatSqm } from '@/lib/format'
import content from '../board.content.json'

/** Code, type, place (the page H1) and the facts list; map link only for valid coordinates. */
export function BoardDetails({ board }: { board: Board }) {
  const t = useT()
  const lang = useLang()
  const map = mapUrl(board)
  const facts = [
    [
      t(content.size),
      <span className="ltr-run">{formatSize(board.height, board.width, lang)}</span>,
    ],
    [t(content.sqm), <span className="ltr-run">{formatSqm(board.sqm, lang)}</span>],
    [t(content.faces), formatFaces(board.faces, lang)],
    [
      t(content.location),
      <span lang="ar" dir="rtl">
        {board.description}
      </span>,
    ],
  ] as const
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="ltr-run text-4xl font-semibold text-link">{board.code}</span>
        <Badge variant="secondary" className="text-sm">
          {typeLabel(board.type, lang)}
        </Badge>
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl">{placeLine(board, lang)}</h1>
        <p className="text-lg">{cityLabel(board.city, lang)}</p>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-6 border-y py-2">
        {facts.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="py-2">{label}</dt>
            <dd className="py-2 font-semibold text-ink">{value}</dd>
          </div>
        ))}
      </dl>
      {map && (
        <a
          href={map}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border px-4 font-semibold text-link hover:bg-brand-blue-10"
        >
          <MapPin className="size-5" strokeWidth={1.75} aria-hidden="true" />
          {t(content.map)}
        </a>
      )}
    </div>
  )
}
