import { totals } from '@/data/network-map.json'
import { CountUp } from '@/components/shared/CountUp'
import { useT } from '@/features/i18n/LangContext'
import content from '../home.content.json'

/** Network size from the master planner (Ahmad, 16 Nov 2026), counted up on arrival. */
const VALUES: Record<string, number> = {
  boards: totals.boards,
  faces: totals.faces,
  m2: totals.m2,
  provinces: totals.provinces,
}

/** The four numbers under the hero search (v3): 674 · 683 · 43,107 · 12 + 2. */
export function Kpis() {
  const t = useT()
  const { kpis } = content
  return (
    <dl aria-label={t(kpis.label)} className="flex flex-wrap gap-x-8 gap-y-4 pt-2">
      {kpis.items.map((item) => (
        <div key={item.key} className="flex flex-col-reverse gap-0.5">
          <dt className="text-[0.8125rem] text-on-blue">{t(item.label)}</dt>
          <dd className="text-[1.75rem] leading-tight font-bold text-white">
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
