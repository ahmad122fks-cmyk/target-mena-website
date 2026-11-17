import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLocation } from 'react-router'
import site from '@/content/site.json'
import { basePath, type Localized } from '@/features/i18n/lang'
import { useLang, useLink, useT } from '@/features/i18n/LangContext'
import { cn } from '@/lib/utils'
import './campaign-button.css'

const SIZES = {
  /** CTA band, menu sheet. */
  md: 'h-12 gap-3 ps-6 pe-2 text-base',
  /** Header, from 640 px (phones: in the menu, the header has no room). */
  sm: 'h-11 gap-2.5 ps-5 pe-1.5 text-[0.9375rem]',
} as const

type Props = {
  size?: keyof typeof SIZES
  /** Default: «خطط حملتك» / "Plan your campaign" (site.json headerCta). */
  label?: Localized
  className?: string
}

/**
 * The site's main action, "Plan your campaign" (header, phone menu, CTA
 * band): a yellow key with a black arrow that asks to be pressed (Ahmad,
 * 17 Nov 2026; motion in campaign-button.css). Quiet on the campaign page.
 */
export function CampaignButton({ size = 'sm', label = site.headerCta.label, className }: Props) {
  const t = useT()
  const link = useLink()
  const lang = useLang()
  const here = basePath(useLocation().pathname) === site.headerCta.path
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight
  return (
    <a
      href={link(site.headerCta.path)}
      aria-current={here ? 'page' : undefined}
      data-still={here || undefined}
      className={cn(
        'cta-press inline-flex shrink-0 items-center justify-center rounded-btn bg-brand-yellow font-semibold whitespace-nowrap text-brand-black outline-offset-4 focus-visible:outline-2 focus-visible:outline-link',
        SIZES[size],
        className,
      )}
    >
      {t(label)}
      <span
        aria-hidden="true"
        className="cta-arrow flex size-8 items-center justify-center rounded-[8px] bg-brand-black text-brand-yellow"
      >
        <Arrow className="size-[18px]" strokeWidth={2.5} />
      </span>
    </a>
  )
}
