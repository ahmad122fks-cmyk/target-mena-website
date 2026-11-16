import { useWatch, type Control } from 'react-hook-form'
import type { ReactNode } from 'react'
import { useLang, useT } from '@/features/i18n/LangContext'
import { useSelection } from '@/features/selection/store'
import { formatDuration, formatSqm } from '@/lib/format'
import { CONTACT, telHref } from '@/lib/site'
import content from '@/pages/campaign/campaign.content.json'
import type { CampaignValues } from './schema'

/** Sticky "Campaign summary": boards, total m², duration, the visitor's budget, services, codes. No prices. */
export function CampaignSummary({ control }: { control: Control<CampaignValues> }) {
  const t = useT()
  const lang = useLang()
  const items = useSelection()
  const [value, unit, budget, currency, services] = useWatch({
    control,
    name: ['durationValue', 'durationUnit', 'budget', 'currency', 'services'],
  })
  const s = content.summary
  const f = content.fields
  const area = Math.round(items.reduce((sum, item) => sum + item.sqm, 0) * 100) / 100
  const money = t(f[currency])
  const rows: [string, ReactNode][] = [
    [t(s.boards), <span className="ltr-run">{items.length}</span>],
    [t(s.area), <span className="ltr-run">{formatSqm(area, lang)}</span>],
    [t(s.duration), Number(value) > 0 ? formatDuration(Number(value), unit, lang) : '—'],
    [
      t(s.budget),
      budget ? (
        <>
          <span className="ltr-run">{budget}</span> {money}
        </>
      ) : (
        `— ${money}`
      ),
    ],
    [
      t(s.services),
      services.length ? services.map((k) => t(f[k])).join(lang === 'ar' ? '، ' : ', ') : '—',
    ],
  ]
  return (
    <aside
      aria-label={t(s.title)}
      className="min-w-0 flex-[1_1_20rem] overflow-hidden rounded-[1.375rem] border border-line bg-surface lg:sticky lg:top-20"
    >
      <p className="border-b border-line px-5 py-4 text-lg font-semibold text-ink">{t(s.title)}</p>
      <dl className="flex flex-col px-5 py-1">
        {rows.map(([label, shown]) => (
          <div
            key={label}
            className="flex justify-between gap-3 border-b border-line py-3 text-[0.9375rem] last:border-b-0"
          >
            <dt>{label}</dt>
            <dd className="text-end font-medium text-ink">{shown}</dd>
          </div>
        ))}
      </dl>
      {items.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 px-5 pb-4" aria-label={t(s.boards)}>
          {items.map((item) => (
            <li
              key={item.code}
              className="ltr-run rounded-full bg-brand-blue-10 px-2.5 py-1 text-[0.8125rem] font-semibold text-link"
            >
              {item.code}
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-col gap-1 bg-brand-ghost px-5 py-4 text-[0.8125rem] leading-[1.7]">
        <span>{t(s.direct)}</span>
        <span className="ltr-run text-ink">
          <a href={telHref(CONTACT.phones[0])} className="hover:text-link">
            {CONTACT.phones[0]}
          </a>{' '}
          ·{' '}
          <a href={`mailto:${CONTACT.email}`} className="hover:text-link">
            {CONTACT.email}
          </a>
        </span>
      </div>
    </aside>
  )
}
