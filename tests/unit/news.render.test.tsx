// @vitest-environment jsdom
/*
 * TargetNews in the browser: a draft campaign added to campaigns.json never
 * shows; stories jump to their post; auto-advance 4.2 s, a picked story stays
 * 8 s; reduced motion keeps it still; links carry the language. Images stubbed.
 */
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TargetNews } from '@/components/experiences/news/TargetNews'
import { LangProvider } from '@/features/i18n/LangContext'
import type { Lang } from '@/features/i18n/lang'

vi.mock('@/lib/images', () => {
  const pic = { sources: { webp: 'x.webp' }, img: { src: 'x.jpg', w: 880, h: 495 } }
  return {
    FEED_PHOTOS: { 'earthlink-af10': pic, 'qi-bgw03a': pic },
    BOARD_PHOTOS: { 'BBL-01A': pic, 'LED-AB01': pic },
  }
})

// A newer campaign without the client's OK, first in the file: it must never show.
vi.mock('@/content/campaigns.json', async (importOriginal) => {
  const real = (await importOriginal<{ default: { items: object[] } }>()).default
  const text = { ar: 'مسودة', en: 'Draft' }
  const draft = {
    ...real.items[0],
    id: 'draft-campaign',
    approved: false,
    brand: text,
    title: text,
    line: text,
  }
  return { default: { ...real, items: [draft, ...real.items] } }
})

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true

let reduced = false
let root: Root
let box: HTMLDivElement
beforeEach(() => {
  window.matchMedia = ((query: string) => ({
    matches: reduced,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  })) as unknown as typeof window.matchMedia
  box = document.body.appendChild(document.createElement('div'))
  root = createRoot(box)
  vi.useFakeTimers()
})
afterEach(() => {
  act(() => root.unmount())
  box.remove()
  reduced = false
  vi.useRealTimers()
})

const show = (lang: Lang) =>
  act(() =>
    root.render(
      <LangProvider lang={lang}>
        <TargetNews />
      </LangProvider>,
    ),
  )
const post = () => box.querySelector('[data-post]')?.getAttribute('data-post')
const story = (id: string) => box.querySelector<HTMLButtonElement>(`[data-story="${id}"]`)!
const wait = (ms: number) => act(() => vi.advanceTimersByTime(ms))

describe('TargetNews', () => {
  it('reads campaigns.json and shows only approved items', () => {
    show('en')
    const ids = [...box.querySelectorAll('[data-story]')].map((b) => b.getAttribute('data-story'))
    expect(ids).toEqual(['earthlink-alwatani', 'qi-superqi', 'network', 'alrabiaa'])
    expect(box.textContent).not.toContain('Draft')
    expect(post()).toBe('earthlink-alwatani')
  })

  it('tapping a story shows its post, marks it current and announces it', () => {
    show('en')
    act(() => story('qi-superqi').click())
    expect(post()).toBe('qi-superqi')
    expect(story('qi-superqi').getAttribute('aria-current')).toBe('true')
    expect(story('earthlink-alwatani').hasAttribute('aria-current')).toBe(false)
    expect(story('qi-superqi').getAttribute('aria-label')).toBe('Qi Card, story 2 of 4')
    expect(box.querySelector('[aria-live="polite"]')?.textContent).toBe('SuperQi on Baghdad walls')
  })

  it('moves every 4.2 s; a picked story stays 8 s; automatic moves are not announced', () => {
    show('ar')
    wait(4100)
    expect(post()).toBe('earthlink-alwatani')
    wait(100)
    expect(post()).toBe('qi-superqi')
    expect(box.querySelector('[aria-live="polite"]')?.textContent).toBe('')
    act(() => story('network').click())
    wait(7900)
    expect(post()).toBe('network')
    wait(100)
    expect(post()).toBe('alrabiaa')
    wait(4200)
    expect(post()).toBe('earthlink-alwatani')
  })

  it('reduced motion: never moves on its own, stories still work', () => {
    reduced = true
    show('ar')
    wait(20_000)
    expect(post()).toBe('earthlink-alwatani')
    act(() => story('alrabiaa').click())
    wait(20_000)
    expect(post()).toBe('alrabiaa')
    expect(box.querySelector('[data-post]')?.className).not.toContain('rise-in')
  })

  it('links keep the language; the covered LED-AB01 photo carries its [TO CONFIRM] chip', () => {
    show('en')
    expect(box.querySelector('[data-post] a')?.getAttribute('href')).toBe('/en/#feed')
    act(() => story('alrabiaa').click())
    expect(box.querySelector('[data-post] a')?.getAttribute('href')).toBe('/en/alrabiaa/')
    expect(box.querySelector('[data-to-confirm]')?.textContent).toContain('LED-AB01')
    show('ar')
    expect(box.querySelector('[data-post] a')?.getAttribute('href')).toBe('/alrabiaa/')
    expect(box.textContent).toContain('تارگت الوكيل الحصري لبيع إعلانات قناة الرابعة')
  })
})
