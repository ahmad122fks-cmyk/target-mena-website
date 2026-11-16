import { Check, Share2 } from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = { url: string; title: string; label: string; copiedLabel: string; className?: string }

/** Native share sheet where the phone has one; otherwise copies the link and says so. */
export function ShareButton({ url, title, label, copiedLabel, className }: Props) {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(id)
  }, [copied])

  const share = async () => {
    try {
      if (typeof navigator.share === 'function') return await navigator.share({ title, url })
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      // Share sheet closed or clipboard blocked: nothing to report.
    }
  }

  const Icon = copied ? Check : Share2
  return (
    <span className="relative">
      <button type="button" onClick={share} aria-label={label} className={className}>
        <Icon className="size-[19px]" strokeWidth={2} aria-hidden="true" />
      </button>
      <span
        role="status"
        className={
          'pointer-events-none absolute end-0 bottom-full mb-2 rounded-md bg-white px-2 py-0.5 text-[11px] whitespace-nowrap text-black transition-opacity ' +
          (copied ? 'opacity-100' : 'opacity-0')
        }
      >
        {copied ? copiedLabel : ''}
      </span>
    </span>
  )
}
