import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Section colour rhythm (DESIGN.md). Each tone sets its own text, heading
 * and eyebrow colours so every combination keeps WCAG AA contrast.
 */
export const SECTION_TONES = {
  white: 'bg-white',
  ghost: 'bg-brand-ghost',
  blue: 'bg-brand-blue text-white [--heading:var(--color-brand-white)] [--eyebrow:var(--color-brand-white)]',
  grey: 'bg-brand-grey text-brand-black [--eyebrow:var(--color-brand-black)]',
  yellow: 'bg-brand-yellow text-brand-black [--eyebrow:var(--color-brand-black)]',
  black:
    'bg-brand-black text-white [--heading:var(--color-brand-white)] [--eyebrow:var(--color-brand-yellow)]',
} as const

export type SectionTone = keyof typeof SECTION_TONES

type Props = {
  tone?: SectionTone
  id?: string
  labelledBy: string
  /** Decorative calligraphy, absolutely positioned inside the section. */
  art?: ReactNode
  /** Skip the standard container (the section lays itself out). */
  bare?: boolean
  className?: string
  children: ReactNode
}

export function Section({ tone = 'white', id, labelledBy, art, bare, className, children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative overflow-hidden', SECTION_TONES[tone], className)}
    >
      {art}
      {bare ? children : <Container className="py-16 lg:py-24">{children}</Container>}
    </section>
  )
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('relative mx-auto w-full max-w-[1240px] px-4 sm:px-6', className)}>
      {children}
    </div>
  )
}
