import type { FormEvent } from 'react'
import site from '@/content/site.json'
import { prefillPhone } from '@/features/campaign/prefill'
import { useLink, useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import { PillButton } from './PillButton'

type Props = {
  /** Unique id for the field (two forms can share a page). */
  id: string
  /** `onBlue` = inside the blue CTA band: white field, outlined white button (yellow stays for the band's main action). */
  tone?: 'page' | 'onBlue'
  className?: string
}

/**
 * Phone field + "Request a proposal": the number goes into the campaign
 * draft and the visitor continues on the campaign page. Never into the
 * address bar (no `name`, no `action`).
 */
export function PhoneStart({ id, tone = 'page', className }: Props) {
  const t = useT()
  const link = useLink()
  const c = site.contact
  function start(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const phone = event.currentTarget.querySelector('input')?.value ?? ''
    if (phone.trim()) prefillPhone(phone)
    window.location.assign(link('/campaign/'))
  }
  const onBlue = tone === 'onBlue'
  return (
    <form onSubmit={start} className={cn('flex w-full flex-wrap gap-2.5', className)}>
      <label htmlFor={id} className="sr-only">
        {t(c.phoneLabel)}
      </label>
      <input
        id={id}
        type="tel"
        autoComplete="tel"
        dir="ltr"
        placeholder={t(c.phoneLabel)}
        className={cn(
          'h-12 min-w-0 flex-[1_1_14rem] rounded-btn border px-4 text-base rtl:text-right',
          onBlue
            ? 'border-white bg-white text-brand-black placeholder:text-brand-text'
            : 'border-line-strong bg-field text-ink placeholder:text-brand-text',
        )}
      />
      <PillButton type="submit" tone={onBlue ? 'outlineWhite' : 'blue'}>
        {t(c.submit)}
      </PillButton>
    </form>
  )
}
