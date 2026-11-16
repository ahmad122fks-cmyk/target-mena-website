import { Fragment, type FormEvent } from 'react'
import site from '@/content/site.json'
import { prefillPhone } from '@/features/campaign/prefill'
import { useLink, useT } from '@/features/i18n/LangContext'
import { telHref } from '@/lib/site'
import { PillButton } from './PillButton'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'

const linkClass = 'ltr-run inline-block py-1 text-ink hover:text-link'

/** The one contact block, identical on every page (CLAUDE.md): centred, phone field, exact details. */
export function ContactBlock() {
  const t = useT()
  const link = useLink()
  const c = site.contact
  // The number goes into the campaign draft, never into the address bar (no `name`, no `action`).
  function start(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const phone = event.currentTarget.querySelector('input')?.value ?? ''
    if (phone.trim()) prefillPhone(phone)
    window.location.assign(link('/campaign/'))
  }
  return (
    <Section id="contact" tone="ghost" labelledBy="contact-title" className="border-b-0">
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-6 text-center">
        <SectionHeading id="contact-title" title={t(c.title)} lead={t(c.lead)} center />
        <form onSubmit={start} className="flex w-full flex-wrap justify-center gap-2.5">
          <label htmlFor="cta-phone" className="sr-only">
            {t(c.phoneLabel)}
          </label>
          <input
            id="cta-phone"
            type="tel"
            autoComplete="tel"
            dir="ltr"
            placeholder={t(c.phoneLabel)}
            className="h-12 min-w-0 flex-[0_1_18.75rem] rounded-full border border-input bg-field px-5 text-base text-ink placeholder:text-brand-text rtl:text-right"
          />
          <PillButton type="submit">{t(c.submit)}</PillButton>
        </form>
        <address className="flex flex-col gap-1 text-[0.9375rem] not-italic">
          <span>{t(c.orCall)}</span>
          <span className="flex flex-wrap justify-center gap-x-1.5">
            {c.phones.map((phone) => (
              <Fragment key={phone}>
                <a href={telHref(phone)} className={linkClass}>
                  {phone}
                </a>
                <span aria-hidden="true" className="py-1">
                  ·
                </span>
              </Fragment>
            ))}
            <a href={`mailto:${c.email}`} className={linkClass}>
              {c.email}
            </a>
            <span aria-hidden="true" className="py-1">
              ·
            </span>
            <span className="py-1">{t(c.address)}</span>
          </span>
        </address>
      </div>
    </Section>
  )
}
