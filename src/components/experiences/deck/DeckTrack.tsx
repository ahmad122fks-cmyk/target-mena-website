import type { ReactNode } from 'react'

/**
 * The column of full-screen cards, moved one screen per step (transform
 * only). Every child is `h-full`; hidden cards get `inert` from their parent.
 */
export function DeckTrack({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div
      className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(.7,0,.2,1)]"
      style={{ transform: `translateY(${index * -100}%)` }}
    >
      {children}
    </div>
  )
}

/** Small vertical position dots on the end side (decorative; slides carry "3 / 9"). */
export function DeckDots({ count, index }: { count: number; index: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute end-1.5 top-1/2 flex -translate-y-1/2 flex-col gap-[7px]"
    >
      {Array.from({ length: count }, (_, j) => (
        <span
          key={j}
          className={
            'block size-[5px] rounded-full bg-white transition-[scale,opacity] duration-300 ' +
            (j === index ? 'scale-150 opacity-100' : 'opacity-40')
          }
        />
      ))}
    </div>
  )
}
