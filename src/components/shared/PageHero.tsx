import type { ReactNode } from 'react'
import type { Crumb } from '@/lib/breadcrumbs'
import { Breadcrumbs } from './Breadcrumbs'
import { Container } from './Section'

type Props = { crumbs: Crumb[]; title: string; intro?: string; children?: ReactNode }

/** Top of every inner page: breadcrumb, one H1, a short intro. */
export function PageHero({ crumbs, title, intro, children }: Props) {
  return (
    <section aria-labelledby="page-title" className="border-b bg-white">
      <Container className="flex flex-col gap-4 py-8 lg:py-12">
        <Breadcrumbs items={crumbs} />
        <h1 id="page-title" className="text-3xl sm:text-4xl">
          {title}
        </h1>
        {intro && <p className="max-w-3xl text-lg">{intro}</p>}
        {children}
      </Container>
    </section>
  )
}
