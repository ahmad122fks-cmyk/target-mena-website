/*
 * Production and Creative & Digital, v3 (prompt 5): the prerendered pages
 * have one blue CTA band, no full-width dark band in the light theme, and
 * the held-back facts (+35, unapproved client names) never ship.
 */
import { createElement, type ComponentType } from 'react'
import { renderToString } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { PageDataProvider } from '@/app/PageData'
import type { StaticPage } from '@/app/routes'
import { LangProvider } from '@/features/i18n/LangContext'
import DigitalPage from '@/pages/digital'
import ProductionPage from '@/pages/production'

vi.mock('@/lib/images', () => {
  const pic = { sources: { webp: 'x.webp' }, img: { src: 'x.jpg', w: 1000, h: 606 } }
  return { BOARD_PHOTOS: {}, ART: { creative: pic, production: pic }, MAP_IMAGE: pic }
})

const PAGES: [StaticPage, ComponentType][] = [
  ['production', ProductionPage],
  ['digital', DigitalPage],
]

function html(page: StaticPage, Page: ComponentType, lang: 'ar' | 'en') {
  const body = createElement(LangProvider, { lang, children: createElement(Page) })
  return renderToString(
    createElement(PageDataProvider, { value: { kind: 'static', page }, children: body }),
  )
}

/** Class lists of every <section> element in the markup. */
const sections = (markup: string) =>
  [...markup.matchAll(/<section[^>]*class="([^"]*)"/g)].map((match) => match[1].split(/\s+/))

describe('production and digital pages (v3)', () => {
  for (const [page, Page] of PAGES)
    for (const lang of ['ar', 'en'] as const) {
      const markup = html(page, Page, lang)
      it(`${page} (${lang}): exactly one blue CTA band, at the end`, () => {
        const blue = sections(markup).filter((classes) => classes.includes('bg-brand-blue'))
        expect(blue).toHaveLength(1)
        expect(sections(markup).at(-1)).toContain('bg-brand-blue')
      })
      it(`${page} (${lang}): no band darker than ghost in the light theme`, () => {
        for (const classes of sections(markup)) {
          const light = classes.filter((name) => !name.startsWith('dark:'))
          expect(light.some((name) => /^bg-(deep|navy|brand-black|black)$/.test(name))).toBe(false)
        }
      })
    }

  it('production: the +35 claim is held back, a placeholder shows instead', () => {
    for (const lang of ['ar', 'en'] as const) {
      const markup = html('production', ProductionPage, lang)
      expect(markup).not.toMatch(/\+35|35\+/)
      expect(markup).toContain('[TO CONFIRM: <!-- -->number of productions delivered')
    }
  })

  it('production: only approved client names ship', () => {
    const markup =
      html('production', ProductionPage, 'ar') + html('production', ProductionPage, 'en')
    for (const name of ['Zae', 'Millionaire', 'Gree', 'Eatix', 'Kalleh', 'ديجيتال زون'])
      expect(markup).not.toContain(name)
    expect(markup).toContain('data-to-confirm="other production client names')
  })

  it('production: «أكشن» is the blue primary button and drives the viewfinder', () => {
    const markup = html('production', ProductionPage, 'ar')
    expect(markup).toMatch(
      /aria-controls="production-viewfinder"[^>]*bg-brand-blue|bg-brand-blue[^>]*aria-controls="production-viewfinder"/,
    )
    expect(markup).toContain('id="production-viewfinder"')
  })
})
