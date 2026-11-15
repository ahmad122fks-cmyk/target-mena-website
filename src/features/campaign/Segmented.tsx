import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

type Props = {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}

/** Pill toggle (weeks/months, dinar/dollar): the chosen side is filled blue. */
export function Segmented({ label, value, options, onChange }: Props) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(next) => next && onChange(next)}
      aria-label={label}
      className="h-12 shrink-0 gap-0 overflow-hidden rounded-full border border-input bg-white"
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className="h-full rounded-none px-4 text-[0.9375rem] text-brand-black first:rounded-s-full last:rounded-e-full data-[state=on]:bg-brand-blue data-[state=on]:text-white"
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
