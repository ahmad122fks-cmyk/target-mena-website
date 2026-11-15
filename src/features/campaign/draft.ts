import { DRAFT_KEY as KEY } from './prefill'
import { EMPTY_VALUES, type CampaignValues } from './schema'

/** The form is kept in this browser while the visitor works (survives reloads and failed sends). */

export function loadDraft(): CampaignValues {
  try {
    const saved = JSON.parse(window.localStorage.getItem(KEY) ?? 'null')
    return saved && typeof saved === 'object'
      ? { ...EMPTY_VALUES, ...saved, website: '' }
      : EMPTY_VALUES
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
