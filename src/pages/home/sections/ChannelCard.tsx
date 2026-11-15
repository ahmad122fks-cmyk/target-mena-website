import type { ReactNode } from 'react'
import { Eyebrow } from '@/components/shared/Eyebrow'
import { cn } from '@/lib/utils'

const TONES = {
  grey: 'bg-brand-grey',
  yellow: 'bg-brand-yellow',
  white: 'border border-line bg-white [--eyebrow:var(--color-brand-blue)]',
  green: 'bg-brand-green',
} as const

type Props = {
  tone: keyof typeof TONES
  eyebrow: string
  title: string
  link: { href: string; label: string }
  /** Art on the inline-end side (catalog image); the text keeps its own column. */
  media?: ReactNode
  /** Extra content under the title (logo) or decoration (calligraphy). */
  children?: ReactNode
}

/** Service card in its channel colour. Text is always black on colour (WCAG AA, DESIGN.md 2). */
export function ChannelCard({ tone, eyebrow, title, link, media, children }: Props) {
  return (
    <article
      className={cn(
        'relative flex min-h-[260px] flex-wrap overflow-hidden rounded-[1.375rem] text-brand-black [--eyebrow:var(--color-brand-black)]',
        TONES[tone],
      )}
    >
      <div className="relative flex flex-[1_1_16rem] flex-col gap-3 p-7 lg:p-9">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="max-w-[26rem] text-2xl font-semibold leading-[1.4] lg:text-[1.75rem]">
          {title}
        </h3>
        {children}
        <a
          href={link.href}
          className={cn(
            'mt-auto inline-flex min-h-11 items-end self-start font-medium hover:underline',
            tone === 'white' ? 'text-brand-blue' : 'text-brand-black',
          )}
        >
          {link.label}
        </a>
      </div>
      {media && <div className="min-w-0 flex-[1_1_13.75rem]">{media}</div>}
    </article>
  )
}
