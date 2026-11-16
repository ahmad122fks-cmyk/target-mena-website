import type { Localized } from '@/features/i18n/lang'
import { useLink, useT } from '@/features/i18n/LangContext'
import { PillButton } from './PillButton'

type Action = { path: string; label: Localized }

type Props = {
  id: string
  title: Localized
  text: Localized
  primary: Action
  secondary?: Action
}

/** Blue closing band: one question, the yellow main action and an optional outlined one. */
export function CtaBand({ id, title, text, primary, secondary }: Props) {
  const t = useT()
  const link = useLink()
  return (
    <section aria-labelledby={id} className="bg-brand-blue text-white [--heading:#fff]">
      <div className="mx-auto flex max-w-[960px] flex-col items-center gap-4 px-4 py-16 text-center sm:px-6 lg:py-20">
        <h2 id={id} className="text-3xl lg:text-[2.5rem]">
          {t(title)}
        </h2>
        <p className="text-lg text-white/85">{t(text)}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <PillButton tone="yellow" href={link(primary.path)}>
            {t(primary.label)}
          </PillButton>
          {secondary && (
            <PillButton tone="outlineWhite" href={link(secondary.path)}>
              {t(secondary.label)}
            </PillButton>
          )}
        </div>
      </div>
    </section>
  )
}
