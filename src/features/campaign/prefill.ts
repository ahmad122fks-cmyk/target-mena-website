/** Where the campaign form keeps its draft in this browser (see draft.ts). */
export const DRAFT_KEY = 'target-campaign-draft-v1'

/**
 * Start a request from the contact block: keep the phone number in the
 * campaign draft (never in the address), so the form opens with it filled in.
 * Kept free of the form schema so every page can use it cheaply.
 */
export function prefillPhone(phone: string) {
  try {
    const saved: unknown = JSON.parse(window.localStorage.getItem(DRAFT_KEY) ?? 'null')
    const base = saved && typeof saved === 'object' ? saved : {}
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...base, phone: phone.trim() }))
  } catch {
    // Storage unavailable: the visitor types the number again on the form.
  }
}
