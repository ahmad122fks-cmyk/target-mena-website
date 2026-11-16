import { Calligraphy } from '@/components/shared/Calligraphy'
import './float.css'

/**
 * Catalog calligraphy floating at two corners of the hero (Ahmad approved
 * this place, 16 Nov 2026): the guideline's own vector marks in the light
 * blue tint (guideline page 40 pair), never rotated, flipped or stretched.
 * One sits behind the phone (top corner on desktop, low on phones), the
 * other low at the start side behind the tab card: no text sits on them.
 */
export function FloatingCalligraphy() {
  return (
    <>
      <Calligraphy
        mark="a"
        tone="tint"
        className="-end-20 bottom-8 w-72 animate-[dg-float_6s_ease-in-out_infinite] lg:-top-16 lg:bottom-auto lg:w-[29rem]"
      />
      <Calligraphy
        mark="b"
        tone="tint"
        className="-start-24 -bottom-28 hidden w-[24rem] animate-[dg-float_7.5s_ease-in-out_infinite_reverse] opacity-70 lg:block"
      />
    </>
  )
}
