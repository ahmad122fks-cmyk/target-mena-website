import { useT } from '@/features/i18n/LangContext'
import content from '../production.content.json'

/** Four facts from the catalog on deep cards (2 then 4 columns; 1 on phones). */
export function Facts() {
  const t = useT()
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {content.make.facts.map((fact) => (
        <li
          key={fact.value.en}
          className="flex flex-col gap-1.5 rounded-[18px] bg-deep p-5 text-white lg:p-6"
        >
          <b className="text-[2.125rem] leading-tight font-bold text-brand-yellow">
            <span className="ltr-run">{t(fact.value)}</span>
          </b>
          <span className="text-sm leading-[1.6] text-white/85">{t(fact.label)}</span>
        </li>
      ))}
    </ul>
  )
}
