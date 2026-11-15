import type { Localized } from '@/features/i18n/lang'
import type { SectionTone } from '../Section'

type Base = { tone?: SectionTone; title?: Localized; lead?: Localized }
export type Card = { eyebrow?: Localized; title: Localized; text: Localized }
export type Link = { path: string; label: Localized }

/** Page content blocks, written in each page's .content.json (both languages side by side). */
export type Block =
  | (Base & { type: 'grid'; columns: 2 | 3 | 4; items: Card[] })
  | (Base & { type: 'text'; paragraphs: Localized[] })
  | (Base & { type: 'stat'; value: Localized; label: Localized; note?: Localized })
  | (Base & { type: 'art'; art: 'production' | 'creative'; alt: Localized })
  | (Base & { type: 'chips'; items: Localized[] })
  | (Base & { type: 'cta'; text?: Localized; link: Link })
  | (Base & { type: 'work' })
