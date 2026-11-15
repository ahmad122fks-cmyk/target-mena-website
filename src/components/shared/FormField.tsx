import type { ComponentProps } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Props = ComponentProps<'input'> & { name: string; label: string }

/** shadcn Label + Input pair, 48 px tall for touch. */
export function FormField({ name, label, ...input }: Props) {
  const id = `field-${name}`
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm font-semibold">
        {label}
      </Label>
      <Input id={id} name={name} className="h-12 bg-white text-base" {...input} />
    </div>
  )
}

/** Hidden honeypot: people never see it, bots fill it (no CAPTCHA needed). */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="hidden">
      <input name="website" tabIndex={-1} autoComplete="off" />
    </div>
  )
}
