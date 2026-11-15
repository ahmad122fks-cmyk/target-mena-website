import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const TONES = {
  blue: 'bg-brand-blue text-white hover:bg-brand-blue-80',
  yellow: 'bg-brand-yellow text-brand-black hover:bg-brand-yellow-80',
  white: 'bg-white text-brand-blue hover:bg-brand-ghost',
  black: 'bg-brand-black text-white hover:bg-brand-black/85',
  outline: 'border border-brand-blue bg-white text-brand-blue hover:bg-brand-blue-10',
  outlineLight: 'border-2 border-white bg-brand-blue text-white hover:bg-brand-blue-80',
} as const

export type CtaTone = keyof typeof TONES

type Props = { href: string; tone?: CtaTone; className?: string; children: ReactNode }

/** Call-to-action link styled as a shadcn Button (44 px+ touch target). */
export function CtaLink({ href, tone = 'blue', className, children }: Props) {
  return (
    <Button
      asChild
      className={cn('h-12 rounded-xl px-6 text-base font-semibold', TONES[tone], className)}
    >
      <a href={href}>{children}</a>
    </Button>
  )
}
