import type { Control } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useT } from '@/features/i18n/LangContext'
import content from '@/pages/campaign/campaign.content.json'
import { SelectField, TextField } from '../fields'
import type { CampaignValues } from '../schema'
import { DurationFields } from './DurationFields'
import { ServicesField } from './ServicesField'

/** Step 2: campaign name, start, length or end date, optional budget, objective, extra services. */
export function CampaignStep({ control }: { control: Control<CampaignValues> }) {
  const t = useT()
  const f = content.fields
  const currencies = [
    { value: 'IQD', label: t(f.iqd) },
    { value: 'USD', label: t(f.usd) },
  ]
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <TextField
        control={control}
        name="campaignName"
        label={`${t(f.campaignName)} (${t(f.optional)})`}
      />
      <TextField
        control={control}
        name="startDate"
        label={t(f.startDate)}
        type="date"
        dir="ltr"
        required
      />
      <DurationFields control={control} />
      <TextField
        control={control}
        name="budget"
        label={t(f.budget)}
        inputMode="numeric"
        dir="ltr"
        hint={t(f.budgetNote)}
      />
      <SelectField control={control} name="currency" label={t(f.currency)} options={currencies} />
      <FormField
        control={control}
        name="objective"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>{t(f.objective)}</FormLabel>
            <FormControl>
              <Textarea rows={3} className="bg-white text-base" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <ServicesField control={control} />
    </div>
  )
}
