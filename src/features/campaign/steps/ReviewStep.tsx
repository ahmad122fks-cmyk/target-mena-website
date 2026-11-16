import type { UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { useLang, useT } from '@/features/i18n/LangContext'
import { useSelection } from '@/features/selection/store'
import content from '@/pages/campaign/campaign.content.json'
import { buildCampaignMessage } from '../message'
import type { CampaignValues } from '../schema'

type Props = {
  getValues: UseFormGetValues<CampaignValues>
  register: UseFormRegister<CampaignValues>
}

/** Step 4: everything the team will receive, exactly as it will be sent. */
export function ReviewStep({ getValues, register }: Props) {
  const t = useT()
  const lang = useLang()
  const codes = useSelection().map((item) => item.code)
  const lines = buildCampaignMessage(getValues(), codes, lang).split('\n')
  return (
    <div className="flex flex-col gap-4">
      <p className="leading-[1.8]">{t(content.review.text)}</p>
      <dl className="divide-y divide-line rounded-[14px] border border-line bg-surface">
        {lines.slice(1).map((line) => {
          const at = line.indexOf(': ')
          return (
            <div key={line} className="grid gap-1 px-4 py-3 sm:grid-cols-[12rem_1fr]">
              <dt className="font-medium">{line.slice(0, at)}</dt>
              <dd
                className="font-medium text-ink"
                data-review={line.startsWith(t(content.message.boards)) ? 'boards' : undefined}
              >
                {line.slice(at + 2)}
              </dd>
            </div>
          )
        })}
      </dl>
      <div aria-hidden="true" className="hidden">
        <input tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>
    </div>
  )
}
