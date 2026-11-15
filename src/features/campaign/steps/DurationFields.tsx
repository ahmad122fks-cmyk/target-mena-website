import { useWatch, type Control } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useT } from '@/features/i18n/LangContext'
import content from '@/pages/campaign/campaign.content.json'
import { SelectField, TextField } from '../fields'
import type { CampaignValues } from '../schema'

/** Campaign length: weeks or months, or an end date (toggle). */
export function DurationFields({ control }: { control: Control<CampaignValues> }) {
  const t = useT()
  const f = content.fields
  const mode = useWatch({ control, name: 'durationMode' })
  const units = [
    { value: 'weeks', label: t(f.weeks) },
    { value: 'months', label: t(f.months) },
  ]
  return (
    <>
      <FormField
        control={control}
        name="durationMode"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>{t(f.durationMode)}</FormLabel>
            <FormControl>
              <ToggleGroup
                type="single"
                variant="outline"
                value={field.value}
                onValueChange={(v) => v && field.onChange(v)}
                className="justify-start"
              >
                <ToggleGroupItem value="length" className="h-11 px-4">
                  {t(f.byLength)}
                </ToggleGroupItem>
                <ToggleGroupItem value="end" className="h-11 px-4">
                  {t(f.byEnd)}
                </ToggleGroupItem>
              </ToggleGroup>
            </FormControl>
          </FormItem>
        )}
      />
      {mode === 'length' ? (
        <>
          <TextField
            control={control}
            name="durationValue"
            label={t(f.durationValue)}
            inputMode="numeric"
            dir="ltr"
          />
          <SelectField
            control={control}
            name="durationUnit"
            label={t(f.durationUnit)}
            options={units}
          />
        </>
      ) : (
        <TextField control={control} name="endDate" label={t(f.endDate)} type="date" dir="ltr" />
      )}
    </>
  )
}
