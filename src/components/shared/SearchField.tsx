import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

/** Search input with an icon (code or area). */
export function SearchField({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <label htmlFor={id} className="text-xs font-semibold">
        {label}
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-brand-text"
          aria-hidden="true"
        />
        <Input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 rounded-lg bg-white ps-9 text-base"
        />
      </div>
    </div>
  )
}
