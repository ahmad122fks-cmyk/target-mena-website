import { memo } from 'react'
import { useT } from '@/features/i18n/LangContext'
import content from '../map.content.json'
import type { Hint as HintState } from './useHint'

/** "Use Ctrl or ⌘ while scrolling to zoom" / "Use two fingers to zoom", centred, fades out. */
export const Hint = memo(function Hint({ hint }: { hint: HintState }) {
  const t = useT()
  return (
    <div
      role="status"
      className="pointer-events-none absolute inset-0 flex items-center justify-center p-6"
    >
      {hint && (
        <span
          key={hint.id}
          className="rounded-xl bg-[#04111F]/85 px-4 py-2.5 text-center text-[13px] motion-safe:animate-[map-hint_2.2s_ease_both]"
        >
          {t(hint.kind === 'wheel' ? content.hintWheel : content.hintTouch)}
        </span>
      )}
    </div>
  )
})
