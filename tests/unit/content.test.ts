import { describe, expect, it } from 'vitest'
import site from '@/content/site.json'
import home from '@/pages/home/home.content.json'
import homeServices from '@/pages/home/home.services.content.json'
import notFound from '@/pages/not-found/not-found.content.json'

/** Every { ar, en } pair in a content file. */
function pairs(value: unknown, path = ''): { path: string; ar: unknown; en: unknown }[] {
  if (!value || typeof value !== 'object') return []
  const record = value as Record<string, unknown>
  if ('ar' in record && 'en' in record) return [{ path, ar: record.ar, en: record.en }]
  return Object.entries(record).flatMap(([key, child]) => pairs(child, `${path}.${key}`))
}

const FILES = { site, home, homeServices, notFound }

describe('content: Arabic and English side by side', () => {
  for (const [name, file] of Object.entries(FILES)) {
    it(`${name}: every text exists in both languages`, () => {
      for (const pair of pairs(file)) {
        expect(String(pair.ar).trim(), `${name}${pair.path}.ar`).not.toBe('')
        expect(String(pair.en).trim(), `${name}${pair.path}.en`).not.toBe('')
      }
    })
  }
  it('SEO titles <= 60 and descriptions <= 155 characters', () => {
    for (const seo of [home.seo, notFound.seo]) {
      for (const lang of ['ar', 'en'] as const) {
        expect(seo.title[lang].length).toBeLessThanOrEqual(60)
        expect(seo.description[lang].length).toBeLessThanOrEqual(155)
      }
    }
  })
  it('contact block is exactly the confirmed one (CLAUDE.md)', () => {
    expect(site.contact.phones).toEqual(['+964 771 977 7199', '+964 784 466 6000', '+964 774 466 6000'])
    expect(site.contact.email).toBe('info@target-mena.com')
    expect(site.contact.address.en).toBe('Baghdad – Al Jaderiyah')
  })
  it('never uses the old guideline stationery number', () => {
    expect(JSON.stringify(FILES)).not.toContain('7783')
  })
})
