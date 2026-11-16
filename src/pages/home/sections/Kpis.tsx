import { totals } from '@/data/network-map.json'
import { CountUp } from '@/components/shared/CountUp'
import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import content from '../home.content.json'

/** Network size from the master planner (Ahmad, 16 Nov 2026), counted up on arrival. */
const VALUES: Record<string, number> = {
  boards: totals.boards,
  faces: totals.faces,
  m2: totals.m2,
  provinces: totals.provinces,
}

export function Kpis() {
  const t = useT()
  const { kpis } = content
  return (
    <dl aria-label={t(kpis.label)} className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {kpis.items.map((item) => (
        <div
          key={item.key}
          className="flex flex-col-reverse gap-1 rounded-[18px] border border-white/12 px-5 py-4"
        >
          <dt className="text-sm">{t(item.label)}</dt>
          <dd className={cn('text-3xl font-bold lg:text-[2.375rem]', item.tone)}>
            {/* One left-to-right run, so Arabic shows «12 + 2», not «+ 212». */}
            <span className="ltr-run">
              <CountUp value={VALUES[item.key]} />
              {item.key === 'provinces' && ` + ${totals.highways}`}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  )
}
