import { CtaBand } from '@/components/shared/CtaBand'
import content from '../production.content.json'

/**
 * The page's one blue closing band (v3) with the yellow main action. Its
 * line is the approved in-house line from the hero (no new copy).
 */
export function Cta() {
  const { cta, hero } = content
  return (
    <CtaBand
      id="production-cta"
      title={cta.title}
      text={hero.title}
      primary={{ path: cta.link.path, label: cta.link.label }}
    />
  )
}
