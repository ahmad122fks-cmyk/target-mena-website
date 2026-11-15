import type { Control } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useT } from '@/features/i18n/LangContext'
import content from '@/pages/campaign/campaign.content.json'
import { SERVICES, type CampaignValues } from '../schema'

/** Extra services as shadcn checkboxes. */
export function ServicesField({ control }: { control: Control<CampaignValues> }) {
  const t = useT()
  const f = content.fields
  return (
    <FormField
      control={control}
      name="services"
      render={({ field }) => (
        <FormItem className="sm:col-span-2">
          <FormLabel>{t(f.services)}</FormLabel>
          <div className="grid gap-2 sm:grid-cols-2">
            {SERVICES.map((service) => {
              const checked = field.value.includes(service)
              return (
                <label
                  key={service}
                  className="flex min-h-12 items-center gap-3 rounded-lg border bg-white px-3"
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(on) =>
                      field.onChange(
                        on ? [...field.value, service] : field.value.filter((s) => s !== service),
                      )
                    }
                  />
                  {t(f[service])}
                </label>
              )
            })}
          </div>
        </FormItem>
      )}
    />
  )
}
