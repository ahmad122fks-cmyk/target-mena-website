import { cn } from '@/lib/utils'
import { Eyebrow } from './Eyebrow'

const SIZES = {
  hero: 'text-4xl leading-[1.2] tracking-tight sm:text-5xl lg:text-[3.625rem]',
  page: 'text-[2rem] lg:text-[2.5rem]',
  section: 'text-3xl lg:text-[2.75rem]',
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
            'max-w-2xl text-lg leading-[1.8]',
            size === 'hero' && 'lg:text-[1.1875rem]',
          )}
        >
          {lead}
        </p>
      )}
    </div>
  )
}
