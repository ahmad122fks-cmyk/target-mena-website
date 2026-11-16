import { totals, typeLabels } from '@/data/network-map.json'
import { NetworkMap } from '@/components/map/NetworkMap'
import { PillButton } from '@/components/shared/PillButton'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { useLang, useLink, useT } from '@/features/i18n/LangContext'
import content from '../home.content.json'

type TypeKey = keyof typeof totals.byType

/** Swatch per type on the light cards (v3 canvas): guideline colours only. */
const SWATCH: Partial<Record<TypeKey, string>> = {
  backlit: 'bg-brand-yellow',
  bridge: 'bg-brand-green',
  rooftop: 'bg-brand-blue',
  wall: 'bg-brand-grey',
}

/** The network map in its clean frame, then the four main board types with their counts. */
export function NetworkBand() {
  const t = useT()
  const lang = useLang()
  const link = useLink()
  const { network } = content
  const title = t(network.title)
    .replace('{provinces}', String(totals.provinces))
    .replace('{highways}', String(totals.highways))
  return (
    <Section id="network" labelledBy="network-title">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <SectionHeading
          id="network-title"
          eyebrow={t(network.eyebrow)}
          title={title}
          lead={t(network.lead)}
          className="max-w-[40rem]"
        />
        <PillButton tone="outline" href={link(network.tour.path)}>
          {t(network.tour.label)}
        </PillButton>
      </div>
      <NetworkMap panel height={600} className="mt-8" />
      <ul
        aria-label={t(network.typesLabel)}
        className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
      >
        {(network.types as TypeKey[]).map((key) => (
          <li
            key={key}
            className="flex items-center justify-between gap-2.5 rounded-2xl border border-line bg-surface px-5 py-4"
          >
            <span className="flex items-center gap-2.5 text-[0.9375rem] text-ink">
              <span aria-hidden="true" className={`size-2.5 rounded-[3px] ${SWATCH[key]}`} />
              {typeLabels[lang][key]}
            </span>
            <b className="ltr-run text-xl text-ink">{totals.byType[key]}</b>
          </li>
        ))}
      </ul>
    </Section>
  )
}
