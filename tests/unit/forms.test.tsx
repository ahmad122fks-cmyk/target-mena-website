// @vitest-environment jsdom
/*
 * BUILD-BRIEF 9.8: the honeypot stops bots; "sent" and "error" are shown.
 * The leads API does not exist yet, so the form runs against a stub here.
 */
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ContactForm } from '@/features/contact/ContactForm'
import { SendResult } from '@/features/campaign/SendResult'
import { LangProvider } from '@/features/i18n/LangContext'

vi.mock('@/lib/site', async (original) => ({
  ...(await original<typeof import('@/lib/site')>()),
  LEADS_ENDPOINT: 'https://leads.test/api',
}))

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true

let root: Root
let box: HTMLDivElement
beforeEach(() => {
  box = document.body.appendChild(document.createElement('div'))
  root = createRoot(box)
})
afterEach(() => {
  act(() => root.unmount())
  box.remove()
  vi.unstubAllGlobals()
})

function type(selector: string, value: string) {
  const field = box.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector)!
  const proto = Object.getPrototypeOf(field) as object
  Object.getOwnPropertyDescriptor(proto, 'value')!.set!.call(field, value)
  field.dispatchEvent(new Event('input', { bubbles: true }))
}

async function fillAndSend(bot = false) {
  act(() =>
    root.render(
      <LangProvider lang="en">
        <ContactForm />
      </LangProvider>,
    ),
  )
  act(() => {
    type('#c-name', 'Test Client')
    type('#c-phone', '+964 770 000 0000')
    type('#c-message', 'Rooftops in Najaf')
  })
  if (bot) box.querySelector<HTMLInputElement>('input[name="website"]')!.value = 'spam'
  await act(async () => box.querySelector('form')!.requestSubmit())
}

describe('contact form', () => {
  it('a filled honeypot sends nothing and shows nothing', async () => {
    const fetch = vi.fn()
    vi.stubGlobal('fetch', fetch)
    await fillAndSend(true)
    expect(fetch).not.toHaveBeenCalled()
    expect(box.querySelector('[role="status"], [role="alert"]')).toBeNull()
  })
  it('shows the success message when the leads API accepts it', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    await fillAndSend()
    expect(box.querySelector('[role="status"]')?.textContent).toContain('Your message has arrived')
  })
  it('shows the error with WhatsApp and email when the leads API fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('down')))
    await fillAndSend()
    const alert = box.querySelector('[role="alert"]')!
    expect(alert.textContent).toContain('We couldn’t send it')
    expect(alert.querySelector('a[href^="https://wa.me/"]')?.getAttribute('href')).toContain(
      'Rooftops',
    )
  })
})

describe('campaign result', () => {
  it.each([
    ['sent', '[role="status"]'],
    ['error', '[role="alert"]'],
  ] as const)('%s is shown', (result, selector) => {
    const message = 'Boards (1): BGW03A'
    act(() =>
      root.render(
        <LangProvider lang="ar">
          <SendResult result={result} message={message} name="Ali" />
        </LangProvider>,
      ),
    )
    const shown = box.querySelector(selector)!
    expect(shown.textContent?.length).toBeGreaterThan(10)
    if (result === 'error')
      expect(shown.querySelector('a[href^="https://wa.me/"]')?.getAttribute('href')).toContain(
        'BGW03A',
      )
  })
})
