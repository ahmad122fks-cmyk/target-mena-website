/*
 * Prerender safety: the phone screens render on the server (no window or
 * document during render) to a meaningful first frame.
 */
import { createElement, type ReactElement } from 'react'
import { renderToString } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { BoardSwipe } from '@/components/experiences/BoardSwipe'
import { SocialCampaign } from '@/components/experiences/SocialCampaign'
import { TargetReels } from '@/components/experiences/TargetReels'
import raw from '@/data/boards.json'
import { LangProvider } from '@/features/i18n/LangContext'
import type { Board } from '@/lib/boards'

vi.mock('@/lib/images', () => {
  const pic = { sources: { webp: 'x.webp' }, img: { src: 'x.jpg', w: 1000, h: 606 } }
  return { BOARD_PHOTOS: { BG46A: pic }, ART: { creative: pic, production: pic }, MAP_IMAGE: pic }
})

const html = (lang: 'ar' | 'en', screen: ReactElement) =>
  renderToString(createElement(LangProvider, { lang, children: screen }))

describe('experiences on the server', () => {
  it('render without the browser, first card / reel / draft shown', () => {
    const boards = (raw as Board[]).filter((board) => board.code === 'BG46A')
    expect(html('ar', createElement(BoardSwipe, { boards }))).toContain('BG46A')
    expect(html('en', createElement(TargetReels))).toContain('A bridge board at the entrance')
    expect(html('ar', createElement(SocialCampaign))).toContain('مسودة')
  })
})
