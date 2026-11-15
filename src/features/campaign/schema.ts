import { z } from 'zod/mini'
import type { Localized } from '@/features/i18n/lang'
import content from '@/pages/campaign/campaign.content.json'

export const SERVICES = ['printing', 'design', 'alrabiaa', 'digital'] as const
export const STEPS = ['details', 'campaign', 'boards', 'review'] as const
export type Step = (typeof STEPS)[number]

/** Every field of the campaign request, checked with zod (mini build) in the visitor's language. */
export function campaignSchema(t: (v: Localized) => string) {
  const e = content.errors
  const required = (msg: string) => z.string().check(z.trim(), z.minLength(1, msg))
  return z
    .object({
      name: z.string().check(z.trim(), z.minLength(2, t(e.required))),
      company: z.string().check(z.trim(), z.maxLength(120)),
      phone: z.string().check(z.trim(), z.regex(/^\+?[0-9 ()-]{7,20}$/, t(e.phone))),
      email: z.union([z.literal(''), z.email(t(e.email))]),
      province: z.string(),
      campaignName: z.string().check(z.trim(), z.maxLength(120)),
      startDate: required(t(e.date)),
      durationMode: z.enum(['length', 'end']),
      durationValue: z.string().check(z.trim()),
      durationUnit: z.enum(['weeks', 'months']),
      endDate: z.string(),
      budget: z.string().check(z.trim(), z.regex(/^\d{0,15}$/, t(e.number))),
      currency: z.enum(['IQD', 'USD']),
      objective: z.string().check(z.trim(), z.maxLength(1000)),
      services: z.array(z.enum(SERVICES)),
      website: z.string().check(z.maxLength(0)), // honeypot: people leave it empty
    })
    .check(
      z.superRefine((v, ctx) => {
        const issue = (path: string, message: string) =>
          ctx.addIssue({ code: 'custom', path: [path], message, input: v })
        if (v.durationMode === 'length' && !/^[1-9]\d{0,2}$/.test(v.durationValue))
          issue('durationValue', t(e.number))
        if (v.durationMode === 'end' && !v.endDate) issue('endDate', t(e.date))
        if (v.durationMode === 'end' && v.endDate && v.startDate && v.endDate <= v.startDate)
          issue('endDate', t(e.endAfter))
      }),
    )
}

export type CampaignValues = z.infer<ReturnType<typeof campaignSchema>>

export const EMPTY_VALUES: CampaignValues = {
  name: '',
  company: '',
  phone: '',
  email: '',
  province: '',
  campaignName: '',
  startDate: '',
  durationMode: 'length',
  durationValue: '',
  durationUnit: 'months',
  endDate: '',
  budget: '',
  currency: 'IQD',
  objective: '',
  services: [],
  website: '',
}

/** Fields checked before leaving each step. */
export const STEP_FIELDS: Record<Step, (keyof CampaignValues)[]> = {
  details: ['name', 'company', 'phone', 'email', 'province'],
  campaign: [
    'campaignName',
    'startDate',
    'durationMode',
    'durationValue',
    'durationUnit',
    'endDate',
    'budget',
    'currency',
    'objective',
    'services',
  ],
  boards: [],
  review: [],
}
