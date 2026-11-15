import { Section } from '@/components/shared/Section'
import { ToConfirm } from '@/components/shared/ToConfirm'
import { useT } from '@/features/i18n/LangContext'
import content from '../home.content.json'


/** Four key facts. Numbers only when confirmed; otherwise a visible placeholder. */
export function Facts() {
  const t = useT()
  return (
    <Section labelledBy="facts-title" className="[&>div]:pb-6 [&>div]:lg:pb-8">
      <h2 id="facts-title" className="sr-only">{t(content.factsTitle)}</h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {content.facts.map((fact) => (
          <li key={fact.label.en} className="flex flex-col gap-1 rounded-2xl border p-5">
            {'toConfirm' in fact && fact.toConfirm ? (
              <ToConfirm what={fact.toConfirm} className="self-start text-brand-blue" />
            ) : (
              <b className={fact.number ? 'ltr-run self-start text-4xl text-brand-blue' : 'text-2xl leading-snug text-brand-blue'}>
                {fact.value && t(fact.value)}
              </b>
            )}
            <span>{t(fact.label)}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
