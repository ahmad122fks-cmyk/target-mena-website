import type { Control } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { CampaignValues } from './schema'
import { Segmented } from './Segmented'

type Props = {
  control: Control<CampaignValues>
  id: string
  label: string
  value: { name: 'durationValue' | 'budget'; label: string; placeholder?: string }
  unit: {
    name: 'durationUnit' | 'currency'
    label: string
    options: { value: string; label: string }[]
  }
  hint?: string
}

/** A number and its unit side by side: "1 [weeks|months]", "budget [dinar|dollar]". */
export function AmountField({ control, id, label, value, unit, hint }: Props) {
  return (
    <div role="group" aria-labelledby={`${id}-label`} className="flex flex-col gap-2">
      <span id={`${id}-label`} className="text-sm font-medium text-brand-black">
        {label}
      </span>
      <div className="flex items-start gap-2">
        <FormField
          control={control}
          name={value.name}
          render={({ field }) => (
            <FormItem className="flex-1 gap-1">
              <FormLabel className="sr-only">{value.label}</FormLabel>
              <FormControl>
                <Input
                  inputMode="numeric"
                  dir="ltr"
                  placeholder={value.placeholder}
                  className="h-12 rounded-field border-input bg-white text-base text-brand-black shadow-none rtl:text-right"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={unit.name}
          render={({ field }) => (
            <Segmented
              label={unit.label}
              value={field.value}
              options={unit.options}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      {hint && <p className="text-[0.8125rem]">{hint}</p>}
    </div>
  )
}
