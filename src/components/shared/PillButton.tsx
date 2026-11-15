import type { ComponentProps, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const TONES = {
  blue: 'bg-brand-blue text-white hover:bg-brand-blue-80',
  outline: 'border-[1.5px] border-brand-blue bg-white text-brand-blue hover:bg-brand-blue-10',
  ghost: 'border border-input bg-white text-brand-black hover:bg-brand-ghost',
  white: 'bg-white text-brand-black hover:bg-brand-ghost',
  black: 'bg-brand-black text-white hover:bg-brand-black/85',
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
type LinkProps = Common & { href: string }
type ButtonProps = Common & { href?: undefined } & Omit<ComponentProps<'button'>, 'className'>

/** Pill-shaped action (DESIGN.md 4): a link with `href`, otherwise a button. */
export function PillButton(props: LinkProps | ButtonProps) {
  const {
    tone = 'blue',
    size = 'md',
    className,
    children,
    href,
    ...rest
  } = props as Common & {
    href?: string
  } & Omit<ComponentProps<'button'>, 'className'>
  const classes = cn('rounded-full font-medium', SIZES[size], TONES[tone], className)
  if (href !== undefined)
    return (
      <Button asChild className={classes}>
        <a href={href}>{children}</a>
      </Button>
    )
  return (
    <Button type="button" {...rest} className={classes}>
      {children}
    </Button>
  )
}
