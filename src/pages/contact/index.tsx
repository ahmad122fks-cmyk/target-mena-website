import { ContentPage } from '@/components/shared/ContentPage'
import { PillButton } from '@/components/shared/PillButton'
import { Section } from '@/components/shared/Section'
import { ToConfirm } from '@/components/shared/ToConfirm'
import site from '@/content/site.json'
import { ContactForm } from '@/features/contact/ContactForm'
import { useT } from '@/features/i18n/LangContext'
import { telHref, whatsappHref } from '@/lib/site'
import content from './contact.content.json'

const row = 'flex flex-col gap-1 border-b border-line py-4 last:border-b-0'

/** Contact: the confirmed details, WhatsApp, and a short message form. */
export default function ContactPage() {
  const t = useT()
  const d = content.details
  const c = site.contact
  return (
    <ContentPage id="contact" content={content}>
      <Section>
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.4fr]">
          <address className="flex flex-col rounded-card border border-line bg-surface px-6 py-2 not-italic">
            <div className={row}>
              <span className="text-sm">{t(d.phones)}</span>
              {c.phones.map((phone) => (
                <a
                  key={phone}
                  href={telHref(phone)}
                  className="ltr-run self-start py-1 text-lg font-medium text-ink hover:text-link"
                >
                  {phone}
                </a>
              ))}
            </div>
            <div className={row}>
              <span className="text-sm">{t(d.email)}</span>
              <a
                href={`mailto:${c.email}`}
                className="ltr-run self-start py-1 text-lg font-medium text-ink hover:text-link"
              >
                {c.email}
              </a>
            </div>
            <div className={row}>
              <span className="text-sm">{t(d.whatsapp)}</span>
              <PillButton size="sm" tone="green" href={whatsappHref()} className="mt-1 self-start">
                {t(d.whatsappCta)}
              </PillButton>
            </div>
            <div className={row}>
              <span className="text-sm">{t(d.address)}</span>
              <span className="text-lg font-medium text-ink">{t(c.address)}</span>
              <ToConfirm what={d.mapToConfirm} className="mt-1 self-start text-xs" />
            </div>
          </address>
          <ContactForm />
        </div>
      </Section>
    </ContentPage>
  )
}
