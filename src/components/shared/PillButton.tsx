import type { ComponentProps, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const TONES = {
  /** Primary: blue, white text (v3). */
  blue: 'bg-brand-blue text-white hover:bg-[#014a80] dark:hover:bg-brand-blue-80',
  /** Secondary: white with a 1 px #DCE7EF border (v3). */
  outline: 'border border-line-strong bg-surface text-ink hover:border-link hover:text-link',
  ghost: 'border border-line-strong bg-surface text-ink hover:border-link hover:text-link',
  white: 'bg-white text-brand-black hover:bg-white/90',
  black: 'bg-brand-black text-white hover:bg-brand-black/85',
  /** Alrabiaa only. */
  green: 'bg-brand-green text-brand-black hover:bg-brand-green-80',
  /** The one main call to action (header button, CTA band). */
  yellow: 'bg-brand-yellow text-brand-black hover:bg-brand-yellow-80',
  /** Secondary action on the blue hero or the blue CTA band. */
  outlineWhite: 'border-[1.5px] border-white/70 bg-transparent text-white hover:bg-white/10',
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

/**
 * The site's action button (DESIGN.md 4): a link with `href`, otherwise a
 * button. v3: 10 px corners; pills are only for filters and small tags.
 */
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
  const classes = cn('rounded-btn font-semibold', SIZES[size], TONES[tone], className)
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
