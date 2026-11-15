import type { Lang } from '@/features/i18n/lang'
import { LEADS_ENDPOINT } from '@/lib/site'
import type { CampaignValues } from './schema'

export type SendResult = 'sent' | 'fallback' | 'error'

/**
 * POST the request to the leads API (BUILD-BRIEF 5). Until that endpoint
 * exists (LEADS_ENDPOINT empty) the visitor sends it by WhatsApp or email.
 * The honeypot field never leaves the browser.
 */
export async function sendCampaign(
  values: CampaignValues,
  codes: string[],
  lang: Lang,
  endpoint = LEADS_ENDPOINT,
): Promise<SendResult> {
  if (!endpoint) return 'fallback'
  const { website: _honeypot, ...fields } = values
  void _honeypot
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'campaign',
        lang,
        ...fields,
        boards: codes,
        page: window.location.href,
      }),
      signal: controller.signal,
    })
    return response.ok ? 'sent' : 'error'
  } catch {
    return 'error'
  } finally {
    clearTimeout(timer)
  }
}
