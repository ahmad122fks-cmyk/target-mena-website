import { useEffect, useRef, useState } from 'react'

/**
 * True once the element is within `margin` of the screen. Used so card photos
 * further down only download when the visitor gets close (the browser's own
 * lazy loading starts far earlier and slows the first photo on phones).
 */
export function useNearViewport<T extends Element>(enabled: boolean, margin = '300px') {
  const ref = useRef<T>(null)
  const [near, setNear] = useState(!enabled)
  useEffect(() => {
    const element = ref.current
    if (!enabled || !element) return
    if (!('IntersectionObserver' in window)) return setNear(true)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: margin },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [enabled, margin])
  // A card that becomes the first one (after filtering) shows its photo at once.
  return [ref, near || !enabled] as const
}
