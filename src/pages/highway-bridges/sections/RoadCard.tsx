import { useLang, useLink, useT } from '@/features/i18n/LangContext'
import { cityLabel } from '@/lib/boards'
import content from '../highways.content.json'

type Road = { key: string; bridges: number; unipoles: number; faces: number }

function Figure({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-field bg-brand-ghost px-4 py-3">
      <b className="ltr-run text-3xl font-semibold text-link">{value}</b>
      <span className="text-sm">{label}</span>
    </div>
  )
}

/** One highway: name, catalog text, counts from boards.json, link to its boards. */
export function RoadCard({ road }: { road: Road }) {
  const t = useT()
  const lang = useLang()
  const link = useLink()
  const text = content.roads[road.key as keyof typeof content.roads]
  return (
    <article className="flex flex-col gap-4 rounded-card border border-line bg-surface p-6 lg:p-8">
      <h3 className="text-2xl font-semibold">{cityLabel(road.key, lang)}</h3>
      <p className="leading-[1.9]">{t(text.text)}</p>
      <div className="grid grid-cols-2 gap-3">
        <Figure value={road.bridges} label={t(content.bridges)} />
        {road.unipoles > 0 && <Figure value={road.unipoles} label={t(content.unipoles)} />}
        {'distance' in text && <Figure value={t(text.distance)} label={t(text.distanceLabel)} />}
      </div>
      <a
        href={link(`/network/${road.key}/`)}
        className="mt-auto inline-flex min-h-11 items-end self-start font-medium text-link hover:underline"
      >
        {t(content.browse)}
      </a>
    </article>
  )
}
