import { useLang } from '@/features/i18n/LangContext'
import { formatCount } from '@/lib/format'
import { cn } from '@/lib/utils'

/**
 * "217 لوحة" / "217 boards" with the number large. Arabic 1 and 2 are words
 * («لوحة واحدة»، «لوحتان»), so they stay plain text.
 */
export function CountText({ n, large }: { n: number; large?: boolean }) {
  const lang = useLang()
  const text = formatCount(n, lang)
  const digits = String(n)
  const at = text.indexOf(digits)
  if (at < 0) return <span className="text-xs text-[#A9C1D4]">{text}</span>
  return (
    <span className="text-xs whitespace-nowrap text-[#A9C1D4]">
      {text.slice(0, at)}
      <b className={cn('ltr-run font-bold text-white', large ? 'text-[26px]' : 'text-xl')}>
        {digits}
      </b>
      {text.slice(at + digits.length)}
    </span>
  )
}
