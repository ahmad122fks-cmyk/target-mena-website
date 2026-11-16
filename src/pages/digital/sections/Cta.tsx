import { CtaBand } from '@/components/shared/CtaBand'
import content from '../digital.process.content.json'

/** The page's one blue closing band (v3, no black band): line, text and the yellow main action. */
export function Cta() {
  const { cta } = content
  return (
    <CtaBand
      id="digital-cta"
      title={cta.title}
      text={cta.text}
      primary={{ path: cta.link.path, label: cta.link.label }}
    />
  )
}
