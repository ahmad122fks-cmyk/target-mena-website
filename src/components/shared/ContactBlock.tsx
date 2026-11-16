import site from '@/content/site.json'
import { useT } from '@/features/i18n/LangContext'
import { telHref } from '@/lib/site'
import { PhoneStart } from './PhoneStart'
import { Section } from './Section'
import { SectionHeading } from './SectionHeading'

const linkClass = 'ltr-run text-ink hover:text-link'

/**
 * "Let's work together" with the phone field and the exact contact details.
 * v3 (prompt 5): only on the Contact page; the home CTA band carries the
 * phone field elsewhere. The details sit on one line from 1024 px and stack
 * below, so a separator never ends a line (`dot-list`).
 */
export function ContactBlock() {
  const t = useT()
  const c = site.contact
  return (
    <Section id="contact" tone="ghost" labelledBy="contact-title">
      <div className="mx-auto flex max-w-[960px] flex-col items-center gap-6 text-center">
        <SectionHeading id="contact-title" title={t(c.title)} lead={t(c.lead)} center />
        <PhoneStart id="cta-phone" className="max-w-[32rem] justify-center" />
        <address className="flex flex-col items-center gap-1 text-[0.9375rem] not-italic">
          <span>{t(c.orCall)}</span>
          <ul className="dot-list">
            {c.phones.map((phone) => (
              <li key={phone}>
                <a href={telHref(phone)} className={linkClass}>
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${c.email}`} className={linkClass}>
                {c.email}
              </a>
            </li>
            <li>{t(c.address)}</li>
          </ul>
        </address>
      </div>
    </Section>
  )
}
