import { Container } from '@/components/shared/Section'
import { ToConfirm } from '@/components/shared/ToConfirm'
import { useT } from '@/features/i18n/LangContext'
import content from '../home.content.json'

/** Four key facts in a quiet row. Numbers only when confirmed. */
export function Facts() {
  const t = useT()
  return (
    <section aria-labelledby="facts-title" className="border-y bg-white">
      <Container>
        <h2 id="facts-title" className="sr-only">
          {t(content.factsTitle)}
        </h2>
        <ul className="grid grid-cols-2 gap-y-8 py-10 lg:grid-cols-4">
          {content.facts.map((fact) => (
            <li
              key={fact.label.en}
              className="flex flex-col gap-1 border-s px-5 first:border-s-0 first:ps-0 max-lg:[&:nth-child(3)]:border-s-0 max-lg:[&:nth-child(3)]:ps-0"
            >
              {'toConfirm' in fact && fact.toConfirm ? (
                <ToConfirm what={fact.toConfirm} className="self-start text-xs text-brand-blue" />
              ) : (
                <b
                  className={
                    fact.number
                      ? 'ltr-run self-start text-3xl font-semibold text-brand-blue'
                      : 'text-xl font-semibold leading-snug text-brand-blue'
                  }
                >
                  {fact.value && t(fact.value)}
                </b>
              )}
              <span className="text-[0.95rem]">{t(fact.label)}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
