import { Fragment } from 'react'
import { useT } from '@/features/i18n/LangContext'
import { CONTACT, telHref } from '@/lib/site'
import { Calligraphy } from './Calligraphy'
import { CtaLink } from './CtaLink'
import { EdgeArt } from './EdgeArt'
import { Container, SECTION_TONES } from './Section'
import { SectionHeading } from './SectionHeading'
import { ToConfirm } from './ToConfirm'

/** The one contact block, identical on every page (CLAUDE.md). */
export function ContactBlock() {
  const t = useT()
  const c = CONTACT
  const art = <Calligraphy mark="a" tone="white" className="top-4 left-1/2 h-[22rem] -translate-x-[40%] lg:top-1/2 lg:left-0 lg:h-[34rem] lg:-translate-x-[38%] lg:-translate-y-1/2" />
  return (
    <section id="contact" aria-labelledby="contact-title" className={`relative overflow-hidden ${SECTION_TONES.blue}`}>
      <EdgeArt art={art} band="bottom" artClassName="h-44 lg:h-auto lg:w-[clamp(10rem,20vw,18rem)]">
        <Container className="grid gap-8 py-14 lg:grid-cols-[1fr_auto] lg:items-end lg:py-20">
          <div className="flex flex-col gap-5">
            <SectionHeading id="contact-title" eyebrow={t(c.eyebrow)} title={t(c.title)} />
            <address className="flex flex-col gap-1 text-lg not-italic">
              <span>{t(c.address)}</span>
              <span>
                <span className="ltr-run">
                  {c.phones.map((phone, i) => (
                    <Fragment key={phone}>
                      {i > 0 && <span aria-hidden="true"> · </span>}
                      <a href={telHref(phone)} className="inline-block py-1 underline-offset-4 hover:underline">{phone}</a>
                    </Fragment>
                  ))}
                </span>
              </span>
              <span>
                <a href={`mailto:${c.email}`} className="ltr-run underline-offset-4 hover:underline">{c.email}</a>
              </span>
            </address>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <CtaLink tone="white" href={telHref(c.phones[0])}>{t(c.call)}</CtaLink>
            <CtaLink tone="outlineLight" href={`mailto:${c.email}`}>{t(c.writeEmail)}</CtaLink>
            <p className="flex items-center gap-2 font-semibold">
              {t(c.whatsapp)} <ToConfirm what={c.whatsappToConfirm} />
            </p>
          </div>
        </Container>
      </EdgeArt>
    </section>
  )
}
