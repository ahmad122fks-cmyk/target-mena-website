import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Bands alternate white and ghost (hairline top and bottom); black only for the footer look. */
export const SECTION_TONES = {
  white: 'bg-page',
  ghost: 'border-y border-line bg-brand-ghost',
  black: 'bg-deep text-white [--heading:var(--color-brand-white)]',
  /** Channel colours (DESIGN.md 2): black text, only on their own pages. */
  yellow:
    'bg-brand-yellow text-brand-black [--eyebrow:var(--color-brand-black)] [--heading:var(--color-brand-black)]',
  green:
    'bg-brand-green text-brand-black [--eyebrow:var(--color-brand-black)] [--heading:var(--color-brand-black)]',
} as const

export type SectionTone = keyof typeof SECTION_TONES

const PADDING = { lg: 'py-16 lg:py-24', md: 'py-14 lg:py-[4.5rem]' } as const

type Props = {
  tone?: SectionTone
  id?: string
  /** Id of the section's heading (omit only for sections without one). */
  labelledBy?: string
  /** Vertical space: 96 px (default) or 72 px for short bands. */
  pad?: keyof typeof PADDING
  /** Skip the standard container (the section lays itself out). */
  bare?: boolean
  /**
   * Below the fold: the browser skips laying it out (and loading its lazy
   * photos) until the visitor scrolls near it. Keeps the first view fast.
   */
  deferred?: boolean
  className?: string
  children: ReactNode
}

export function Section({
  tone = 'white',
  id,
  labelledBy,
  pad = 'lg',
  bare,
  deferred,
  className,
  children,
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'relative overflow-hidden',
        deferred && '[contain-intrinsic-size:auto_900px] [content-visibility:auto]',
        SECTION_TONES[tone],
        className,
      )}
    >
      {bare ? children : <Container className={PADDING[pad]}>{children}</Container>}
    </section>
  )
}

type ContainerProps = { wide?: boolean; className?: string; children: ReactNode }

/** 1240 px column (1320 px for the finder), 16 / 24 px side padding. */
export function Container({ wide, className, children }: ContainerProps) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full px-4 sm:px-6',
        wide ? 'max-w-[1320px]' : 'max-w-[1240px]',
        className,
      )}
    >
      {children}
    </div>
  )
}
