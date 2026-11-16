import { Check, Plus } from 'lucide-react'
import type { Control } from 'react-hook-form'
import { FormField } from '@/components/ui/form'
import { useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import content from '@/pages/campaign/campaign.content.json'
import { SERVICES, type CampaignValues } from '../schema'

/** Extra services as toggle pills (aria-pressed): "+ Design" → "✓ Design". */
export function ServicesField({ control }: { control: Control<CampaignValues> }) {
  const t = useT()
  const f = content.fields
  return (
    <FormField
      control={control}
      name="services"
      render={({ field }) => (
        <fieldset className="flex flex-col gap-2.5">
          <legend className="mb-2.5 text-sm font-medium text-ink">{t(f.services)}</legend>
          <div className="flex flex-wrap gap-2.5">
            {SERVICES.map((service) => {
              const on = field.value.includes(service)
              const Icon = on ? Check : Plus
              return (
                <button
                  key={service}
                  type="button"
                  aria-pressed={on}
                  onClick={() =>
                    field.onChange(
                      on ? field.value.filter((s) => s !== service) : [...field.value, service],
                    )
                  }
                  className={cn(
                    'inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm',
                    on
                      ? 'border-link bg-brand-blue-10 text-link'
                      : 'border-input bg-field text-ink hover:border-link',
                  )}
                >
                  <Icon className="size-4" strokeWidth={2} aria-hidden="true" />
                  {t(f[service])}
                </button>
              )
            })}
          </div>
        </fieldset>
      )}
    />
  )
}
