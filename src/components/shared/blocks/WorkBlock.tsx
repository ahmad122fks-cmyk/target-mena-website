import work from '@/content/work.json'
import { useT } from '@/features/i18n/LangContext'
import { ToConfirm } from '../ToConfirm'

/**
 * Production clients and recent work (BUILD-BRIEF 6; names only, logos only
 * from Ahmad's files). Only approved names ship; the rest wait on Ahmad.
 */
export function WorkBlock() {
  const t = useT()
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="flex flex-col gap-4 rounded-card border border-line bg-surface p-6 lg:p-7">
        <h3 className="text-xl font-semibold">{t(work.clientsTitle)}</h3>
        <ul className="flex flex-wrap gap-2">
          {work.clients.map((client) => (
            <li
              key={client.en}
              className="rounded-full bg-brand-grey-10 px-3 py-1 text-sm text-ink"
            >
              {t(client)}
            </li>
          ))}
        </ul>
        <ToConfirm what={work.clientsToConfirm} className="self-start text-xs" />
        <p className="text-sm">{t(work.retained)}</p>
      </div>
      <div className="flex flex-col gap-4 rounded-card border border-line bg-surface p-6 lg:p-7">
        <h3 className="text-xl font-semibold">{t(work.recentTitle)}</h3>
        <ul className="flex flex-col divide-y divide-line">
          {work.recent.map((item) => (
            <li key={item.en} className="py-2.5 text-ink">
              {t(item)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
