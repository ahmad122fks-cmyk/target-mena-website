import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import content from '@/content/request-form.json'
import { useT } from '@/features/i18n/LangContext'
import { buildRequestMail } from '@/features/leads/requestMail'
import { FormField, Honeypot } from './FormField'
import { ToConfirm } from './ToConfirm'

type Status = 'idle' | 'error' | 'sent'

/**
 * "Request this board" (BUILD-BRIEF 5). Until the leads API exists it opens
 * the visitor's email app with the request ready (mailto fallback). A hidden
 * honeypot field catches bots without any CAPTCHA.
 */
export function RequestForm({ code }: { code: string }) {
  const t = useT()
  const [status, setStatus] = useState<Status>('idle')
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    if (form.get('website')) return setStatus('sent')
    const value = (key: string) => String(form.get(key) ?? '').trim()
    if (!value('name') || !value('phone')) return setStatus('error')
    const fields = {
      name: value('name'),
      company: value('company'),
      phone: value('phone'),
      period: value('period'),
    }
    window.location.href = buildRequestMail(code, fields, t, window.location.href)
    setStatus('sent')
  }
  return (
    <form
      id="request"
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="request-title"
      className="flex flex-col gap-4 rounded-2xl bg-brand-ghost p-6"
    >
      <h2 id="request-title" className="text-xl">
        {t(content.title)}
      </h2>
      {status === 'sent' ? (
        <p role="status" className="font-semibold text-brand-blue">
          {t(content.success)}
        </p>
      ) : (
        <>
          <FormField name="name" label={t(content.name)} autoComplete="name" required />
          <FormField name="company" label={t(content.company)} autoComplete="organization" />
          <FormField
            name="phone"
            label={t(content.phone)}
            type="tel"
            autoComplete="tel"
            dir="ltr"
            required
          />
          <FormField name="period" label={t(content.period)} placeholder={t(content.periodHint)} />
          <Honeypot />
          {status === 'error' && (
            <p
              role="alert"
              className="rounded-lg border-s-4 border-brand-yellow bg-white p-3 font-medium text-brand-black"
            >
              {t(content.required)}
            </p>
          )}
          <Button type="submit" className="h-12 rounded-xl text-base font-semibold">
            {t(content.submit)}
          </Button>
          <p className="flex flex-wrap items-center gap-2 text-sm">
            {t(content.whatsapp)} <ToConfirm what={content.whatsappToConfirm} />
          </p>
        </>
      )}
    </form>
  )
}
