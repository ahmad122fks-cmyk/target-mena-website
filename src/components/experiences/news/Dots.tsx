import { cn } from '@/lib/utils'

/** Position dots under the post (decorative: the stories carry the same information). */
export function Dots({ count, current }: { count: number; current: number }) {
  return (
    <div aria-hidden="true" className="flex justify-center gap-[5px] pt-2 pb-4">
      {Array.from({ length: count }, (_, j) => (
        <span
          key={j}
          className={cn(
            'block h-[5px] rounded-full transition-colors duration-400',
            j === current ? 'w-[18px] bg-brand-blue' : 'w-[5px] bg-line-strong',
          )}
        />
      ))}
    </div>
  )
}
