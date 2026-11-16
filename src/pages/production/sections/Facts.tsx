import { useT } from '@/features/i18n/LangContext'
import content from '../production.content.json'

/** Four catalog facts on light cards with blue numbers (v3): 4, then 2, then 1 column. */
export function Facts() {
  const t = useT()
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {content.make.facts.map((fact) => (
        <li
          key={fact.value.en}
          className="flex flex-col gap-1.5 rounded-card border border-line bg-brand-ghost p-5 lg:p-6"
        >
          <b className="text-[2.125rem] leading-tight font-bold text-link">
            <span className="ltr-run">{t(fact.value)}</span>
          </b>
          <span className="text-[0.9375rem] leading-[1.6]">{t(fact.label)}</span>
        </li>
      ))}
    </ul>
  )
}
