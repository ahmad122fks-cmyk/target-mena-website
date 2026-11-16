import { highways, provinces, totals, typeLabels } from '@/data/network-map.json'
import { BarChart } from '@/components/shared/BarChart'
import { CountUp } from '@/components/shared/CountUp'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useLang, useT } from '@/features/i18n/LangContext'
import { cityLabel } from '@/lib/boards'
import content from '../network.content.json'
import { TYPE_COLOURS } from './typeColours'

const VALUES: Record<string, number> = {
  boards: totals.boards,
  faces: totals.faces,
  m2: totals.m2,
  provinces: totals.provinces,
}

/**
 * Network in numbers (master planner, 16 Nov 2026), a white band (v3):
 * ghost counter tiles, then light charts by type and by place.
 */
export function NumbersBand() {
  const t = useT()
  const lang = useLang()
  const { numbers } = content
  const byType = Object.entries(totals.byType)
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => ({
      key,
      value,
      label: typeLabels[lang][key as keyof typeof typeLabels.ar],
      colour: TYPE_COLOURS[key],
    }))
  const byPlace = [...provinces, ...highways]
    .sort((a, b) => b.t - a.t)
    .map((place, j) => ({
      key: place.k,
      value: place.t,
      label: cityLabel(place.k, lang),
      colour: j < 3 ? 'bg-brand-blue' : 'bg-brand-grey',
    }))
  return (
    <Section labelledBy="numbers-title" deferred>
      <SectionHeading id="numbers-title" eyebrow={t(numbers.eyebrow)} title={t(numbers.title)} />
      <dl className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {numbers.kpis.map((kpi) => (
          <div
            key={kpi.key}
            className="flex flex-col-reverse justify-end gap-1 rounded-[18px] border border-line bg-brand-ghost p-5"
          >
            <dt className="text-[0.9375rem] leading-6">{t(kpi.label)}</dt>
            <dd className="text-3xl leading-tight font-bold text-link lg:text-[2.5rem]">
              {/* One left-to-right run, so Arabic shows «12 + 2», not «+ 212». */}
              <span className="ltr-run">
                <CountUp value={VALUES[kpi.key]} />
                {kpi.key === 'provinces' && ` + ${totals.highways}`}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <BarChart caption={t(numbers.byType)} rows={byType} />
        <BarChart caption={t(numbers.byPlace)} rows={byPlace} />
      </div>
      <p className="mt-4 text-[0.9375rem]">{t(numbers.unassigned)}</p>
    </Section>
  )
}
