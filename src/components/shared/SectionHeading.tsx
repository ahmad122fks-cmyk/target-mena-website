import { cn } from '@/lib/utils'

type Props = {
  id: string
  title: string
  /** Lighter second line, as in the catalog headlines ("الإنتاج / الفني"). */
  light?: string
  eyebrow?: string
  level?: 1 | 2
  className?: string
}

export function SectionHeading({ id, title, light, eyebrow, level = 2, className }: Props) {
  const Heading = level === 1 ? 'h1' : 'h2'
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {eyebrow && (
        <p className="flex items-center gap-2 text-sm font-semibold text-[var(--eyebrow,var(--color-brand-blue))]">
          <span aria-hidden="true" className="h-1 w-6 rounded-full bg-brand-yellow" />
          {eyebrow}
        </p>
      )}
      <Heading id={id} className={level === 1 ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}>
        {title}
        {light && ' '}
        {light && <span className="block font-light">{light}</span>}
      </Heading>
    </div>
  )
}
