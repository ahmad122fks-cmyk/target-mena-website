import type { ComponentProps, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const TONES = {
  blue: 'bg-brand-blue text-white hover:bg-brand-blue-80',
  outline: 'border-[1.5px] border-link bg-surface text-link hover:bg-brand-blue-10',
  ghost: 'border border-input bg-field text-ink hover:bg-brand-ghost',
  white: 'bg-white text-brand-black hover:bg-white/90',
  black: 'bg-brand-black text-white hover:bg-brand-black/85',
  green: 'bg-brand-green text-brand-black hover:bg-brand-green-80',
  /** Main action on the header and dark bands (DESIGN.md 12). */
  yellow: 'bg-brand-yellow text-brand-black hover:bg-brand-yellow-80',
  /** Secondary action on blue or dark bands. */
  outlineWhite: 'border-[1.5px] border-white bg-transparent text-white hover:bg-white/10',
} as const

const SIZES = {
  md: 'h-12 px-6 text-base',
  sm: 'h-11 px-5 text-[0.9375rem]',
} as const

export type PillTone = keyof typeof TONES

type Common = {
  tone?: PillTone
  size?: keyof typeof SIZES
  className?: string
  children: ReactNode
}
type LinkProps = Common & {
  href: string
  /** Opens in a new tab (outside sites). */
  external?: boolean
}
type ButtonProps = Common & { href?: undefined; external?: undefined } & Omit<
    ComponentProps<'button'>,
    'className'
  >

/** Pill-shaped action (DESIGN.md 4): a link with `href`, otherwise a button. */
export function PillButton(props: LinkProps | ButtonProps) {
  const {
    tone = 'blue',
    size = 'md',
    className,
    children,
    href,
    external,
    ...rest
  } = props as Common & { href?: string; external?: boolean } & Omit<
      ComponentProps<'button'>,
      'className'
    >
  const classes = cn('rounded-full font-medium', SIZES[size], TONES[tone], className)
  if (href !== undefined)
    return (
      <Button asChild className={classes}>
        <a href={href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
          {children}
        </a>
      </Button>
    )
  return (
    <Button type="button" {...rest} className={classes}>
      {children}
    </Button>
  )
}
