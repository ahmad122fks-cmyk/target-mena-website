import type { InputHTMLAttributes } from 'react'

type Props = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'id'>

const box =
  'w-full rounded-field border border-input bg-white px-3.5 text-base text-brand-black outline-none focus-visible:border-brand-blue focus-visible:ring-[3px] focus-visible:ring-brand-blue/30 user-invalid:border-brand-black'

/** One labelled field; the browser checks required, type and pattern. */
export function ContactField({ id, label, value, onChange, multiline, ...input }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-brand-black">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={4}
          required={input.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${box} py-3`}
        />
      ) : (
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir={input.type === 'tel' || input.type === 'email' ? 'ltr' : undefined}
          className={`${box} h-12 rtl:text-right`}
          {...input}
        />
      )}
    </div>
  )
}
