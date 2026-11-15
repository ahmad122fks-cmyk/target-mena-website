import { describe, expect, it, vi } from 'vitest'
import { buildCampaignMessage, mailtoUrl, whatsappUrl } from '@/features/campaign/message'
import { campaignSchema, EMPTY_VALUES, type CampaignValues } from '@/features/campaign/schema'
import { sendCampaign } from '@/features/campaign/send'

const values: CampaignValues = {
  ...EMPTY_VALUES,
  name: 'Ali',
  company: 'Acme',
  phone: '+964 770 000 0000',
  email: 'a@acme.test',
  province: 'najaf',
  campaignName: 'Ramadan',
  startDate: '2027-02-01',
  durationValue: '2',
  durationUnit: 'months',
  budget: '5000000',
  currency: 'dinar',
  objective: 'Launch',
  services: ['printing', 'alrabiaa'],
}
const t = (v: { ar: string; en: string }) => v.en

describe('campaign message builder', () => {
  it('lists every detail and the board codes, never prices or totals', () => {
    const text = buildCampaignMessage(values, ['BGW03A', 'BGW02A', 'BBH20A'], 'en')
    expect(text).toContain('Campaign request: Ramadan')
    expect(text).toContain('Province: Najaf')
    expect(text).toContain('Duration: 2 months')
    expect(text).toContain("5000000 Dinar (client's figure)")
    expect(text).toContain('Printing and installation, Alrabiaa TV')
    expect(text).toContain('Boards (3): BGW03A, BGW02A, BBH20A')
    expect(text).not.toMatch(/price|total|available/i)
  })
  it('writes Arabic and leaves empty optional fields out', () => {
    const text = buildCampaignMessage(
      { ...values, company: '', budget: '', email: '' },
      ['BGW03A'],
      'ar',
    )
    expect(text).toContain('المحافظة: النجف')
    expect(text).toContain('اللوحات (1): BGW03A')
    expect(text).toContain('المدة: شهران')
    expect(text).not.toContain('الشركة')
  })
  it('builds WhatsApp and email links', () => {
    expect(whatsappUrl('hi there')).toBe('https://wa.me/9647719777199?text=hi%20there')
    expect(mailtoUrl('body', 'en', 'Ali')).toMatch(
      /^mailto:info@target-mena\.com\?subject=Campaign%20request%20-%20Ali&body=body$/,
    )
  })
})

describe('campaign checks (zod)', () => {
  const schema = campaignSchema(t)
  it('accepts a complete request', () => expect(schema.safeParse(values).success).toBe(true))
  it('requires name, a valid phone and a start date', () => {
    const result = schema.safeParse({ ...values, name: '', phone: 'abc', startDate: '' })
    expect(result.success).toBe(false)
    expect(result.error?.issues.map((i) => i.path[0]).sort()).toEqual([
      'name',
      'phone',
      'startDate',
    ])
  })
  it('checks the duration and the honeypot', () => {
    expect(schema.safeParse({ ...values, durationValue: '0' }).success).toBe(false)
    expect(schema.safeParse({ ...values, durationValue: '' }).success).toBe(false)
    expect(schema.safeParse({ ...values, website: 'bot' }).success).toBe(false)
  })
})

describe('sending', () => {
  it('falls back to WhatsApp/email while the leads API does not exist', async () => {
    expect(await sendCampaign(values, ['BGW03A'], 'en', '')).toBe('fallback')
  })
  it('posts to the leads API and reports errors without losing data', async () => {
    vi.stubGlobal('window', { location: { href: 'https://target-mena.com/campaign/' } })
    const fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: false })
      .mockRejectedValueOnce(new Error('down'))
    vi.stubGlobal('fetch', fetch)
    expect(await sendCampaign(values, ['BGW03A'], 'en', 'https://api.test/leads')).toBe('sent')
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toMatchObject({
      boards: ['BGW03A'],
      name: 'Ali',
    })
    expect(JSON.parse(fetch.mock.calls[0][1].body)).not.toHaveProperty('website')
    expect(await sendCampaign(values, ['BGW03A'], 'en', 'https://api.test/leads')).toBe('error')
    expect(await sendCampaign(values, ['BGW03A'], 'en', 'https://api.test/leads')).toBe('error')
  })
})
