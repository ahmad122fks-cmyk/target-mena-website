import type { Localized } from '@/features/i18n/lang'
import { useLink, useT } from '@/features/i18n/LangContext'
import { PhoneStart } from './PhoneStart'
import { PillButton } from './PillButton'

type Action = { path: string; label: Localized }

export type CtaContent = {
  title: Localized
  text: Localized
  primary: Action
  secondary?: Action
}

type Props = CtaContent & {
  id: string
  /** Home: the phone field ("Request a proposal") inside the band. */
  phone?: boolean
}

/**
 * The one blue closing band per page (v3, prompt 5): question and line on
 * one side, the yellow main action (and an outlined one) on the other.
 */
export function CtaBand({ id, title, text, primary, secondary, phone }: Props) {
  const t = useT()
  const link = useLink()
  return (
    <section aria-labelledby={id} className="bg-brand-blue text-white [--heading:#fff]">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-8 px-4 py-14 sm:px-6 lg:py-[4.5rem]">
        <div className="flex max-w-[620px] flex-col gap-2.5">
          <h2 id={id} className="text-3xl lg:text-[2.375rem] lg:leading-[3rem]">
            {t(title)}
          </h2>
          <p className="text-on-blue">{t(text)}</p>
          {phone && <PhoneStart id={`${id}-phone`} tone="onBlue" className="mt-3 max-w-[30rem]" />}
        </div>
        <div className="flex flex-wrap gap-3">
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
