import content from '@/content/request-form.json'
import type { Localized } from '@/features/i18n/lang'
import { CONTACT } from '@/lib/site'

type Fields = { name: string; company: string; phone: string; period: string }

/** mailto: link with the board request, used until the leads API exists (BUILD-BRIEF 5). */
export function buildRequestMail(
  code: string,
  fields: Fields,
  t: (v: Localized) => string,
  pageUrl: string,
): string {
  const lines = [
    `${t(content.subject)}: ${code}`,
    `${t(content.name)}: ${fields.name}`,
    `${t(content.company)}: ${fields.company}`,
    `${t(content.phone)}: ${fields.phone}`,
    `${t(content.period)}: ${fields.period}`,
    `${t(content.page)}: ${pageUrl}`,
  ]
  const subject = encodeURIComponent(`${t(content.subject)} ${code}`)
  return `mailto:${CONTACT.email}?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`
}
