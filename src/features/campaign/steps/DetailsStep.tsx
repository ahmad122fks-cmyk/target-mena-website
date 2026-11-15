import type { Control } from 'react-hook-form'
import cities from '@/data/cities.json'
import { useLang, useT } from '@/features/i18n/LangContext'
import type { Localized } from '@/features/i18n/lang'
import content from '@/pages/campaign/campaign.content.json'
import { SelectField, TextField } from '../fields'
import type { CampaignValues } from '../schema'

/** Step 1: name, company, phone (required), email, province. */
export function DetailsStep({ control }: { control: Control<CampaignValues> }) {
  const t = useT()
  const lang = useLang()
  const f = content.fields
  const provinces = Object.entries(cities as Record<string, Localized & { kind: string }>)
    .filter(([, city]) => city.kind === 'province')
    .map(([value, city]) => ({ value, label: city[lang] }))
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <TextField control={control} name="name" label={t(f.name)} autoComplete="name" required />
      <TextField
        control={control}
        name="company"
        label={`${t(f.company)} (${t(f.optional)})`}
        autoComplete="organization"
      />
      <TextField
        control={control}
        name="phone"
        label={t(f.phone)}
        type="tel"
        dir="ltr"
        autoComplete="tel"
        required
      />
      <TextField
        control={control}
        name="email"
        label={`${t(f.email)} (${t(f.optional)})`}
        type="email"
        dir="ltr"
        autoComplete="email"
      />
      <SelectField
        control={control}
        name="province"
        label={t(f.province)}
        options={[{ value: '', label: '—' }, ...provinces]}
      />
    </div>
  )
}
