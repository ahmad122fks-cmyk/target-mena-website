import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Eyebrow } from './Eyebrow'

type Props = {
  eyebrow?: string
  title: string
  text?: string
  /** Inset grey mini preview of the feature. */
  preview?: ReactNode
  /** Link at the bottom ("… ←"); `footer` replaces it with custom actions. */
  link?: { href: string; label: string }
  footer?: ReactNode
  size?: 'md' | 'lg'
  raised?: boolean
  className?: string
}

/** White 20 px card: eyebrow, title, text, optional preview, link (DESIGN.md 4). */
export function FeatureCard({
  eyebrow,
  title,
  text,
  preview,
  link,
  footer,
  size = 'md',
  raised,
  className,
}: Props) {
  const lg = size === 'lg'
  return (
    <article
      className={cn(
        'flex flex-col gap-3 rounded-card border border-line bg-surface',
        lg ? 'gap-4 p-7 lg:p-9' : 'p-6 lg:p-7',
        raised && 'shadow-soft',
        className,
      )}
    >
      {eyebrow && <Eyebrow className={lg ? undefined : 'text-xs'}>{eyebrow}</Eyebrow>}
      <h3
        className={cn(
          'font-semibold leading-[1.4]',
          lg ? 'text-2xl lg:text-[1.75rem]' : 'text-[1.375rem]',
        )}
      >
        {title}
      </h3>
      {text && <p className={lg ? 'leading-[1.9]' : 'text-[0.9375rem] leading-[1.8]'}>{text}</p>}
      {preview && <div className="mt-1.5 rounded-[14px] bg-brand-ghost p-3.5">{preview}</div>}
      {footer ??
        (link && (
          <a
            href={link.href}
            className="mt-auto inline-flex min-h-11 items-end self-start pt-2.5 text-[0.9375rem] font-medium text-link hover:underline"
          >
            {link.label}
          </a>
        ))}
    </article>
  )
}
