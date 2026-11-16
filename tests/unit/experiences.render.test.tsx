// @vitest-environment jsdom
/*
 * The three phone screens render in both languages, react to the keyboard,
 * use the real selection cart, mark the unconfirmed photo and never show
 * prices or numbers in the demo campaign. Images are stubbed (no imagetools here).
 */
import { act, type ReactNode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { BoardSwipe } from '@/components/experiences/BoardSwipe'
import { SocialCampaign } from '@/components/experiences/SocialCampaign'
import { TargetReels } from '@/components/experiences/TargetReels'
import raw from '@/data/boards.json'
import { LangProvider } from '@/features/i18n/LangContext'
import type { Lang } from '@/features/i18n/lang'
import type { Board } from '@/lib/boards'

vi.mock('@/lib/images', () => {
  const pic = { sources: { webp: 'x.webp' }, img: { src: 'x.jpg', w: 1000, h: 606 } }
  return {
    BOARD_PHOTOS: { BG46A: pic, 'LED-AB01': pic, 'BBL-01A': pic },
    ART: { creative: pic, production: pic },
    MAP_IMAGE: pic,
  }
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
})
afterEach(() => {
  act(() => root.unmount())
  box.remove()
  reduced = false
})

function show(lang: Lang, node: ReactNode) {
  act(() => root.render(<LangProvider lang={lang}>{node}</LangProvider>))
}

const boards = (raw as Board[]).filter((b) => ['BG46A', 'LED-AB01'].includes(b.code))

describe('BoardSwipe', () => {
  it('shows one board at a time, moves with the keyboard and marks the covered photo', () => {
    show('en', <BoardSwipe boards={boards} />)
    const cards = [...box.querySelectorAll('article')]
    expect(cards.map((card) => card.hasAttribute('inert'))).toEqual([false, true])
    expect(box.querySelector('[data-to-confirm="covered LED-AB01 photo"]')).not.toBeNull()
    const region = box.querySelector('[role="region"]')!
    act(() => {
      region.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    })
    expect(cards.map((card) => card.hasAttribute('inert'))).toEqual([true, false])
    expect(box.querySelector('a[href="/en/boards/BG46A/"]')).not.toBeNull()
    expect(box.textContent).not.toMatch(/price|USD|\$/i)
  })
  it('adds the board to the selection cart', () => {
    show('ar', <BoardSwipe boards={boards} />)
    const add = box.querySelector<HTMLButtonElement>('article button[aria-pressed]')!
    expect(add.textContent).toContain('أضف إلى قائمتي')
    act(() => add.click())
    expect(add.getAttribute('aria-pressed')).toBe('true')
    expect(add.textContent).toContain('في قائمتي')
    expect(window.localStorage.getItem('target-selection-v1')).toContain('BG46A')
  })
})

describe('TargetReels', () => {
  it('likes and follows without showing any count', () => {
    show('ar', <TargetReels />)
    const first = box.querySelector('article')!
    const [follow, like] = [...first.querySelectorAll<HTMLButtonElement>('button')]
    act(() => like.click())
    act(() => follow.click())
    expect(like.getAttribute('aria-pressed')).toBe('true')
    expect(follow.textContent).toBe('تتابعه')
    expect(box.querySelectorAll('article')).toHaveLength(6)
  })
})

describe('SocialCampaign', () => {
  it('reduced motion: the finished campaign, labelled demo data, no numbers', () => {
    reduced = true
    show('en', <SocialCampaign />)
    expect(box.textContent).toContain('Live now')
    expect(box.textContent).toContain('Demo data')
    expect(box.textContent).not.toMatch(/[0-9]/)
  })
})
