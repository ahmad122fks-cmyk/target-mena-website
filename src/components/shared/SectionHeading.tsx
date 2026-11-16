import { cn } from '@/lib/utils'
import { Eyebrow } from './Eyebrow'

const SIZES = {
  /* v3 type (prompt 5): H1 56/66, H2 40/50 */
  hero: 'text-4xl leading-[1.2] ltr:tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[4.125rem]',
  page: 'text-[2rem] leading-[1.3] lg:text-[2.5rem] lg:leading-[3.125rem]',
  section: 'text-3xl leading-[1.3] lg:text-[2.5rem] lg:leading-[3.125rem]',
  feature: 'text-3xl leading-[1.3] lg:text-[2.5rem] lg:leading-[3.125rem]',
  band: 'text-2xl font-semibold lg:text-[1.875rem]',
} as const

type Props = {
  id: string
  title: string
  lead?: string
  eyebrow?: string
  level?: 1 | 2
  size?: keyof typeof SIZES
  center?: boolean
  className?: string
}

/** Eyebrow, heading and a short grey lead; centred on the home bands. */
export function SectionHeading({
  id,
  title,
  lead,
  eyebrow,
  level = 2,
  size = level === 1 ? 'page' : 'section',
  center = false,
  className,
}: Props) {
  const Heading = level === 1 ? 'h1' : 'h2'
  return (
    <div className={cn('flex flex-col gap-3.5', center && 'items-center text-center', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading id={id} className={SIZES[size]}>
        {title}
      </Heading>
      {lead && (
        <p
          className={cn(
            'max-w-2xl text-[1.0625rem] leading-[1.875rem]',
            size === 'hero' && 'lg:text-[1.1875rem]',
          )}
        >
          {lead}
        </p>
      )}
    </div>
  )
}
