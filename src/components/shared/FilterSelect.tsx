import { Label } from '@/components/ui/label'

type Props = {
  id: string
  label: string
  all: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}

/** Native select (no extra JavaScript) styled like the shadcn Input. */
export function FilterSelect({ id, label, all, value, onChange, options }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm font-semibold">
        {label}
      </Label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-md border border-input bg-white px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <option value="">{all}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
