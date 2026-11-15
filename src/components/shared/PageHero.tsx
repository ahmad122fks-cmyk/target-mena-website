import type { ReactNode } from 'react'
import type { Crumb } from '@/lib/breadcrumbs'
import { Breadcrumbs } from './Breadcrumbs'
import { Container } from './Section'

type Props = {
  crumbs: Crumb[]
  title: string
  intro?: string
  /** Finder width (1320 px). */
  wide?: boolean
  children?: ReactNode
}

/** Top of every inner page: ghost band with breadcrumb, one H1 and a short intro. */
export function PageHero({ crumbs, title, intro, wide, children }: Props) {
  return (
    <section aria-labelledby="page-title" className="border-b border-line bg-brand-ghost">
      <Container wide={wide} className="flex flex-col gap-2.5 pt-8 pb-7 lg:pt-10">
        <Breadcrumbs items={crumbs} />
        <h1 id="page-title" className="text-[2rem] lg:text-[2.5rem]">
          {title}
        </h1>
        {intro && <p className="max-w-3xl text-[1.0625rem]">{intro}</p>}
        {children}
      </Container>
    </section>
  )
}
