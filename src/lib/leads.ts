import { LEADS_ENDPOINT } from './site'

export type SendResult = 'sent' | 'fallback' | 'error'

/**
 * POST a request to the leads API (BUILD-BRIEF 5). Until that endpoint
 * exists (LEADS_ENDPOINT empty) the visitor sends it by WhatsApp or email.
 */
export async function postLead(body: object, endpoint = LEADS_ENDPOINT): Promise<SendResult> {
  if (!endpoint) return 'fallback'
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, page: window.location.href }),
      signal: controller.signal,
    })
    return response.ok ? 'sent' : 'error'
  } catch {
    return 'error'
  } finally {
    clearTimeout(timer)
  }
}
