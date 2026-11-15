import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export type Option = { value: string; label: string }
type Labels = { all: string; find: string; none: string }
type Props = {
  id: string
  label: string
  labels: Labels
  value: string
  options: Option[]
  onChange: (v: string) => void
  searchable?: boolean
}

/** shadcn Combobox (Popover + Command): one filter with an "All" choice and optional search. */
export function FilterCombobox({
  id,
  label,
  labels,
  value,
  options,
  onChange,
  searchable = false,
}: Props) {
  const [open, setOpen] = useState(false)
  const current = options.find((option) => option.value === value)
  const choose = (next: string) => {
    onChange(next)
    setOpen(false)
  }
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <span id={`${id}-label`} className="text-xs font-semibold">
        {label}
      </span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-labelledby={`${id}-label ${id}`}
            className={cn(
              'h-11 w-full justify-between rounded-lg bg-white px-3 text-base font-normal',
              current && 'border-brand-blue text-brand-blue',
            )}
          >
            <span className="truncate">{current?.label ?? labels.all}</span>
            <ChevronsUpDown className="size-4 opacity-60" aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-[var(--radix-popover-trigger-width)] min-w-56 p-0"
        >
          <Command>
            {searchable && <CommandInput placeholder={labels.find} />}
            <CommandList>
              <CommandEmpty>{labels.none}</CommandEmpty>
              <CommandGroup>
                {[{ value: '', label: labels.all }, ...options].map((option) => (
                  <CommandItem
                    key={option.value || 'all'}
                    value={option.label}
                    onSelect={() => choose(option.value)}
                    className="min-h-11"
                  >
                    <Check
                      className={cn('size-4', option.value === value ? 'opacity-100' : 'opacity-0')}
                      aria-hidden="true"
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
