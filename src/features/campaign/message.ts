import cities from '@/data/cities.json'
import type { Lang, Localized } from '@/features/i18n/lang'
import { CONTACT, WHATSAPP } from '@/lib/site'
import content from '@/pages/campaign/campaign.content.json'
import type { CampaignValues } from './schema'

/**
 * The campaign request as plain text (WhatsApp / email fallback until the
 * leads API exists). Board codes only - no prices, availability or totals.
 * The budget is the client's own figure, labelled as such.
 */
export function buildCampaignMessage(v: CampaignValues, codes: string[], lang: Lang): string {
  const t = (value: Localized) => value[lang]
  const f = content.fields
  const m = content.message
  const city = (cities as Record<string, Localized>)[v.province]?.[lang] ?? v.province
  const duration =
    v.durationMode === 'length'
      ? `${v.durationValue} ${t(f[v.durationUnit])}`
      : `${t(f.endDate)}: ${v.endDate}`
  const services = v.services.map((key) => t(f[key])).join(lang === 'ar' ? '، ' : ', ')
  const lines: [Localized, string][] = [
    [f.name, v.name],
    [f.company, v.company],
    [f.phone, v.phone],
    [f.email, v.email],
    [f.province, city],
    [f.campaignName, v.campaignName],
    [f.startDate, v.startDate],
    [f.durationMode, duration],
    [f.budget, v.budget ? `${v.budget} ${v.currency} (${t(m.clientFigure)})` : ''],
    [f.objective, v.objective],
    [f.services, services],
  ]
  return [
    `${t(m.subject)}${v.campaignName ? `: ${v.campaignName}` : ''}`,
    ...lines
      .filter(([, value]) => value)
      .map(([label, value]) => `${t(label).replace(/ \(.*\)$/, '')}: ${value}`),
    `${t(m.boards)} (${codes.length}): ${codes.join(', ')}`,
  ].join('\n')
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/${WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
}

export function mailtoUrl(text: string, lang: Lang, name: string): string {
  const subject = `${content.message.subject[lang]} - ${name}`
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
}
