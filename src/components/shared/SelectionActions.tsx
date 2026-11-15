import { useState } from 'react'
import content from '@/content/selection.json'
import { useLang, useLink, useT } from '@/features/i18n/LangContext'
import type { SelectedBoard } from '@/features/selection/items'
import { selectionLink } from '@/features/selection/share'
import { selection } from '@/features/selection/store'
import { formatSqm } from '@/lib/format'
import { PillButton } from './PillButton'

type Props = { items: SelectedBoard[]; onDone?: () => void }

/** Bottom of "My list": total m², request these boards, copy a share link, clear. No prices. */
export function SelectionActions({ items, onDone }: Props) {
  const t = useT()
  const lang = useLang()
  const link = useLink()
  const [shared, setShared] = useState<'idle' | 'copied' | string>('idle')
  if (!items.length)
    return (
      <div className="bg-brand-ghost p-5">
        <PillButton href={link('/boards/')} className="w-full">
          {t(content.browse)}
        </PillButton>
      </div>
    )
  const total = Math.round(items.reduce((sum, item) => sum + item.sqm, 0) * 100) / 100
  async function share() {
    const url = selectionLink(
      items.map((item) => item.code),
      lang,
      window.location.origin,
    )
    try {
      await navigator.clipboard.writeText(url)
      setShared('copied')
    } catch {
      setShared(url) // clipboard blocked: show the link so it can be copied by hand
    }
  }
  return (
    <div className="flex flex-col gap-3 bg-brand-ghost px-5 py-4">
      <p className="flex justify-between text-sm">
        <span>{t(content.total)}</span>
        <b className="ltr-run font-semibold text-brand-black">{formatSqm(total, lang)}</b>
      </p>
      <PillButton href={link('/campaign/')} className="w-full">
        {t(content.request)}
      </PillButton>
      <div className="flex gap-2">
        <PillButton tone="ghost" size="sm" onClick={share} className="flex-1">
          {shared === 'copied' ? t(content.copied) : t(content.share)}
        </PillButton>
        <PillButton
          tone="ghost"
          size="sm"
          onClick={() => {
            selection.clear()
            onDone?.()
          }}
        >
          {t(content.clear)}
        </PillButton>
      </div>
      {shared !== 'idle' && shared !== 'copied' && (
        <input
          readOnly
          value={shared}
          aria-label={t(content.share)}
          className="ltr-run h-11 rounded-field border border-input bg-white px-3 text-sm"
          onFocus={(e) => e.target.select()}
        />
      )}
      <p className="text-xs leading-[1.7]">{t(content.note)}</p>
    </div>
  )
}
