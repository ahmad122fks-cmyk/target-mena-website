import { useState, type FormEvent } from 'react'
import { PillButton } from '@/components/shared/PillButton'
import { useLang, useT } from '@/features/i18n/LangContext'
import { postLead, type SendResult } from '@/lib/leads'
import content from '@/pages/contact/contact.content.json'
import { ContactField } from './ContactField'
import { ContactResult } from './ContactResult'
import { contactMessage, type ContactValues } from './message'

const EMPTY: ContactValues = { name: '', phone: '', email: '', company: '', message: '' }

/** Short contact form: browser checks, a honeypot, then the leads API or WhatsApp / email. */
export function ContactForm() {
  const t = useT()
  const lang = useLang()
  const f = content.form
  const [values, setValues] = useState(EMPTY)
  const [result, setResult] = useState<SendResult | 'idle' | 'sending'>('idle')
  const set = (key: keyof ContactValues) => (value: string) =>
    setValues({ ...values, [key]: value })
  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    if ((form.elements.namedItem('website') as HTMLInputElement).value) return // a bot filled the trap
    setResult('sending')
    setResult(await postLead({ type: 'contact', lang, ...values }))
  }
  const text = contactMessage(values, lang)
  return (
    <form
      onSubmit={send}
      className="flex flex-col gap-4 rounded-card border border-line bg-white p-6 lg:p-8"
    >
      <h2 className="text-2xl font-semibold">{t(f.title)}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <ContactField
          id="c-name"
          label={t(f.name)}
          value={values.name}
          onChange={set('name')}
          required
          autoComplete="name"
        />
        <ContactField
          id="c-phone"
          label={t(f.phone)}
          value={values.phone}
          onChange={set('phone')}
          required
          type="tel"
          autoComplete="tel"
          pattern="\+?[0-9 ()-]{7,20}"
          title={t(f.badPhone)}
        />
        <ContactField
          id="c-email"
          label={t(f.email)}
          value={values.email}
          onChange={set('email')}
          type="email"
          autoComplete="email"
        />
        <ContactField
          id="c-company"
          label={t(f.company)}
          value={values.company}
          onChange={set('company')}
          autoComplete="organization"
        />
      </div>
      <ContactField
        id="c-message"
        label={t(f.message)}
        value={values.message}
        onChange={set('message')}
        required
        multiline
      />
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      {result === 'idle' || result === 'sending' ? (
        <PillButton type="submit" disabled={result === 'sending'} className="self-start px-8">
          {t(result === 'sending' ? f.sending : f.send)}
        </PillButton>
      ) : (
        <ContactResult result={result} text={text} name={values.name} />
      )}
    </form>
  )
}
