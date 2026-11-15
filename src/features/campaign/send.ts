import type { Lang } from '@/features/i18n/lang'
import { LEADS_ENDPOINT } from '@/lib/site'
import { postLead, type SendResult } from '@/lib/leads'
import type { CampaignValues } from './schema'

export type { SendResult }

/** The campaign request with its board codes. The honeypot field never leaves the browser. */
export function sendCampaign(
  values: CampaignValues,
  codes: string[],
  lang: Lang,
  endpoint = LEADS_ENDPOINT,
): Promise<SendResult> {
  const { website: _honeypot, ...fields } = values
  void _honeypot
  return postLead({ type: 'campaign', lang, ...fields, boards: codes }, endpoint)
}
