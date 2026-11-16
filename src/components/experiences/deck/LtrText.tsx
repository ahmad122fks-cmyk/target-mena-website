import { splitLtr } from './logic'

/** Content text with its codes, sizes and numbers kept left-to-right (ltr-run). */
export function LtrText({ text }: { text: string }) {
  return splitLtr(text).map((part, i) =>
    part.ltr ? (
      <span key={i} className="ltr-run">
        {part.text}
      </span>
    ) : (
      part.text
    ),
  )
}
