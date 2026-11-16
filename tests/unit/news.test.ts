/*
 * TargetNews data rule (prompt 5): approved campaigns in file order, then
 * published articles with a real photo (newest first), then the house items,
 * capped at 4. Also the real data of today and the prerendered first post.
 */
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { TargetNews } from '@/components/experiences/news/TargetNews'
import campaigns from '@/content/campaigns.json'
import news from '@/content/news.json'
import { totals } from '@/data/network-map.json'
import { approvedOnly, FEED, type FeedItem } from '@/features/feed/feed'
import { LangProvider } from '@/features/i18n/LangContext'
import { buildNews, type NewsArticle, type NewsItem } from '@/features/news/build'
import { NEWS } from '@/features/news/news'

vi.mock('@/lib/images', () => {
  const pic = { sources: { webp: 'x.webp' }, img: { src: 'x.jpg', w: 880, h: 495 } }
  return {
    FEED_PHOTOS: { 'earthlink-af10': pic, 'qi-bgw03a': pic },
    BOARD_PHOTOS: { 'BBL-01A': pic, 'LED-AB01': pic },
  }
})

const text = (value: string) => ({ ar: value, en: value })
const campaign = (id: string, approved: boolean, photo = 'p-ok'): FeedItem => ({
  id,
  approved,
  isNew: false,
  when: text('2026'),
  where: text('Baghdad'),
  brand: text(`${id} · app`),
  line: text('line'),
  tags: [],
  photos: [{ file: photo, alt: text('alt') }],
})
const article = (slug: string, date: string, extra: Partial<NewsArticle> = {}): NewsArticle => ({
  slug,
  date,
  title: text(slug),
  description: text('description'),
  body: [],
  photo: { file: 'p-ok', alt: text('alt') },
  ...extra,
})
const house = (id: string): NewsItem => ({
  ...campaign(id, true),
  story: text(id),
  avatar: 'target',
  tag: text('tag'),
  tone: 'blue',
  title: text(id),
  photo: 'p-ok',
  alt: text('alt'),
  href: '/network/',
})
const build = (sources: Partial<Parameters<typeof buildNews>[0]>) =>
  buildNews({
    campaigns: [],
    articles: [],
    house: [],
    labels: news,
    hasPhoto: (key) => key === 'p-ok',
    ...sources,
  }).map((item) => item.id)

describe('TargetNews data rule', () => {
  it('shows only approved campaigns, in file order; a draft never appears', () => {
    const items = [campaign('a', true), campaign('draft', false), campaign('b', true)]
    const unset = { ...campaign('no-flag', true), approved: undefined } as unknown as FeedItem
    expect(build({ campaigns: [...items, unset] })).toEqual(['a', 'b'])
    expect(approvedOnly([...items, unset]).map((item) => item.id)).toEqual(['a', 'b'])
  })
  it('appends published articles (newest first), then house items, and caps at 4', () => {
    const articles = [article('old', '2026-01-02'), article('new', '2026-03-04')]
    expect(build({ campaigns: [campaign('a', true)], articles, house: [house('h1')] })).toEqual([
      'a',
      'article-new',
      'article-old',
      'h1',
    ])
    const many = [campaign('a', true), campaign('b', true), campaign('c', true)]
    expect(build({ campaigns: many, articles, house: [house('h1')] })).toHaveLength(4)
  })
  it('skips articles without a photo or not published, and photos that are not on the site', () => {
    const articles = [
      article('no-photo', '2026-05-01', { photo: undefined }),
      article('draft', '2026-05-02', { published: false }),
      article('ok', '2026-05-03'),
    ]
    const missing = campaign('missing-photo', true, 'p-missing')
    expect(build({ campaigns: [missing], articles })).toEqual(['article-ok'])
  })
  it('maps a campaign to a post: short brand, new tag, link to the feed', () => {
    const fresh = { ...campaign('a', true), isNew: true, title: text('Headline') }
    const [post] = buildNews({
      campaigns: [fresh],
      articles: [],
      house: [],
      labels: news,
      hasPhoto: () => true,
    })
    expect(post).toMatchObject({ brand: text('a'), story: text('a'), tag: news.tags.new })
    expect(post.tone).toBe('yellow')
    expect(post).toMatchObject({
      title: text('Headline'),
      when: text('2026 · Baghdad'),
      href: '/#feed',
    })
  })
})

describe('TargetNews today', () => {
  it('reads campaigns.json and shows only approved items: Earthlink, Qi, network, Alrabiaa', () => {
    expect(NEWS.map((item) => item.id)).toEqual([
      'earthlink-alwatani',
      'qi-superqi',
      'network',
      'alrabiaa',
    ])
    const approved = new Set(FEED.map((item) => item.id))
    for (const item of campaigns.items) expect(approved.has(item.id)).toBe(item.approved === true)
    expect(NEWS.map((item) => item.photo)).toEqual([
      'earthlink-af10',
      'qi-bgw03a',
      'BBL-01A',
      'LED-AB01',
    ])
  })
  it('takes the network numbers from network-map.json (the owner’s wording today)', () => {
    expect(totals).toMatchObject({ boards: 674, provinces: 12, highways: 2 })
    expect(NEWS[2].title).toEqual({
      ar: '674 لوحة في 12 محافظة وعلى طريقين سريعين',
      en: '674 boards in 12 provinces and on 2 highways',
    })
  })
  it('prerenders the first post fully, its photo eager, with 4 stories', () => {
    const html = renderToString(
      createElement(LangProvider, { lang: 'ar', children: createElement(TargetNews) }),
    )
    expect(html).toContain('data-post="earthlink-alwatani"')
    expect(html).toContain('حملة تطبيق الوطني على شبكة تارگت')
    expect(html).toContain('loading="eager"')
    expect(html.match(/data-story=/g)).toHaveLength(4)
    expect(html).not.toMatch(/IQD|USD|\$|متاح|available|booked/i)
  })
})
