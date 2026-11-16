import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  id: string
  label: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  className?: string
}

/** Pill search with an icon (code, province or area); the label is for screen readers. */
export function SearchField({ id, label, placeholder, value, onChange, className }: Props) {
  return (
    <div
      className={cn(
        'flex h-11 min-w-0 items-center gap-2 rounded-full border border-input bg-field px-4 focus-within:border-link',
        className,
      )}
    >
      <Search className="size-[18px] shrink-0 text-brand-text" strokeWidth={2} aria-hidden="true" />
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-full min-w-0 flex-1 bg-transparent text-[0.9375rem] text-ink outline-none placeholder:text-brand-text"
      />
    </div>
  )
}
