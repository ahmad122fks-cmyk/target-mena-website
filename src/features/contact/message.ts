import type { Lang } from '@/features/i18n/lang'
import { CONTACT, whatsappHref } from '@/lib/site'
import content from '@/pages/contact/contact.content.json'

export type ContactValues = {
  name: string
  phone: string
  email: string
  company: string
  message: string
}

/** The message as plain text for WhatsApp or email (fallback until the leads API exists). */
export function contactMessage(v: ContactValues, lang: Lang): string {
  const f = content.form
  const label = (key: 'name' | 'phone' | 'email' | 'company') =>
    f[key][lang].replace(/ \(.*\)$/, '')
  const lines = [
    f.subject[lang],
    `${label('name')}: ${v.name}`,
    `${label('phone')}: ${v.phone}`,
    v.company && `${label('company')}: ${v.company}`,
    v.email && `${label('email')}: ${v.email}`,
  ].filter(Boolean)
  return [...lines, '', v.message].join('\n')
}

export const whatsappLink = (text: string) => whatsappHref(text)

export const emailLink = (text: string, lang: Lang, name: string) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(`${content.form.subject[lang]} - ${name}`)}&body=${encodeURIComponent(text)}`
