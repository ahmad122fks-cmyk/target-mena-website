import { Fragment } from 'react'
import { useT } from '@/features/i18n/LangContext'
import { CONTACT, telHref } from '@/lib/site'
import { Calligraphy } from './Calligraphy'
import { CtaLink } from './CtaLink'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'
import { ToConfirm } from './ToConfirm'

/** The one contact block, identical on every page (CLAUDE.md). Tone-on-tone calligraphy. */
export function ContactBlock() {
  const t = useT()
  const c = CONTACT
  const art = (
    <Calligraphy
      mark="a"
      tone="blue80"
      className="-end-56 -bottom-40 h-[30rem] lg:-end-40 lg:top-1/2 lg:bottom-auto lg:h-[36rem] lg:-translate-y-1/2"
    />
  )
  return (
    <Section
      id="contact"
      tone="blue"
      labelledBy="contact-title"
      art={art}
      className="[&>div]:pb-56 lg:[&>div]:pb-24"
    >
      <div className="flex max-w-2xl flex-col gap-6">
        <SectionHeading id="contact-title" eyebrow={t(c.eyebrow)} title={t(c.title)} />
        <address className="flex flex-col gap-1 text-lg not-italic">
          <span>{t(c.address)}</span>
          <span>
            <span className="ltr-run">
              {c.phones.map((phone, i) => (
                <Fragment key={phone}>
                  {i > 0 && <span aria-hidden="true"> · </span>}
                  <a
                    href={telHref(phone)}
                    className="inline-block py-1 underline-offset-4 hover:underline"
                  >
                    {phone}
                  </a>
                </Fragment>
              ))}
            </span>
          </span>
          <span>
            <a href={`mailto:${c.email}`} className="ltr-run underline-offset-4 hover:underline">
              {c.email}
            </a>
          </span>
        </address>
        <div className="flex flex-wrap items-center gap-3">
          <CtaLink tone="white" href={telHref(c.phones[0])}>
            {t(c.call)}
          </CtaLink>
          <CtaLink tone="outlineLight" href={`mailto:${c.email}`}>
            {t(c.writeEmail)}
          </CtaLink>
        </div>
        <p className="flex flex-wrap items-center gap-2 font-semibold">
          {t(c.whatsapp)} <ToConfirm what={c.whatsappToConfirm} />
        </p>
      </div>
    </Section>
  )
}
