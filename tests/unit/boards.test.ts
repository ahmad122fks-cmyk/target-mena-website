import { describe, expect, it } from 'vitest'
import { seoFor } from '@/app/server/seo'
import { matchRoute } from '@/app/routes'
import raw from '@/data/boards.json'
import { filterBoards, inSize, photosFirst } from '@/features/boards/filter'
import {
  DEFAULT_STATE,
  pageCount,
  pageOf,
  searchFromState,
  sortBoards,
  stateFromSearch,
} from '@/features/boards/finderState'
import { boardSlug, formatOf, type Board } from '@/lib/boards'
import { formatCount } from '@/lib/format'
import { codeVariants, matchPhoto } from '../../scripts/feed/photos'

const boards = raw as Board[]

describe('finder filters', () => {
  it('filters by province, type, size and text', () => {
    const najaf = filterBoards(boards, { city: 'najaf', format: '', size: '', query: '' }, 'ar')
    expect(najaf.length).toBeGreaterThan(0)
    expect(najaf.every((b) => b.city === 'najaf')).toBe(true)
    const bridges = filterBoards(boards, { city: '', format: 'bridges', size: '', query: '' }, 'en')
    expect(bridges.every((b) => formatOf(b.type) === 'bridges')).toBe(true)
    expect(
      filterBoards(boards, { city: '', format: '', size: '', query: 'bgw03a' }, 'en').map(
        (b) => b.code,
      ),
    ).toEqual(['BGW03A'])
    expect(
      filterBoards(boards, { city: '', format: '', size: '', query: 'Karrada' }, 'en').length,
    ).toBeGreaterThan(0)
  })
  it('groups sizes by m²', () => {
    expect(inSize(12, 'small')).toBe(true)
    expect(inSize(20, 'medium')).toBe(true)
    expect(inSize(196, 'large')).toBe(true)
    expect(inSize(196, '')).toBe(true)
  })
  it('keeps filters, sort, view, page and shared codes in the address', () => {
    const state = {
      ...DEFAULT_STATE,
      city: 'najaf',
      format: 'bridges',
      size: 'large',
      query: 'x',
      sort: 'size' as const,
      view: 'list' as const,
      page: 3,
      codes: ['BGW03A', 'BBH20A'],
      pick: true,
    }
    expect(stateFromSearch(searchFromState(state))).toEqual(state)
    expect(searchFromState(DEFAULT_STATE)).toBe('')
    expect(stateFromSearch('?page=-4&sort=evil&codes=<script>,BGW03A').page).toBe(1)
    expect(stateFromSearch('?codes=<script>,bgw03a').codes).toEqual(['BGW03A'])
  })
  it('sorts by code, province and size; pages by 24', () => {
    expect(sortBoards(boards, 'size')[0].sqm).toBe(Math.max(...boards.map((b) => b.sqm)))
    expect(sortBoards(boards, 'province')[0].city).toBe('baghdad')
    expect(pageCount(660)).toBe(28)
    expect(pageOf(boards, 2)[0]).toBe(boards[24])
  })
  it('shows boards with photos first', () => {
    const sorted = photosFirst(boards)
    const firstWithout = sorted.findIndex((b) => !b.photo)
    expect(sorted.slice(firstWithout).every((b) => !b.photo)).toBe(true)
  })
})

describe('board pages', () => {
  it('every board has a unique URL and a title <= 60 and description <= 155 in both languages', () => {
    const slugs = new Set(boards.map((b) => boardSlug(b.code)))
    expect(slugs.size).toBe(boards.length)
    for (const board of boards) {
      for (const lang of ['ar', 'en'] as const) {
        const seo = seoFor({ kind: 'board', board, nearby: [] }, lang)
        expect(seo.title.length, `${board.code} ${lang}: ${seo.title}`).toBeLessThanOrEqual(60)
        expect(seo.title).toContain(board.code)
        expect(seo.description.length).toBeLessThanOrEqual(155)
      }
    }
  })
  it('matches URLs to pages', () => {
    expect(matchRoute('/boards/BGW03A/')).toMatchObject({
      page: 'board',
      lang: 'ar',
      params: { code: 'BGW03A' },
    })
    expect(matchRoute('/en/network/najaf')).toMatchObject({
      page: 'province',
      lang: 'en',
      params: { province: 'najaf' },
    })
    expect(matchRoute('/en/index.html')).toMatchObject({ page: 'home', lang: 'en' })
    expect(matchRoute('/nothing/here/')).toBeNull()
  })
  it('counts boards in Arabic and English', () => {
    expect(formatCount(1, 'ar')).toBe('لوحة واحدة')
    expect(formatCount(2, 'ar')).toBe('لوحتان')
    expect(formatCount(5, 'ar')).toBe('5 لوحات')
    expect(formatCount(216, 'ar')).toBe('216 لوحة')
    expect(formatCount(216, 'en')).toBe('216 boards')
  })
})

describe('photo file names', () => {
  const published = new Set(['BBH01A', 'BBH01B', 'BGW03A', 'NHS05A-1'])
  it('handles padding, pairs, networks and ranges', () => {
    expect(codeVariants('BBH1A')).toContain('BBH01A')
    expect(matchPhoto('BGW03A__s37.jpg', published, new Map())).toEqual(['BGW03A'])
    expect(matchPhoto('BBH1A_B__s278.jpg', published, new Map())).toEqual(['BBH01A', 'BBH01B'])
    expect(matchPhoto('NHS05A__s1.jpg', published, new Map([['NHS05A', ['NHS05A-1']]]))).toEqual([
      'NHS05A-1',
    ])
    expect(matchPhoto('BBH15-31A_B__s280.jpg', published, new Map())).toEqual([])
    expect(matchPhoto('B37A__s178.jpg', published, new Map())).toEqual([])
  })
})
