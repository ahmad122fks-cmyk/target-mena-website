import { useState } from 'react'
import { Button } from '@/components/ui/button'
import content from '@/content/selection.json'
import { useLang, useLink, useT } from '@/features/i18n/LangContext'
import type { SelectedBoard } from '@/features/selection/items'
import { selectionLink } from '@/features/selection/share'
import { selection } from '@/features/selection/store'
import { CtaLink } from './CtaLink'

/** Bottom of "My selection": request these boards, copy a share link, clear. */
export function SelectionActions({
  items,
  onDone,
}: {
  items: SelectedBoard[]
  onDone: () => void
}) {
  const t = useT()
  const lang = useLang()
  const link = useLink()
  const [shared, setShared] = useState<'idle' | 'copied' | string>('idle')
  if (!items.length) {
    return (
      <div className="border-t p-5">
        <CtaLink href={link('/boards/')} className="w-full">
          {t(content.browse)}
        </CtaLink>
      </div>
    )
  }
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
    <div className="flex flex-col gap-3 border-t p-5">
      <CtaLink href={link('/campaign/')} className="w-full">
        {t(content.request)}
      </CtaLink>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={share}
          className="h-11 flex-1 rounded-xl font-semibold text-brand-blue"
        >
          {shared === 'copied' ? t(content.copied) : t(content.share)}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            selection.clear()
            onDone()
          }}
          className="h-11 rounded-xl"
        >
          {t(content.clear)}
        </Button>
      </div>
      {shared !== 'idle' && shared !== 'copied' && (
        <input
          readOnly
          value={shared}
          aria-label={t(content.share)}
          className="ltr-run h-11 rounded-md border px-3 text-sm"
          onFocus={(e) => e.target.select()}
        />
      )}
    </div>
  )
}
