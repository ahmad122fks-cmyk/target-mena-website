import type { Control } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useT } from '@/features/i18n/LangContext'
import content from '@/pages/campaign/campaign.content.json'
import { AmountField } from '../AmountField'
import { TextField } from '../fields'
import type { CampaignValues } from '../schema'
import { ServicesField } from './ServicesField'

/** Step 2: name, start, length in weeks or months, optional budget, objective, extra services. */
export function CampaignStep({ control }: { control: Control<CampaignValues> }) {
  const t = useT()
  const f = content.fields
  return (
    <div className="flex flex-col gap-5">
      <TextField
        control={control}
        name="campaignName"
        label={`${t(f.campaignName)} (${t(f.optional)})`}
        placeholder={t(f.campaignPlaceholder)}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          control={control}
          name="startDate"
          label={t(f.startDate)}
          type="date"
          dir="ltr"
          required
        />
        <AmountField
          control={control}
          id="duration"
          label={t(f.duration)}
          value={{ name: 'durationValue', label: t(f.durationValue) }}
          unit={{
            name: 'durationUnit',
            label: t(f.durationUnit),
            options: [
              { value: 'weeks', label: t(f.weeks) },
              { value: 'months', label: t(f.months) },
            ],
          }}
        />
      </div>
      <AmountField
        control={control}
        id="budget"
        label={t(f.budget)}
        value={{ name: 'budget', label: t(f.budgetValue), placeholder: t(f.budgetPlaceholder) }}
        unit={{
          name: 'currency',
          label: t(f.currency),
          options: [
            { value: 'IQD', label: t(f.iqd) },
            { value: 'USD', label: t(f.usd) },
          ],
        }}
        hint={t(f.budgetNote)}
      />
      <FormField
        control={control}
        name="objective"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-brand-black">{t(f.objective)}</FormLabel>
            <FormControl>
              <Textarea
                rows={3}
                placeholder={t(f.objectivePlaceholder)}
                className="rounded-field border-input bg-white text-base shadow-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <ServicesField control={control} />
    </div>
  )
}
