import type { ReactNode } from 'react'
import { usePageData } from '@/app/PageData'
import type { Localized } from '@/features/i18n/lang'
import { useLang, useT } from '@/features/i18n/LangContext'
import { trailFor } from '@/lib/breadcrumbs'
import { Blocks } from './blocks/Blocks'
import type { Block } from './blocks/types'
import { PageHero } from './PageHero'

type Content = { title: Localized; intro?: Localized; blocks?: unknown[] }

type Props = {
  id: string
  content: Content
  /** Extra lines inside the title band (logo, date, placeholders). */
  hero?: ReactNode
  /** Sections before the content blocks (page-specific parts). */
  before?: ReactNode
  /** Sections after the content blocks. */
  children?: ReactNode
  /** First content block on ghost (when a white section comes before it). */
  startGhost?: boolean
}

/** An inner page: ghost title band (breadcrumb, H1, intro), then its content blocks. */
export function ContentPage({ id, content, hero, before, children, startGhost }: Props) {
  const t = useT()
  const lang = useLang()
  const data = usePageData('static')
  return (
    <>
      <PageHero
        crumbs={trailFor(data, lang)}
        title={t(content.title)}
        intro={content.intro && t(content.intro)}
      >
        {hero}
      </PageHero>
      {before}
      {content.blocks && (
        <Blocks id={id} blocks={content.blocks as Block[]} startGhost={startGhost} />
      )}
      {children}
    </>
  )
}
