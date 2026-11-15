import type { ComponentProps, ReactNode } from 'react'
import type { Control } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { CampaignValues } from './schema'

type Name = keyof CampaignValues
const control = 'h-12 bg-white text-base'
export const selectClass =
  'h-12 w-full rounded-md border border-input bg-white px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50'

/** shadcn Form text input bound to one campaign field. */
export function TextField({
  control: c,
  name,
  label,
  hint,
  ...input
}: {
  control: Control<CampaignValues>
  name: Name
  label: string
  hint?: ReactNode
} & ComponentProps<'input'>) {
  return (
    <FormField
      control={c}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input className={control} {...input} {...field} value={field.value as string} />
          </FormControl>
          {hint && <p className="text-sm">{hint}</p>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

/** shadcn Form native select (light, accessible) bound to one campaign field. */
export function SelectField({
  control: c,
  name,
  label,
  options,
}: {
  control: Control<CampaignValues>
  name: Name
  label: string
  options: { value: string; label: string }[]
}) {
  return (
    <FormField
      control={c}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <select className={selectClass} {...field} value={field.value as string}>
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
