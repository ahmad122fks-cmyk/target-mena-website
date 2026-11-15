import { DRAFT_KEY as KEY } from './prefill'
import { EMPTY_VALUES, type CampaignValues } from './schema'

/** The form is kept in this browser while the visitor works (survives reloads and failed sends). */

export function loadDraft(): CampaignValues {
  try {
    const saved = JSON.parse(window.localStorage.getItem(KEY) ?? 'null')
    if (!saved || typeof saved !== 'object') return EMPTY_VALUES
    const values = { ...EMPTY_VALUES, ...saved, website: '' }
    // Older test drafts used other currency codes: fall back to dinar.
    if (values.currency !== 'dollar') values.currency = 'dinar'
    return values
  } catch {
    return EMPTY_VALUES
  }
}

export function saveDraft(values: CampaignValues) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...values, website: '' }))
  } catch {
    // Storage unavailable: the form still works for this visit.
  }
}

export function clearDraft() {
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    // nothing to clear
  }
}
